"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, ShopifyProduct } from "@/types/shopify";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  currencyCode: string;
  checkoutUrl: string | null;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: ShopifyProduct, variantId?: string, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  proceedToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "ovo_shopify_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Load cart from LocalStorage on initial client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Sync to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (
    product: ShopifyProduct,
    variantId?: string,
    quantity: number = 1
  ) => {
    const selectedVariant =
      product.variants.find((v) => v.id === variantId) || product.variants[0];

    const targetVariantId = selectedVariant
      ? selectedVariant.id
      : product.id;

    const variantTitle = selectedVariant ? selectedVariant.title : "Default";
    const price = selectedVariant
      ? parseFloat(selectedVariant.price.amount)
      : parseFloat(product.priceRange.minVariantPrice.amount);
    const currencyCode = selectedVariant
      ? selectedVariant.price.currencyCode
      : product.priceRange.minVariantPrice.currencyCode;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.variantId === targetVariantId
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        variantId: targetVariantId,
        productId: product.id,
        productTitle: product.title,
        variantTitle,
        handle: product.handle,
        price,
        currencyCode,
        image: product.featuredImage.url || product.images[0]?.url || "",
        quantity,
      };

      return [...prevItems, newItem];
    });

    openCart();
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const currencyCode = items[0]?.currencyCode || "AED";

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      // Direct checkout simulation or fallback URL redirect
      const shopDomain =
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "ovosignature.myshopify.com";
      const cartPermalink = items
        .map((item) => {
          const numericVariantId = item.variantId.split("/").pop();
          return `${numericVariantId}:${item.quantity}`;
        })
        .join(",");

      const url = `https://${shopDomain}/cart/${cartPermalink}`;
      alert(
        `Redirecting to Shopify Checkout...\n\nItems: ${totalQuantity}\nTotal: ${currencyCode} ${subtotal.toLocaleString()}`
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalQuantity,
        subtotal,
        currencyCode,
        checkoutUrl,
        toggleCart,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
