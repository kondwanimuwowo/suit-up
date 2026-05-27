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
  const [size, setSize] = useState<string | null>(null);
  const [open, setOpen] = useState({ details: true, fit: false, ship: false });
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <main className="su-pdp">
        <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
          <div className="su-h2">Product not found.</div>
          <Link href="/collection/all" className="su-link" style={{ textDecoration: "none" }}>
            Browse the atelier <IconArrow />
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
          <ImagePlaceholder product={product} ratio={5 / 4} imageIndex={0} label={`${product.color} · view 01`} />
          <div className="su-pdp-thumbs">
            <ImagePlaceholder product={product} ratio={1} imageIndex={1} label="02" />
            <ImagePlaceholder product={product} ratio={1} imageIndex={2} label="03" />
            <ImagePlaceholder product={product} ratio={1} imageIndex={3} label="detail" />
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
            <button className="su-btn su-btn--ghost">Book a fitting instead</button>
          </div>

          {/* Trust */}
          <div className="su-pdp-trust">
            <div><span className="su-trust-h">Complimentary</span><span>nationwide shipping</span></div>
            <div><span className="su-trust-h">Altered for life</span><span>in our workshops</span></div>
            <div><span className="su-trust-h">Ships in</span><span>5—7 days</span></div>
          </div>

          {/* Accordions */}
          {([
            {
              key: "details" as const,
              label: "The cloth & make",
              body: (
                <dl className="su-spec">
                  <dt>Fabric</dt><dd>{product.fabric}</dd>
                  <dt>Colour</dt><dd>{product.color}</dd>
                  <dt>Make</dt><dd>{product.origin}</dd>
                  <dt>Lining</dt><dd>Bemberg cupro, full body</dd>
                  <dt>Construction</dt><dd>Half-canvas, hand-finished</dd>
                </dl>
              ),
            },
            {
              key: "fit" as const,
              label: "Fit & sizing",
              body: (
                <>
                  <p>{product.fit}. Our modern fit is cut for a clean shoulder with mild
                    waist suppression. Trousers sit at the natural waist with a 7&Prime; leg opening.</p>
                  <p className="su-fine">
                    If you&apos;re between sizes, we recommend sizing up and bringing it to your
                    nearest workshop for a complimentary alteration.
                  </p>
                </>
              ),
            },
            {
              key: "ship" as const,
              label: "Shipping & returns",
              body: (
                <>
                  <p>Complimentary nationwide delivery. Ready-to-wear orders dispatched within
                    five to seven working days from our Lusaka workshop.</p>
                  <p>Returns are accepted within 30 days, in original condition.</p>
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
