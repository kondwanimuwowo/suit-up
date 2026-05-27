"use client";

import Topbar from "@/components/dashboard/Topbar";
import { IconArrow } from "@/components/ui/Icons";
import { FITTINGS, CUSTOMERS } from "@/lib/dashboard-data";

export default function FittingsPage() {
  const dates = [...new Set(FITTINGS.map((f) => f.date))].sort();

  return (
    <>
      <Topbar
        title="Fittings"
        breadcrumb={["Workshop", "Fittings"]}
        rightSlot={
          <>
            <button className="su-btn su-btn--ghost su-btn--sm">Print week</button>
            <button className="su-btn su-btn--ink su-btn--sm">Schedule <IconArrow /></button>
          </>
        }
      />

      <section className="su-stat-strip">
        <div>
          <span className="su-eyebrow">This week</span>
          <span className="su-stat-v">10</span>
        </div>
        <div>
          <span className="su-eyebrow">First fittings</span>
          <span className="su-stat-v">2</span>
        </div>
        <div>
          <span className="su-eyebrow">Final fittings</span>
          <span className="su-stat-v">2</span>
        </div>
        <div>
          <span className="su-eyebrow">Avg. lead time</span>
          <span className="su-stat-v">5.8 wk</span>
        </div>
      </section>

      <div className="su-fit-grid">
        {dates.map((d) => {
          const day = FITTINGS.filter((f) => f.date === d);
          const dt = new Date(d);
          return (
            <div key={d} className="su-fit-col">
              <div className="su-fit-hd">
                <span className="su-fit-dw">
                  {dt.toLocaleDateString("en-GB", { weekday: "long" })}
                </span>
                <span className="su-fit-dn">
                  {dt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
              <div className="su-fit-list">
                {day.map((f) => {
                  const c = CUSTOMERS.find((x) => x.id === f.customerId);
                  return (
                    <div key={f.id} className="su-fit-card">
                      <div className="su-fit-time">{f.time}</div>
                      <div className="su-fit-name">{c?.name}</div>
                      <div className="su-fit-sub">{f.type}</div>
                      <div className="su-fit-meta">
                        <span>{f.workshop}</span>
                        <span>·</span>
                        <span>{f.cutter}</span>
                      </div>
                    </div>
                  );
                })}
                {day.length === 0 && <div className="su-fit-empty">No fittings.</div>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
