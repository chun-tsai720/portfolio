import { redirect } from "next/navigation";
import { ROCK_ARCHIVE_PATH } from "@/lib/site";

export default function BandsRedirect() {
  redirect(ROCK_ARCHIVE_PATH);
}
