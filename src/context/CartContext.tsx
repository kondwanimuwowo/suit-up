"use client";

import React, { createContext, useContext, useReducer } from "react";
import type { Product } from "@/lib/data";

export interface CartLine {
  id: string;
  productId: string;
  size: string;
  qty: number;
  price: number;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "ADD"; product: Product; size: string }
  | { type: "UPDATE_QTY"; lineId: string; qty: number }
  | { type: "REMOVE"; lineId: string };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.lines.find(
        (l) => l.productId === action.product.id && l.size === action.size
      );
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l === existing ? { ...l, qty: l.qty + 1 } : l
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            id: `${action.product.id}-${action.size}-${Date.now()}`,
            productId: action.product.id,
            size: action.size,
            qty: 1,
            price: action.product.price,
          },
        ],
      };
    }
    case "UPDATE_QTY":
      if (action.qty <= 0) {
        return { lines: state.lines.filter((l) => l.id !== action.lineId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.id === action.lineId ? { ...l, qty: action.qty } : l
        ),
      };
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.id !== action.lineId) };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  cartCount: number;
  addToCart: (product: Product, size: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeFromCart: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });

  const cartCount = state.lines.reduce((s, l) => s + l.qty, 0);

  return (
    <CartContext.Provider
      value={{
        lines: state.lines,
        cartCount,
        addToCart: (product, size) => dispatch({ type: "ADD", product, size }),
        updateQty: (lineId, qty) => dispatch({ type: "UPDATE_QTY", lineId, qty }),
        removeFromCart: (lineId) => dispatch({ type: "REMOVE", lineId }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
