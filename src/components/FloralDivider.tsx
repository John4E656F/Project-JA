type Props = {
  side: "left" | "right";
};

/** Marks a section boundary without adding height to the page. */
export function FloralDivider({ side }: Props) {
  return <div className="h-0" data-floral-side={side} aria-hidden="true" />;
}
