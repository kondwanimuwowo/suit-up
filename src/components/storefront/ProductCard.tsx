"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data";
import { fmt } from "@/lib/data";
import ImagePlaceholder from "./ImagePlaceholder";
import { IconArrow } from "@/components/ui/Icons";

interface Props {
  product: Product;
  cardStyle?: "minimal" | "framed" | "overlay";
  priority?: boolean;
}

export default function ProductCard({ product, cardStyle = "minimal", priority = false }: Props) {
  const [hovered, setHovered] = useState(false); // used by minimal card
  const router = useRouter();

  const go = () => router.push(`/product/${product.id}`);

  if (cardStyle === "framed") {
    return (
      <article
        className="su-card su-card--framed"
        onClick={go}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        <div className="su-card-frame">
          <ImagePlaceholder product={product} ratio={5 / 4} priority={priority} />
        </div>
        <div className="su-card-body">
          <div className="su-card-meta">
            <span>{product.cat.toUpperCase()}</span>
            <span>{product.color}</span>
          </div>
          <h3 className="su-card-name">{product.name}</h3>
          <div className="su-card-sub">{product.subtitle}</div>
          <div className="su-card-foot">
            <span className="su-card-price">{fmt(product.price)}</span>
            <span className="su-card-add">View <IconArrow /></span>
          </div>
        </div>
      </article>
    );
  }

  if (cardStyle === "overlay") {
    return (
      <article
        className="su-card su-card--overlay"
        onClick={go}
        style={{ cursor: "pointer" }}
      >
        <div className="su-card-frame">
          <ImagePlaceholder product={product} ratio={5 / 4} priority={priority} />
          <div className="su-card-overlay">
            <div>
              <div className="su-card-name su-card-name--over">{product.name}</div>
              <div className="su-card-sub su-card-sub--over">{product.subtitle}</div>
            </div>
            <div className="su-card-price su-card-price--over">{fmt(product.price)}</div>
          </div>
        </div>
        <div className="su-card-strip">
          <div className="su-card-strip-main">
            <span className="su-card-strip-name">{product.name}</span>
            <span className="su-card-strip-price">{fmt(product.price)}</span>
          </div>
          <span className="su-card-strip-sub">{product.subtitle}</span>
        </div>
      </article>
    );
  }

  // minimal (default)
  return (
    <article
      className="su-card su-card--minimal"
      onClick={go}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="su-card-img-wrap">
        <ImagePlaceholder product={product} ratio={5 / 4} />
      </div>
      <div className="su-card-body">
        <div className="su-card-row">
          <h3 className="su-card-name">{product.name}</h3>
          <span className="su-card-price">{fmt(product.price)}</span>
        </div>
        <div className="su-card-row">
          <span className="su-card-sub">{product.subtitle}</span>
          <span className="su-card-link">
            {hovered ? (<>View <IconArrow /></>) : " "}
          </span>
        </div>
      </div>
    </article>
  );
}
