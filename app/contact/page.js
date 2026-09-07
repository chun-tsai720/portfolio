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
        <p className="eyebrow">PROJECTS / COLLABORATIONS / COMMISSIONS</p>
        <h1>LET&apos;S MAKE<br />SOMETHING<br />VISIBLE.</h1>
      </header>
      <section className="contact-content">
        <div>
          <p className="section-number">CONTACT</p>
          <h2>攝影委託、生成視覺、VJ 演出或其他合作，都可以從這裡開始。</h2>
          <p>聯絡資料確認後，只需要修改一個設定檔，這裡就會自動變成可點擊的 Email 與社群連結。</p>
        </div>
        <div className="contact-list">
          <ContactItem
            label="EMAIL"
            value={siteInfo.email}
            href={siteInfo.email ? `mailto:${siteInfo.email}` : ""}
            placeholder="尚未提供聯絡信箱"
          />
          <ContactItem
            label="INSTAGRAM"
            value={siteInfo.instagram}
            href={siteInfo.instagram}
            placeholder="尚未提供 Instagram"
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
