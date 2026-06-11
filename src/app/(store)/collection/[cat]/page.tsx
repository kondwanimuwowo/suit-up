"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATALOG, CATEGORIES, fmt } from "@/lib/data";
import ProductCard from "@/components/storefront/ProductCard";
import { IconArrow, IconClose } from "@/components/ui/Icons";

const SUBTITLES: Record<string, string> = {
  all:    "Every piece, in stock now.",
  suits:  "Turkish-crafted formal wear. Slim cuts, full range.",
  shirts: "Clean dress shirts to complete the suit.",
  ties:   "Ties, pocket squares and finishing pieces.",
  shoes:  "Footwear to match.",
};

const MADE_IN = ["Lusaka, ZM", "Ndola, ZM", "Livingstone, ZM", "Northampton, UK", "Como, IT", "Biella, IT"];

export default function CollectionPage() {
  const params = useParams();
  const cat = (params.cat as string) || "all";

  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState<{ color: string[]; fabric: string[] }>({ color: [], fabric: [] });
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const all = cat === "all" ? CATALOG : CATALOG.filter((p) => p.cat === cat);
  const colors = [...new Set(all.map((p) => p.color))];
  const fabrics = [...new Set(all.map((p) => p.fabric))];

  let products = all.filter((p) => {
    if (filters.color.length && !filters.color.includes(p.color)) return false;
    if (filters.fabric.length && !filters.fabric.includes(p.fabric)) return false;
    return true;
  });
  if (sort === "low") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "high") products = [...products].sort((a, b) => b.price - a.price);

  const toggle = (kind: "color" | "fabric", v: string) =>
    setFilters((f) => ({
      ...f,
      [kind]: f[kind].includes(v) ? f[kind].filter((x) => x !== v) : [...f[kind], v],
    }));

  const title = cat === "all" ? "The Atelier" : cat[0].toUpperCase() + cat.slice(1);
  const hasFilters = filters.color.length > 0 || filters.fabric.length > 0;
  const activeCount = filters.color.length + filters.fabric.length;

  const FilterContent = () => (
    <>
      <div className="su-filter-section">
        <div className="su-filter-h">Category</div>
        <div className="su-filter-list">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/collection/${c.id}`}
              className={"su-filter-link" + (cat === c.id ? " is-active" : "")}
              style={{ textDecoration: "none" }}
              onClick={() => { setFilterOpen(false); setMobileFilterOpen(false); }}
            >
              {c.label}
              <span className="su-filter-count">
                {c.id === "all" ? CATALOG.length : CATALOG.filter((p) => p.cat === c.id).length}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="su-filter-section">
        <div className="su-filter-h">Colour</div>
        <div className="su-filter-list">
          {colors.map((c) => (
            <label key={c} className="su-check">
              <input type="checkbox" checked={filters.color.includes(c)} onChange={() => toggle("color", c)} />
              <span className="su-check-box"><span /></span>
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="su-filter-section">
        <div className="su-filter-h">Cloth</div>
        <div className="su-filter-list">
          {fabrics.map((f) => (
            <label key={f} className="su-check">
              <input type="checkbox" checked={filters.fabric.includes(f)} onChange={() => toggle("fabric", f)} />
              <span className="su-check-box"><span /></span>
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="su-filter-section">
        <div className="su-filter-h">Made in</div>
        <div className="su-filter-list">
          {MADE_IN.map((m) => (
            <label key={m} className="su-check">
              <input type="checkbox" readOnly />
              <span className="su-check-box"><span /></span>
              <span>{m}</span>
            </label>
          ))}
        </div>
      </div>
      {hasFilters && (
        <button className="su-link su-clear" onClick={() => setFilters({ color: [], fabric: [] })}>
          Clear filters
        </button>
      )}
    </>
  );

  return (
    <main className="su-plp">
      <div className="su-plp-head">
        <div className="su-breadcrumbs">
          <Link href="/" style={{ textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1 className="su-display su-display--plp">{title}</h1>
        <p className="su-lede">{SUBTITLES[cat] ?? "Every piece, this season."}</p>
      </div>

      <div className="su-plp-body">
        {/* Desktop inline filter panel */}
        <div className={"su-filter-panel" + (filterOpen ? " is-open" : "")}>
          <div className="su-filter-panel-inner">
            <div className="su-filter-panel-hd">
              <span className="su-filter-h" style={{ margin: 0 }}>Filters</span>
              <button className="su-icon-btn" onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <IconClose />
              </button>
            </div>
            <div className="su-filters">
              <FilterContent />
            </div>
          </div>
        </div>

        <div className="su-plp-main">
          <div className="su-plp-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="su-plp-count">{products.length} pieces</span>
              {/* Desktop filter toggle */}
              <button
                className="su-btn su-btn--ghost su-btn--sm su-filter-toggle"
                onClick={() => setFilterOpen((v) => !v)}
              >
                {filterOpen ? "Hide filters" : "Filters"}{activeCount > 0 ? ` · ${activeCount}` : ""}
              </button>
              {/* Mobile filter button */}
              <button
                className="su-btn su-btn--ghost su-btn--sm su-filter-mobile-btn"
                onClick={() => setMobileFilterOpen(true)}
              >
                Filters{activeCount > 0 ? ` · ${activeCount}` : ""}
              </button>
            </div>
            <div className="su-sort">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price · Low to high</option>
                <option value="high">Price · High to low</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="su-empty">
              <div className="su-empty-h">Nothing matches.</div>
              <p>Try clearing a filter or browsing a different category.</p>
              <button className="su-link" onClick={() => setFilters({ color: [], fabric: [] })}>
                Clear filters <IconArrow />
              </button>
            </div>
          ) : (
            <div className={"su-grid " + (filterOpen ? "su-grid--3" : "su-grid--4")}>
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} cardStyle="overlay" priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={"su-filter-backdrop" + (mobileFilterOpen ? " is-open" : "")}
        onClick={() => setMobileFilterOpen(false)}
      />
      <div className={"su-filter-sheet-drawer" + (mobileFilterOpen ? " is-open" : "")} aria-hidden={!mobileFilterOpen}>
        <div className="su-filter-drawer-hd">
          <span className="su-filter-drawer-title">
            Filters{activeCount > 0 ? ` · ${activeCount} active` : ""}
          </span>
          <button className="su-icon-btn" onClick={() => setMobileFilterOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="su-filters" style={{ padding: "24px 24px 0", overflowY: "auto", flex: 1 }}>
          <FilterContent />
        </div>
        <div className="su-filter-drawer-foot">
          <button className="su-btn su-btn--ink su-btn--lg" onClick={() => setMobileFilterOpen(false)}>
            Show {products.length} pieces <IconArrow />
          </button>
        </div>
      </div>
    </main>
  );
}
