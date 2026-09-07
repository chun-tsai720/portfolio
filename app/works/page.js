import DisciplineGrid from "@/components/DisciplineGrid";
import { getBands } from "@/lib/catalog";

export const metadata = { title: "作品分類" };

export default function WorksPage() {
  const photographyCover = getBands().find((band) => band.cover)?.cover;

  return (
    <main className="works-page">
      <header className="works-title">
        <p className="eyebrow">SELECT A DISCIPLINE</p>
        <h1>WORKS</h1>
        <p>從真實光線、生成影像到即時視覺，依創作媒介進入不同展區。</p>
      </header>
      <DisciplineGrid photographyCover={photographyCover} />
    </main>
  );
}
