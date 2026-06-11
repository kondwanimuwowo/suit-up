"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { LineChart, HBar } from "@/components/dashboard/Charts";
import { INVENTORY, ORDERS_30D, fmtMoney, fmtMoneyK } from "@/lib/dashboard-data";
import { CATALOG } from "@/lib/data";

const CITY_MIX = [
  { city: "Lusaka, ZM",       share: 0.42 },
  { city: "Ndola, ZM",        share: 0.18 },
  { city: "Livingstone, ZM",  share: 0.12 },
  { city: "Kitwe, ZM",        share: 0.08 },
  { city: "Kabwe, ZM",        share: 0.05 },
  { city: "Chipata, ZM",      share: 0.04 },
  { city: "International",    share: 0.11 },
];

export default function InsightsPage() {
  const [period, setPeriod] = useState("30d");
  const ACCENT = "var(--su-accent)";

  const topRevenue = INVENTORY.flatMap((i) => {
    const p = CATALOG.find((c) => c.id === i.id);
    if (!p) return [];
    return [{ ...i, product: p, revenue: i.sold * p.price }];
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  const maxRev = Math.max(...topRevenue.map((t) => t.revenue));

  return (
    <>
      <Topbar
        title="Insights"
        breadcrumb={["Store", "Insights"]}
        period={period}
        setPeriod={setPeriod}
        rightSlot={
          <button className="su-btn su-btn--ghost su-btn--sm">Schedule report</button>
        }
      />

      <section className="su-d-row su-d-row--1-1">
        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Pieces by revenue</div>
              <h3 className="su-panel-h">The season&apos;s best.</h3>
            </div>
          </div>
          <ul className="su-bars su-bars--rich">
            {topRevenue.map((t) => (
              <li key={t.id}>
                <div className="su-bars-rich-l">
                  <span className="su-bars-rich-n">{t.product.name}</span>
                  <span className="su-tcell-sub">{t.sold} sold · {fmtMoney(t.product.price)}</span>
                </div>
                <div className="su-bars-rich-r">
                  <HBar value={t.revenue} max={maxRev} color={ACCENT} />
                  <span className="su-tcell-mono">{fmtMoneyK(t.revenue)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Where customers are</div>
              <h3 className="su-panel-h">Cities</h3>
            </div>
          </div>
          <ul className="su-bars">
            {CITY_MIX.map((c) => (
              <li key={c.city}>
                <div className="su-bars-l">
                  <span>{c.city}</span>
                  <span className="su-bars-v">{(c.share * 100).toFixed(0)}%</span>
                </div>
                <HBar value={c.share} max={0.5} color={ACCENT} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="su-panel">
        <div className="su-panel-hd">
          <div>
            <div className="su-eyebrow">Daily orders · last 30 days</div>
            <h3 className="su-panel-h">Order volume</h3>
          </div>
          <div className="su-legend">
            <span><i style={{ background: ACCENT }} />Orders / day</span>
          </div>
        </div>
        <LineChart
          height={240}
          yFmt={(v) => Math.round(v).toString()}
          series={[{ id: "orders", data: ORDERS_30D, color: ACCENT, areaOpacity: 0.06 }]}
        />
      </section>

      <section className="su-d-row su-d-row--1-1-1">
        <div className="su-panel su-panel--quote">
          <span className="su-quote-mark">&ldquo;</span>
          <p>
            The half-canvas held its shape after a hard winter.
            The shoulder still sits the way it did the day I picked it up.
          </p>
          <div className="su-quote-by">— Customer note · Mwamba Kapata</div>
        </div>
        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Returns</div>
              <h3 className="su-panel-h">2.1% rate</h3>
            </div>
          </div>
          <p className="su-panel-p">
            Four returns this quarter, all for sizing. Three resolved with
            complimentary alterations; one full refund (Linden 9.5).
          </p>
          <div className="su-panel-foot">
            <span>Below industry average of ~9% for ready-to-wear.</span>
          </div>
        </div>
        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Avg. order processing</div>
              <h3 className="su-panel-h">2.1 days</h3>
            </div>
          </div>
          <p className="su-panel-p">
            Down from 3.4 days last quarter. Improved stock organisation
            at Arcades Mall reduced same-day collection wait by 40%.
          </p>
          <div className="su-panel-foot">
            <span>Target: 1.5 days by Q4.</span>
          </div>
        </div>
      </section>
    </>
  );
}
