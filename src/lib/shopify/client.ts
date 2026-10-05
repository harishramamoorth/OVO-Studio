import { ShopifyProduct } from "@/types/shopify";
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from "./queries";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const apiVersion = "2024-04";

export function isShopifyConfigured(): boolean {
  return Boolean(domain && storefrontAccessToken);
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data: T } | null> {
  if (!isShopifyConfigured()) {
    return null;
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Shopify API error: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch from Shopify Storefront API:", error);
    return null;
  }
}

// ── EXPANDED LUXURY MOCK PRODUCTS ──
export const MOCK_SHOPIFY_PRODUCTS: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/101",
    title: "Embellished Gold Thread Silk Abaya",
    handle: "gold-thread-silk-abaya",
    description:
      "Handcrafted in our Dubai atelier with 24k gold leaf micro-embroidery, pure mulberry silk, and a sweeping fluid silhouette designed for royal elegance.",
    descriptionHtml:
      "<p>Handcrafted in our Dubai atelier with 24k gold leaf micro-embroidery, pure mulberry silk, and a sweeping fluid silhouette designed for royal elegance.</p>",
    availableForSale: true,
    vendor: "OVO Signature Atelier",
    category: "Couture Wear",
    tags: ["Abaya", "Haute Couture", "Silk", "New Arrival"],
    priceRange: {
      minVariantPrice: { amount: "4800.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "5500.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
      altText: "Gold Thread Silk Abaya",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
        altText: "Front view of Gold Thread Silk Abaya",
      },
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        altText: "Detail embroidery of Silk Abaya",
      },
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        altText: "Runway look Silk Abaya",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/101-1",
        title: "Small / Noir Gold",
        availableForSale: true,
        price: { amount: "4800.00", currencyCode: "AED" },
        compareAtPrice: { amount: "5200.00", currencyCode: "AED" },
        selectedOptions: [
          { name: "Size", value: "Small" },
          { name: "Color", value: "Noir Gold" },
        ],
      },
      {
        id: "gid://shopify/ProductVariant/101-2",
        title: "Medium / Noir Gold",
        availableForSale: true,
        price: { amount: "4800.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "Medium" },
          { name: "Color", value: "Noir Gold" },
        ],
      },
      {
        id: "gid://shopify/ProductVariant/101-3",
        title: "Bespoke Tailored",
        availableForSale: true,
        price: { amount: "5500.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "Custom Fit" },
          { name: "Color", value: "Noir Gold" },
        ],
      },
    ],
  },
  {
    id: "gid://shopify/Product/102",
    title: "Royal Crimson Velvet Kaftan",
    handle: "royal-crimson-velvet-kaftan",
    description:
      "Plush Italian velvet accented with zardozi embroidery and pearl trim. Engineered for gala evenings and high-profile Dubai galas.",
    descriptionHtml:
      "<p>Plush Italian velvet accented with zardozi embroidery and pearl trim. Engineered for gala evenings and high-profile Dubai galas.</p>",
    availableForSale: true,
    vendor: "OVO Signature Atelier",
    category: "Couture Wear",
    tags: ["Kaftan", "Velvet", "Gala", "Best Seller"],
    priceRange: {
      minVariantPrice: { amount: "6200.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "6200.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
      altText: "Royal Crimson Velvet Kaftan",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
        altText: "Velvet Kaftan Front View",
      },
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        altText: "Kaftan Detail Shot",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/102-1",
        title: "One Size / Royal Crimson",
        availableForSale: true,
        price: { amount: "6200.00", currencyCode: "AED" },
        compareAtPrice: { amount: "7000.00", currencyCode: "AED" },
        selectedOptions: [
          { name: "Size", value: "One Size" },
          { name: "Color", value: "Royal Crimson" },
        ],
      },
    ],
  },
  {
    id: "gid://shopify/Product/103",
    title: "OVO Atelier Signature Oud Perfume (100ml)",
    handle: "ovo-atelier-signature-oud",
    description:
      "A rich blend of rare Cambodian oud, taif rose, ambergris, and smoked vanilla. Bottled in hand-polished obsidian glass with a 24k gold engraved cap.",
    descriptionHtml:
      "<p>A rich blend of rare Cambodian oud, taif rose, ambergris, and smoked vanilla. Bottled in hand-polished obsidian glass with a 24k gold engraved cap.</p>",
    availableForSale: true,
    vendor: "OVO Parfums",
    category: "Fragrance",
    tags: ["Fragrance", "Oud", "Perfume", "Luxury"],
    priceRange: {
      minVariantPrice: { amount: "1450.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "1450.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",
      altText: "OVO Atelier Signature Oud Perfume",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",
        altText: "Perfume Bottle Close Up",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/103-1",
        title: "100ml Eau De Parfum",
        availableForSale: true,
        price: { amount: "1450.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Volume", value: "100ml" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/104",
    title: "Handcrafted Crocodile-Embossed Leather Clutch",
    handle: "crocodile-embossed-leather-clutch",
    description:
      "Crafted from premium Italian calfskin with brushed brass hardware and a removable gold chain link strap. Made in limited quantities of 50 pieces.",
    descriptionHtml:
      "<p>Crafted from premium Italian calfskin with brushed brass hardware and a removable gold chain link strap. Made in limited quantities of 50 pieces.</p>",
    availableForSale: true,
    vendor: "OVO Signature Accessories",
    category: "Accessories",
    tags: ["Leather", "Handbag", "Limited Edition"],
    priceRange: {
      minVariantPrice: { amount: "3200.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "3200.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      altText: "Crocodile-Embossed Leather Clutch",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
        altText: "Leather Clutch Front View",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/104-1",
        title: "Obsidian Gold",
        availableForSale: true,
        price: { amount: "3200.00", currencyCode: "AED" },
        compareAtPrice: { amount: "3600.00", currencyCode: "AED" },
        selectedOptions: [{ name: "Color", value: "Obsidian Gold" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/105",
    title: "Pure Mulberry Silk Monogram Scarf",
    handle: "mulberry-silk-monogram-scarf",
    description:
      "100% heavy mulberry silk twill with hand-rolled edges. Features our bespoke geometric OVO crest monogram in muted gold and burgundy.",
    descriptionHtml:
      "<p>100% heavy mulberry silk twill with hand-rolled edges. Features our bespoke geometric OVO crest monogram in muted gold and burgundy.</p>",
    availableForSale: true,
    vendor: "OVO Signature Accessories",
    category: "Accessories",
    tags: ["Scarf", "Silk", "Monogram"],
    priceRange: {
      minVariantPrice: { amount: "980.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "980.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
      altText: "Pure Mulberry Silk Monogram Scarf",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
        altText: "Silk Scarf Flat Lay",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/105-1",
        title: "90cm x 90cm / Champagne Gold",
        availableForSale: true,
        price: { amount: "980.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "90cm x 90cm" },
          { name: "Color", value: "Champagne Gold" },
        ],
      },
    ],
  },
  {
    id: "gid://shopify/Product/106",
    title: "Private Brand Strategy Retainer (Monthly)",
    handle: "private-brand-strategy-retainer",
    description:
      "1-on-1 fashion brand strategy retainer with OVO senior directors. Includes tech pack audit, supply chain optimization, and retail expansion playbook.",
    descriptionHtml:
      "<p>1-on-1 fashion brand strategy retainer with OVO senior directors. Includes tech pack audit, supply chain optimization, and retail expansion playbook.</p>",
    availableForSale: true,
    vendor: "OVO Advisory Services",
    category: "Advisory Packages",
    tags: ["Services", "Consulting", "Retainer"],
    priceRange: {
      minVariantPrice: { amount: "15000.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "15000.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200&auto=format&fit=crop",
      altText: "Private Brand Strategy Retainer",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200&auto=format&fit=crop",
        altText: "Brand Strategy Workspace",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/106-1",
        title: "Monthly Advisory Pass",
        availableForSale: true,
        price: { amount: "15000.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Duration", value: "Monthly" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/107",
    title: "Emerald Silk Draped Evening Gown",
    handle: "emerald-silk-draped-evening-gown",
    description:
      "Sculptural floor-length gown in heavyweight emerald green silk satin with asymmetrical shoulder draping and hand-finished french seams.",
    descriptionHtml:
      "<p>Sculptural floor-length gown in heavyweight emerald green silk satin with asymmetrical shoulder draping and hand-finished french seams.</p>",
    availableForSale: true,
    vendor: "OVO Signature Atelier",
    category: "Couture Wear",
    tags: ["Evening Gown", "Silk", "Red Carpet"],
    priceRange: {
      minVariantPrice: { amount: "7800.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "8500.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      altText: "Emerald Silk Draped Evening Gown",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        altText: "Emerald Gown Full View",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/107-1",
        title: "EU 38 / Royal Emerald",
        availableForSale: true,
        price: { amount: "7800.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "EU 38" },
          { name: "Color", value: "Royal Emerald" },
        ],
      },
      {
        id: "gid://shopify/ProductVariant/107-2",
        title: "Custom Atelier Measurement",
        availableForSale: true,
        price: { amount: "8500.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Size", value: "Bespoke" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/108",
    title: "24k Gold Geometric Crest Signet Ring",
    handle: "24k-gold-geometric-crest-signet-ring",
    description:
      "Solid 18k yellow gold signet ring featuring hand-carved black onyx and the signature geometric OVO atelier emblem.",
    descriptionHtml:
      "<p>Solid 18k yellow gold signet ring featuring hand-carved black onyx and the signature geometric OVO atelier emblem.</p>",
    availableForSale: true,
    vendor: "OVO Fine Jewelry",
    category: "Fine Jewelry",
    tags: ["Ring", "18k Gold", "Onyx"],
    priceRange: {
      minVariantPrice: { amount: "4200.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "4200.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      altText: "24k Gold Geometric Crest Signet Ring",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        altText: "Gold Signet Ring Macro Shot",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/108-1",
        title: "US 7 / 18k Yellow Gold",
        availableForSale: true,
        price: { amount: "4200.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "US 7" },
          { name: "Material", value: "18k Yellow Gold" },
        ],
      },
    ],
  },
  {
    id: "gid://shopify/Product/109",
    title: "Imperial Amber Extract Elixir (50ml)",
    handle: "imperial-amber-extract-elixir",
    description:
      "Pure perfume oil concentration combining amber resin, saffron, saffron flower, and white musk. Hand-poured into crystal flacons.",
    descriptionHtml:
      "<p>Pure perfume oil concentration combining amber resin, saffron, saffron flower, and white musk. Hand-poured into crystal flacons.</p>",
    availableForSale: true,
    vendor: "OVO Parfums",
    category: "Fragrance",
    tags: ["Fragrance", "Perfume Oil", "Amber"],
    priceRange: {
      minVariantPrice: { amount: "1890.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "1890.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
      altText: "Imperial Amber Extract Elixir",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
        altText: "Amber Perfume Bottle",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/109-1",
        title: "50ml Concentrated Elixir",
        availableForSale: true,
        price: { amount: "1890.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Volume", value: "50ml" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/110",
    title: "Atelier Crystal-Embroidered Satin Mules",
    handle: "atelier-crystal-embroidered-satin-mules",
    description:
      "Handcrafted pointed-toe mules in lustrous champagne satin, finished with Swarovski crystal brooches and cushioned leather soles.",
    descriptionHtml:
      "<p>Handcrafted pointed-toe mules in lustrous champagne satin, finished with Swarovski crystal brooches and cushioned leather soles.</p>",
    availableForSale: true,
    vendor: "OVO Footwear",
    category: "Footwear",
    tags: ["Shoes", "Satin", "Crystals"],
    priceRange: {
      minVariantPrice: { amount: "2800.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "2800.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      altText: "Atelier Crystal-Embroidered Satin Mules",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
        altText: "Champagne Satin Mules",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/110-1",
        title: "EU 38 / Champagne Gold",
        availableForSale: true,
        price: { amount: "2800.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [
          { name: "Size", value: "EU 38" },
          { name: "Color", value: "Champagne" },
        ],
      },
    ],
  },
  {
    id: "gid://shopify/Product/111",
    title: "Hand-Stitched Italian Leather Envelope Wallet",
    handle: "hand-stitched-italian-leather-envelope-wallet",
    description:
      "Ultra-slim grain leather envelope wallet with 6 card slots, coin compartment, and gold foil monogramming.",
    descriptionHtml:
      "<p>Ultra-slim grain leather envelope wallet with 6 card slots, coin compartment, and gold foil monogramming.</p>",
    availableForSale: true,
    vendor: "OVO Signature Accessories",
    category: "Accessories",
    tags: ["Wallet", "Leather", "Monogram"],
    priceRange: {
      minVariantPrice: { amount: "1200.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "1200.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
      altText: "Hand-Stitched Italian Leather Envelope Wallet",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
        altText: "Leather Envelope Wallet",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/111-1",
        title: "Espresso Gold",
        availableForSale: true,
        price: { amount: "1200.00", currencyCode: "AED" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Color", value: "Espresso Gold" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/112",
    title: "Fashion Tech Pack & Production Masterclass Pass",
    handle: "fashion-tech-pack-production-masterclass-pass",
    description:
      "Comprehensive digital workshop + complete 50-page fashion tech pack template kit designed by OVO lead pattern makers.",
    descriptionHtml:
      "<p>Comprehensive digital workshop + complete 50-page fashion tech pack template kit designed by OVO lead pattern makers.</p>",
    availableForSale: true,
    vendor: "OVO Advisory Services",
    category: "Advisory Packages",
    tags: ["Digital Masterclass", "Tech Pack", "Education"],
    priceRange: {
      minVariantPrice: { amount: "2500.00", currencyCode: "AED" },
      maxVariantPrice: { amount: "2500.00", currencyCode: "AED" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      altText: "Fashion Tech Pack & Production Masterclass Pass",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        altText: "Pattern Making & Tech Pack Workspace",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/112-1",
        title: "Instant Digital Access + Template Pass",
        availableForSale: true,
        price: { amount: "2500.00", currencyCode: "AED" },
        compareAtPrice: { amount: "3200.00", currencyCode: "AED" },
        selectedOptions: [{ name: "Access", value: "Full VIP Pass" }],
      },
    ],
  },
];

export async function getProducts(query?: string): Promise<ShopifyProduct[]> {
  if (isShopifyConfigured()) {
    const res = await shopifyFetch<{
      products: {
        edges: Array<{
          node: any;
        }>;
      };
    }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 20, query },
    });

    if (res?.data?.products?.edges) {
      return res.data.products.edges.map(({ node }) => formatShopifyProduct(node));
    }
  }

  // Fallback to mock products when environment variables are not yet provided
  if (query) {
    const q = query.toLowerCase();
    return MOCK_SHOPIFY_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }
  return MOCK_SHOPIFY_PRODUCTS;
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (isShopifyConfigured()) {
    const res = await shopifyFetch<{ product: any }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (res?.data?.product) {
      return formatShopifyProduct(res.data.product);
    }
  }

  const found = MOCK_SHOPIFY_PRODUCTS.find((p) => p.handle === handle);
  return found || null;
}

function formatShopifyProduct(node: any): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    availableForSale: node.availableForSale,
    vendor: node.vendor,
    tags: node.tags || [],
    priceRange: node.priceRange,
    featuredImage: node.featuredImage || { url: "" },
    images: node.images?.edges?.map((e: any) => e.node) || [],
    variants: node.variants?.edges?.map((e: any) => e.node) || [],
  };
}
