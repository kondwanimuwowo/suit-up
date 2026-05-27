"use client";

import Link from "next/link";
import { IconArrow } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="su-footer">
      <div className="su-footer-grid">
        <div className="su-footer-brand">
          <div className="su-footer-logo">Suit Up</div>
          <div className="su-footer-tag">
            Style. Service. Quality. Price.<br />
            Formal wear for the Zambian professional.
          </div>
          <div className="su-footer-contact">
            <a href="tel:+260773960536">+260 773 960 536</a>
            <a href="mailto:sales@suitupzambia.com">sales@suitupzambia.com</a>
          </div>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">Shop</div>
          <Link href="/collection/suits" style={{ textDecoration: "none" }}>Suits</Link>
          <Link href="/collection/shirts" style={{ textDecoration: "none" }}>Shirts</Link>
          <Link href="/collection/ties" style={{ textDecoration: "none" }}>Accessories</Link>
          <Link href="/collection/all" style={{ textDecoration: "none" }}>View all</Link>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">Our Stores</div>
          <span>Arcades Shopping Mall</span>
          <span>Great East Rd, Lusaka</span>
          <span style={{ marginTop: 8 }}>Mosi oa Tunya Mall</span>
          <span>Munali Rd, Lusaka</span>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">Company</div>
          <a>Our story</a>
          <a>Contact us</a>
          <a href="https://www.instagram.com/suitupzambia/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://web.facebook.com/suitupzambia" target="_blank" rel="noopener">Facebook</a>
        </div>
        <div className="su-footer-col su-footer-news">
          <div className="su-footer-h">Stay in the loop</div>
          <p>New arrivals, promotions, and style notes. Straight to your inbox.</p>
          <form className="su-news-form" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your email" />
            <button type="submit"><IconArrow /></button>
          </form>
        </div>
      </div>
      <div className="su-footer-base">
        <span>© 2026 SUITUP SOLUTIONS LIMITED. All rights reserved.</span>
        <span className="su-footer-set">
          <a>Terms</a><a>Privacy</a><a>Shipping &amp; returns</a>
        </span>
        <span className="su-footer-place">Arcades Mall · Mosi oa Tunya Mall · Lusaka</span>
      </div>
    </footer>
  );
}
