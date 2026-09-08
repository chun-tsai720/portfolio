import PhotoCollectionIndex from "@/components/PhotoCollectionIndex";
import { getPhotoCollection } from "@/lib/photoCollections";

export const metadata = { title: "MOTOR 機車攝影" };

export default function MotorPage() {
  return <PhotoCollectionIndex catalog={getPhotoCollection("motor")} />;
}
