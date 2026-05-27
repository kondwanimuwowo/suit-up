"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrow } from "@/components/ui/Icons";

const IconDashboard = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="10" stroke="currentColor" strokeWidth="1" />
    <rect x="13" y="3" width="8" height="6" stroke="currentColor" strokeWidth="1" />
    <rect x="3" y="15" width="8" height="6" stroke="currentColor" strokeWidth="1" />
    <rect x="13" y="11" width="8" height="10" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconOrders = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 7h14l-1 13H6L5 7Z" stroke="currentColor" strokeWidth="1" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconProducts = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 7 12 3l9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1" />
    <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconFittings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" stroke="currentColor" strokeWidth="1" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconCustomers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1" />
    <circle cx="17" cy="10" r="2.2" stroke="currentColor" strokeWidth="1" />
    <path d="M3 20c.8-3 3.4-4.6 6-4.6s4.8 1.6 5.5 4.6" stroke="currentColor" strokeWidth="1" />
    <path d="M15 20c.5-2.4 2.4-3.6 4-3.6s2.5.8 3 2" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconInsights = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 20h18" stroke="currentColor" strokeWidth="1" />
    <path d="M5 16V9M10 16V6M15 16v-8M20 16v-4" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const IconSettingsSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3 18.4 18.4M5.6 18.4 7.7 16.3M16.3 7.7 18.4 5.6"
      stroke="currentColor" strokeWidth="1" />
  </svg>
);

const NAV = [
  { href: "/dashboard",           label: "Overview",   icon: IconDashboard },
  { href: "/dashboard/orders",    label: "Orders",     icon: IconOrders,    count: 12 },
  { href: "/dashboard/products",  label: "Products",   icon: IconProducts },
  { href: "/dashboard/fittings",  label: "Fittings",   icon: IconFittings,  count: 10 },
  { href: "/dashboard/customers", label: "Customers",  icon: IconCustomers },
  { href: "/dashboard/insights",  label: "Insights",   icon: IconInsights },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <aside className="su-sb">
      <div className="su-sb-brand">
        <span className="su-sb-mark">S—U</span>
        <div>
          <div className="su-sb-name">SUIT UP</div>
          <div className="su-sb-place">Atelier · Lusaka</div>
        </div>
      </div>

      <nav className="su-sb-nav">
        <div className="su-sb-h">Workshop</div>
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={"su-sb-link" + (isActive(n.href) ? " is-active" : "")}
            style={{ textDecoration: "none" }}
          >
            <span className="su-sb-link-i"><n.icon /></span>
            <span className="su-sb-link-l">{n.label}</span>
            {n.count != null && <span className="su-sb-count">{n.count}</span>}
          </Link>
        ))}
      </nav>

      <nav className="su-sb-nav">
        <div className="su-sb-h">Account</div>
        <Link
          href="/dashboard/settings"
          className={"su-sb-link" + (pathname === "/dashboard/settings" ? " is-active" : "")}
          style={{ textDecoration: "none" }}
        >
          <span className="su-sb-link-i"><IconSettingsSmall /></span>
          <span className="su-sb-link-l">Settings</span>
        </Link>
      </nav>

      <div className="su-sb-foot">
        <div className="su-sb-user">
          <div className="su-sb-avatar">EH</div>
          <div>
            <div className="su-sb-user-name">Eliza Holloway</div>
            <div className="su-sb-user-role">Head Cutter · Owner</div>
          </div>
        </div>
        <Link href="/" className="su-sb-link-store" style={{ textDecoration: "none" }}>
          View storefront <IconArrow />
        </Link>
      </div>
    </aside>
  );
}
