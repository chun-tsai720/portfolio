import Link from "next/link";
import { siteInfo } from "@/lib/site";

export const metadata = { title: "作者介紹" };

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="inner-page-title">
        <p className="eyebrow">ABOUT / PRACTICE / DIRECTION</p>
        <h1>BETWEEN<br />DISCIPLINES.</h1>
      </header>
      <section className="about-profile">
        <div className="about-portrait">
          <img src="/about/chun.jpg" alt={siteInfo.creator} />
        </div>
        <div className="about-copy">
          <p className="section-number">蔡濬守 / {siteInfo.creatorEn}</p>
          <h2>我在藝術、設計與技術之間工作，讓不同媒介共同完成一個想法。</h2>
          <p>我的創作從現場音樂攝影出發。長期與光線、人物和空間相處，建立了我對情緒、敘事與觀看方式的敏感度；生成式影像則讓我開始建構不存在的角色與世界。</p>
          <p>我不希望把自己限制在單純的設計或工程分類裡。現在，我也透過 JavaScript、Next.js、Node.js、API 與 MCP 等技術，把視覺內容轉化為能被探索、操作與實際運作的體驗。</p>
          <p>LUMIN 畢業專題是這個方向的集中實踐，也是我的第一個 Vibe Coding 作品：以實體攝影、AI 生成、視覺識別、策展動線與互動網站，共同建構一個關於「數位自我」的沉浸式展覽空間。其他後端與 AI 系統作品，則持續擴張我能整合的範圍。</p>
          <p>我仍在學習，也會清楚區分已完成的實作、具備經驗的工具與正在探索的方向。對我而言，跨域不是技能清單，而是知道何時該使用什麼方法，把概念推進到可以被看見與使用的成果。</p>
          <div className="about-actions">
            <Link className="text-link" href="/works/lumin">VIEW LUMIN ↗</Link>
            <Link className="text-link" href="/works">ALL PROJECTS ↗</Link>
            <Link className="text-link" href="/contact">CONTACT ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
