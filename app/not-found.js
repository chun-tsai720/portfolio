import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / FRAME NOT FOUND</p>
      <h1>THE LIGHT<br />MOVED ON.</h1>
      <Link className="text-link" href="/bands">BACK TO ARCHIVE →</Link>
    </main>
  );
}
