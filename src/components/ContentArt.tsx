import './content-art.css';
const paths:Record<string,string>={
short:'M47 18h48v95H47z M47 32h48 M65 24h12 M65 105h12 M61 48l21 14-21 14z',
video:'M24 35h92v61H24z M24 48h92 M36 35l9 13m13-13 9 13m13-13 9 13 M61 61l22 12-22 12z',
script:'M40 20h53l17 17v73H40z M93 20v19h17 M52 52h42 M52 65h33 M52 78h23 M25 97l15-15 11 11-15 15H25z',
social:'M26 30h90v76H26z M26 49h90 M43 22v16m55-16v16 M40 62h12v12H40z M65 62h12v12H65z M90 62h12v12H90z M40 86h12m13 0h12m13 0h12',
drama:'M22 44l44-22 50 24-44 25z M22 44v36l50 27 44-25V46 M72 71v36 M53 41l21 12-14 7',
people:'M54 40a12 12 0 1 0 0 1 M98 45a10 10 0 1 0 0 1 M30 101V86c0-28 49-28 49 0v15 M84 72c19-5 29 5 29 19v10 M39 101h65',
laptop:'M25 27h90v62H25z M16 100h110l-11-11H25z M45 49l-8 9 8 9m48-18 8 9-8 9 M77 43L63 74',
photo:'M22 32h94v67H22z M22 85l25-24 20 20 16-13 33 28 M83 45a8 8 0 1 0 0 1',
deliver:'M25 38h90v64H25z M25 38l45-18 45 18 M70 38v64 M25 38l45 20 45-20 M56 78l10 10 20-20',
message:'M22 27h94v64H64l-24 18V91H22z M38 45h63 M38 59h48 M38 73h30',
fee:'M24 37h93v65H24z M24 55h93 M37 74h23 M77 77h25 M38 26h66',
};
export default function ContentArt({kind='video',small=false}:{kind?:string;small?:boolean}){return <svg className={small?'content-art content-art-small':'content-art'} viewBox="0 0 140 130" fill="none" aria-hidden="true"><path d="M12 50L77 12l51 38-14 65-73 4z" fill="#eee0db"/><path d="M29 107h92" stroke="#c7a19c" strokeWidth="2"/><path d={paths[kind]||paths.video} stroke="#963b51" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M117 19v12m-6-6h12" stroke="#ae445a" strokeWidth="2"/></svg>}
export function CreativeRoute(){return <ol className="creative-route" aria-label="從想法到影片的製作流程">{[['script','整理故事'],['photo','設計畫面'],['video','剪輯成片'],['deliver','完成作品']].map(([kind,label])=><li key={kind}><ContentArt kind={kind}/><span>{label}</span></li>)}</ol>}
