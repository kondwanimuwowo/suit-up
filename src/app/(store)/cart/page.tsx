"use client";

import Link from "next/link";
import { CATALOG, fmt } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import { IconArrow } from "@/components/ui/Icons";

export default function CartPage() {
  const { lines, removeFromCart, updateQty } = useCart();

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const total = subtotal;

  if (lines.length === 0) {
    return (
      <main className="su-cart">
        <div className="su-cart-head">
          <h1 className="su-display su-display--plp">The Bag</h1>
        </div>
        <div className="su-cart-empty">
          <div className="su-cart-empty-mark">⊘</div>
          <div className="su-cart-empty-h">Your bag is empty.</div>
          <p>
            Nothing has caught your eye yet. Start with the season&apos;s six suits,
            or our small selection of accessories.
          </p>
          <div className="su-cart-empty-cta">
            <Link href="/collection/suits" className="su-btn su-btn--ink" style={{ textDecoration: "none" }}>
              Shop suits <IconArrow />
            </Link>
            <Link href="/" className="su-link" style={{ textDecoration: "none" }}>
              Return home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="su-cart">
      <div className="su-cart-head">
        <div className="su-breadcrumbs">
          <Link href="/" style={{ textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span>Bag</span>
        </div>
        <h1 className="su-display su-display--plp">The Bag</h1>
        <p className="su-lede">
          {lines.length} {lines.length === 1 ? "piece" : "pieces"} held for you.
        </p>
      </div>

      <div className="su-cart-body">
        {/* Line items */}
        <div className="su-cart-lines">
          <div className="su-cart-line-hd">
            <span>Piece</span>
            <span>Qty</span>
            <span>Total</span>
          </div>

          {lines.map((l) => {
            const p = CATALOG.find((c) => c.id === l.productId);
            if (!p) return null;
            return (
              <div className="su-cart-line" key={l.id}>
                <div className="su-cart-line-prod">
                  <div className="su-cart-thumb">
                    <ImagePlaceholder product={p} ratio={5 / 4} />
                  </div>
                  <div className="su-cart-line-info">
                    <div className="su-eyebrow">{p.cat.toUpperCase()}</div>
                    <div className="su-cart-line-name">{p.name}</div>
                    <div className="su-cart-line-sub">{p.subtitle}</div>
                    <div className="su-cart-line-meta">
                      <span>Size {l.size}</span>
                      <span>·</span>
                      <span>{p.color}</span>
                    </div>
                    <button
                      className="su-link su-cart-remove"
                      onClick={() => removeFromCart(l.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="su-cart-qty">
                  <button
                    onClick={() => updateQty(l.id, l.qty - 1)}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span>{l.qty}</span>
                  <button
                    onClick={() => updateQty(l.id, l.qty + 1)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                <div className="su-cart-line-total">{fmt(p.price * l.qty)}</div>
              </div>
            );
          })}

          <div className="su-cart-foot-actions">
            <Link href="/collection/all" className="su-link" style={{ textDecoration: "none" }}>
              ← Continue shopping
            </Link>
            <button className="su-link">Save bag for later</button>
          </div>
        </div>

        {/* Summary */}
        <aside className="su-cart-summary">
          <div className="su-cart-summary-hd">Order summary</div>
          <div className="su-cart-summary-row">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="su-cart-summary-row">
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <div className="su-cart-summary-row">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="su-cart-summary-rule" />
          <div className="su-cart-summary-row su-cart-summary-row--total">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          <Link
            href="/checkout"
            className="su-btn su-btn--ink su-btn--lg su-cart-checkout"
            style={{ textDecoration: "none" }}
          >
            Proceed to checkout <IconArrow />
          </Link>

          <div className="su-cart-promo">
            <input placeholder="Promotional code" />
            <button>Apply</button>
          </div>

          <div className="su-cart-perks">
            <div><span>—</span><span>Complimentary nationwide shipping</span></div>
            <div><span>—</span><span>Alterations for life, at any workshop</span></div>
            <div><span>—</span><span>30-day returns on ready-to-wear</span></div>
          </div>

          <div className="su-cart-pay">
            <span>We accept</span>
            <div className="su-cart-pay-row">
              <span>VISA</span>
              <span>MC</span>
              <span>AIRTEL</span>
              <span>MTN</span>
              <span>ZANACO</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
