"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalQuantity,
    subtotal,
    currencyCode,
    updateQuantity,
    removeItem,
    proceedToCheckout,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-[#0A040B]/80 backdrop-blur-md"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-[#130815] border-l border-[rgba(214,182,90,0.2)] flex flex-col shadow-2xl overflow-hidden relative"
          >
            {/* Animated Watermark Background */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-16 -right-16 w-80 h-80 opacity-[0.07] pointer-events-none mix-blend-screen"
            >
              <Image
                src="/media/fashion/about/DHOPING.png"
                alt="Watermark"
                fill
                className="object-contain"
              />
            </motion.div>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(214,182,90,0.15)] bg-[#190B1B]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D6B65A]/20 to-transparent border border-[#D6B65A]/30 flex items-center justify-center text-[#D6B65A]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4EEE5]">
                    Shopping Bag
                  </h3>
                  <p className="text-[11px] text-[#D6B65A] font-mono">
                    {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full border border-[rgba(244,238,229,0.15)] text-[#C8BDB7] hover:text-[#D6B65A] hover:border-[#D6B65A] flex items-center justify-center transition-all"
                aria-label="Close Shopping Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#210D23] border border-[rgba(214,182,90,0.15)] flex items-center justify-center text-[#C8BDB7]/40">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-[#F4EEE5]">
                      Your Shopping Bag is Empty
                    </h4>
                    <p className="text-xs text-[#C8BDB7]/70 max-w-xs">
                      Discover our high couture collection, luxury fragrances, and bespoke fashion advisory services.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="mt-4 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] hover:shadow-lg transition-all"
                  >
                    EXPLORE PRODUCTS
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.variantId}
                    className="p-4 rounded-xl bg-[#1D0C1F]/80 border border-[rgba(214,182,90,0.12)] flex gap-4 items-center group hover:border-[rgba(214,182,90,0.3)] transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#0F0510] flex-shrink-0 border border-[rgba(244,238,229,0.1)]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#C8BDB7]/50">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-bold text-[#F4EEE5] truncate leading-snug">
                        {item.productTitle}
                      </h4>
                      {item.variantTitle && item.variantTitle !== "Default" && (
                        <span className="inline-block text-[10px] uppercase font-mono text-[#D6B65A] tracking-wider">
                          {item.variantTitle}
                        </span>
                      )}
                      <p className="text-xs font-bold text-[#D6B65A] font-mono">
                        {item.currencyCode} {item.price.toLocaleString()}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center border border-[rgba(214,182,90,0.2)] rounded-full bg-[#130715]">
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-[#F4EEE5]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-[#C8BDB7] hover:text-[#D6B65A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-1 text-[#C8BDB7]/60 hover:text-red-400 transition-colors ml-auto"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[rgba(214,182,90,0.15)] bg-[#190B1B] space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#C8BDB7]">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#F4EEE5] font-bold">
                      {currencyCode} {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#C8BDB7]">
                    <span>Shipping & Taxes</span>
                    <span className="text-[10px] text-[#D6B65A] uppercase font-mono">
                      Calculated at Shopify Checkout
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[rgba(214,182,90,0.1)] flex items-center justify-between text-sm font-bold text-[#F4EEE5]">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#D6B65A] text-base">
                      {currencyCode} {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] hover:shadow-xl hover:shadow-[#D6B65A]/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>PROCEED TO SHOPIFY CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#C8BDB7]/70 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6B65A]" />
                  <span>Encrypted 256-bit Shopify SSL Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
