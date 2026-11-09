type Props = {
  side: "left" | "right";
  shape?: "corner-up-left";
};

/** Marks a section boundary without adding height to the page. */
export function FloralDivider({ side, shape }: Props) {
  return (
    <div
      className="h-0"
      data-floral-side={side}
      data-floral-shape={shape}
      aria-hidden="true"
    />
  );
}
