type Props = {
  overline: string;
  title: string;
  inverse?: boolean;
};

export function SectionHeading({ overline, title, inverse = false }: Props) {
  return (
    <div className="reveal mx-auto mb-11 text-center">
      <span
        className={`block text-[0.67rem] font-bold tracking-[0.3em] uppercase ${inverse ? "text-[#dfc1b5]" : "text-[#9d6a65]"}`}
      >
        {overline}
      </span>
      <h2
        className={`font-display mx-auto my-4 text-[clamp(2.7rem,7vw,4.6rem)] leading-[1.06] font-medium ${inverse ? "text-[#fff9f2]" : "text-burgundy"}`}
      >
        {title}
      </h2>
      <span className="block text-[1.15rem] text-gold" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}
