import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const IconBag = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" stroke="currentColor" strokeWidth="1" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1" />
    <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1" />
    <path d="M5 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconPlus = () => (
  <span style={{ fontWeight: 300, fontSize: 14, lineHeight: 1 }}>＋</span>
);

export const IconMinus = () => (
  <span style={{ fontWeight: 300, fontSize: 14, lineHeight: 1 }}>－</span>
);

// Dashboard icons
export const IconGrid = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1" />
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1" />
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1" />
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconOrders = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1" />
    <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconBox = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1" />
    <path d="m3.27 6.96 8.73 5.04 8.73-5.04M12 22.08V12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconScissors = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1" />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1" />
    <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconUsers = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconChart = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const IconSettings = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconBell = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const IconStore = (p: P) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.1 1 11h3v10a1 1 0 0 0 1 1h6v-6h2v6h6a1 1 0 0 0 1-1V11h3L12 2.1Z" />
  </svg>
);
