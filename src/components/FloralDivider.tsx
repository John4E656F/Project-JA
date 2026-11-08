type Props = {
  side: "left" | "right";
};

/** A zero-height layer centered on the boundary between two sections. */
export function FloralDivider({ side }: Props) {
  return (
    <div className="pointer-events-none relative z-40 h-0" aria-hidden="true">
      <img
        src="/florals/rose-corner.webp"
        alt=""
        className={`absolute top-0 w-[250px] max-w-none -translate-y-1/2 select-none sm:w-[clamp(280px,34vw,420px)] ${
          side === "left"
            ? "-left-[100px] rotate-180 sm:-left-[115px]"
            : "-right-[100px] sm:-right-[115px]"
        }`}
      />
    </div>
  );
}
