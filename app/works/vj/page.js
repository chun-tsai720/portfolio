import FutureDiscipline from "@/components/FutureDiscipline";

export const metadata = { title: "VJ 即時視覺" };

export default function VjPage() {
  return (
    <FutureDiscipline
      eyebrow="A03 / EXPLORATION / LIVE VISUALS"
      title="VJ"
      label="即時視覺"
      description="正在發展中的動態影像、舞台視覺與即時演出實驗。這裡會在實際作品與紀錄累積後逐步開放，不把學習中的方向提前包裝成成熟服務。"
      className="future-vj"
      statusLabel="EXPLORATION"
      status="IN DEVELOPMENT"
    />
  );
}
