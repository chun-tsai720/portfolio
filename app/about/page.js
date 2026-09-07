import Link from "next/link";
import { siteInfo } from "@/lib/site";

export const metadata = { title: "作者介紹" };

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="inner-page-title">
        <p className="eyebrow">ABOUT THE ARTIST</p>
        <h1>BETWEEN<br />REAL &amp; VIRTUAL.</h1>
      </header>
      <section className="about-profile">
        <div className="about-portrait">
          <img src="/about/chun.jpg" alt={siteInfo.creator} />
          <span>{siteInfo.studentId}</span>
        </div>
        <div className="about-copy">
          <p className="section-number">蔡濬守 / {siteInfo.creatorEn}</p>
          <h2>過去，我透過觀景窗捕捉光影的輪廓；現在，我也透過 Prompt、程式碼與即時影像生成未知的視界。</h2>
          <p>創作從現場音樂攝影出發，逐步延伸到 Midjourney 生成影像與 VJ 現場視覺。對我而言，媒介可以改變，但作品始終在處理同一件事：光如何構成情緒，影像如何保存或重新創造一個瞬間。</p>
          <p>這個作品集不是單一攝影分類的終點，而是一個持續擴張的創作入口，收納實體的過往，也容納虛擬與動態的未來。</p>
          <div className="about-actions">
            <Link className="text-link" href="/works">VIEW WORKS ↗</Link>
            <Link className="text-link" href="/contact">CONTACT ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
