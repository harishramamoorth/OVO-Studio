import LuxuryLogoEmblem from "@/components/common/LuxuryLogoEmblem";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090308] text-[#F4EEE5]">
      <div className="relative flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center animate-pulse">
          <LuxuryLogoEmblem size={110} glow={true} />
        </div>
        <span className="font-serif text-base tracking-[0.3em] uppercase text-[#D6B65A] animate-pulse">
          LUXURY SIGNATURE
        </span>
      </div>
    </div>
  );
}
