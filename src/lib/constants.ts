export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  videoUrl?: string;
  gallery?: string[];
  features: string[];
  deliverables: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  services: ServiceItem[];
}

export const VIDEO_ASSETS = {
  heroPrimary: "/media/fashion/story-01.mp4",
  heroFallback: "/media/fashion/story-02.mp4",
  contentCreation: "/media/fashion/story-03.mp4",
  mobileVertical: "/media/fashion/story-04.mp4",
};

export const IMAGE_ASSETS = {
  heroPoster: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
  aboutDesigner: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1800&auto=format&fit=crop",
  brandStrategy: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1800&auto=format&fit=crop",
  designDevelopment: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1800&auto=format&fit=crop",
  techPackPatterns: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1800&auto=format&fit=crop",
  dubaiFashion: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop",
  luxuryDigital: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop",
  marketingCampaign: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1800&auto=format&fit=crop",
  editorialPhotoshoot: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1800&auto=format&fit=crop",
};

export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasMegaMenu: true },
  { name: "Pricing & Plans", href: "/pricing" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "consulting",
    title: "Fashion Business Consulting",
    slug: "fashion-business-consulting",
    description: "From launching your brand to scaling it globally, we provide the strategy, insight, and tools needed to thrive in the luxury market.",
    services: [
      {
        id: "brand-strategy-launching",
        slug: "brand-strategy-launching",
        title: "Brand Strategy & Launching",
        categorySlug: "fashion-business-consulting",
        categoryTitle: "Fashion Business Consulting",
        shortDescription: "360° roadmap for luxury brand establishment, business modeling, and high-impact market entry in Dubai & global capitals.",
        fullDescription: "Establishing a luxury fashion brand demands meticulous positioning, capital efficiency, and an unquestionable narrative. We architect your brand foundation from financial modeling to identity blueprinting.",
        image: IMAGE_ASSETS.brandStrategy,
        features: [
          "Strategic Market Analysis & Competitive Profiling",
          "Financial Forecasting & Margin Optimization",
          "Collection Architecture & Merchandising Plan",
          "Go-to-Market Launch Strategy & PR Integration"
        ],
        deliverables: ["12-Month Brand Roadmap", "Financial Projection Matrix", "Brand Positioning Deck", "Launch Timeline Blueprint"]
      },
      {
        id: "brand-booster-scaling",
        slug: "brand-booster-scaling",
        title: "Brand Booster & Scaling",
        categorySlug: "fashion-business-consulting",
        categoryTitle: "Fashion Business Consulting",
        shortDescription: "Strategic expansion strategies, wholesale distribution pipelines, and retail penetration for established labels.",
        fullDescription: "Accelerate your brand growth through multi-channel expansion, international wholesale representation, pop-up concepts, and strategic retail partnerships.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1800&auto=format&fit=crop",
        features: [
          "Wholesale & Retail Channel Expansion",
          "International Trade Show Preparation",
          "Supply Chain Capacity Scaling",
          "Operational Efficiency Restructuring"
        ],
        deliverables: ["Scaling Playbook", "Buyer Pitch Kit", "Distribution Matrix", "Expansion Capital Plan"]
      },
      {
        id: "market-positioning-pricing",
        slug: "market-positioning-pricing",
        title: "Market Positioning & Pricing",
        categorySlug: "fashion-business-consulting",
        categoryTitle: "Fashion Business Consulting",
        shortDescription: "Psychological luxury pricing frameworks and high-end market alignment strategy.",
        fullDescription: "Determine the optimum price tier for couture, ready-to-wear, and luxury accessories. Align perceived value with production realities to maximize gross margins.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop",
        features: [
          "Luxury Pricing Psychology & Elasticity Analysis",
          "COGS & Margin Calibration",
          "Competitor Price Benchmarking",
          "VIP & Private Client Pricing Structure"
        ],
        deliverables: ["Pricing Architecture Model", "Margin Analysis Report", "Tiered Pricing Sheet", "Value Perception Strategy"]
      }
    ]
  },
  {
    id: "development",
    title: "Fashion Brand Development",
    slug: "fashion-brand-development",
    description: "Building a strong, cohesive brand is essential for standing out in a competitive fashion industry.",
    services: [
      {
        id: "design-and-development",
        slug: "design-and-development",
        title: "Design & Development",
        categorySlug: "fashion-brand-development",
        categoryTitle: "Fashion Brand Development",
        shortDescription: "Creative direction, moodboards, color palette curation, and garment design development for haute couture and RTW.",
        fullDescription: "Transform creative vision into production-ready fashion collections with our atelier-trained design team.",
        image: IMAGE_ASSETS.designDevelopment,
        features: ["Seasonal Creative Direction", "Concept & Moodboard Development", "Original Sketching & CAD Rendering", "Textile & Trim Sourcing"],
        deliverables: ["Collection Line Sheet", "Color & Fabric Palette", "Full Design Flat Sheets", "Material Specification Manual"]
      },
      {
        id: "bespoke-design",
        slug: "bespoke-design",
        title: "Bespoke Design",
        categorySlug: "fashion-brand-development",
        categoryTitle: "Fashion Brand Development",
        shortDescription: "Custom haute couture, red-carpet, and limited-edition design craftsmanship.",
        fullDescription: "Exclusive bespoke garment design tailored for VIP clientele, red carpet appearances, and private capsule collections.",
        image: IMAGE_ASSETS.aboutDesigner,
        features: ["Custom Silhouette Development", "Hand-Embroidered Detailing", "Made-to-Measure Pattern Crafting", "Private Atelier Fitting Sessions"],
        deliverables: ["Custom Fashion Illustrations", "Pattern Prototypes", "Bespoke Finishing Guide"]
      },
      {
        id: "fashion-tech-pack",
        slug: "fashion-tech-pack",
        title: "Fashion Tech Pack",
        categorySlug: "fashion-brand-development",
        categoryTitle: "Fashion Brand Development",
        shortDescription: "Comprehensive technical packages ensuring factory precision, reduced sampling costs, and flawless manufacturing.",
        fullDescription: "Factory-ready specification packages complete with flat sketches, grading charts, BOM (Bill of Materials), and stitch details.",
        image: IMAGE_ASSETS.techPackPatterns,
        features: ["Detailed Vector Flat Sketches", "Graded Measurement Specs", "Bill of Materials (BOM)", "Construction & Seam Specs"],
        deliverables: ["Production-Ready Tech Packs (PDF/AI)", "Measurement Spec Sheets", "Labeling & Packaging Placement"]
      },
      {
        id: "sampling-production",
        slug: "sampling-production",
        title: "Sampling & Production",
        categorySlug: "fashion-brand-development",
        categoryTitle: "Fashion Brand Development",
        shortDescription: "End-to-end prototyping, sample fits, quality control, and boutique manufacturing management in Dubai & Europe.",
        fullDescription: "Seamless transition from 2D designs to physical samples and small-to-large batch luxury garment production.",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1800&auto=format&fit=crop",
        features: ["First Prototype & Fit Samples", "Ethical & Luxury Factory Sourcing", "On-site Quality Control Inspections", "Packaging & Customs Logistics"],
        deliverables: ["Gold Master Samples", "Production Quality Report", "Batch Delivery Schedule"]
      }
    ]
  },
  {
    id: "digital",
    title: "Digital Presence",
    slug: "digital-presence",
    description: "Your brand deserves a digital presence as distinctive as your collection.",
    services: [
      {
        id: "e-commerce-store",
        slug: "e-commerce-store",
        title: "E-commerce Store",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Bespoke Shopify Plus / Next.js luxury e-commerce platforms engineered for high conversion and immersive storytelling.",
        fullDescription: "Custom luxury digital flagship stores designed to showcase high fashion collections with flawless speed, international currency conversion, and bespoke checkout.",
        image: IMAGE_ASSETS.luxuryDigital,
        features: ["Custom UI/UX Luxury Interface", "Shopify Plus / Headless Integration", "Multi-Currency & Global Shipping Setup", "High-Speed Mobile Optimization"],
        deliverables: ["Custom E-commerce Storefront", "Admin Training Package", "Payment Gateway Setup"]
      },
      {
        id: "website-design",
        slug: "website-design",
        title: "Website Design",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Editorial web experiences, digital lookbooks, and brand storytelling portals.",
        fullDescription: "Sleek, fluid websites crafted to project luxury authority, showcase press, host interactive lookbooks, and capture VIP leads.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
        features: ["Editorial Typography & Grid Layouts", "Interactive Lookbook Galleries", "VIP Portal & Password Protection", "SEO & Meta Performance Setup"],
        deliverables: ["Custom Web Application", "CMS Integration", "SEO Audit Report"]
      },
      {
        id: "branding",
        slug: "branding",
        title: "Branding",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Visual identity design, logo typography, brand guidelines, and distinctive iconography for modern luxury houses.",
        fullDescription: "Comprehensive identity creation including logotypes, brand marks, typography pairings, color systems, and brand guidelines.",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1800&auto=format&fit=crop",
        features: ["Primary & Secondary Logotype", "Typography System & Pairing", "Color Palette Token System", "Complete Brand Guidelines Book"],
        deliverables: ["Brand Identity Book (PDF)", "Vector Logo Files", "Typography Assets", "Brand Asset Kit"]
      },
      {
        id: "marketing-social-media",
        slug: "marketing-social-media",
        title: "Marketing & Social Media",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Curated aesthetic feed design, content calendar strategy, and social community growth for Instagram & TikTok.",
        fullDescription: "Transform social channels into high-converting digital storefronts through elevated aesthetic curation and target audience engagement.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1800&auto=format&fit=crop",
        features: ["Aesthetic Feed Grid Design", "Monthly Content Strategy & Calendar", "Copywriting & Tone of Voice", "Community Engagement Management"],
        deliverables: ["Grid Layout Templates", "Monthly Content Calendar", "Performance Analytics Report"]
      },
      {
        id: "inventory-order-system",
        slug: "inventory-order-system",
        title: "Inventory & Order System",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Automated ERP & inventory synchronization for boutique retail and multi-warehouse order fulfillment.",
        fullDescription: "Streamline stock management, barcode tracking, returns management, and real-time inventory sync between e-commerce and physical pop-ups.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1800&auto=format&fit=crop",
        features: ["Multi-Warehouse Inventory Sync", "Automated Order Fulfillment Workflows", "Barcode & RFID Tagging Integration", "Returns & Exchange Automation"],
        deliverables: ["ERP Integration System", "Inventory Dashboard", "Warehouse Operations Guide"]
      },
      {
        id: "luxury-packaging-solutions",
        slug: "luxury-packaging-solutions",
        title: "Luxury Packaging Solutions",
        categorySlug: "digital-presence",
        categoryTitle: "Digital Presence",
        shortDescription: "Custom rigid boxes, silk ribbons, embossed garment bags, and unboxing experiences.",
        fullDescription: "Unforgettable physical unboxing touchpoints engineered with sustainable luxury paper, gold foil stamping, custom garment covers, and scented tissue paper.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1800&auto=format&fit=crop",
        features: ["Bespoke Box & Garment Bag Design", "Sustainable Eco-Luxury Materials", "Foil Stamping & Embossing Specs", "Supplier Manufacturing Sourcing"],
        deliverables: ["Packaging Dielines (AI/PDF)", "3D Rendered Packaging Mockups", "Material Spec Sheets"]
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing & Promotion",
    slug: "marketing-and-promotion",
    description: "Transform attention into meaningful brand growth.",
    services: [
      {
        id: "digital-advertising",
        slug: "digital-advertising",
        title: "Digital Advertising",
        categorySlug: "marketing-and-promotion",
        categoryTitle: "Marketing & Promotion",
        shortDescription: "High-ROI paid social campaigns across Meta, TikTok, Pinterest, and Google Ads targeted at high-net-worth fashion consumers.",
        fullDescription: "Data-driven ad campaigns crafted specifically for luxury fashion acquisition, retargeting VIP shoppers, and driving high ROAS.",
        image: IMAGE_ASSETS.marketingCampaign,
        features: ["Meta & TikTok ROAS Optimization", "High-Net-Worth Audience Targeting", "A/B Dynamic Ad Creative Testing", "Conversion Rate Optimization"],
        deliverables: ["Ad Campaign Setup", "Creative Ad Copy & Assets", "Weekly Performance Dashboard"]
      },
      {
        id: "campaign-management",
        slug: "campaign-management",
        title: "Campaign Management",
        categorySlug: "marketing-and-promotion",
        categoryTitle: "Marketing & Promotion",
        shortDescription: "Full campaign rollouts, fashion week activations, and product drop strategies.",
        fullDescription: "Seamless execution of seasonal capsule drops, press releases, pop-up events, and digital product launch countdowns.",
        image: IMAGE_ASSETS.dubaiFashion,
        features: ["Product Drop Countdown Strategy", "Press Release Distribution", "VIP Preview Event Planning", "Cross-Channel Campaign Coordination"],
        deliverables: ["Campaign Master Timeline", "Press Release Kit", "Drop Execution Playbook"]
      },
      {
        id: "influencer-media-collaboration",
        slug: "influencer-media-collaboration",
        title: "Influencer & Media Collaboration",
        categorySlug: "marketing-and-promotion",
        categoryTitle: "Marketing & Promotion",
        shortDescription: "Middle East & global fashion influencer gifting, VIP celebrity seeding, and editorial magazine features.",
        fullDescription: "Connect your label with top fashion tastemakers, Vogue Arabia contributors, regional fashion icons, and red carpet stylists.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop",
        features: ["Influencer Matching & Vetting", "Seeding & Gifting Box Distribution", "Editorial PR & Stylist Relations", "Contract & Usage Rights Negotiation"],
        deliverables: ["Influencer Roster Deck", "PR Placement Report", "Media Coverage Clipping Kit"]
      }
    ]
  },
  {
    id: "content",
    title: "Content Creation",
    slug: "content-creation",
    description: "From fashion photoshoots to cinematic storytelling, we create visual experiences that embody your brand.",
    services: [
      {
        id: "fashion-photoshoot",
        slug: "fashion-photoshoot",
        title: "Fashion Photoshoot",
        categorySlug: "content-creation",
        categoryTitle: "Content Creation",
        shortDescription: "High-fashion lookbook, editorial campaign, and e-commerce studio photography with top models and stylists.",
        fullDescription: "World-class fashion imagery produced in Dubai and international studios, complete with art direction, hair/makeup, casting, and retouched masters.",
        image: IMAGE_ASSETS.editorialPhotoshoot,
        features: ["International Model Casting", "Art Direction & Set Design", "High-Resolution Master Retouching", "E-commerce & Campaign Cutouts"],
        deliverables: ["Edited High-Res Campaign Imagery", "Web-Optimized Image Assets", "Raw Master Files"]
      },
      {
        id: "cinematic-videography",
        slug: "cinematic-videography",
        title: "Cinematic Videography",
        categorySlug: "content-creation",
        categoryTitle: "Content Creation",
        shortDescription: "Brand campaign films, runway highlights, and high-end video storytelling for web and digital screens.",
        fullDescription: "Cinematic 4K fashion films engineered with slow-motion aesthetics, color grading, custom sound design, and vertical cuts for social.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1800&auto=format&fit=crop",
        videoUrl: VIDEO_ASSETS.contentCreation,
        features: ["4K Cinema Camera Production", "Editorial Color Grading & FX", "Custom Sound Design & Score", "Horizontal & 9:16 Vertical Cuts"],
        deliverables: ["4K Hero Campaign Film", "15s & 30s Social Cutdowns", "Behind-The-Scenes Video"]
      },
      {
        id: "social-media-content",
        slug: "social-media-content",
        title: "Social Media Content",
        categorySlug: "content-creation",
        categoryTitle: "Content Creation",
        shortDescription: "High-frequency Instagram Reels, TikTok video clips, and lifestyle content generation.",
        fullDescription: "Engaging short-form video content designed for viral reach, aesthetic alignment, and continuous social publishing.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1800&auto=format&fit=crop",
        videoUrl: VIDEO_ASSETS.mobileVertical,
        features: ["Weekly Short-Form Reels & TikToks", "Trending Audio & Transition Editing", "Behind-The-Scenes Atelier Footage", "Product Highlight Clips"],
        deliverables: ["20+ Vertical Video Reels/Month", "Raw Behind-The-Scenes Library", "Caption & Hashtag Strategy"]
      }
    ]
  }
];

export const CLIENT_LOGOS = [
  { name: "VOGUE ARABIA", label: "Vogue Arabia" },
  { name: "HARPER'S BAZAAR", label: "Harper's Bazaar" },
  { name: "ELIE SAAB", label: "Elie Saab" },
  { name: "BALMAIN DUBAI", label: "Balmain Dubai" },
  { name: "L'OFFICIEL", label: "L'Officiel" },
  { name: "BLOOMINGDALE'S", label: "Bloomingdale's" },
  { name: "HARVEY NICHOLS", label: "Harvey Nichols" },
  { name: "GALERIES LAFAYETTE", label: "Galeries Lafayette" },
];

export const STATS = [
  { value: 2000, display: "2K+", label: "Clients", sub: "Fashion brands launched & elevated" },
  { value: 95, display: "95%", label: "Positive Reviews", sub: "Client satisfaction rate" },
  { value: 25, display: "25+", label: "Services", sub: "360° fashion solutions" },
];

export const TESTIMONIALS = [
  {
    quote: "Luxury Signature elevated our label from a local atelier into an international luxury brand featured in Vogue Arabia. Their tech packs, photography, and strategy were flawless.",
    name: "Soraya Al-Mansoor",
    role: "Founder & Creative Director",
    company: "Maison Soraya (Dubai)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    location: "Dubai, UAE"
  },
  {
    quote: "The team’s deep understanding of Middle Eastern luxury aesthetics combined with European craftsmanship made our e-commerce launch hit record sales within the first week.",
    name: "Antoine Laurent",
    role: "Managing Director",
    company: "Laurent RTW (Paris / Dubai)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    location: "Paris / Dubai"
  },
  {
    quote: "From pattern making to our cinematic campaign video in the Dubai desert, Luxury Signature provided unmatched precision and creative brilliance.",
    name: "Elena Rostova",
    role: "Head of Design",
    company: "Rostova Couture (Milan)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    location: "Milan, Italy"
  }
];

export const PRICING_PLANS = [
  {
    name: "EMERGE & LAUNCH",
    subtitle: "For emerging fashion designers & boutique labels launching their first collection.",
    price: "$4,500",
    period: "/ project base",
    popular: false,
    features: [
      "Brand Strategy & Positioning Blueprint",
      "Full Tech Pack for up to 5 Garments",
      "Prototyping & Sample Inspection",
      "Custom Shopify Luxury E-commerce Store",
      "Basic Brand Identity & Logo Kit",
      "Launch Social Media Content (10 Reels/Posts)"
    ],
    cta: "Start Launch Plan"
  },
  {
    name: "LUXURY SIGNATURE 360°",
    subtitle: "Complete turnkey solution for high-end fashion brands establishing global presence.",
    price: "$9,800",
    period: "/ project base",
    popular: true,
    features: [
      "360° Brand Strategy & Scaling Matrix",
      "Full Collection Design & Tech Packs (Up to 15 items)",
      "Factory Sampling & Quality Assurance",
      "Bespoke High-Speed Headless E-commerce",
      "Editorial Fashion Photoshoot & Campaign Film",
      "Luxury Packaging Design & Dielines",
      "Middle East PR & Influencer Seeding Setup"
    ],
    cta: "Book 360° Consultation"
  },
  {
    name: "GLOBAL SCALING HOUTE",
    subtitle: "For established luxury fashion houses expanding retail, wholesale & digital reach.",
    price: "$18,500+",
    period: "/ tailored scope",
    popular: false,
    features: [
      "Wholesale & International Retail Distribution Plan",
      "Custom Couture & Bespoke Line Architecture",
      "Omnichannel ERP & Multi-Warehouse Setup",
      "Dedicated Creative & Art Direction Team",
      "Full Campaign Management & Media Placement",
      "Exclusive VIP Private Client Portal Development",
      "Quarterly Strategy Retainer & Executive Support"
    ],
    cta: "Request Tailored Proposal"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Desert Solitude Campaign",
    category: "Fashion Photoshoot",
    image: IMAGE_ASSETS.dubaiFashion,
    span: "col-span-1 md:col-span-2 row-span-2",
    aspect: "aspect-[4/5]"
  },
  {
    id: "g2",
    title: "Runway Haute Couture Film",
    category: "Cinematic Videography",
    image: IMAGE_ASSETS.designDevelopment,
    videoUrl: VIDEO_ASSETS.contentCreation,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g3",
    title: "Velvet Horizons RTW",
    category: "Social Media Content",
    image: IMAGE_ASSETS.editorialPhotoshoot,
    videoUrl: VIDEO_ASSETS.mobileVertical,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g4",
    title: "Atelier Silk & Patterns",
    category: "Fashion Photoshoot",
    image: IMAGE_ASSETS.aboutDesigner,
    span: "col-span-1 row-span-2",
    aspect: "aspect-[4/5]"
  },
  {
    id: "g5",
    title: "Royal Embroidery & Tech Pack Details",
    category: "Cinematic Videography",
    image: IMAGE_ASSETS.techPackPatterns,
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]"
  }
];
