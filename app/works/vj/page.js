import FutureDiscipline from "@/components/FutureDiscipline";

export const metadata = { title: "VJ 即時視覺" };

export default function VjPage() {
  return (
    <FutureDiscipline
      eyebrow="03 / LIVE VISUALS"
      title="VJ"
      label="即時視覺"
      description="這個展區已預留給 VJ 演出、動態影像、舞台視覺與影音紀錄，未來可加入影片播放器、演出資訊與製作技術。"
      className="future-vj"
    />
  );
}
