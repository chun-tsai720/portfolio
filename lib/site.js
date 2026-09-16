export const ROCK_ARCHIVE_PATH = "/works/photography/rock";

export function mediaUrl(pathname) {
  return pathname;
}

export const siteInfo = {
  creator: "蔡濬守",
  creatorEn: "CHUN TSAI",
  location: "TAIWAN",
  // 確認真實資料後填入；頁面會自動把待填狀態換成可點擊連結。
  email: "",
  instagram: "",
};

export const disciplines = [
  {
    number: "01",
    slug: "photography",
    title: "PHOTOGRAPHY",
    label: "攝影",
    description: "現場、人物與真實光線留下的瞬間。",
    status: "EXPLORE",
    href: "/works/photography",
  },
  {
    number: "02",
    slug: "midjourney",
    title: "MIDJOURNEY",
    label: "生成影像",
    description: "從 Prompt 出發，建構不存在的角色與世界。",
    status: "EXPLORE",
    href: "/works/midjourney",
  },
  {
    number: "03",
    slug: "vj",
    title: "VJ / LIVE VISUALS",
    label: "即時視覺",
    description: "讓影像回應聲音、空間與現場節奏。",
    status: "COMING SOON",
    href: "/works/vj",
  },
];
