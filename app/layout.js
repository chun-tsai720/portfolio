import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: {
    default: "CHUN — VISUAL PORTFOLIO",
    template: "%s — CHUN",
  },
  description: "蔡濬守的攝影、Midjourney 生成影像與 VJ 即時視覺作品集。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" data-scroll-behavior="smooth">
      <body>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="回到首頁">
            CHUN<span>/</span>PORTFOLIO
          </Link>
          <nav aria-label="主要導覽">
            <Link href="/works">作品</Link>
            <Link href="/about">作者</Link>
            <Link href="/contact">聯絡</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>PHOTOGRAPHY / MIDJOURNEY / VJ</p>
          <p>© {new Date().getFullYear()} CHUN TSAI</p>
        </footer>
      </body>
    </html>
  );
}
