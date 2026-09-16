import Link from "next/link";

export const metadata = {
  title: "Social Media API",
  description: "以 Node.js、Express、PostgreSQL、JWT、測試與 Docker 建立的社群平台後端系統。",
};

const endpoints = [
  ["POST", "/auth/signup", "建立會員"],
  ["POST", "/auth/login", "登入並取得 JWT"],
  ["GET", "/users/:username/posts", "取得使用者貼文"],
  ["POST", "/posts", "發布貼文"],
  ["POST", "/posts/:id/comments", "新增留言"],
  ["POST", "/posts/:id/likes", "按讚互動"],
];

export default function SocialMediaApiPage() {
  return (
    <main className="case-page system-case api-case">
      <section className="system-case-hero">
        <Link className="back-link" href="/works">← ALL PROJECTS</Link>
        <p className="eyebrow">02 / BACK-END PROJECT</p>
        <h1>SOCIAL<br />MEDIA<br /><span>API</span></h1>
        <div className="hero-system-diagram" aria-label="社群 API 系統流程">
          <span>CLIENT</span><i>→</i><span>ROUTER</span><i>→</i><span>AUTH</span><i>→</i><span>LOGIC</span><i>→</i><span>DATABASE</span>
        </div>
      </section>

      <section className="case-meta">
        <div><span>TYPE</span><strong>COURSE CAPSTONE</strong></div>
        <div><span>FOCUS</span><strong>BACK-END ARCHITECTURE</strong></div>
        <div><span>FORMAT</span><strong>REST API</strong></div>
        <div><span>STATUS</span><strong>IMPLEMENTED &amp; TESTED</strong></div>
      </section>

      <section className="case-intro">
        <p className="section-number">THE PROJECT / 01</p>
        <div>
          <h2>不只讓畫面存在，<br />也理解服務如何在背後運作。</h2>
          <p>這是以後端課程結業專案為基礎完成的社群軟體 API。系統涵蓋會員註冊與登入、貼文、留言、按讚、權限判斷及一致的錯誤回應。</p>
          <p>這項作品在 Portfolio 中代表的不是「精通所有後端技術」，而是我已經實際走過從路由、驗證、商業邏輯到資料庫與測試的完整流程。</p>
        </div>
      </section>

      <section className="api-console-section">
        <div className="api-console-header"><span>OPENAPI / SELECTED ENDPOINTS</span><b>v0.0.4</b></div>
        <div className="api-endpoint-list">
          {endpoints.map(([method, path, description]) => (
            <div key={`${method}-${path}`}>
              <strong>{method}</strong><code>{path}</code><span>{description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="case-pillars">
        <p className="section-number">SYSTEM THINKING / 02</p>
        <div className="case-pillar-list">
          <article><span>01</span><h3>AUTHENTICATION</h3><p>使用 JWT Bearer Token 保護需要登入的操作，並區分未登入與權限不足。</p></article>
          <article><span>02</span><h3>DATA &amp; RULES</h3><p>以 PostgreSQL、外鍵、JOIN 與參數化查詢處理使用者和社群互動資料。</p></article>
          <article><span>03</span><h3>VERIFICATION</h3><p>透過 Mocha、Supertest 與 Sinon 驗證成功、輸入錯誤、權限及資料不存在等情境。</p></article>
        </div>
      </section>

      <section className="case-tech">
        <p className="section-number">STACK / 03</p>
        <div><h2>BUILT AS A SYSTEM.</h2><p>專案將 HTTP 請求拆成 Router、驗證 middleware、商業邏輯與資料存取層，並以 OpenAPI 文件和 Docker 環境補足交付與溝通。</p></div>
        <ul>
          <li>JavaScript</li><li>Node.js</li><li>Express</li><li>PostgreSQL</li><li>JWT</li><li>Joi</li><li>Mocha / Supertest</li><li>Docker</li>
        </ul>
      </section>

      <section className="case-next">
        <p className="section-number">NEXT PROJECT</p>
        <Link href="/works/mcp-server"><span>03</span><h2>MCP TRIP SERVER</h2><b>↗</b></Link>
      </section>
    </main>
  );
}
