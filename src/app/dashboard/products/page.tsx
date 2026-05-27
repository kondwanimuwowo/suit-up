"use client";

import Topbar from "@/components/dashboard/Topbar";
import { HBar } from "@/components/dashboard/Charts";
import ImagePlaceholder from "@/components/storefront/ImagePlaceholder";
import { IconArrow } from "@/components/ui/Icons";
import { INVENTORY, fmtMoney } from "@/lib/dashboard-data";
import { CATALOG } from "@/lib/data";

export default function ProductsPage() {
  const rows = INVENTORY.map((i) => {
    const p = CATALOG.find((c) => c.id === i.id)!;
    const left = i.run - i.sold - i.allocated;
    return { ...i, product: p, left, sellThru: i.sold / i.run };
  }).sort((a, b) => b.sellThru - a.sellThru);

  const totalSold = rows.reduce((s, r) => s + r.sold, 0);
  const totalLeft = rows.reduce((s, r) => s + r.left, 0);
  const totalAlloc = rows.reduce((s, r) => s + r.allocated, 0);
  const totalRun = rows.reduce((s, r) => s + r.run, 0);
  const avgSellThru = totalSold / totalRun;

  return (
    <>
      <Topbar
        title="Products"
        breadcrumb={["Workshop", "Products"]}
        rightSlot={
          <>
            <button className="su-btn su-btn--ghost su-btn--sm">Import</button>
            <button className="su-btn su-btn--ink su-btn--sm">Add piece <IconArrow /></button>
          </>
        }
      />

      <section className="su-stat-strip">
        <div>
          <span className="su-eyebrow">Total pieces</span>
          <span className="su-stat-v">{rows.length}</span>
        </div>
        <div>
          <span className="su-eyebrow">In stock</span>
          <span className="su-stat-v">{totalLeft}</span>
        </div>
        <div>
          <span className="su-eyebrow">Allocated</span>
          <span className="su-stat-v">{totalAlloc}</span>
        </div>
        <div>
          <span className="su-eyebrow">Sold this season</span>
          <span className="su-stat-v">{totalSold}</span>
        </div>
        <div>
          <span className="su-eyebrow">Sell-through</span>
          <span className="su-stat-v">{(avgSellThru * 100).toFixed(0)}%</span>
        </div>
      </section>

      <div className="su-table-wrap">
        <table className="su-table">
          <thead>
            <tr>
              <th>Piece</th>
              <th>Category</th>
              <th>Cloth</th>
              <th>Price</th>
              <th>Run / Sold</th>
              <th>Sell-through</th>
              <th className="su-th-num">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="su-tcell-prod">
                    <div className="su-tcell-thumb">
                      <ImagePlaceholder product={r.product} ratio={1} />
                    </div>
                    <div>
                      <div className="su-tcell">{r.product.name}</div>
                      <div className="su-tcell-sub">{r.product.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td className="su-tcell-sub su-tcell-sub--cap">{r.product.cat}</td>
                <td className="su-tcell-sub">{r.product.fabric}</td>
                <td className="su-tcell-mono">{fmtMoney(r.product.price)}</td>
                <td>
                  <div className="su-tcell-mono">{r.sold} / {r.run}</div>
                  <div className="su-tcell-sub">{r.allocated} allocated</div>
                </td>
                <td>
                  <div className="su-bar-cell">
                    <HBar
                      value={r.sellThru}
                      max={1}
                      color={r.sellThru > 0.85 ? "var(--su-warn)" : "var(--su-accent)"}
                    />
                    <span>{(r.sellThru * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="su-th-num">
                  <span className={"su-tcell-mono" + (r.left <= 5 ? " is-warn" : "")}>
                    {r.left}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
