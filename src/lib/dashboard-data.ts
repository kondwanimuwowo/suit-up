// Dashboard data — SUITUP SOLUTIONS LIMITED

import { CATALOG } from "./data";

export const REVENUE_30D = [
  105000, 95000, 122500, 135000, 152500, 205000, 177500,
  112500, 127500, 145000, 155000, 175000, 227500, 210000,
  130000, 147500, 167500, 185000, 205000, 245000, 230000,
  152500, 170000, 182500, 197500, 222500, 260000, 245000,
  180000, 202500,
];

export const ORDERS_30D = [
  3, 2, 4, 4, 5, 7, 6,
  3, 4, 4, 5, 6, 8, 7,
  4, 5, 5, 6, 7, 8, 8,
  5, 6, 6, 7, 8, 9, 9,
  6, 7,
];

// Deterministic pseudo-random so server and client render identical SVG paths
const seeded = (i: number) => {
  const x = Math.sin(i + 1) * 10000;
  return x - Math.floor(x);
};
export const REVENUE_PREV_30D = REVENUE_30D.map((v, i) =>
  Math.round(v * (0.78 + seeded(i) * 0.15))
);

export interface KpiItem {
  id: string;
  label: string;
  value: number;
  prev: number;
  fmt: "currency" | "int" | "pct";
  spark: number[];
}

export const KPI: KpiItem[] = [
  { id: "rev", label: "Revenue", value: 4960500, prev: 4057750, fmt: "currency", spark: REVENUE_30D },
  { id: "ord", label: "Orders", value: 184, prev: 159, fmt: "int", spark: ORDERS_30D },
  {
    id: "aov",
    label: "Avg. order",
    value: 26960,
    prev: 25520,
    fmt: "currency",
    spark: REVENUE_30D.map((r, i) => Math.round(r / Math.max(1, ORDERS_30D[i]))),
  },
  {
    id: "conv",
    label: "Conversion",
    value: 2.84,
    prev: 2.61,
    fmt: "pct",
    spark: [2.4,2.3,2.5,2.4,2.6,2.7,2.6,2.5,2.6,2.7,2.5,2.7,2.8,2.9,2.7,2.8,2.9,2.8,2.9,3.0,2.9,2.8,2.9,3.0,3.0,2.9,3.0,3.1,2.9,2.84],
  },
];

export const ORDER_STATUSES = [
  { id: "received",   label: "Received",         tone: "neutral" },
  { id: "processing", label: "Processing",        tone: "accent"  },
  { id: "ready",      label: "Ready to collect",  tone: "ok"      },
  { id: "shipped",    label: "Shipped",           tone: "ok"      },
  { id: "delivered",  label: "Delivered",         tone: "muted"   },
  { id: "returned",   label: "Returned",          tone: "warn"    },
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number]["id"];

export interface Customer {
  id: string;
  name: string;
  city: string;
  first: string;
  orders: number;
  ltv: number;
  segment: "Regular" | "New";
}

export const CUSTOMERS: Customer[] = [
  { id: "c1",  name: "Mwamba Kapata",    city: "Lusaka, ZM",      first: "2023-09-12", orders: 7,  ltv: 235500, segment: "Regular" },
  { id: "c2",  name: "Chanda Mutale",    city: "Lusaka, ZM",      first: "2024-02-04", orders: 4,  ltv: 121500, segment: "Regular" },
  { id: "c3",  name: "Kelvin Phiri",     city: "Ndola, ZM",       first: "2024-04-20", orders: 3,  ltv: 78000,  segment: "Regular" },
  { id: "c4",  name: "Bwalya Mwansa",    city: "Lusaka, ZM",      first: "2022-11-08", orders: 11, ltv: 370500, segment: "Regular" },
  { id: "c5",  name: "Emmanuel Banda",   city: "Livingstone, ZM", first: "2025-01-30", orders: 2,  ltv: 67750,  segment: "New"     },
  { id: "c6",  name: "Mulenga Tembo",    city: "Lusaka, ZM",      first: "2023-05-17", orders: 6,  ltv: 206000, segment: "Regular" },
  { id: "c7",  name: "Patrick Zulu",     city: "Kitwe, ZM",       first: "2024-09-09", orders: 3,  ltv: 89500,  segment: "Regular" },
  { id: "c8",  name: "Yusuf Mumba",      city: "Lusaka, ZM",      first: "2023-03-22", orders: 5,  ltv: 155250, segment: "Regular" },
  { id: "c9",  name: "Derrick Sakala",   city: "Lusaka, ZM",      first: "2022-08-14", orders: 9,  ltv: 297250, segment: "Regular" },
  { id: "c10", name: "Collins Ngoma",    city: "Kabwe, ZM",       first: "2025-03-04", orders: 1,  ltv: 34875,  segment: "New"     },
  { id: "c11", name: "Nkosi Chiwala",    city: "Lusaka, ZM",      first: "2023-12-01", orders: 4,  ltv: 122750, segment: "Regular" },
  { id: "c12", name: "Simba Lungu",      city: "Chipata, ZM",     first: "2024-06-23", orders: 2,  ltv: 69500,  segment: "New"     },
];

