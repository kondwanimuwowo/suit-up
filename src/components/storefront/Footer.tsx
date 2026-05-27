"use client";

import { IconArrow } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="su-footer">
      <div className="su-footer-grid">
        <div className="su-footer-brand">
          <div className="su-footer-logo">Suit Up</div>
          <div className="su-footer-tag">
            Considered tailoring,<br />quietly made in Zambia.
          </div>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">Shop</div>
          <a>Suits</a><a>Shirts</a><a>Ties</a><a>Shoes</a>
          <a>Gift cards</a>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">Service</div>
          <a>Made-to-measure</a><a>In-store appointments</a>
          <a>Alterations</a><a>Care guide</a>
        </div>
        <div className="su-footer-col">
          <div className="su-footer-h">House</div>
          <a>Our story</a><a>The workshops</a>
          <a>Journal</a><a>Contact</a>
        </div>
        <div className="su-footer-col su-footer-news">
          <div className="su-footer-h">Letters from the floor</div>
          <p>Quiet dispatches from the cutting room in Lusaka. No more than once a fortnight.</p>
          <form className="su-news-form" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your email" />
            <button type="submit"><IconArrow /></button>
          </form>
        </div>
      </div>
      <div className="su-footer-base">
        <span>© 2026 Suit Up Zambia Ltd.</span>
        <span className="su-footer-set">
          <a>Terms</a><a>Privacy</a><a>Shipping &amp; returns</a><a>Cookies</a>
        </span>
        <span className="su-footer-place">Lusaka · Ndola · Livingstone</span>
      </div>
    </footer>
  );
}
