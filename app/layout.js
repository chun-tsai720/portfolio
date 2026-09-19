import Link from "next/link";
import CursorEffect from "../components/CursorEffect";
import "./globals.css";

export const metadata = {
  title: {
    default: "CHUN — CREATIVE TECHNOLOGIST",
    template: "%s — CHUN",
  },
  description: "蔡濬守的科技藝術、應用設計與創意技術作品集，整合影像、生成式 AI、互動網站與程式系統。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" data-scroll-behavior="smooth">
      <body>
        <CursorEffect />
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="回到首頁">
            CHUN<span>/</span>AI STUDIO
          </Link>
          <nav aria-label="主要導覽">
            <details className="project-menu">
              <summary>專案</summary>
              <div className="project-menu-panel">
                <p>SELECTED PROJECTS</p>
                <Link href="/works">全部專案 <span>00</span></Link>
                <Link href="/works/lumin">LUMIN 映光 <span>01</span></Link>
                <Link href="/works/social-media-api">Social Media API <span>02</span></Link>
                <Link href="/works/mcp-server">MCP Trip Server <span>03</span></Link>
                <p>VISUAL ARCHIVE</p>
                <Link href="/works/photography">Photography <span>A01</span></Link>
                <Link href="/works/midjourney">Midjourney <span>A02</span></Link>
                <Link href="/works/visuals">Visuals <span>A03</span></Link>
                <Link href="/works/visuals/p5js">↳ P5.js <span>A03.1</span></Link>
              </div>
            </details>
            <Link href="/about">關於</Link>
            <Link href="/contact">聯絡</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>ART / DESIGN / TECHNOLOGY / INTEGRATION</p>
          <p>© {new Date().getFullYear()} CHUN TSAI</p>
        </footer>
      </body>
    </html>
  );
}
