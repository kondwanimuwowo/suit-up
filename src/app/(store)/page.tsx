import Link from "next/link";
import { CATALOG } from "@/lib/data";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import ProductCard from "@/components/storefront/ProductCard";
import { IconArrow } from "@/components/ui/Icons";

export default function HomePage() {
  const featured = CATALOG.filter((p) => p.cat === "suits").slice(0, 4);
  const editorial = CATALOG.find((p) => p.id === "s-glenmore")!;
  const tie = CATALOG.find((p) => p.id === "t-silk-burgundy")!;
  const shoe = CATALOG.find((p) => p.id === "sh-belmont")!;

  const tiles = [
    { product: CATALOG.find((p) => p.id === "s-westbrook")!, href: "/collection/suits", label: "Suits" },
    { product: CATALOG.find((p) => p.id === "sh-oxford")!, href: "/collection/shirts", label: "Shirts" },
    { product: CATALOG.find((p) => p.id === "t-silk-burgundy")!, href: "/collection/ties", label: "Ties" },
    { product: CATALOG.find((p) => p.id === "sh-belmont")!, href: "/collection/shoes", label: "Shoes" },
  ];

  return (
    <main className="su-home">
      {/* ── Hero — Split ──────────────────────────────────── */}
      <section className="su-hero su-hero--split">
        <div className="su-hero-split-left">
          <div className="su-eyebrow">Autumn — Winter 26</div>
          <h1 className="su-display">
            A wardrobe<br />
            built quietly,<br />
            <em>worn for years.</em>
          </h1>
          <p className="su-lede">
            Half-canvas tailoring in English wools, Italian shirtings,
            Northampton shoemaking. Made in small runs from our Lusaka workshop.
          </p>
          <div className="su-hero-cta">
            <Link href="/collection/suits" className="su-btn su-btn--ink" style={{ textDecoration: "none" }}>
              Shop the season <IconArrow />
            </Link>
            <button className="su-btn su-btn--ghost">Book a fitting</button>
          </div>
          <div className="su-hero-meta">
            <div><span className="num">38</span><span>fittings this month</span></div>
            <div><span className="num">6 wk</span><span>MTM lead time</span></div>
            <div><span className="num">K0</span><span>alterations, for life</span></div>
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
            <div className="su-eyebrow">The Season</div>
            <h2 className="su-h2">Six suits, considered.</h2>
          </div>
          <Link href="/collection/suits" className="su-link" style={{ textDecoration: "none" }}>
            View all <IconArrow />
          </Link>
        </div>
        <div className="su-grid su-grid--4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} cardStyle="overlay" />
          ))}
        </div>
      </section>

      {/* ── Editorial callout ────────────────────────────────── */}
      <section className="su-editorial">
        <div className="su-editorial-img">
          <ImagePlaceholder product={editorial} ratio={4 / 5} />
        </div>
        <div className="su-editorial-text">
          <div className="su-eyebrow">Made to Measure</div>
          <h2 className="su-h2 su-h2--alt">
            Two fittings.<br />
            One pattern, kept on file.<br />
            <em>Six weeks to delivery.</em>
          </h2>
          <p className="su-lede">
            Our cutters take 26 measurements by hand from our Lusaka atelier, then keep
            your pattern for any future commission. A first fitting in the canvas,
            a second in the finished cloth.
          </p>
          <div className="su-editorial-cta">
            <button className="su-btn su-btn--ink">Book a fitting <IconArrow /></button>
            <button className="su-link">Read about the process</button>
          </div>
        </div>
      </section>

      {/* ── Accessories ──────────────────────────────────────── */}
      <section className="su-section">
        <div className="su-section-hd">
          <div>
            <div className="su-eyebrow">Accessories</div>
            <h2 className="su-h2">The finishing.</h2>
          </div>
          <Link href="/collection/all" className="su-link" style={{ textDecoration: "none" }}>
            View all <IconArrow />
          </Link>
        </div>
        <div className="su-grid su-grid--3">
          {[tie, shoe, CATALOG.find((p) => p.id === "sh-poplin")!].map((p) => (
            <ProductCard key={p.id} product={p} cardStyle="overlay" />
          ))}
        </div>
      </section>

      {/* ── Notes / values ───────────────────────────────────── */}
      <section className="su-notes">
        <div className="su-notes-grid">
          <div>
            <div className="su-notes-num">01</div>
            <div className="su-notes-h">Cloth, first.</div>
            <p>We begin every season with the mills — Fox Brothers, Holland &amp;
              Sherry, Caccioppoli — and design around what the looms made well.</p>
          </div>
          <div>
            <div className="su-notes-num">02</div>
            <div className="su-notes-h">Half-canvas, always.</div>
            <p>A floating horsehair canvas through the chest. Heavier on the lapel,
              lighter through the body. It moves with you, and softens over years.</p>
          </div>
          <div>
            <div className="su-notes-num">03</div>
            <div className="su-notes-h">Made in small runs.</div>
            <p>We cut between forty and sixty of each suit from our Lusaka workshop.
              When the cloth is done, the suit is done. We don&apos;t reprint.</p>
          </div>
          <div>
            <div className="su-notes-num">04</div>
            <div className="su-notes-h">Altered for life.</div>
            <p>Any piece bought here, altered in our workshop — for as long as you
              wear it. No charge, ever.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
