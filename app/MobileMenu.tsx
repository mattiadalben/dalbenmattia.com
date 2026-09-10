"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  function close() {
    if (menuRef.current) menuRef.current.open = false;
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
        <a href="#work" onClick={close}>Lavori</a>
        <a href="#profile" onClick={close}>Profilo</a>
        <a href="#expertise" onClick={close}>Approccio</a>
        <a href="#contact" onClick={close}>Contatti</a>
      </nav>
    </details>
  );
}
