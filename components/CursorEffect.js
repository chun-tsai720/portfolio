"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 7;
const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "[role='button']",
  ".photo-button",
].join(",");

export default function CursorEffect() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const cursor = cursorRef.current;
    const ring = cursor?.querySelector(".cursor-ring");
    const trail = [...(cursor?.querySelectorAll(".cursor-trail") ?? [])];
    if (!cursor || !ring || trail.length === 0) return undefined;

    document.documentElement.classList.add("cursor-enhanced");

    const pointer = { x: -100, y: -100 };
    const ringPosition = { ...pointer };
    const trailPositions = trail.map(() => ({ ...pointer }));
    let animationFrame;

    const move = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor.dataset.visible = "true";
    };

    const hover = (event) => {
      const target = event.target;
      cursor.dataset.active = target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
    };

    const press = () => {
      cursor.dataset.pressed = "true";
    };

    const release = () => {
      cursor.dataset.pressed = "false";
    };

    const hide = () => {
      cursor.dataset.visible = "false";
    };

    const animate = () => {
      ringPosition.x += (pointer.x - ringPosition.x) * 0.28;
      ringPosition.y += (pointer.y - ringPosition.y) * 0.28;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;

      trailPositions.forEach((position, index) => {
        const leader = index === 0 ? ringPosition : trailPositions[index - 1];
        const ease = Math.max(0.16, 0.34 - index * 0.025);
        position.x += (leader.x - position.x) * ease;
        position.y += (leader.y - position.y) * ease;
        trail[index].style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", hover, { passive: true });
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("cursor-enhanced");
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", hover);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div className="cursor-effect" ref={cursorRef} aria-hidden="true">
      <span className="cursor-ring" />
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <span className="cursor-trail" key={index} style={{ "--trail-index": index }} />
      ))}
    </div>
  );
}
