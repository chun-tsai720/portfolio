export const ROCK_ARCHIVE_PATH = "/works/photography/rock";

export function mediaUrl(pathname) {
  return pathname;
}

export const siteInfo = {
  creator: "蔡濬守",
  creatorEn: "CHUN TSAI",
  location: "TAIWAN",
  email: "jtphotography720@gmail.com",
  phone: "+886 956 310 102",
  phoneHref: "+886956310102",
  instagram: "",
};

export const featuredProjects = [
  {
    number: "01",
    slug: "lumin",
    title: "LUMIN",
    subtitle: "映光 — 沉浸式數位策展空間",
    description: "以「數位自我」為核心，整合實體攝影、AI 生成、視覺識別、展覽動線與互動網頁的畢業專題。",
    status: "GRADUATION PROJECT",
    href: "/works/lumin",
    liveUrl: "https://lumin-project.vercel.app/",
    image: "/projects/lumin/hero-gold.webp",
    tags: ["FIRST VIBE CODING", "AI", "INTERACTIVE WEB", "CURATION"],
  },
  {
    number: "02",
    slug: "social-api",
    title: "SOCIAL MEDIA API",
    subtitle: "社群平台後端系統",
    description: "以 Node.js、Express 與 PostgreSQL 建立具有驗證、貼文、留言、按讚、測試及 Docker 環境的 REST API。",
    status: "BACK-END PROJECT",
    href: "/works/social-media-api",
    visual: "api",
    tags: ["NODE.JS", "REST API", "POSTGRESQL", "TESTING"],
  },
  {
    number: "03",
    slug: "mcp-server",
    title: "MCP TRIP SERVER",
    subtitle: "AI 工具與資料服務實驗",
    description: "以 MCP Tools、Resources 與 Prompts 串接天氣資料、地點服務與 Redis 暫存，探索 AI Host 與外部系統的連結。",
    status: "COURSE EXTENSION",
    href: "/works/mcp-server",
    visual: "mcp",
    tags: ["MCP", "JAVASCRIPT", "API", "REDIS"],
  },
];

export const capabilities = [
  {
    number: "01",
    title: "VISUAL PRACTICE",
    label: "視覺創作",
    description: "攝影、生成影像、視覺敘事與長期作品整理。",
  },
  {
    number: "02",
    title: "INTERACTIVE EXPERIENCE",
    label: "互動體驗",
    description: "以網頁、動態與空間動線，讓內容成為可探索的體驗。",
  },
  {
    number: "03",
    title: "CREATIVE TECHNOLOGY",
    label: "創意技術",
    description: "JavaScript、Next.js、Node.js、API、資料庫與 AI 工具串接。",
  },
  {
    number: "04",
    title: "INTEGRATION",
    label: "跨域整合",
    description: "從概念、內容與視覺，到系統實作、測試與部署。",
  },
];

export const visualArchives = [
  {
    number: "A01",
    title: "PHOTOGRAPHY",
    label: "ROCK / MOTOR / PORTRAIT",
    description: "現場、人物與真實光線構成的長期攝影典藏。",
    href: "/works/photography",
    image: "/covers/photography.jpg",
  },
  {
    number: "A02",
    title: "GENERATIVE VISUALS",
    label: "MIDJOURNEY ARCHIVE",
    description: "從 Prompt、角色與風格實驗建立的生成影像系列。",
    href: "/works/midjourney",
    image: "/covers/midjourney.jpg",
  },
  {
    number: "A03",
    title: "VISUALS",
    label: "P5.JS / VJ",
    description: "從程式生成、互動動畫到現場影像的動態視覺實驗。",
    href: "/works/visuals",
    visual: "visuals",
  },
];

// 保留給舊版分類元件使用；目前主要入口改由代表專案與 Visual Archive 組成。
export const disciplines = [
  {
    number: "A01",
    slug: "photography",
    title: "PHOTOGRAPHY",
    label: "攝影典藏",
    description: "ROCK、MOTOR 與 Portrait 長期影像紀錄。",
    status: "EXPLORE",
    href: "/works/photography",
  },
  {
    number: "A02",
    slug: "midjourney",
    title: "GENERATIVE VISUALS",
    label: "生成影像",
    description: "由 Prompt、角色與風格實驗組成的影像系列。",
    status: "EXPLORE",
    href: "/works/midjourney",
  },
  {
    number: "A03",
    slug: "visuals",
    title: "VISUALS",
    label: "動態視覺",
    description: "P5.js 程式生成、互動動畫與即時視覺實驗。",
    status: "EXPLORE",
    href: "/works/visuals",
  },
];
