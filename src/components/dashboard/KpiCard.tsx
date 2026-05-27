import type { KpiItem } from "@/lib/dashboard-data";
import { fmtMoney, fmtMoneyK, fmtPct, delta } from "@/lib/dashboard-data";
import { Sparkline } from "./Charts";

const IconUp = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const IconDown = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

function formatValue(k: KpiItem): string {
  if (k.fmt === "currency") return fmtMoneyK(k.value);
  if (k.fmt === "pct") return fmtPct(k.value, 2);
  return k.value.toLocaleString("en-ZM");
}

function formatPrev(k: KpiItem): string {
  if (k.fmt === "currency") return fmtMoneyK(k.prev);
  if (k.fmt === "pct") return fmtPct(k.prev, 2);
  return k.prev.toLocaleString("en-ZM");
}

export default function KpiCard({ k }: { k: KpiItem }) {
  const d = delta(k.value, k.prev);
  const up = d >= 0;
  return (
    <div className="su-kpi">
      <div className="su-kpi-hd">
        <span className="su-kpi-l">{k.label}</span>
        <span className={"su-kpi-d " + (up ? "is-up" : "is-dn")}>
          {up ? <IconUp /> : <IconDown />}
          {Math.abs(d).toFixed(1)}%
        </span>
      </div>
      <div className="su-kpi-v">{formatValue(k)}</div>
      <div className="su-kpi-sp">
        <Sparkline
          data={k.spark}
          w={220}
          h={40}
          stroke={up ? "var(--su-accent)" : "var(--su-warn)"}
        />
      </div>
      <div className="su-kpi-foot">
        vs.&nbsp;previous 30 days&nbsp;·&nbsp;{formatPrev(k)}
      </div>
    </div>
  );
}
