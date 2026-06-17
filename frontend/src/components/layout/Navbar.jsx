"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Sectors", href: "#sectors" },
  { label: "Why OneTapGOV", href: "#why-onetapgov" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="landing-navbar" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: scrolled
        ? "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(37,99,235,0.92) 58%, rgba(20,136,166,0.9) 100%)"
        : "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(37,99,235,0.84) 58%, rgba(20,136,166,0.78) 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.18)",
      boxShadow: scrolled ? "0 12px 32px rgba(15,23,42,0.14)" : "0 8px 28px rgba(15,23,42,0.1)",
      backdropFilter: "blur(12px)",
      transition: "all 250ms ease",
    }}>
      <div className="landing-navbar__inner" style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#fff", letterSpacing: "0" }}>
            OneTap
          </span>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--teal-light)", letterSpacing: "0" }}>
            GOV
          </span>
        </Link>

        {/* Nav links */}
        <div className="landing-navbar__links" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "rgba(255,255,255,0.82)",
              textDecoration: "none",
              transition: "color 150ms",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.82)"}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth */}
        <div className="landing-navbar__auth" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <Button variant="secondary" href="/login">Log in</Button>
          <Button variant="primary" href="/signup">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}