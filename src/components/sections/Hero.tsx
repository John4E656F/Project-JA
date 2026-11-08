import { wedding } from "../../lib/wedding";
import { Floral, eyebrow, rule } from "./SectionUI";

export function Hero() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-svh items-center justify-center bg-[radial-gradient(ellipse_at_center,#fffdf8,#fbf6f0_72%,#f4e8e1)] px-[17px] pt-6 pb-[60px] text-center sm:px-5 sm:pt-10"
    >
      <Floral className="-top-[50px] -left-[130px] w-[240px] opacity-80 sm:-top-[62px] sm:-left-[85px] sm:w-[clamp(245px,35vw,450px)]" />
      <Floral className="-right-[130px] -bottom-[60px] w-[240px] rotate-180 opacity-80 sm:-right-[90px] sm:-bottom-[70px] sm:w-[clamp(245px,35vw,450px)]" />
      <div className="relative z-10 w-full max-w-[720px] border border-[#dfc7b4] p-[7px] sm:p-3">
        <div className="reveal border border-[#e9d7c8] px-[18px] pt-14 pb-11 sm:px-7 sm:pt-[clamp(55px,10vw,95px)] sm:pb-[58px]">
          <span className={eyebrow}>Wedding Ceremony & Reception</span>
          <div className="mx-auto mt-7 mb-2">
            <h2 className="font-display m-0 text-[clamp(3.15rem,9vw,5.9rem)] leading-[0.93] font-medium text-burgundy">
              {wedding.groom}
            </h2>
            <span className="font-script mx-auto my-2 block text-center text-[clamp(3rem,8vw,4.4rem)] leading-[0.95] text-gold">
              &
            </span>
            <h2 className="font-display m-0 text-[clamp(3.15rem,9vw,5.9rem)] leading-[0.93] font-medium text-burgundy">
              {wedding.bride}
            </h2>
          </div>
          <span className={rule} aria-hidden="true" />
          <p className="font-script mb-3 text-[clamp(2.25rem,6vw,3rem)] text-burgundy">
            We're getting married!
          </p>
          <p className="font-display mx-auto mb-7 max-w-[390px] text-[clamp(1.2rem,3vw,1.55rem)] leading-[1.4] italic">
            “{wedding.message}”
          </p>
          <div className="font-display flex flex-wrap items-center justify-center gap-2 text-[clamp(1rem,3vw,1.35rem)] font-semibold text-burgundy sm:gap-3.5">
            <span>{wedding.date}</span>
            <i className="text-[0.6rem] not-italic text-gold">✦</i>
            <span>{wedding.time}</span>
          </div>
          <p className="mt-2 text-[0.62rem] font-bold tracking-[0.2em] uppercase">
            Wedding Ceremony & Reception
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 z-20 text-[0.6rem] font-bold tracking-[0.22em] text-[#987a73]">
        SCROLL TO DISCOVER{" "}
        <span className="mt-1 block text-xl tracking-normal">↓</span>
      </div>
    </section>
  );
}
