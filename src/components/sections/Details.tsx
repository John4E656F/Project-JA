import { wedding } from "../../lib/wedding";
import { googleCalendarUrl } from "../../lib/calendar";
import { CalendarDownloadButton } from "../CalendarDownloadButton";
import { action, eyebrow, sectionPadding } from "./SectionUI";

export function Details() {
  return (
    <section className={`relative bg-[#f7eee8] text-center ${sectionPadding}`}>
      <div className="reveal relative mx-auto max-w-[680px] border border-[#e2cdbf] bg-[#fffaf5] px-[18px] py-[55px] shadow-[0_16px_50px_#6f3e3e10] before:pointer-events-none before:absolute before:inset-[7px] before:border before:border-[#eadbd0] sm:px-6 sm:py-[65px] sm:before:inset-[10px]">
        <span className={eyebrow}>The celebration</span>
        <h2 className="font-display mx-auto my-6 text-[clamp(3rem,8vw,4.5rem)] leading-[0.95] font-medium text-burgundy">
          Wedding Ceremony
          <br />
          <span className="font-script font-normal text-gold">&</span> Reception
        </h2>
        <span className="block text-xl text-gold" aria-hidden="true">
          ✦
        </span>
        <div className="mx-auto mt-7 max-w-[390px]">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.23em] text-[#9a746f] uppercase">
            Friday
          </span>
          <strong className="font-display block text-[1.65rem] leading-[1.05] font-semibold text-burgundy sm:text-[1.85rem]">
            January 1, 2027
          </strong>
        </div>
        <div className="mx-auto mt-7 max-w-[390px]">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.23em] text-[#9a746f] uppercase">
            Beginning at
          </span>
          <strong className="font-display block text-[1.65rem] leading-[1.05] font-semibold text-burgundy sm:text-[1.85rem]">
            9:00 AM
          </strong>
        </div>
        <div className="mx-auto mt-7 max-w-[390px]">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.23em] text-[#9a746f] uppercase">
            At
          </span>
          <strong className="font-display block text-[1.65rem] leading-[1.05] font-semibold text-burgundy sm:text-[1.85rem]">
            {wedding.venue}
          </strong>
          <p className="mt-2 text-sm leading-relaxed">{wedding.address}</p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-2.5">
          <a
            className={`${action} bg-burgundy text-[#fff8f2] hover:bg-[#542033]`}
            href={wedding.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions <span aria-hidden="true">↗</span>
          </a>
          <a
            className={`${action} text-burgundy hover:bg-[#f4e5e0]`}
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Calendar <span aria-hidden="true">↗</span>
          </a>
          <CalendarDownloadButton />
        </div>
      </div>
    </section>
  );
}
