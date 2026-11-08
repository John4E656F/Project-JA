import { wedding } from "../../lib/wedding";
import { Floral, eyebrow, sectionPadding } from "./SectionUI";

export function Closing() {
  return (
    <footer
      className={`relative grid min-h-[630px] place-items-center bg-burgundy text-center text-[#fff8f2] sm:min-h-[600px] ${sectionPadding}`}
    >
      <Floral className="-top-[110px] -left-[150px] w-[clamp(280px,45vw,540px)] opacity-90 sm:-top-[90px] sm:-left-[100px]" />
      <Floral className="-right-[150px] -bottom-[110px] w-[clamp(280px,45vw,540px)] rotate-180 opacity-90 sm:-right-[120px]" />
      <div className="reveal relative z-10">
        <span className={`${eyebrow} !text-[#e2b7aa]`}>
          A beautiful beginning
        </span>
        <h2 className="font-display mx-auto my-7 max-w-[650px] text-[clamp(2.6rem,7vw,4.3rem)] leading-[1.05] font-normal">
          One love. One lifetime.
          <br />
          One beautiful beginning.
        </h2>
        <span className="m-5 block text-xl text-[#e4bdab]" aria-hidden="true">
          ✦
        </span>
        <p className="font-display mb-8 text-[1.55rem] italic">
          “We can't wait to celebrate with you!”
        </p>
        <span className="font-script block text-[2.4rem] text-[#ead0c2]">
          With Love,
        </span>
        <strong className="font-script mx-auto mt-1 mb-7 block text-[clamp(2.7rem,8vw,4.5rem)] font-normal">
          {wedding.shortNames}
        </strong>
        <span className="text-[0.65rem] tracking-[0.35em] text-[#dfbcb3]">
          JANUARY 1, 2027
        </span>
      </div>
    </footer>
  );
}
