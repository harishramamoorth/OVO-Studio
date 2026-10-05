export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  featuredImage: ShopifyImage;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  tags?: string[];
  vendor?: string;
  category?: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage: ShopifyImage;
    };
    price: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
  };
  lines: ShopifyCartLine[];
}

export interface CartItem {
  id: string; // Line item ID or variant ID
  variantId: string;
  productId: string;
  productTitle: string;
  variantTitle: string;
  handle: string;
  price: number;
  currencyCode: string;
  image: string;
  quantity: number;
}
