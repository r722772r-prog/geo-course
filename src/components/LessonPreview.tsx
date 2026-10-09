import ContentArt from './ContentArt';
const steps = [['photo','商品照片','帶來自己的題目'],['script','影片腳本','整理特色與故事'],['video','分鏡與素材','把文字變成畫面'],['video','剪輯成片','串起畫面與節奏']];
export default function LessonPreview(){return <figure className="lesson-flow"><ol>{steps.map(([kind,title,text])=><li key={title}><ContentArt kind={kind} small/><strong>{title}</strong><span>{text}</span></li>)}</ol><figcaption>教學流程示意｜以你自己的商品或服務逐步實作。</figcaption></figure>}
