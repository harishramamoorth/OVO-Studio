const fs = require('fs');

const dirs = [
  "public", "src/app/about", "src/app/contact", "src/app/pricing",
  "src/app/api/contact", "src/app/api/booking",
  "src/app/services/fashion-business-consulting/brand-strategy-launching",
  "src/app/services/fashion-business-consulting/brand-booster-scaling",
  "src/app/services/fashion-business-consulting/market-positioning-pricing",
  "src/app/services/fashion-brand-development/design-and-development",
  "src/app/services/fashion-brand-development/sampling-production",
  "src/app/services/fashion-brand-development/fashion-tech-pack",
  "src/app/services/fashion-brand-development/bespoke-design",
  "src/app/services/digital-presence/branding",
  "src/app/services/digital-presence/luxury-packaging-solutions",
  "src/app/services/digital-presence/marketing-social-media",
  "src/app/services/digital-presence/website-design",
  "src/app/services/digital-presence/e-commerce-store",
  "src/app/services/digital-presence/inventory-order-system",
  "src/app/services/marketing-and-promotion/digital-advertising",
  "src/app/services/marketing-and-promotion/campaign-management",
  "src/app/services/marketing-and-promotion/influencer-media-collaboration",
  "src/app/services/content-creation/fashion-photoshoot",
  "src/app/services/content-creation/cinematic-videographys",
  "src/app/services/content-creation/social-media-content",
  "src/components/animations", "src/components/common", "src/components/layout",
  "src/components/sections", "src/components/shopify", "src/context",
  "src/hooks", "src/lib/shopify", "src/styles", "src/types"
];

const files = [
  "src/app/layout.tsx", "src/app/page.tsx", "src/app/about/page.tsx",
  "src/app/contact/page.tsx", "src/app/pricing/page.tsx", "src/app/services/page.tsx",
  "src/app/api/contact/route.ts", "src/app/api/booking/route.ts",
  "src/app/services/fashion-business-consulting/brand-strategy-launching/page.tsx",
  "src/app/services/fashion-business-consulting/brand-booster-scaling/page.tsx",
  "src/app/services/fashion-business-consulting/market-positioning-pricing/page.tsx",
  "src/app/services/fashion-brand-development/design-and-development/page.tsx",
  "src/app/services/fashion-brand-development/sampling-production/page.tsx",
  "src/app/services/fashion-brand-development/fashion-tech-pack/page.tsx",
  "src/app/services/fashion-brand-development/bespoke-design/page.tsx",
  "src/app/services/digital-presence/branding/page.tsx",
  "src/app/services/digital-presence/luxury-packaging-solutions/page.tsx",
  "src/app/services/digital-presence/marketing-social-media/page.tsx",
  "src/app/services/digital-presence/website-design/page.tsx",
  "src/app/services/digital-presence/e-commerce-store/page.tsx",
  "src/app/services/digital-presence/inventory-order-system/page.tsx",
  "src/app/services/marketing-and-promotion/digital-advertising/page.tsx",
  "src/app/services/marketing-and-promotion/campaign-management/page.tsx",
  "src/app/services/marketing-and-promotion/influencer-media-collaboration/page.tsx",
  "src/app/services/content-creation/fashion-photoshoot/page.tsx",
  "src/app/services/content-creation/cinematic-videographys/page.tsx",
  "src/app/services/content-creation/social-media-content/page.tsx",
  "src/components/animations/FadeIn.tsx", "src/components/animations/PageTransition.tsx",
  "src/context/CartContext.tsx", "src/hooks/useCart.ts", "src/hooks/useScroll.ts",
  "src/lib/constants.ts", "src/lib/mongodb.ts", "src/lib/shopify/client.ts",
  "src/lib/shopify/mutations.ts", "src/lib/shopify/queries.ts",
  "src/styles/globals.css", "src/types/shopify.d.ts"
];

dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));
files.forEach(file => fs.writeFileSync(file, ''));

console.log("Project structure created successfully!");