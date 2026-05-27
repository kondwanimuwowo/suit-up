"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import { IconArrow } from "@/components/ui/Icons";
import { fmt } from "@/lib/data";

type PayMethod = "card" | "mobile";
type Network = "airtel" | "mtn";

export default function CheckoutPage() {
  const { lines } = useCart();
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [network, setNetwork] = useState<Network>("airtel");

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const total = subtotal;

  return (
    <main className="su-co">
      <div className="su-breadcrumbs su-breadcrumbs--pdp">
        <Link href="/" style={{ textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <Link href="/cart" style={{ textDecoration: "none" }}>Bag</Link>
        <span>/</span>
        <span>Checkout</span>
      </div>

      <div className="su-co-grid">
        {/* ── Order summary ── */}
        <aside className="su-co-summary">
          <div className="su-co-sum-hd">Your order</div>

          {lines.length === 0 ? (
            <p className="su-fine" style={{ padding: "16px 0", color: "var(--su-muted)" }}>
              Your bag is empty.{" "}
              <Link href="/collection/all" style={{ color: "var(--su-accent)", textDecoration: "none" }}>
                Browse the atelier.
              </Link>
            </p>
          ) : (
            <>
              {lines.map((l) => (
                <div key={l.id} className="su-co-item">
                  <div className="su-co-item-img">
                    <ImagePlaceholder product={l.product} ratio={1} imageIndex={0} />
                  </div>
                  <div className="su-co-item-info">
                    <div className="su-co-item-name">{l.product.name}</div>
                    <div className="su-co-item-sub">{l.product.subtitle}</div>
                    <div className="su-co-item-meta">
                      Size {l.size} · Qty {l.qty}
                    </div>
                  </div>
                  <div className="su-co-item-price">{fmt(l.product.price * l.qty)}</div>
                </div>
              ))}

              <div className="su-co-sum-rows">
                <div className="su-co-sum-row">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="su-co-sum-row">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="su-co-sum-rule" />
                <div className="su-co-sum-row su-co-sum-row--total">
                  <span>Total (ZMW)</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
            </>
          )}

          <div className="su-co-sum-trust">
            <div>✓ Nationwide delivery included</div>
            <div>✓ Free alterations for life</div>
            <div>✓ 30-day returns accepted</div>
          </div>
        </aside>

        {/* ── Form ── */}
        <div className="su-co-form">
          {/* Contact */}
          <section className="su-co-sect">
            <div className="su-co-sect-hd">Contact</div>
            <div className="su-co-fields">
              <div className="su-co-field su-co-field--full">
                <label htmlFor="co-email">Email address</label>
                <input id="co-email" type="email" placeholder="you@example.com" autoComplete="email" />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="su-co-sect">
            <div className="su-co-sect-hd">Delivery</div>
            <div className="su-co-fields">
              <div className="su-co-field">
                <label htmlFor="co-fname">First name</label>
                <input id="co-fname" type="text" placeholder="Chanda" autoComplete="given-name" />
              </div>
              <div className="su-co-field">
                <label htmlFor="co-lname">Last name</label>
                <input id="co-lname" type="text" placeholder="Mwewa" autoComplete="family-name" />
              </div>
              <div className="su-co-field su-co-field--full">
                <label htmlFor="co-addr">Street address</label>
                <input id="co-addr" type="text" placeholder="Plot 123, Cairo Road" autoComplete="street-address" />
              </div>
              <div className="su-co-field">
                <label htmlFor="co-city">City</label>
                <input id="co-city" type="text" placeholder="Lusaka" autoComplete="address-level2" />
              </div>
              <div className="su-co-field">
                <label htmlFor="co-postal">Postal code</label>
                <input id="co-postal" type="text" placeholder="10101" autoComplete="postal-code" />
              </div>
              <div className="su-co-field su-co-field--full">
                <label htmlFor="co-province">Province</label>
                <select id="co-province">
                  <option>Lusaka Province</option>
                  <option>Copperbelt Province</option>
                  <option>Southern Province</option>
                  <option>Eastern Province</option>
                  <option>Western Province</option>
                  <option>Northern Province</option>
                  <option>North-Western Province</option>
                  <option>Central Province</option>
                  <option>Muchinga Province</option>
                  <option>Luapula Province</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="su-co-sect">
            <div className="su-co-sect-hd">Payment</div>
            <div className="su-co-pay-tabs">
              <button
                className={"su-co-tab" + (payMethod === "card" ? " is-active" : "")}
                onClick={() => setPayMethod("card")}
              >
                Card
              </button>
              <button
                className={"su-co-tab" + (payMethod === "mobile" ? " is-active" : "")}
                onClick={() => setPayMethod("mobile")}
              >
                Mobile Money
              </button>
            </div>

            {payMethod === "card" ? (
              <div className="su-co-fields">
                <div className="su-co-field su-co-field--full">
                  <label htmlFor="co-card">Card number</label>
                  <input id="co-card" type="text" placeholder="1234 5678 9012 3456" inputMode="numeric" />
                </div>
                <div className="su-co-field">
                  <label htmlFor="co-expiry">Expiry</label>
                  <input id="co-expiry" type="text" placeholder="MM / YY" />
                </div>
                <div className="su-co-field">
                  <label htmlFor="co-cvc">CVC</label>
                  <input id="co-cvc" type="text" placeholder="123" inputMode="numeric" />
                </div>
                <div className="su-co-field su-co-field--full">
                  <label htmlFor="co-cname">Name on card</label>
                  <input id="co-cname" type="text" placeholder="Chanda Mwewa" autoComplete="cc-name" />
                </div>
                <div className="su-co-pay-logos">
                  <span>VISA</span>
                  <span>MC</span>
                  <span>ZANACO</span>
                  <span>ABSA</span>
                </div>
              </div>
            ) : (
              <div className="su-co-fields">
                <div className="su-co-field su-co-field--full">
                  <label>Network</label>
                  <div className="su-co-network">
                    <button
                      className={"su-co-net" + (network === "airtel" ? " is-active" : "")}
                      onClick={() => setNetwork("airtel")}
                    >
                      Airtel Money
                    </button>
                    <button
                      className={"su-co-net" + (network === "mtn" ? " is-active" : "")}
                      onClick={() => setNetwork("mtn")}
                    >
                      MTN MoMo
                    </button>
                  </div>
                </div>
                <div className="su-co-field su-co-field--full">
                  <label htmlFor="co-phone">Mobile number</label>
                  <input id="co-phone" type="tel" placeholder="+260 97 123 4567" autoComplete="tel" />
                </div>
                <p className="su-fine su-co-field--full" style={{ margin: 0 }}>
                  A payment prompt will be sent to your phone. Ensure your mobile money account
                  has sufficient balance before proceeding.
                </p>
              </div>
            )}
          </section>

          <button
            className="su-btn su-btn--ink su-btn--lg"
            style={{ marginTop: 8 }}
            disabled={lines.length === 0}
          >
            Place order{lines.length > 0 ? ` — ${fmt(total)}` : ""} <IconArrow />
          </button>

          <p className="su-fine" style={{ marginTop: 10, textAlign: "center" }}>
            Orders dispatched within 5–7 working days from our Lusaka workshop.
            Free alterations for the life of the garment.
          </p>
        </div>
      </div>
    </main>
  );
}
