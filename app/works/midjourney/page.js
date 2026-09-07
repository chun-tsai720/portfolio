import FutureDiscipline from "@/components/FutureDiscipline";

export const metadata = { title: "Midjourney 生成影像" };

export default function MidjourneyPage() {
  return (
    <FutureDiscipline
      eyebrow="02 / GENERATIVE ART"
      title="MIDJOURNEY"
      label="生成影像"
      description="這個展區已預留給角色設計、概念場景與 Prompt 實驗。之後放入作品時，可以沿用資料夾自動產生系列與作品頁。"
      className="future-midjourney"
    />
  );
}
