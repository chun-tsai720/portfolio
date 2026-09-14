import PhotoCollectionIndex from "@/components/PhotoCollectionIndex";
import { getMidjourneyCatalog } from "@/lib/midjourney";

export const metadata = { title: "Midjourney 生成影像" };

export default function MidjourneyPage() {
  return (
    <PhotoCollectionIndex
      catalog={getMidjourneyCatalog()}
      basePath="/works/midjourney"
      eyebrow="02 / GENERATIVE ART / MIDJOURNEY"
      itemLabel="PROMPT SERIES"
      className="midjourney-index"
    />
  );
}
