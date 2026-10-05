"use client";

import React, { useState } from "react";
import { ShoppingBag, CheckCircle, Info, ExternalLink, X } from "lucide-react";
import { isShopifyConfigured } from "@/lib/shopify/client";

export default function ShopifyBadge() {
  const [dismissed, setDismissed] = useState(false);
  const isConnected = isShopifyConfigured();

  if (dismissed) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#17091A] via-[#240E29] to-[#17091A] border-y border-[rgba(214,182,90,0.2)] py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-[#F4EEE5]">
          <div className="w-7 h-7 rounded-full bg-[#D6B65A]/10 border border-[#D6B65A]/40 flex items-center justify-center text-[#D6B65A] shrink-0">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-[#D6B65A] mr-2">
              SHOPIFY STOREFRONT API:
            </span>
            {isConnected ? (
              <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Connected to Custom Shopify Store
              </span>
            ) : (
              <span className="text-[#C8BDB7]/90">
                Running in Headless Mode with Shopify Storefront API Integration (Active Mock Catalog)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://shopify.dev/docs/storefront-api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-[#D6B65A] hover:underline flex items-center gap-1"
          >
            <span>Shopify GraphQL Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="text-[#C8BDB7]/60 hover:text-white transition-colors"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
