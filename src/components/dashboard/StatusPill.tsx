import { ORDER_STATUSES, type OrderStatus } from "@/lib/dashboard-data";

const Dot = ({ color }: { color?: string }) => (
  <span
    style={{
      display: "inline-block",
      width: 6,
      height: 6,
      borderRadius: 999,
      background: color || "currentColor",
      flex: "none",
    }}
  />
);

export default function StatusPill({ status }: { status: OrderStatus }) {
  const s = ORDER_STATUSES.find((x) => x.id === status) ?? ORDER_STATUSES[0];
  return (
    <span className={`su-pill su-pill--${s.tone}`}>
      <Dot />
      {s.label}
    </span>
  );
}
