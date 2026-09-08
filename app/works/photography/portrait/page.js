import PhotoCollectionIndex from "@/components/PhotoCollectionIndex";
import { getPhotoCollection } from "@/lib/photoCollections";

export const metadata = { title: "PORTRAIT 人像攝影" };

export default function PortraitPage() {
  return <PhotoCollectionIndex catalog={getPhotoCollection("portrait")} />;
}
