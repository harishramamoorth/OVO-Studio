"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { useCart } from "@/context/CartContext";

interface ProductDetailActionsProps {
  product: ShopifyProduct;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, proceedToCheckout } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = selectedVariant
    ? selectedVariant.price.amount
    : product.priceRange.minVariantPrice.amount;
  const currency = selectedVariant
    ? selectedVariant.price.currencyCode
    : product.priceRange.minVariantPrice.currencyCode;
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;

  const handleAddToCart = () => {
    addItem(product, selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant.id, quantity);
    proceedToCheckout();
  };

  return (
    <div className="space-y-6 pt-4 border-t border-[rgba(214,182,90,0.15)]">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold font-mono text-[#D6B65A]">
          {currency} {parseFloat(price).toLocaleString()}
        </span>
        {compareAtPrice && (
          <span className="text-sm font-mono text-[#C8BDB7]/50 line-through">
            {currency} {parseFloat(compareAtPrice).toLocaleString()}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs lg:text-sm text-[#C8BDB7]/85 leading-relaxed font-light">
        {product.description}
      </p>

      {/* Variant Selection */}
      {product.variants.length > 1 && (
        <div className="space-y-3">
          <label className="text-xs uppercase font-mono tracking-wider text-[#F4EEE5] font-bold block">
            Select Option / Variant:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? "bg-[#D6B65A] text-[#10070F] font-bold shadow-lg shadow-[#D6B65A]/20"
                      : "bg-[#17091A] text-[#C8BDB7] border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]"
                  }`}
                >
                  {variant.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C8BDB7]">
            Quantity:
          </span>
          <div className="flex items-center border border-[rgba(214,182,90,0.3)] rounded-full bg-[#150917] px-3 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-mono font-bold text-[#F4EEE5]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] hover:shadow-xl hover:shadow-[#D6B65A]/20"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-[#210D23] text-[#F4EEE5] border border-[rgba(214,182,90,0.4)] hover:bg-[#D6B65A] hover:text-[#10070F] transition-all flex items-center justify-center gap-2 group"
          >
            <span>BUY NOW WITH SHOPIFY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
