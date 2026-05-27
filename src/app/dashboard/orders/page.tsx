"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import StatusPill from "@/components/dashboard/StatusPill";
import { IconArrow, IconSearch } from "@/components/ui/Icons";
import {
  ORDERS, CUSTOMERS, ORDER_STATUSES, fmtMoney,
  type Order, type OrderStatus,
} from "@/lib/dashboard-data";
import { CATALOG } from "@/lib/data";

function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const c = CUSTOMERS.find((x) => x.id === order.customerId);
  return (
    <div className="su-drawer-bg" onClick={onClose}>
      <aside className="su-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="su-drawer-hd">
          <div>
            <div className="su-eyebrow">{order.id} · {order.channel}</div>
            <h3 className="su-drawer-h">{c?.name}</h3>
            <div className="su-tcell-sub">
              {c?.city} · placed {new Date(order.created).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </div>
          </div>
          <button className="su-icon-btn-s" onClick={onClose}>✕</button>
        </div>

        <div className="su-drawer-status">
          <StatusPill status={order.status} />
          <div className="su-pipeline">
            {ORDER_STATUSES.slice(0, 6).map((s, i) => {
              const idx = ORDER_STATUSES.findIndex((x) => x.id === order.status);
              const done = i <= idx;
              return (
                <div key={s.id} className={"su-pipe-step" + (done ? " is-done" : "")}>
                  <div className="su-pipe-mark" />
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="su-drawer-sect">
          <div className="su-eyebrow">Pieces</div>
          {order.items.map((it, i) => {
            const p = CATALOG.find((x) => x.id === it[0]);
            return p ? (
              <div key={i} className="su-drawer-line">
                <div>
                  <div className="su-drawer-line-n">{p.name}</div>
                  <div className="su-tcell-sub">
                    {p.subtitle} · Size {it[1]}{it[2] > 1 ? ` · ×${it[2]}` : ""}
                  </div>
                </div>
                <div className="su-tcell-mono">{fmtMoney(p.price * it[2])}</div>
              </div>
            ) : null;
          })}
          <div className="su-drawer-tot">
            <span>Total</span>
            <span className="su-tcell-mono">{fmtMoney(order.total)}</span>
          </div>
        </div>

        <div className="su-drawer-sect">
          <div className="su-eyebrow">Notes from the cutter</div>
          <p className="su-drawer-note">
            Customer specified a slightly higher armhole and one extra inch of sleeve length.
            Pattern on file (folio 14, drawer 3). Second fitting booked Tue 26 May, 10:00.
          </p>
        </div>

        <div className="su-drawer-actions">
          <button className="su-btn su-btn--ink">Advance to next stage <IconArrow /></button>
          <button className="su-btn su-btn--ghost">Print packing slip</button>
        </div>
      </aside>
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = ORDERS.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (query) {
      const c = CUSTOMERS.find((x) => x.id === o.customerId);
      const blob = (o.id + " " + (c?.name || "") + " " + o.origin + " " + o.channel).toLowerCase();
      if (!blob.includes(query.toLowerCase())) return false;
    }
    return true;
  });

  const counts = ORDER_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s.id] = ORDERS.filter((o) => o.status === s.id).length;
    return acc;
  }, {});

  const selectedOrder = selected ? ORDERS.find((o) => o.id === selected) : null;

  return (
    <>
      <Topbar
        title="Orders"
        breadcrumb={["Workshop", "Orders"]}
        rightSlot={
          <>
            <button className="su-btn su-btn--ghost su-btn--sm">Export CSV</button>
            <button className="su-btn su-btn--ink su-btn--sm">New order <IconArrow /></button>
          </>
        }
      />

      <div className="su-tabs">
        <button
          className={"su-tab" + (filter === "all" ? " is-active" : "")}
          onClick={() => setFilter("all")}
        >
          All <span className="su-tab-c">{ORDERS.length}</span>
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s.id}
            className={"su-tab" + (filter === s.id ? " is-active" : "")}
            onClick={() => setFilter(s.id as OrderStatus)}
          >
            {s.label} <span className="su-tab-c">{counts[s.id] || 0}</span>
          </button>
        ))}
      </div>

      <div className="su-table-tools">
        <div className="su-tb-search su-tb-search--inline">
          <IconSearch />
          <input
            placeholder="Search by order, customer, city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="su-tt-right">
          <span className="su-tt-count">{filtered.length} orders</span>
          <button className="su-link su-link--sm">Filter</button>
          <button className="su-link su-link--sm">Sort</button>
        </div>
      </div>

      <div className="su-table-wrap">
        <table className="su-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Pieces</th>
              <th>Channel</th>
              <th>Status</th>
              <th className="su-th-num">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const c = CUSTOMERS.find((x) => x.id === o.customerId);
              return (
                <tr
                  key={o.id}
                  className={selected === o.id ? "is-selected" : ""}
                  onClick={() => setSelected(o.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="su-tcell-mono">{o.id}</div>
                    <div className="su-tcell-sub">
                      {new Date(o.created).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short",
                      })}
                    </div>
                  </td>
                  <td>
                    <div className="su-tcell">{c?.name}</div>
                    <div className="su-tcell-sub">{o.origin}</div>
                  </td>
                  <td>
                    <div className="su-tcell">
                      {o.items.map((it, i) => {
                        const p = CATALOG.find((x) => x.id === it[0]);
                        return p ? (
                          <span key={i} className="su-piece">
                            {p.name}<span className="su-piece-sz"> · {it[1]}</span>
                            {it[2] > 1 && <span> ×{it[2]}</span>}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td>
                    <div className="su-tcell-sub su-tcell-sub--cap">{o.channel}</div>
                  </td>
                  <td><StatusPill status={o.status} /></td>
                  <td className="su-th-num">
                    <div className="su-tcell-mono">{fmtMoney(o.total)}</div>
                  </td>
                  <td className="su-th-act">
                    <button className="su-icon-btn-s"><IconArrow /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDrawer order={selectedOrder} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
