"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATALOG, SIZES, fmt } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import ProductCard from "@/components/storefront/ProductCard";
import { IconArrow, IconPlus, IconMinus } from "@/components/ui/Icons";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = CATALOG.find((p) => p.id === id);

  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [open, setOpen] = useState({ details: true, fit: false, ship: false });
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <main className="su-pdp">
        <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
          <div className="su-h2">Product not found.</div>
          <Link href="/collection/all" className="su-link" style={{ textDecoration: "none" }}>
            Browse all suits <IconArrow />
          </Link>
        </div>
      </main>
    );
  }

  const sizes = SIZES[product.cat] ?? ["One Size"];
  const related = CATALOG.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);
  const sizeNeeded = !size && sizes.length > 1;

  const add = () => {
    if (sizeNeeded) return;
    addToCart(product, size ?? sizes[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const toggleAcc = (key: keyof typeof open) =>
    setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <main className="su-pdp">
      <div className="su-breadcrumbs su-breadcrumbs--pdp">
        <Link href="/" style={{ textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <Link href={`/collection/${product.cat}`} style={{ textDecoration: "none" }}>
          {product.cat[0].toUpperCase() + product.cat.slice(1)}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="su-pdp-grid">
        {/* Gallery */}
        <div className="su-pdp-gallery">
          <ImagePlaceholder product={product} ratio={5 / 4} imageIndex={activeImg} priority={activeImg === 0} label={`${product.color} · view ${String(activeImg + 1).padStart(2, "0")}`} />
          <div className="su-pdp-thumbs">
            {[1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                className={"su-pdp-thumb" + (activeImg === idx ? " is-active" : "")}
                onClick={() => setActiveImg(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <ImagePlaceholder product={product} ratio={1} imageIndex={idx} />
              </button>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <aside className="su-pdp-info">
          <div className="su-eyebrow">{product.cat.toUpperCase()} · {product.color}</div>
          <h1 className="su-pdp-name">{product.name}</h1>
          <div className="su-pdp-sub">{product.subtitle}</div>
          <div className="su-pdp-price">{fmt(product.price)}</div>

          <p className="su-pdp-desc">{product.description}</p>

          {/* Size selector */}
          {sizes.length > 1 && (
            <div className="su-pdp-sizes">
              <div className="su-pdp-sizes-hd">
                <span className="su-pdp-h">Size</span>
                <button className="su-link su-pdp-size-help">Size guide</button>
              </div>
              <div className="su-size-grid">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={"su-size" + (size === s ? " is-active" : "")}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeNeeded && (
                <div className="su-size-hint">Choose a size to continue.</div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="su-pdp-actions">
            <button
              className={"su-btn su-btn--ink su-btn--lg" + (justAdded ? " is-done" : "")}
              onClick={add}
              disabled={sizeNeeded}
            >
              {justAdded ? "Added to bag ✓" : (
                <>Add to bag — {fmt(product.price)} <IconArrow /></>
              )}
            </button>
            <button className="su-btn su-btn--ghost">Visit us in store</button>
          </div>

          {/* Trust */}
          <div className="su-pdp-trust">
            <div><span className="su-trust-h">Nationwide</span><span>delivery available</span></div>
            <div><span className="su-trust-h">In-store</span><span>try before you buy</span></div>
            <div><span className="su-trust-h">Both stores</span><span>open 6 days/week</span></div>
          </div>

          {/* Accordions */}
          {([
            {
              key: "details" as const,
              label: "Details & fabric",
              body: (
                <dl className="su-spec">
                  <dt>Fabric</dt><dd>{product.fabric}</dd>
                  <dt>Colour</dt><dd>{product.color}</dd>
                  <dt>Origin</dt><dd>{product.origin}</dd>
                  <dt>Includes</dt><dd>{product.fit}</dd>
                </dl>
              ),
            },
            {
              key: "fit" as const,
              label: "Fit & sizing",
              body: (
                <>
                  <p>Turkish slim fit — a clean shoulder line with a tailored chest and a slim
                    leg. European sizing: measure your chest in cm and select the nearest size.</p>
                  <p className="su-fine">
                    Not sure of your size? Visit either of our Lusaka stores and our staff
                    will help you find the right fit before you buy.
                  </p>
                </>
              ),
            },
            {
              key: "ship" as const,
              label: "Delivery & returns",
              body: (
                <>
                  <p>Available for collection same-day from our Arcades Mall or Mosi oa
                    Tunya Mall stores. Nationwide delivery also available — contact us on
                    +260 773 960 536 or sales@suitupzambia.com to arrange.</p>
                  <p>Returns accepted within 14 days in original, unworn condition.</p>
                </>
              ),
            },
          ] as const).map((s) => (
            <div key={s.key} className={"su-acc" + (open[s.key] ? " is-open" : "")}>
              <button className="su-acc-hd" onClick={() => toggleAcc(s.key)}>
                <span>{s.label}</span>
                <span className="su-acc-ind">
                  {open[s.key] ? <IconMinus /> : <IconPlus />}
                </span>
              </button>
              {open[s.key] && <div className="su-acc-body">{s.body}</div>}
            </div>
          ))}
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="su-section">
          <div className="su-section-hd">
            <div>
              <div className="su-eyebrow">Also of note</div>
              <h2 className="su-h2">Worn with this.</h2>
            </div>
          </div>
          <div className="su-grid su-grid--3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} cardStyle="minimal" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
