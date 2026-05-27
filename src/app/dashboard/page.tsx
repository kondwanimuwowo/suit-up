"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import KpiCard from "@/components/dashboard/KpiCard";
import { LineChart, Donut, HBar } from "@/components/dashboard/Charts";
import { IconArrow } from "@/components/ui/Icons";
import {
  KPI, REVENUE_30D, REVENUE_PREV_30D, ACTIVITY, CHANNEL_MIX, CAT_MIX,
  INVENTORY, fmtMoney,
} from "@/lib/dashboard-data";
import { CATALOG } from "@/lib/data";

export default function OverviewPage() {
  const [period, setPeriod] = useState("30d");

  const ACCENT = "var(--su-accent)";

  const lowStock = INVENTORY.map((i) => {
    const p = CATALOG.find((c) => c.id === i.id);
    const left = i.run - i.sold - i.allocated;
    return { ...i, product: p, left, pct: left / i.run };
  })
    .filter((i) => i.left <= 12)
    .sort((a, b) => a.left - b.left)
    .slice(0, 5);

  const donutPalette = [
    ACCENT,
    "var(--su-fg)",
    "color-mix(in oklab, var(--su-accent) 60%, var(--su-muted))",
    "var(--su-muted)",
    "color-mix(in oklab, var(--su-muted) 70%, var(--su-hair))",
  ];

  return (
    <>
      <Topbar
        title="Overview"
        breadcrumb={["Store", "Overview"]}
        period={period}
        setPeriod={setPeriod}
        rightSlot={
          <button className="su-btn su-btn--ink su-btn--sm">
            Export <IconArrow />
          </button>
        }
      />

      <div className="su-tb-banner">
        <div>
          <span className="su-eyebrow">Monday, 25 May 2026</span>
          <h2 className="su-tb-greet">
            Good morning, Eliza.<br />
            <em>Ten appointments in store this week.</em>
          </h2>
        </div>
        <div className="su-tb-meta">
          <div>
            <span className="su-tb-meta-l">Open orders</span>
            <span className="su-tb-meta-v">12</span>
          </div>
          <div>
            <span className="su-tb-meta-l">Processing</span>
            <span className="su-tb-meta-v">7</span>
          </div>
          <div>
            <span className="su-tb-meta-l">Ready to ship</span>
            <span className="su-tb-meta-v">3</span>
          </div>
          <div>
            <span className="su-tb-meta-l">Returns pending</span>
            <span className="su-tb-meta-v">1</span>
          </div>
        </div>
      </div>

      <section className="su-kpi-grid">
        {KPI.map((k) => <KpiCard key={k.id} k={k} />)}
      </section>

      <section className="su-d-row su-d-row--2-1">
        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Revenue · this period</div>
              <h3 className="su-panel-h">Last {period}</h3>
            </div>
            <div className="su-legend">
              <span><i style={{ background: ACCENT }} />This period</span>
              <span><i style={{ background: "var(--su-muted)", opacity: 0.5 }} />Previous</span>
            </div>
          </div>
          <LineChart
            height={300}
            yFmt={(v) => "K" + Math.round(v / 1000) + "k"}
            series={[
              { id: "prev", data: REVENUE_PREV_30D, color: "var(--su-muted)", dashed: true, fill: false },
              { id: "curr", data: REVENUE_30D, color: ACCENT, areaOpacity: 0.08 },
            ]}
          />
          <div className="su-panel-foot">
            <span>Best day&nbsp;·&nbsp;Sun 18 May&nbsp;·&nbsp;{fmtMoney(260000)}</span>
            <span>Tracking 22.3% above prior period.</span>
          </div>
        </div>

        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Activity</div>
              <h3 className="su-panel-h">From the floor</h3>
            </div>
            <button className="su-link su-link--sm">View all <IconArrow /></button>
          </div>
          <ul className="su-act">
            {ACTIVITY.map((a, i) => (
              <li
                key={i}
                className={"su-act-i" + (a.warn ? " is-warn" : "") + (a.accent ? " is-accent" : "")}
              >
                <span className="su-act-t">{a.t}</span>
                <span className="su-act-dot" />
                <span className="su-act-m">{a.msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="su-d-row su-d-row--1-1-1">
        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Channel mix</div>
              <h3 className="su-panel-h">Where it&apos;s selling</h3>
            </div>
          </div>
          <div className="su-donut-wrap">
            <Donut data={CHANNEL_MIX} size={180} thickness={18} palette={donutPalette} />
            <ul className="su-legend-list">
              {CHANNEL_MIX.map((c, i) => (
                <li key={c.id}>
                  <i style={{ background: donutPalette[i] }} />
                  <span className="su-leg-l">{c.label}</span>
                  <span className="su-leg-v">{(c.share * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">By category</div>
              <h3 className="su-panel-h">Share of revenue</h3>
            </div>
          </div>
          <ul className="su-bars">
            {CAT_MIX.map((c) => (
              <li key={c.id}>
                <div className="su-bars-l">
                  <span>{c.label}</span>
                  <span className="su-bars-v">{(c.share * 100).toFixed(0)}%</span>
                </div>
                <HBar value={c.share} max={1} color={ACCENT} />
              </li>
            ))}
          </ul>
          <div className="su-panel-foot">
            <span>Suits still drive 7 in 10 kwacha.</span>
          </div>
        </div>

        <div className="su-panel">
          <div className="su-panel-hd">
            <div>
              <div className="su-eyebrow">Inventory</div>
              <h3 className="su-panel-h">Running low</h3>
            </div>
            <button className="su-link su-link--sm">All stock <IconArrow /></button>
          </div>
          <ul className="su-stock">
            {lowStock.map((s) => (
              <li key={s.id}>
                <div className="su-stock-l">
                  <span className="su-stock-name">{s.product?.name}</span>
                  <span className="su-stock-sub">{s.product?.subtitle}</span>
                </div>
                <div className="su-stock-r">
                  <span className={"su-stock-c" + (s.left <= 3 ? " is-warn" : "")}>{s.left}</span>
                  <span className="su-stock-of">of {s.run}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
