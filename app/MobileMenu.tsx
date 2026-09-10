"use client";

import { useRef, type MouseEvent } from "react";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  function close() {
    if (menuRef.current) menuRef.current.open = false;
  }

  function navigateToSection(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const hash = event.currentTarget.hash;
    if (!hash) return;

    close();

    // Let the menu close before measuring the anchor position. This avoids a
    // competing native hash scroll on mobile browsers.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const section = document.querySelector(hash);
        if (!section) return;
        window.history.pushState(null, "", hash);
        section.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      });
    });
  }

  return (
    <details className="mobile-menu" ref={menuRef} onKeyDown={(event) => {
      if (event.key === "Escape") {
        close();
        menuRef.current?.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Menu di navigazione"><Menu size={24} /></summary>
      <nav aria-label="Navigazione mobile">
        <a href="#work" onClick={navigateToSection}>Lavori</a>
        <a href="#profile" onClick={navigateToSection}>Profilo</a>
        <a href="#expertise" onClick={navigateToSection}>Approccio</a>
        <a href="#contact" onClick={navigateToSection}>Contatti</a>
      </nav>
    </details>
  );
}
