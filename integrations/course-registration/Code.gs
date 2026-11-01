// Independent course-site registration receiver. No dependency on the old Sites app.
// Configure Script Properties with initializeRegistration, then deploy as a web app.
const COURSE_REG_VERSION = '2026-11-01-ai-ip-v1';
const COURSE_REG_CLOSES = '2026-12-11T23:59:59+08:00';
const COURSE_REG_HEADERS = ['登記編號','送出識別碼','內容核對碼','登記時間（台北）','姓名','手機','Email','想做的 AI IP 帳號','課程','金額','付款狀態（主辦核對）','藍新交易編號（主辦填）','付款日期（主辦填）','同意版本'];

function initializeRegistration() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('REGISTRATION_SECRET')) props.setProperty('REGISTRATION_SECRET', Utilities.getUuid() + Utilities.getUuid());
  if (!props.getProperty('REGISTRATION_SHEET_ID')) {
    const book = SpreadsheetApp.create('超直白行銷｜AI IP 兩日班報名名單');
    book.setSpreadsheetTimeZone('Asia/Taipei');
    const sheet = book.getSheets()[0];
    sheet.setName('報名名單');
    sheet.appendRow(COURSE_REG_HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,COURSE_REG_HEADERS.length).setFontWeight('bold').setBackground('#eee3df');
    sheet.getRange('E:H').setNumberFormat('@');
    props.setProperty('REGISTRATION_SHEET_ID', book.getId());
  }
  console.log('收件設定已就緒；名單與密鑰保存在此專案的指令碼屬性，未公開分享。');
}

function doGet() {
  return outputRegistration_({ok: true, service: 'course-registration', version: COURSE_REG_VERSION});
}

function doPost(e) {
  let body;
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 14000) return outputRegistration_({ok: false, error: 'invalid_request'});
    body = JSON.parse(raw);
  } catch (_) { return outputRegistration_({ok: false, error: 'invalid_request'}); }
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty('REGISTRATION_SECRET');
  if (!secret || !body || body.secret !== secret) return outputRegistration_({ok: false, error: 'unauthorized'});
  if (body.kind !== 'course-registration' || body.version !== COURSE_REG_VERSION) return outputRegistration_({ok: false, error: 'invalid_request'});
  const d = body.data;
  if (!d || typeof d !== 'object' || d.consent !== true || d.website) return outputRegistration_({ok: false, error: 'invalid_request'});
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(d.requestId || '')) return outputRegistration_({ok: false, error: 'invalid_request'});
  for (const pair of [['name',60],['phone',10],['email',254],['goal',1000]]) {
    const value = d[pair[0]];
    if (typeof value !== 'string' || !value.trim() || value.length > pair[1] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) return outputRegistration_({ok: false, error: 'invalid_request'});
  }
  if (!/^09\d{8}$/.test(d.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return outputRegistration_({ok: false, error: 'invalid_request'});
  const sheetId = props.getProperty('REGISTRATION_SHEET_ID');
  if (!sheetId) return outputRegistration_({ok: false, error: 'not_configured'});
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify([d.name,d.phone,d.email,d.goal,COURSE_REG_VERSION])).map(b => ('0'+((b+256)%256).toString(16)).slice(-2)).join('');
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return outputRegistration_({ok: false, error: 'busy'});
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('報名名單');
    if (!sheet) return outputRegistration_({ok: false, error: 'not_configured'});
    const records = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,COURSE_REG_HEADERS.length).getValues() : [];
    const previous = records.find(row => row[1] === d.requestId);
    if (previous) return previous[2] === digest ? outputRegistration_({ok: true, saved: true, id: previous[0]}) : outputRegistration_({ok: false, error: 'request_conflict'});
    if (Date.now() > Date.parse(COURSE_REG_CLOSES)) return outputRegistration_({ok: false, error: 'closed'});
    if (records.some(row => String(row[5]) === d.phone && !['已取消','已作廢'].includes(String(row[10])))) return outputRegistration_({ok: false, error: 'duplicate'});
    const cache = CacheService.getScriptCache();
    const rateKey = typeof body.rateKey === 'string' && /^[a-f0-9]{64}$/.test(body.rateKey) ? 'registration:'+body.rateKey : '';
    if (!rateKey) return outputRegistration_({ok: false, error: 'invalid_request'});
    const count = Number(cache.get(rateKey) || '0');
    if (count >= 10) return outputRegistration_({ok: false, error: 'rate_limited'});
    cache.put(rateKey,String(count+1),600);
    const id = 'IP-'+Utilities.getUuid().replace(/-/g,'').slice(0,12).toUpperCase();
    const safe = value => /^[=+\-@\t\r\n]/.test(value) ? "'"+value : value;
    sheet.appendRow([id,d.requestId,digest,Utilities.formatDate(new Date(),'Asia/Taipei','yyyy-MM-dd HH:mm:ss'),safe(d.name),d.phone,safe(d.email),safe(d.goal),'AI IP 兩日班｜2026/12/12–13',4900,'待付款／待核對','','',COURSE_REG_VERSION]);
    SpreadsheetApp.flush();
    return outputRegistration_({ok: true, saved: true, id: id});
  } catch (_) {
    // Never include submitted personal information in logs or public errors.
    return outputRegistration_({ok: false, error: 'storage_unavailable'});
  } finally { lock.releaseLock(); }
}

function outputRegistration_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
