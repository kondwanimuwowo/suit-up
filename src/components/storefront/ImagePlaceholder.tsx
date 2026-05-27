"use client";

import { useId } from "react";
import Image from "next/image";
import type { Product } from "@/lib/data";

interface Props {
  product?: Product;
  ratio?: number;
  label?: string;
  full?: boolean;
  dimmed?: boolean;
  imageIndex?: number;
  priority?: boolean;
}

export default function ImagePlaceholder({
  product,
  ratio = 4 / 3,
  label,
  full = false,
  dimmed = false,
  imageIndex = 0,
  priority = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const src = product?.images?.[imageIndex];

  // Real image
  if (src) {
    return (
      <div
        className="su-img"
        style={{ aspectRatio: `1 / ${ratio}`, opacity: dimmed ? 0.6 : 1, position: "relative" }}
      >
        <Image
          src={src}
          alt={product?.name ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority={priority}
        />
        {(label || full) && (
          <div className="su-img-meta">
            <span>{label ?? product?.color}</span>
            <span className="su-img-meta-dot">·</span>
            <span>{product?.fabric}</span>
          </div>
        )}
      </div>
    );
  }

  // SVG gradient fallback for products without photos yet
  const sw = product?.swatch ?? ["#cfc8bd", "#a89d8a"];
  const a = product?.hueA ?? "40 6%";
  const b = product?.hueB ?? "40 4%";
  const lA = product?.lA ?? 90;
  const lB = product?.lB ?? 70;

  return (
    <div
      className="su-img"
      style={{ aspectRatio: `1 / ${ratio}`, opacity: dimmed ? 0.6 : 1 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={`g-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={`oklch(${lA}% 0.01 ${a.split(" ")[0]})`} />
            <stop offset="55%"  stopColor={`oklch(${(lA + lB) / 2}% 0.012 ${a.split(" ")[0]})`} />
            <stop offset="100%" stopColor={`oklch(${lB}% 0.015 ${b.split(" ")[0]})`} />
          </linearGradient>
          <radialGradient id={`r-${uid}`} cx="30%" cy="22%" r="80%">
            <stop offset="0%"   stopColor="rgba(255,255,255,.35)" />
            <stop offset="55%"  stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id={`n-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
          </filter>
        </defs>
        <rect width="400" height="400" fill={`url(#g-${uid})`} />
        <rect width="400" height="400" fill={sw[0]} opacity="0.55" />
        <rect width="400" height="400" fill={`url(#r-${uid})`} />
        <rect width="400" height="400" fill={sw[1]} opacity="0.18" />
        <rect width="400" height="400" filter={`url(#n-${uid})`} opacity="0.7" />
      </svg>
      {(label || full) && (
        <div className="su-img-meta">
          <span>{label ?? product?.color}</span>
          <span className="su-img-meta-dot">·</span>
          <span>{product?.fabric}</span>
        </div>
      )}
    </div>
  );
}
