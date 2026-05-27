"use client";

import Topbar from "@/components/dashboard/Topbar";
import { HBar } from "@/components/dashboard/Charts";
import { IconArrow } from "@/components/ui/Icons";
import { CUSTOMERS, fmtMoney } from "@/lib/dashboard-data";

const Dot = () => (
  <span style={{
    display: "inline-block", width: 6, height: 6, borderRadius: 999,
    background: "currentColor", flex: "none",
  }} />
);

export default function CustomersPage() {
  const sorted = [...CUSTOMERS].sort((a, b) => b.ltv - a.ltv);
  const totalLtv = sorted.reduce((s, c) => s + c.ltv, 0);
  const maxLtv = Math.max(...sorted.map((c) => c.ltv));

  return (
    <>
      <Topbar
        title="Customers"
        breadcrumb={["Workshop", "Customers"]}
        rightSlot={
          <button className="su-btn su-btn--ink su-btn--sm">New customer <IconArrow /></button>
        }
      />

      <section className="su-stat-strip">
        <div><span className="su-eyebrow">Active customers</span><span className="su-stat-v">412</span></div>
        <div><span className="su-eyebrow">Returning</span><span className="su-stat-v">64%</span></div>
        <div><span className="su-eyebrow">Avg. lifetime value</span><span className="su-stat-v">{fmtMoney(153500)}</span></div>
        <div><span className="su-eyebrow">Top 12 of</span><span className="su-stat-v">412</span></div>
      </section>

      <div className="su-table-wrap">
        <table className="su-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>City</th>
              <th>Segment</th>
              <th>First order</th>
              <th>Orders</th>
              <th>Lifetime value</th>
              <th className="su-th-num">Share</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="su-tcell-prod">
                    <div className="su-avatar">
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="su-tcell">{c.name}</div>
                      <div className="su-tcell-sub">{c.id.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="su-tcell-sub">{c.city}</td>
                <td>
                  <span className={"su-pill su-pill--" + (c.segment === "MTM" ? "accent" : "neutral")}>
                    <Dot />
                    {c.segment === "MTM" ? "Made to measure" : "Ready to wear"}
                  </span>
                </td>
                <td className="su-tcell-sub">
                  {new Date(c.first).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </td>
                <td className="su-tcell-mono">{c.orders}</td>
                <td>
                  <div className="su-bar-cell">
                    <HBar value={c.ltv} max={maxLtv} color="var(--su-accent)" />
                    <span className="su-tcell-mono">{fmtMoney(c.ltv)}</span>
                  </div>
                </td>
                <td className="su-th-num su-tcell-sub">
                  {((c.ltv / totalLtv) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