export interface OrderLine {
  productId: string;
  size: string;
  qty: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: [string, string, number][];
  total: number;
  status: OrderStatus;
  created: string;
  channel: "Online" | "In-store";
  origin: string;
}

export const ORDERS: Order[] = [
  { id: "SU-10428", customerId: "c1",  items: [["su-navy-contrast","50",1],["su-shirt-white","L",1]],   total: 10498, status: "processing", created: "2026-05-23", channel: "Online",   origin: "Lusaka"     },
  { id: "SU-10427", customerId: "c4",  items: [["su-navy-stripe","48",1]],                               total: 8499,  status: "ready",      created: "2026-05-22", channel: "In-store", origin: "Arcades"    },
  { id: "SU-10426", customerId: "c9",  items: [["su-mauve","46",1],["su-tie-burgundy","One Size",1]],    total: 7798,  status: "ready",      created: "2026-05-22", channel: "Online",   origin: "Lusaka"     },
  { id: "SU-10425", customerId: "c8",  items: [["su-charcoal","52",1]],                                  total: 6499,  status: "shipped",    created: "2026-05-21", channel: "Online",   origin: "Lusaka"     },
  { id: "SU-10424", customerId: "c2",  items: [["su-stone","48",1]],                                     total: 6499,  status: "delivered",  created: "2026-05-19", channel: "Online",   origin: "Lusaka"     },
  { id: "SU-10423", customerId: "c6",  items: [["su-grey-classic","50",1],["su-shirt-blue","M",1]],      total: 7498,  status: "delivered",  created: "2026-05-18", channel: "In-store", origin: "Mosi Mall"  },
  { id: "SU-10422", customerId: "c3",  items: [["su-tie-navy","One Size",1],["su-shirt-white","L",1]],   total: 2298,  status: "delivered",  created: "2026-05-17", channel: "Online",   origin: "Ndola"      },
  { id: "SU-10421", customerId: "c11", items: [["su-grey-db","54",1]],                                   total: 7499,  status: "returned",   created: "2026-05-15", channel: "Online",   origin: "Lusaka"     },
  { id: "SU-10420", customerId: "c5",  items: [["su-charcoal-stripe","46",1]],                           total: 8499,  status: "received",   created: "2026-05-25", channel: "In-store", origin: "Arcades"    },
  { id: "SU-10419", customerId: "c7",  items: [["su-shirt-blue","L",2]],                                 total: 2998,  status: "shipped",    created: "2026-05-14", channel: "Online",   origin: "Kitwe"      },
  { id: "SU-10418", customerId: "c12", items: [["su-ivory","44",1]],                                     total: 7499,  status: "processing", created: "2026-05-24", channel: "In-store", origin: "Mosi Mall"  },
  { id: "SU-10417", customerId: "c10", items: [["su-navy-db","50",1]],                                   total: 7999,  status: "delivered",  created: "2026-05-11", channel: "Online",   origin: "Kabwe"      },
];

export interface InventoryItem {
  id: string;
  run: number;
  sold: number;
  allocated: number;
}

export const INVENTORY: InventoryItem[] = [
  { id: "su-navy-contrast",   run: 60,  sold: 47, allocated: 4 },
  { id: "su-mauve",           run: 80,  sold: 51, allocated: 6 },
  { id: "su-grey-db",         run: 40,  sold: 12, allocated: 2 },
  { id: "su-navy-db",         run: 50,  sold: 38, allocated: 3 },
  { id: "su-grey-vest",       run: 50,  sold: 22, allocated: 1 },
  { id: "su-stone",           run: 30,  sold: 8,  allocated: 1 },
  { id: "su-charcoal-stripe", run: 240, sold: 198, allocated: 5 },
  { id: "su-grey-classic",    run: 180, sold: 142, allocated: 4 },
  { id: "su-ivory",           run: 160, sold: 78,  allocated: 2 },
  { id: "su-charcoal",        run: 90,  sold: 82,  allocated: 2 },
  { id: "su-navy-stripe",     run: 120, sold: 64,  allocated: 1 },
  { id: "su-shirt-white",     run: 80,  sold: 52,  allocated: 3 },
  { id: "su-shirt-charcoal",  run: 60,  sold: 18,  allocated: 1 },
];

