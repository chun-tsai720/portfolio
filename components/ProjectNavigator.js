"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigationGroups = [
  {
    label: "FEATURED PROJECTS",
    options: [
      { label: "LUMIN / 映光", href: "/works/lumin" },
      { label: "SOCIAL MEDIA API", href: "/works/social-media-api" },
      { label: "MCP TRIP SERVER", href: "/works/mcp-server" },
    ],
  },
  {
    label: "VISUAL PRACTICE",
    options: [
      { label: "PHOTOGRAPHY / 攝影總覽", href: "/works/photography" },
      { label: "ROCK ARCHIVE", href: "/works/photography/rock" },
      { label: "MOTOR", href: "/works/photography/motor" },
      { label: "PORTRAIT", href: "/works/photography/portrait" },
      { label: "MIDJOURNEY", href: "/works/midjourney" },
      { label: "VJ / LIVE VISUALS", href: "/works/vj" },
    ],
  },
];

const allDestinations = navigationGroups.flatMap((group) => group.options);

export default function ProjectNavigator({ backHref = "/works", backLabel = "ALL PROJECTS" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const currentProject = useMemo(
    () => [...allDestinations]
      .sort((a, b) => b.href.length - a.href.length)
      .find((option) => pathname === option.href || pathname.startsWith(`${option.href}/`)),
    [pathname],
  );

  function handleChange(event) {
    const href = event.target.value;
    setDestination(href);
    if (href) router.push(href);
  }

  return (
    <section className="project-navigator" aria-labelledby="project-navigator-title">
      <p className="section-number">PROJECT INDEX</p>
      <div className="project-navigator-content">
        <p className="project-navigator-current">
          CURRENT / <span>{currentProject?.label || "PROJECT"}</span>
        </p>
        <h2 id="project-navigator-title">前往其他專案</h2>
        <label className="project-select">
          <span>SELECT A PROJECT</span>
          <select value={destination} onChange={handleChange} aria-label="選擇前往的專案">
            <option value="" disabled>選擇專案或作品分類</option>
            <option value="/works">ALL PROJECTS / 專案總覽</option>
            {navigationGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.href} value={option.href}>{option.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <b aria-hidden="true">⌄</b>
        </label>
        <Link className="project-navigator-back" href={backHref}>← BACK TO {backLabel}</Link>
      </div>
    </section>
  );
}
