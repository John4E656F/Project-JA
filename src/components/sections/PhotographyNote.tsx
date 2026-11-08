import { eyebrow, sectionPadding } from "./SectionUI";

export function PhotographyNote() {
  return (
    <section className={`reveal bg-[#f4e7e1] text-center ${sectionPadding}`}>
      <span
        className="mx-auto mb-5 block text-[2rem] text-[#a97879]"
        aria-hidden="true"
      >
        ◈
      </span>
      <span className={eyebrow}>John Mark & Ailyn Grace</span>
      <h2 className="font-display my-4 text-[clamp(2.6rem,7vw,4rem)] font-medium text-burgundy">
        Photos Are Welcome
      </h2>
      <p className="font-display mx-auto max-w-[490px] text-[1.45rem] leading-[1.4] italic">
        “We'd love for you to capture and share the beautiful moments of our
        special day!”
      </p>
    </section>
  );
}
