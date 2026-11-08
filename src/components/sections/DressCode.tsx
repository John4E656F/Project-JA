import { SectionHeading } from "../SectionHeading";
import { rule, sectionPadding } from "./SectionUI";

export function DressCode() {
  return (
    <section className={`bg-cream text-center ${sectionPadding}`}>
      <SectionHeading overline="Burgundy & Nude" title="Dress Code" />
      <div className="reveal mx-auto max-w-[500px]">
        <p className="font-display mb-0 text-[clamp(2.5rem,7vw,3.6rem)] text-burgundy">
          Semi-Formal
        </p>
        <p className="font-display m-0 text-2xl italic">
          Classy but Comfortable
        </p>
        <span className={rule} aria-hidden="true" />
        <p className="mb-3 text-[0.65rem] font-bold tracking-[0.25em] text-[#997973]">
          WEDDING MOTIF
        </p>
        <p className="font-display mb-4 text-[2.5rem] text-burgundy">
          Burgundy <em className="font-script not-italic text-gold">&</em> Nude
        </p>
        <div
          className="flex justify-center gap-3.5"
          aria-label="Burgundy and nude color motif"
        >
          <span className="h-[45px] w-[45px] rounded-full border border-[#d7bdb1] bg-burgundy shadow-[0_3px_9px_#55333326,inset_0_0_0_4px_#fff8f4]" />
          <span className="h-[45px] w-[45px] rounded-full border border-[#d7bdb1] bg-[#d8b8a6] shadow-[0_3px_9px_#55333326,inset_0_0_0_4px_#fff8f4]" />
        </div>
      </div>
    </section>
  );
}
