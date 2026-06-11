import Link from "next/link";
import { CATALOG } from "@/lib/data";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import ProductCard from "@/components/storefront/ProductCard";
import { IconArrow } from "@/components/ui/Icons";

export default function HomePage() {
  const featured = CATALOG.filter((p) => p.cat === "suits").slice(0, 4);
  const editorial = CATALOG.find((p) => p.id === "su-navy-contrast")!;

  const tiles = [
    { product: CATALOG.find((p) => p.id === "su-navy-contrast")!, href: "/collection/suits",  label: "Suits" },
    { product: CATALOG.find((p) => p.id === "su-grey-classic")!,  href: "/collection/suits",  label: "Three-Piece" },
    { product: CATALOG.find((p) => p.id === "su-ivory")!,         href: "/collection/suits",  label: "Wedding" },
    { product: CATALOG.find((p) => p.id === "su-navy-db")!,       href: "/collection/suits",  label: "Double-Breasted" },
  ];

  return (
    <main className="su-home">
      {/* ── Hero — Split ──────────────────────────────────── */}
      <section className="su-hero su-hero--split">
        <div className="su-hero-split-left">
          <div className="su-eyebrow">New arrivals — now in store</div>
          <h1 className="su-display">
            Dress the part.<br />
            <em>Every time.</em>
          </h1>
          <p className="su-lede">
            Turkish-crafted formal wear for the Zambian professional.
            Sharp silhouettes, quality construction, Lusaka prices.
          </p>
          <div className="su-hero-cta">
            <Link href="/collection/suits" className="su-btn su-btn--ink" style={{ textDecoration: "none" }}>
              Shop suits <IconArrow />
            </Link>
            <Link href="/collection/all" className="su-btn su-btn--ghost" style={{ textDecoration: "none" }}>
              View all
            </Link>
          </div>
          <div className="su-hero-meta">
            <div><span className="num">11</span><span>suit styles in stock</span></div>
            <div><span className="num">2</span><span>stores in Lusaka</span></div>
            <div><span className="num">K5,999</span><span>suits from</span></div>
          </div>
        </div>
        <div className="su-hero-split-grid">
          {tiles.map(({ product, href, label }, i) => (
            <Link
              key={label}
              href={href}
              className="su-split-tile"
              style={{ textDecoration: "none", display: "block" }}
            >
              <ImagePlaceholder product={product} ratio={5 / 4} priority={i === 0} />
              <span className="su-split-label">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured suits ───────────────────────────────────── */}
      <section className="su-section">
        <div className="su-section-hd">
          <div>
            <div className="su-eyebrow">In stock now</div>
            <h2 className="su-h2">The current range.</h2>
          </div>
          <Link href="/collection/suits" className="su-link" style={{ textDecoration: "none" }}>
            View all suits <IconArrow />
          </Link>
        </div>
        <div className="su-grid su-grid--4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} cardStyle="overlay" priority={i < 2} />
          ))}
        </div>
      </section>

      {/* ── Editorial callout ────────────────────────────────── */}
      <section className="su-editorial">
        <div className="su-editorial-img">
          <ImagePlaceholder product={editorial} ratio={4 / 5} />
        </div>
        <div className="su-editorial-text">
          <div className="su-eyebrow">Style. Service. Quality. Price.</div>
          <h2 className="su-h2 su-h2--alt">
            The right suit,<br />
            ready when<br />
            <em>you need it.</em>
          </h2>
          <p className="su-lede">
            Off-the-rack doesn&apos;t mean off-the-shelf. Every suit at Suit Up is selected
            for cut, colour and construction — then available the same day, in store,
            in Lusaka.
          </p>
          <div className="su-editorial-cta">
            <Link href="/collection/suits" className="su-btn su-btn--ink" style={{ textDecoration: "none" }}>
              Shop the range <IconArrow />
            </Link>
            <button className="su-link">Find our stores</button>
          </div>
        </div>
      </section>

      {/* ── Accessories ──────────────────────────────────────── */}
      <section className="su-section">
        <div className="su-section-hd">
          <div>
            <div className="su-eyebrow">Complete the look</div>
            <h2 className="su-h2">Finish the look.</h2>
          </div>
          <Link href="/collection/all" className="su-link" style={{ textDecoration: "none" }}>
            View all <IconArrow />
          </Link>
        </div>
        <div className="su-grid su-grid--3">
          {[
            CATALOG.find((p) => p.id === "su-shirt-white")!,
            CATALOG.find((p) => p.id === "su-tie-slate")!,
            CATALOG.find((p) => p.id === "su-shoe-black")!,
          ].map((p) => (
            <ProductCard key={p.id} product={p} cardStyle="overlay" />
          ))}
        </div>
      </section>

      {/* ── Why Suit Up ───────────────────────────────────────── */}
      <section className="su-notes">
        <div className="su-notes-grid">
          <div>
            <div className="su-notes-num">01</div>
            <div className="su-notes-h">Style, always.</div>
            <p>Turkish craftsmanship in contemporary silhouettes — slim Italian cuts,
              peak and notch lapels, three-piece options across the full range.</p>
          </div>
          <div>
            <div className="su-notes-num">02</div>
            <div className="su-notes-h">Service that stays.</div>
            <p>Our staff know the range and know how a suit should fit.
              Come in, try it on, leave looking right. Both stores, six days a week.</p>
          </div>
          <div>
            <div className="su-notes-num">03</div>
            <div className="su-notes-h">Quality you can see.</div>
            <p>Premium poly-blends that hold their structure, move with you, and photograph
              as well on the day as they will a year from now.</p>
          </div>
          <div>
            <div className="su-notes-num">04</div>
            <div className="su-notes-h">Price you&apos;ll respect.</div>
            <p>Complete three-piece suits from K5,999. No compromise on the look —
              just an honest price for a Lusaka wardrobe.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
