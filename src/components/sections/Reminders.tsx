import { wedding } from "../../lib/wedding";
import { SectionHeading } from "../SectionHeading";
import { sectionPadding } from "./SectionUI";

export function Reminders() {
  return (
    <section className={`bg-[#fffaf5] ${sectionPadding}`}>
      <SectionHeading overline="January 1, 2027" title="Gentle Reminders" />
      <div className="reveal mx-auto max-w-[720px] border-t border-[#e2c8b9]">
        {wedding.reminders.map((item, index) => (
          <div
            className="grid grid-cols-[35px_1fr_20px] items-start gap-3 border-b border-[#e2c8b9] py-6 sm:grid-cols-[55px_1fr_30px] sm:gap-5"
            key={item.title}
          >
            <span className="font-display text-[1.55rem] text-gold">
              0{index + 1}
            </span>
            <div>
              <h3 className="font-display mb-1 text-[1.6rem] font-semibold text-burgundy">
                {item.title}
              </h3>
              <p className="m-0 text-sm leading-[1.7] text-[#5b4850]">
                {item.text}
              </p>
            </div>
            <span className="text-[1.45rem] text-gold" aria-hidden="true">
              ✽
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
