import Link from "next/link";
import { siteInfo } from "@/lib/site";

export const metadata = { title: "聯絡方式" };

function ContactItem({ label, value, href, placeholder }) {
  const content = (
    <>
      <span>{label}</span>
      <strong>{value || placeholder}</strong>
      <b>{href ? "↗" : "待填"}</b>
    </>
  );
  return href
    ? <a className="contact-row" href={href}>{content}</a>
    : <div className="contact-row is-placeholder">{content}</div>;
}

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-title">
        <p className="eyebrow">PROJECTS / COLLABORATIONS / CONVERSATIONS</p>
        <h1>LET&apos;S BUILD<br />THE WHOLE<br />EXPERIENCE.</h1>
      </header>
      <section className="contact-content">
        <div>
          <p className="section-number">CONTACT</p>
          <h2>如果你正在尋找能理解視覺，也願意把技術真正做進體驗裡的合作夥伴，可以從這裡開始。</h2>
          <p>開放科技藝術、應用設計、互動網站、視覺內容、影像創作與跨域專案合作。</p>
        </div>
        <div className="contact-list">
          <ContactItem
            label="EMAIL"
            value={siteInfo.email}
            href={siteInfo.email ? `mailto:${siteInfo.email}` : ""}
            placeholder="尚未提供聯絡信箱"
          />
          <ContactItem
            label="PHONE"
            value={siteInfo.phone}
            href={`tel:${siteInfo.phoneHref}`}
            placeholder="尚未提供電話"
          />
          <div className="contact-row">
            <span>BASED IN</span>
            <strong>{siteInfo.location}</strong>
            <b>GMT+8</b>
          </div>
        </div>
      </section>
      <Link className="round-link contact-work-link" href="/works">VIEW<br />WORKS ↗</Link>
    </main>
  );
}