export interface Appointment {
  id: string;
  date: string;
  time: string;
  customerId: string;
  store: string;
  type: string;
  staff: string;
}

export const FITTINGS: Appointment[] = [
  { id: "f1",  date: "2026-05-26", time: "10:00", customerId: "c4",  store: "Arcades Mall",      type: "In-store visit",  staff: "Kasamba B." },
  { id: "f2",  date: "2026-05-26", time: "11:30", customerId: "c1",  store: "Arcades Mall",      type: "Try-on session",  staff: "Annie M."   },
  { id: "f3",  date: "2026-05-26", time: "14:00", customerId: "c9",  store: "Mosi oa Tunya",     type: "Exchange",        staff: "Annie M."   },
  { id: "f4",  date: "2026-05-27", time: "09:30", customerId: "c8",  store: "Arcades Mall",      type: "Collection",      staff: "Kasamba B." },
  { id: "f5",  date: "2026-05-27", time: "13:00", customerId: "c2",  store: "Mosi oa Tunya",     type: "Try-on session",  staff: "Annie M."   },
  { id: "f6",  date: "2026-05-28", time: "10:30", customerId: "c6",  store: "Arcades Mall",      type: "In-store visit",  staff: "Kasamba B." },
  { id: "f7",  date: "2026-05-28", time: "15:00", customerId: "c5",  store: "Arcades Mall",      type: "Try-on session",  staff: "Annie M."   },
  { id: "f8",  date: "2026-05-29", time: "11:00", customerId: "c12", store: "Mosi oa Tunya",     type: "Collection",      staff: "Kasamba B." },
  { id: "f9",  date: "2026-05-30", time: "10:00", customerId: "c4",  store: "Arcades Mall",      type: "Exchange",        staff: "Kasamba B." },
  { id: "f10", date: "2026-06-02", time: "14:00", customerId: "c9",  store: "Mosi oa Tunya",     type: "Try-on session",  staff: "Annie M."   },
];

export const CHANNEL_MIX = [
  { id: "online",       label: "Online",                   share: 0.62, value: 3075510 },
  { id: "store-arc",    label: "In-store · Arcades",       share: 0.24, value: 1190520 },
  { id: "store-mosi",   label: "In-store · Mosi Mall",     share: 0.10, value: 496050  },
  { id: "whatsapp",     label: "WhatsApp orders",          share: 0.04, value: 198420  },
];

export const CAT_MIX = [
  { id: "suits",  label: "Suits",       share: 0.82 },
  { id: "shirts", label: "Shirts",      share: 0.11 },
  { id: "ties",   label: "Accessories", share: 0.07 },
];

export const ACTIVITY = [
  { t: "9 min",  k: "order",   msg: "Order SU-10428 from Mwamba Kapata · K10,498",                accent: true  },
  { t: "37 min", k: "fitting", msg: "Chanda Mutale booked a try-on · Mosi Mall · Wed 27 May, 13:00"             },
  { t: "1 hr",   k: "stock",   msg: "The Lusaka in size 46 — 3 pieces remaining",                  warn: true    },
  { t: "2 hr",   k: "fitting", msg: "Bwalya Mwansa confirmed in-store visit · Arcades · Tue 26 May, 10:00"      },
  { t: "3 hr",   k: "order",   msg: "Order SU-10427 ready to collect — Bwalya Mwansa notified"                  },
  { t: "5 hr",   k: "alter",   msg: "Derrick Sakala enquired about exchange on SU-09812"                        },
  { t: "Yest.",  k: "order",   msg: "Order SU-10421 returned · Light Grey DB size 54",             warn: true    },
  { t: "Yest.",  k: "press",   msg: "110k+ followers milestone on Facebook — @suitupzambia"                     },
];

export const fmtMoney = (n: number) =>
  "K" + Math.round(n).toLocaleString("en-ZM");

export const fmtMoneyK = (n: number) =>
  n >= 10000
    ? "K" + (n / 1000).toFixed(1) + "k"
    : "K" + Math.round(n).toLocaleString("en-ZM");

export const fmtPct = (n: number, d = 1) => n.toFixed(d) + "%";

export const delta = (a: number, b: number) => ((a - b) / b) * 100;

export { CATALOG };
