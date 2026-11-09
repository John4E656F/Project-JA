import { InvitationExperience } from "../src/components/InvitationExperience";
import { Countdown } from "../src/components/Countdown";
import { Gallery } from "../src/components/Gallery";
import { Hero } from "../src/components/sections/Hero";
import { Details } from "../src/components/sections/Details";
import { DressCode } from "../src/components/sections/DressCode";
import { Reminders } from "../src/components/sections/Reminders";
import { PhotographyNote } from "../src/components/sections/PhotographyNote";
import { Closing } from "../src/components/sections/Closing";
import { FloralDivider } from "../src/components/FloralDivider";
import { wedding } from "../src/lib/wedding";

export default function Page() {
  return (
    <InvitationExperience>
      <Hero />
      <FloralDivider side="right" shape="corner-up-left" />
      <Countdown />
      <FloralDivider side="left" />
      <Details />
      <FloralDivider side="right" />
      <DressCode />
      {wedding.photos.length > 0 ? (
        <>
          <FloralDivider side="left" />
          <Gallery />
          <FloralDivider side="right" />
        </>
      ) : (
        <FloralDivider side="left" />
      )}
      <Reminders />
      <FloralDivider side="right" />
      <PhotographyNote />
      <FloralDivider side="left" />
      <Closing />
    </InvitationExperience>
  );
}
