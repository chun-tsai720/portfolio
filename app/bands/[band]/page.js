import { redirect } from "next/navigation";
import { ROCK_ARCHIVE_PATH } from "@/lib/site";

export default async function BandPage({ params }) {
  redirect(`${ROCK_ARCHIVE_PATH}/${(await params).band}`);
}
