import Link from "next/link";

export const metadata = {
  title: "MCP Trip Server",
  description: "串接天氣 API、地點服務與 Redis 暫存的 Model Context Protocol 教學延伸實作。",
};

export default function McpServerPage() {
  return (
    <main className="case-page system-case mcp-case">
      <section className="system-case-hero">
        <Link className="back-link" href="/works">← ALL PROJECTS</Link>
        <p className="eyebrow">03 / AI SYSTEM PROTOTYPE</p>
        <h1>MCP<br />TRIP<br /><span>SERVER</span></h1>
        <div className="mcp-orbit" aria-hidden="true"><i /><i /><i /><strong>MCP</strong></div>
      </section>

      <section className="case-meta">
        <div><span>TYPE</span><strong>COURSE EXTENSION</strong></div>
        <div><span>FOCUS</span><strong>AI TOOL INTEGRATION</strong></div>
        <div><span>FORMAT</span><strong>STDIO MCP SERVER</strong></div>
        <div><span>STATUS</span><strong>WORKING PROTOTYPE</strong></div>
      </section>

      <section className="case-intro">
        <p className="section-number">THE PROJECT / 01</p>
        <div>
          <h2>讓 AI 不只回答，<br />也能安全地連接工具與資料。</h2>
          <p>這項作品以半日行程課程範例為起點，實作 MCP Tools、Resources 與 Prompts，並延伸真實天氣查詢及 Redis 收藏暫存。</p>
          <p>它呈現的是我對 AI Host、協定介面、外部 API、資料保存與安全邊界的實作理解；目前定位為教學延伸原型，而不是正式上線服務。</p>
        </div>
      </section>

      <section className="mcp-flow-section">
        <p className="section-number">CONNECTION FLOW / 02</p>
        <div className="mcp-flow">
          <article><span>01</span><strong>AI HOST</strong><small>理解需求並選擇能力</small></article>
          <i>→</i>
          <article><span>02</span><strong>MCP SERVER</strong><small>驗證輸入與協調工具</small></article>
          <i>→</i>
          <article><span>03</span><strong>TOOLS / DATA</strong><small>天氣 API、地點與 Redis</small></article>
          <i>→</i>
          <article><span>04</span><strong>STRUCTURED RESULT</strong><small>回傳可理解的結果</small></article>
        </div>
      </section>

      <section className="case-pillars">
        <p className="section-number">IMPLEMENTATION / 03</p>
        <div className="case-pillar-list">
          <article><span>01</span><h3>TOOLS</h3><p>查詢天氣與地點、管理收藏，透過 Zod Schema 定義清楚的輸入邊界。</p></article>
          <article><span>02</span><h3>RESOURCES &amp; PROMPTS</h3><p>提供固定資源 URI 與可重複使用的任務模板，區分資料、操作和提示。</p></article>
          <article><span>03</span><h3>BOUNDARIES</h3><p>固定外部網域、使用 timeout、分離 stdout 與 stderr，並記錄教學版本尚未具備的正式環境保護。</p></article>
        </div>
      </section>

      <section className="case-tech">
        <p className="section-number">STACK / 04</p>
        <div><h2>AI MEETS INFRASTRUCTURE.</h2><p>這個原型把模型互動與 API、快取及結構化驗證放在同一條資料流程中，作為後續 AI 應用設計與工具整合的技術基礎。</p></div>
        <ul>
          <li>JavaScript</li><li>Model Context Protocol</li><li>Zod</li><li>Open-Meteo API</li><li>Redis</li><li>Express</li><li>Docker Compose</li><li>Stdio Transport</li>
        </ul>
      </section>

      <section className="case-next">
        <p className="section-number">EXPLORE THE FOUNDATION</p>
        <Link href="/works/photography"><span>A01</span><h2>VISUAL ARCHIVE</h2><b>↗</b></Link>
      </section>
    </main>
  );
}
