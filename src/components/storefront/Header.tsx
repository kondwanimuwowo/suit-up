"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { IconBag, IconSearch, IconUser, IconClose, IconMenu } from "@/components/ui/Icons";

const SHOP_NAV = [
  { href: "/collection/suits",   label: "Suits" },
  { href: "/collection/shirts",  label: "Shirts" },
  { href: "/collection/shoes",   label: "Shoes" },
  { href: "/collection/ties",    label: "Accessories" },
];

const MORE_NAV = [
  { href: "/", label: "Our Story" },
  { href: "/", label: "Store Locations" },
  { href: "/", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".su-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 12);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href !== "/" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <header className={`su-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="su-header-inner">
          <Link href="/" className="su-brand" style={{ textDecoration: "none" }}>
            <Image src="/suit-up-logo.png" alt="Suit Up" width={67} height={30} priority />
          </Link>

          <nav className="su-nav">
            {SHOP_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`su-nav-link${isActive(n.href) ? " is-active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {n.label}
              </Link>
            ))}
            <span className="su-nav-divider" />
            <button className="su-nav-link">Journal</button>
            <button className="su-nav-link">Visit</button>
          </nav>

          <div className="su-header-actions">
            <button className="su-icon-btn su-nav-only" aria-label="Search"><IconSearch /></button>
            <button className="su-icon-btn su-nav-only" aria-label="Account"><IconUser /></button>
            <button
              className="su-icon-btn su-bag"
              onClick={() => router.push("/cart")}
              aria-label={`Bag${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <IconBag />
              {cartCount > 0 && (
                <span className="su-bag-count">{cartCount}</span>
              )}
            </button>
            <button
              className="su-icon-btn su-hamburger"
              aria-label={menuOpen ? "Close menu" : "Menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={"su-mnav" + (menuOpen ? " is-open" : "")} aria-hidden={!menuOpen}>
        <div className="su-mnav-inner">
          {/* Shop */}
          <div className="su-mnav-group">
            <div className="su-mnav-label">Shop</div>
            {SHOP_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={"su-mnav-link" + (isActive(n.href) ? " is-active" : "")}
                style={{ textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{n.label}</span>
                <span className="su-mnav-arrow">→</span>
              </Link>
            ))}
          </div>

          {/* More */}
          <div className="su-mnav-group">
            <div className="su-mnav-label">More</div>
            {MORE_NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="su-mnav-link su-mnav-link--secondary"
                style={{ textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{n.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="su-mnav-foot">
          <button
            className="su-btn su-btn--ink su-btn--lg"
            onClick={() => { setMenuOpen(false); router.push("/cart"); }}
          >
            View bag{cartCount > 0 ? ` · ${cartCount}` : ""}
          </button>
          <span className="su-mnav-place">Arcades Mall · Mosi oa Tunya Mall</span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="su-mnav-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
