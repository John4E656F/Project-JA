import { InvitationExperience } from "../src/components/InvitationExperience";
import { Countdown } from "../src/components/Countdown";
import { Gallery } from "../src/components/Gallery";
import { Hero } from "../src/components/sections/Hero";
import { Details } from "../src/components/sections/Details";
import { DressCode } from "../src/components/sections/DressCode";
import { Reminders } from "../src/components/sections/Reminders";
import { PhotographyNote } from "../src/components/sections/PhotographyNote";
import { Closing } from "../src/components/sections/Closing";

export default function Page() {
  return (
    <InvitationExperience>
      <Hero />
      <Countdown />
      <Details />
      <DressCode />
      <Gallery />
      <Reminders />
      <PhotographyNote />
      <Closing />
    </InvitationExperience>
  );
}
