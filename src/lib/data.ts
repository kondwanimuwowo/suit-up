// Product catalog — Zambian context (ZMW pricing, Lusaka tailoring)

export interface Product {
  id: string;
  name: string;
  cat: "suits" | "shirts" | "ties" | "shoes";
  subtitle: string;
  price: number; // ZMW
  fabric: string;
  color: string;
  swatch: [string, string];
  hueA: string;
  hueB: string;
  lA: number;
  lB: number;
  description: string;
  fit: string;
  origin: string;
  images?: string[]; // public/ paths, index 0 = hero, 1-4 = gallery
}

export const CATALOG: Product[] = [
  // ─── Suits ─────────────────────────────────────────────────────────────
  {
    id: "s-westbrook",
    name: "The Westbrook",
    cat: "suits",
    subtitle: "Two-Piece Charcoal Wool",
    price: 37800,
    fabric: "Super 120s wool",
    color: "Charcoal",
    swatch: ["#3a3a40", "#2a2a30"],
    hueA: "70 4%",
    hueB: "70 3%",
    lA: 78,
    lB: 58,
    description:
      "A cleanly tailored two-piece in mid-weight English wool. Notch lapel, jetted pockets, half-canvas construction. Cut for an unhurried silhouette through the shoulder and chest.",
    fit: "Modern fit · Drop 7",
    origin: "Tailored in Lusaka",
    images: [
      "/images/suits/suit-1a.jpg",
      "/images/suits/suit-1b.jpg",
      "/images/suits/suit-1c.jpg",
      "/images/suits/suit-1d.jpg",
      "/images/suits/suit-1e.jpg",
    ],
  },
  {
    id: "s-linwood",
    name: "The Linwood",
    cat: "suits",
    subtitle: "Single-Breasted Navy",
    price: 35400,
    fabric: "Super 110s wool",
    color: "Deep Navy",
    swatch: ["#1a2238", "#11182a"],
    hueA: "230 8%",
    hueB: "230 6%",
    lA: 76,
    lB: 52,
    description:
      "The house navy. A versatile single-breasted suit with peak lapels and a clean drape — equally appropriate at the boardroom or an evening in Kabulonga.",
    fit: "Modern fit · Drop 7",
    origin: "Tailored in Lusaka",
    images: [
      "/images/suits/suit-2a.jpg",
      "/images/suits/suit-2b.jpg",
      "/images/suits/suit-2c.jpg",
      "/images/suits/suit-2d.jpg",
      "/images/suits/suit-2e.jpg",
    ],
  },
  {
    id: "s-sterling",
    name: "The Sterling",
    cat: "suits",
    subtitle: "Three-Piece Midnight",
    price: 48000,
    fabric: "Super 130s wool",
    color: "Midnight",
    swatch: ["#10131c", "#0a0c14"],
    hueA: "240 5%",
    hueB: "240 4%",
    lA: 72,
    lB: 46,
    description:
      "A formal three-piece in a deep midnight blue. Self-back waistcoat with five buttons, satin-faced buttons throughout. Made for Lusaka's black-tie calendar.",
    fit: "Classic fit · Drop 6",
    origin: "Tailored in Lusaka",
    images: [
      "/images/suits/suit-3a.jpg",
      "/images/suits/suit-3b.jpg",
      "/images/suits/suit-3c.jpg",
      "/images/suits/suit-3d.jpg",
      "/images/suits/suit-3e.jpg",
    ],
  },
  {
    id: "s-glenmore",
    name: "The Glenmore",
    cat: "suits",
    subtitle: "Tweed in Heather",
    price: 31600,
    fabric: "Donegal tweed",
    color: "Heather Brown",
    swatch: ["#6a5a48", "#544535"],
    hueA: "40 12%",
    hueB: "35 14%",
    lA: 82,
    lB: 62,
    description:
      "A weighty tweed jacket from a small Donegal mill. Flecks of rust, moss and oat through a warm heather base. Sold as a two-piece or jacket only.",
    fit: "Relaxed fit · Drop 6",
    origin: "Tailored in Ndola",
    images: [
      "/images/suits/suit-4a.jpg",
      "/images/suits/suit-4b.jpg",
      "/images/suits/suit-4c.jpg",
      "/images/suits/suit-4d.jpg",
      "/images/suits/suit-4e.jpg",
    ],
  },
  {
    id: "s-ardley",
    name: "The Ardley",
    cat: "suits",
    subtitle: "Slate Glen Check",
    price: 35400,
    fabric: "Super 110s wool",
    color: "Slate",
    swatch: ["#5a5d63", "#3f4248"],
    hueA: "220 4%",
    hueB: "220 3%",
    lA: 80,
    lB: 60,
    description:
      "A subtle glen check rendered in chalky greys. Soft shouldering, working sleeve buttons, an unstructured chest piece.",
    fit: "Modern fit · Drop 7",
    origin: "Tailored in Lusaka",
  },
  {
    id: "s-halsey",
    name: "The Halsey",
    cat: "suits",
    subtitle: "Tuxedo in Black",
    price: 54400,
    fabric: "Super 130s wool & silk",
    color: "Black",
    swatch: ["#0d0d10", "#050507"],
    hueA: "0 0%",
    hueB: "0 0%",
    lA: 68,
    lB: 38,
    description:
      "Our evening suit. Grosgrain silk peak lapels, covered buttons, a single-button closure and a clean unvented back.",
    fit: "Classic fit · Drop 6",
    origin: "Tailored in Lusaka",
    images: [
      "/images/suits/tux-1a.jpg",
      "/images/suits/tux-1b.jpg",
      "/images/suits/tux-1c.jpg",
      "/images/suits/tux-1d.jpg",
    ],
  },

  // ─── Shirts ────────────────────────────────────────────────────────────
  {
    id: "sh-oxford",
    name: "The Oxford",
    cat: "shirts",
    subtitle: "Spread Collar in White",
    price: 4680,
    fabric: "Two-fold Oxford cotton",
    color: "White",
    swatch: ["#f1ede5", "#dcd5c8"],
    hueA: "40 6%",
    hueB: "40 4%",
    lA: 94,
    lB: 82,
    description:
      "A foundational white shirt in a soft two-fold Oxford weave. Mother-of-pearl buttons, a medium-spread collar and single-button cuffs.",
    fit: "Tailored fit",
    origin: "Made in Livingstone",
    images: [
      "/images/suits/shirt-1a.jpg",
      "/images/suits/shirt-1b.jpg",
    ],
  },
  {
    id: "sh-poplin",
    name: "The Poplin",
    cat: "shirts",
    subtitle: "Sky Cotton",
    price: 4680,
    fabric: "120s poplin",
    color: "Sky",
    swatch: ["#c8d6df", "#aebec9"],
    hueA: "210 10%",
    hueB: "210 8%",
    lA: 88,
    lB: 72,
    description:
      "A crisp pale-blue poplin with the slightest hand. Cut from a single ply for a clean finish under tailoring.",
    fit: "Tailored fit",
    origin: "Made in Livingstone",
  },
  {
    id: "sh-twill",
    name: "The Twill",
    cat: "shirts",
    subtitle: "Charcoal Brushed",
    price: 4180,
    fabric: "Brushed twill",
    color: "Charcoal",
    swatch: ["#3c3c40", "#27272b"],
    hueA: "240 3%",
    hueB: "240 2%",
    lA: 70,
    lB: 50,
    description:
      "A casual brushed-twill shirt — softened for weekend wear under knitwear or a sport coat.",
    fit: "Relaxed fit",
    origin: "Made in Livingstone",
  },

  // ─── Ties ──────────────────────────────────────────────────────────────
  {
    id: "t-silk-burgundy",
    name: "Grenadine Tie",
    cat: "ties",
    subtitle: "Silk in Burgundy",
    price: 2400,
    fabric: "Italian silk grenadine",
    color: "Burgundy",
    swatch: ["#5a1f24", "#3d1418"],
    hueA: "10 18%",
    hueB: "10 14%",
    lA: 70,
    lB: 44,
    description:
      "A garza fina grenadine with that signature open weave. Hand-rolled tip, fully self-tipped.",
    fit: "8cm blade · 148cm length",
    origin: "Woven in Como, finished in Lusaka",
    images: ["/images/suits/tie-1.jpg"],
  },
  {
    id: "t-knit-navy",
    name: "Knit Tie",
    cat: "ties",
    subtitle: "Wool in Navy",
    price: 2150,
    fabric: "Italian merino wool",
    color: "Navy",
    swatch: ["#1d2a44", "#121b2e"],
    hueA: "225 12%",
    hueB: "225 10%",
    lA: 74,
    lB: 52,
    description:
      "A square-bottom knit tie in fine merino — the most forgiving piece in the wardrobe.",
    fit: "6.5cm blade · 145cm length",
    origin: "Knitted in Biella, finished in Lusaka",
    images: ["/images/suits/tie-2.jpg"],
  },

  // ─── Shoes ─────────────────────────────────────────────────────────────
  {
    id: "sh-belmont",
    name: "The Belmont",
    cat: "shoes",
    subtitle: "Oxford in Black",
    price: 12500,
    fabric: "Calf leather",
    color: "Black",
    swatch: ["#1a1a1d", "#0b0b0d"],
    hueA: "30 5%",
    hueB: "30 3%",
    lA: 70,
    lB: 42,
    description:
      "A whole-cut Oxford built on the 202 last. Goodyear-welted with a leather sole and a discreet rubber top piece.",
    fit: "UK 6 – 12 incl. half-sizes",
    origin: "Made in Northampton",
    images: [
      "/images/suits/shoe-1a.jpg",
      "/images/suits/shoe-1b.jpg",
      "/images/suits/shoe-1c.jpg",
      "/images/suits/shoe-1d.jpg",
    ],
  },
  {
    id: "sh-linden",
    name: "The Linden",
    cat: "shoes",
    subtitle: "Penny Loafer in Cognac",
    price: 12000,
    fabric: "Hand-burnished calf",
    color: "Cognac",
    swatch: ["#7a4a26", "#5c361a"],
    hueA: "30 28%",
    hueB: "30 24%",
    lA: 78,
    lB: 56,
    description:
      "A slim penny loafer with a hand-burnished cognac finish. Beveled waist, leather sole.",
    fit: "UK 6 – 12 incl. half-sizes",
    origin: "Made in Northampton",
    images: [
      "/images/suits/shoe-2a.jpg",
      "/images/suits/shoe-2b.jpg",
      "/images/suits/shoe-2c.jpg",
      "/images/suits/shoe-2d.jpg",
    ],
  },
];

export const SIZES: Record<string, string[]> = {
  suits: ["38R", "40R", "42R", "44R", "46R", "38L", "40L", "42L", "44L"],
  shirts: ["S", "M", "L", "XL", "XXL"],
  ties: ["One Size"],
  shoes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
};

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "suits", label: "Suits" },
  { id: "shirts", label: "Shirts" },
  { id: "ties", label: "Ties" },
  { id: "shoes", label: "Shoes" },
] as const;

/** Format as Zambian Kwacha */
export const fmt = (n: number) =>
  "K" + Math.round(n).toLocaleString("en-ZM");
