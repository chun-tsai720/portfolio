import Image from "next/image";
import Link from "next/link";
import ProjectNavigator from "@/components/ProjectNavigator";

export const metadata = {
  title: "LUMIN 映光",
  description: "結合實體攝影、AI 生成、視覺識別、策展動線與互動網頁的沉浸式數位策展畢業專題。",
};

const projectMeta = [
  ["TYPE", "GRADUATION PROJECT"],
  ["ROLE", "CONCEPT / VISUAL / WEB"],
  ["METHOD", "FIRST VIBE CODING WORK"],
  ["STATUS", "BUILT EXPERIENCE"],
];

const projectLinks = [
  {
    label: "OPEN LUMIN",
    detail: "LIVE EXPERIENCE",
    href: "https://lumin-project.vercel.app/",
  },
];

export default function LuminPage() {
  return (
    <main className="case-page lumin-case">
      <section className="case-hero">
        <Image
          src="/projects/lumin/logo.webp"
          alt="LUMIN 映光黑金立體識別標誌"
          fill
          priority
          sizes="100vw"
        />
        <div className="case-hero-shade" />
        <div className="case-hero-copy">
          <Link className="back-link" href="/works">← ALL PROJECTS</Link>
          <p className="eyebrow">01 / GRADUATION PROJECT / FIRST VIBE CODING WORK</p>
          <h1>LUMIN<br /><span>映光</span></h1>
          <p>從實體攝影到數位自我，一座結合藝術、策展與互動技術的沉浸式展覽空間。</p>
          <div className="case-hero-actions" aria-label="LUMIN 專案連結">
            {projectLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                <span>{link.label}</span>
                <small>{link.detail}</small>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="case-meta">
        {projectMeta.map(([label, value]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </section>

      <section className="case-intro">
        <p className="section-number">THE PROJECT / 01</p>
        <div>
          <h2>作品集不只是容器，<br />它本身也可以是一件作品。</h2>
          <p>LUMIN 以「數位自我」為核心，將我過去的實體攝影、生成式影像、視覺識別與網頁互動重新組織成一座可被探索的虛擬策展空間。</p>
          <p>它同時是我的畢業專題，也是第一個 Vibe Coding 作品。這次實作讓我第一次把視覺概念、資訊架構與程式生成流程放在同一個專案中，並逐步學會檢查、調整與部署一個真正能運作的網站。</p>
          <p>「映光」指向攝影中清楚勾勒輪廓的光；Lumin 則代表螢幕、網路與數位場域裡的冷光。兩者之間的折射，形成實體經驗與數位分身的雙重敘事。</p>
        </div>
      </section>

      <section className="case-media-wide">
        <Image
          src="/projects/lumin/concept.webp"
          alt="LUMIN 映光與數位光的雙重隱喻"
          width={1600}
          height={893}
          sizes="(max-width: 800px) 100vw, 92vw"
        />
      </section>

      <section className="case-pillars">
        <p className="section-number">INTEGRATION / 02</p>
        <div className="case-pillar-list">
          <article>
            <span>01</span>
            <h3>PHYSICAL IMAGE</h3>
            <p>從攝影經驗與實體影像出發，以光、人物、現場和不同觀看狀態建立作品內容。</p>
          </article>
          <article>
            <span>02</span>
            <h3>DIGITAL IDENTITY</h3>
            <p>透過生成式影像與視覺識別，把作品轉譯成具有統一世界觀的數位分身。</p>
          </article>
          <article>
            <span>03</span>
            <h3>INTERACTIVE SPACE</h3>
            <p>以入口、大廳、實與虛展區設計觀展動線，讓網站成為可自由探索的數位建築。</p>
          </article>
        </div>
      </section>

      <section className="case-flow">
        <div className="case-flow-image">
          <Image
            src="/projects/lumin/flow.webp"
            alt="LUMIN 虛擬展廳體驗與空間流程"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
        </div>
        <div className="case-flow-copy">
          <p className="section-number">EXPERIENCE / 03</p>
          <h2>FROM ENTRY<br />TO EXPLORATION.</h2>
          <p>觀眾從入口認識創作者，再進入 Hub，分流至實體攝影與虛擬生成兩條路徑。每個展區不只是圖庫，而是對應不同情緒、媒材與自我切片的觀看空間。</p>
          <div className="case-route" aria-label="LUMIN 體驗路徑">
            <span>ENTRANCE</span><i>→</i><span>HUB</span><i>→</i><span>REAL / VIRTUAL</span><i>→</i><span>GALLERY</span>
          </div>
        </div>
      </section>

      <section className="case-tech">
        <p className="section-number">IMPLEMENTATION / 04</p>
        <div>
          <h2>CONCEPT TO SYSTEM.</h2>
          <p>專案從概念研究、命名與識別，延伸到資訊架構、互動流程與可運作的網站實作。它是我的第一個 Vibe Coding 作品；現有版本以 JavaScript 與 Next.js 建立，並使用 React Three Fiber、Three.js 與 Framer Motion 發展 3D 場景和動態轉場。</p>
        </div>
        <ul>
          <li>Creative Direction</li>
          <li>Visual Identity</li>
          <li>Photography</li>
          <li>Generative Visuals</li>
          <li>Information Architecture</li>
          <li>Vibe Coding Workflow</li>
          <li>JavaScript / Next.js</li>
          <li>3D Web Experience</li>
          <li>Deployment</li>
        </ul>
      </section>

      <ProjectNavigator />
    </main>
  );
}
