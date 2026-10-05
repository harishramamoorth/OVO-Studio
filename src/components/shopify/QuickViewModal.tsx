"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Check, ShieldCheck, Sparkles, Plus, Minus } from "lucide-react";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  if (!product) return null;

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
  const mainImage = product.featuredImage?.url || product.images[0]?.url || "";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[120] bg-[#0A040B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#140816] border border-[rgba(214,182,90,0.25)] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0D040E]/80 border border-[rgba(214,182,90,0.3)] text-[#F4EEE5] hover:text-[#D6B65A] flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="lg:w-1/2 relative bg-[#0B030C] min-h-[280px] lg:min-h-[480px]">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[#C8BDB7]/40">
                No Image Available
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#140816] via-transparent to-transparent opacity-60 lg:hidden" />

            {/* Vendor Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-mono font-bold bg-[#10070F]/80 backdrop-blur-md text-[#D6B65A] border border-[rgba(214,182,90,0.3)]">
                {product.category || "OVO Signature"}
              </span>
            </div>
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6B65A]">
                  {product.vendor || "OVO Signature Atelier"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#F4EEE5]">
                  {product.title}
                </h3>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-[#D6B65A]">
                  {currency} {parseFloat(price).toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#C8BDB7]/85 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#F4EEE5] font-bold block">
                    Select Option / Variant:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            isSelected
                              ? "bg-[#D6B65A] text-[#10070F] font-bold shadow-lg"
                              : "bg-[#1A0B1E] text-[#C8BDB7] border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]"
                          }`}
                        >
                          {variant.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4 pt-4 border-t border-[rgba(214,182,90,0.15)]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase text-[#C8BDB7]">Quantity:</span>
                <div className="flex items-center border border-[rgba(214,182,90,0.3)] rounded-full bg-[#0E040F] px-2 py-0.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-[#F4EEE5]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] hover:shadow-lg shadow-[#D6B65A]/20"
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
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-[#210D23] text-[#F4EEE5] border border-[rgba(214,182,90,0.4)] hover:bg-[#D6B65A] hover:text-[#10070F] transition-all flex items-center justify-center gap-1.5 group"
                >
                  <span>CHECKOUT WITH SHOPIFY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#C8BDB7]/70 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6B65A]" /> 256-bit SSL Checkout
                </span>
                <Link
                  href={`/products/${product.handle}`}
                  onClick={onClose}
                  className="text-[#D6B65A] hover:underline flex items-center gap-1 font-bold uppercase"
                >
                  <span>Full Details</span>
                  <Sparkles className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
