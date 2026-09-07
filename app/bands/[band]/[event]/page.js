import { redirect } from "next/navigation";
import { ROCK_ARCHIVE_PATH } from "@/lib/site";

export default async function EventPage({ params }) {
  const { band, event } = await params;
  redirect(`${ROCK_ARCHIVE_PATH}/${band}/${event}`);
}
