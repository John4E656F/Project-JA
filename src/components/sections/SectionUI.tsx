export const sectionPadding = "px-[22px] py-[78px] sm:py-[100px]";
export const eyebrow =
  "block text-[0.67rem] font-bold tracking-[0.3em] text-[#9d6a65] uppercase";
export const rule = "mx-auto my-6 block h-px w-[66px] bg-gold";
export const action =
  "inline-flex min-h-12 w-full max-w-[285px] items-center justify-center gap-3 border border-burgundy px-5 py-3 text-center text-[0.71rem] font-bold tracking-[0.14em] uppercase transition-transform hover:-translate-y-0.5";

export function Floral({ className = "" }: { className?: string }) {
  return (
    <img
      className={`pointer-events-none absolute block select-none ${className}`}
      src="/florals/rose-corner.webp"
      alt=""
      aria-hidden="true"
    />
  );
}
