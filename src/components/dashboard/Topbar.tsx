"use client";

import { type ReactNode } from "react";
import { IconBell, IconSearch } from "@/components/ui/Icons";

interface TopbarProps {
  title: string;
  breadcrumb: string[];
  period?: string;
  setPeriod?: (p: string) => void;
  rightSlot?: ReactNode;
}

export default function Topbar({ title, breadcrumb, period, setPeriod, rightSlot }: TopbarProps) {
  return (
    <header className="su-tb">
      <div className="su-tb-left">
        <div className="su-tb-crumb">
          {breadcrumb.map((c, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: "0 4px" }}>/</span>}
              {c}
            </span>
          ))}
        </div>
        <h1 className="su-tb-title">{title}</h1>
      </div>
      <div className="su-tb-right">
        <div className="su-tb-search">
          <IconSearch />
          <input placeholder="Search orders, customers, pieces…" />
          <span className="su-tb-kbd">⌘K</span>
        </div>
        {setPeriod && (
          <div className="su-seg">
            {(["7d", "30d", "90d", "12m"] as const).map((p) => (
              <button
                key={p}
                className={period === p ? "is-active" : ""}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}
        <button className="su-tb-bell" aria-label="Notifications">
          <IconBell />
          <span className="su-tb-bell-dot" />
        </button>
        {rightSlot}
      </div>
    </header>
  );
}
