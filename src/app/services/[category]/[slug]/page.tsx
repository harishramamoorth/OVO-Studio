import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { SERVICE_CATEGORIES, ServiceItem } from "@/lib/constants";

export function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  SERVICE_CATEGORIES.forEach((cat) => {
    cat.services.forEach((service) => {
      params.push({ category: cat.slug, slug: service.slug });
    });
  });
  return params;
}

export default function ServiceDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  let targetService: ServiceItem | undefined;
  let parentCategory = SERVICE_CATEGORIES.find((cat) => cat.slug === params.category);

  for (const cat of SERVICE_CATEGORIES) {
    if (cat.slug === params.category) {
      targetService = cat.services.find((s) => s.slug === params.slug);
      if (targetService) break;
    }
  }

  if (!targetService || !parentCategory) notFound();

  // Find prev/next sibling services for navigation
  const siblings = parentCategory.services;
  const currentIndex = siblings.findIndex((s) => s.slug === params.slug);
  const prevService = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextService = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  // Other services in the same category (excluding current)
  const relatedServices = siblings.filter((s) => s.slug !== params.slug).slice(0, 3);

  return (
    <div className="bg-[#0C040E] min-h-screen text-[#F4EEE5]">

      {/* ── HERO ── */}
      <div className="relative h-[70vh] min-h-[550px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={targetService.image}
            alt={targetService.title}
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C040E]/70 via-transparent to-[#0C040E]" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-6 md:left-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/services" className="text-[#C8BDB7] hover:text-[#D6B65A] transition-colors">Services</Link>
          <span className="text-[#C8BDB7]/30">/</span>
          <Link href={`/services/${parentCategory.slug}`} className="text-[#C8BDB7] hover:text-[#D6B65A] transition-colors">
            {parentCategory.title}
          </Link>
          <span className="text-[#C8BDB7]/30">/</span>
          <span className="text-[#D6B65A]">{targetService.title}</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-20 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(214,182,90,0.1)] border border-[rgba(214,182,90,0.3)] mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6B65A]">{targetService.categoryTitle}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#F4EEE5] uppercase tracking-wide leading-tight mb-4">
            {targetService.title}
          </h1>
          <p className="text-sm md:text-base text-[#C8BDB7] font-light max-w-2xl leading-relaxed">
            {targetService.shortDescription}
          </p>
        </div>
      </div>

      {/* ── SIBLING TAB NAV ── */}
      <div className="sticky top-0 z-40 bg-[#0C040E]/95 backdrop-blur-xl border-b border-[rgba(214,182,90,0.2)]">
        <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {siblings.map((service) => (
            <Link
              key={service.id}
              href={`/services/${params.category}/${service.slug}`}
              className={`flex-shrink-0 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 transition-all duration-300 whitespace-nowrap ${
                service.slug === params.slug
                  ? "border-[#D6B65A] text-[#D6B65A]"
                  : "border-transparent text-[#C8BDB7] hover:text-[#F4EEE5] hover:border-[rgba(214,182,90,0.3)]"
              }`}
            >
              {service.title}
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* Left: Description + Features */}
        <div className="lg:col-span-7 space-y-12">

          {/* Full Description */}
          <div className="space-y-4">
            <div className="w-12 h-[1px] bg-[#D6B65A]" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#F4EEE5]">
              From Vision to Market Success
            </h2>
            <p className="text-sm md:text-base text-[#C8BDB7] leading-relaxed font-light">
              {targetService.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B65A]">Key Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetService.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#170B15] border border-[rgba(214,182,90,0.15)] rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B65A] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#C8BDB7] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B65A]">Client Deliverables</h3>
            <ul className="space-y-3">
              {targetService.deliverables.map((del, i) => (
                <li key={i} className="flex items-center gap-4 py-3 border-b border-[rgba(214,182,90,0.1)] last:border-0">
                  <span className="text-[#D6B65A] font-mono text-xs">0{i + 1}</span>
                  <span className="text-sm text-[#F4EEE5]">{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Sticky CTA Panel */}
        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-28">

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(214,182,90,0.2)] shadow-2xl">
              <img
                src={targetService.image}
                alt={targetService.title}
                className="w-full h-full object-cover brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E]/60 to-transparent" />
            </div>

            {/* CTA Card */}
            <div className="bg-[#170B15] border border-[rgba(214,182,90,0.25)] rounded-2xl p-6 space-y-4">
              <h4 className="text-lg font-serif text-[#F4EEE5]">
                Ready to begin your {targetService.title} project?
              </h4>
              <p className="text-xs text-[#C8BDB7] leading-relaxed">
                Schedule a private strategy session with our Dubai team. No commitment required.
              </p>
              <Link
                href="/book"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(214,182,90,0.3)] transition-all"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/services/${parentCategory.slug}`}
                className="w-full flex items-center justify-center gap-2 border border-[rgba(214,182,90,0.25)] text-[#C8BDB7] hover:border-[#D6B65A] hover:text-[#D6B65A] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to {parentCategory.title}
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* ── PREV / NEXT NAVIGATION ── */}
      {(prevService || nextService) && (
        <div className="border-t border-[rgba(214,182,90,0.15)] bg-[#170B15]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between gap-4">
            {prevService ? (
              <Link
                href={`/services/${params.category}/${prevService.slug}`}
                className="group flex items-center gap-4 hover:text-[#D6B65A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-[rgba(214,182,90,0.3)] flex items-center justify-center group-hover:border-[#D6B65A] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#C8BDB7] mb-1">Previous</p>
                  <p className="text-xs font-semibold">{prevService.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextService ? (
              <Link
                href={`/services/${params.category}/${nextService.slug}`}
                className="group flex items-center gap-4 text-right hover:text-[#D6B65A] transition-colors"
              >
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#C8BDB7] mb-1">Next</p>
                  <p className="text-xs font-semibold">{nextService.title}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[rgba(214,182,90,0.3)] flex items-center justify-center group-hover:border-[#D6B65A] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      )}

      {/* ── RELATED SERVICES ── */}
      {relatedServices.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8BDB7] mb-10 text-center">
            More from {parentCategory.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${params.category}/${service.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 transition-all duration-500 shadow-xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E]/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#D6B65A] opacity-0 group-hover:opacity-100 mb-1 transition-opacity">Explore</p>
                  <h4 className="text-sm font-serif text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors">{service.title}</h4>
                  <p className="text-[10px] text-[#C8BDB7] mt-1 line-clamp-2 font-light">{service.shortDescription}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#D6B65A]/0 group-hover:bg-[#D6B65A] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-[#10070F] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER CTA ── */}
      <div className="py-20 text-center border-t border-[rgba(214,182,90,0.15)] space-y-10 px-6">
        <Link
          href="/book"
          className="inline-flex items-center gap-3 text-2xl font-serif text-[#D6B65A] hover:text-[#F4EEE5] transition-colors group"
        >
          BOOK YOUR APPOINTMENT
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="pt-6 border-t border-[rgba(214,182,90,0.15)] max-w-sm mx-auto">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8BDB7] mb-6">For More Contact Us</h4>
          <div className="flex items-center justify-center gap-4">
            <a href="https://wa.me/971561166811" target="_blank" rel="noreferrer" className="flex items-center justify-center w-32 py-3 bg-[rgba(214,182,90,0.08)] border border-[#D6B65A]/30 text-[#D6B65A] hover:bg-[#D6B65A] hover:text-[#10070F] rounded-lg transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="mailto:info@ovosignature.com" className="flex items-center justify-center w-32 py-3 bg-[rgba(214,182,90,0.08)] border border-[#D6B65A]/30 text-[#D6B65A] hover:bg-[#D6B65A] hover:text-[#10070F] rounded-lg transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
