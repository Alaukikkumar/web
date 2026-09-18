import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { DataFlow } from "@/components/sections/DataFlow";
import { DataStory } from "@/components/sections/DataStory";
import { DayInTheSystem } from "@/components/sections/DayInTheSystem";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { Hero } from "@/components/sections/hero/Hero";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ScadaPreview } from "@/components/sections/scada/ScadaPreview";
import { Stats } from "@/components/sections/Stats";
import { SystemArchitecture } from "@/components/sections/SystemArchitecture";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import { UnderTheScreen } from "@/components/sections/UnderTheScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { graph, ids } from "@/lib/seo";

/**
 * Narrative order: who → what → how I think → proof → architecture → data → experience → contact.
 */
const profilePage = graph({
  "@type": "ProfilePage",
  "@id": `${site.url}/#profile`,
  url: `${site.url}/`,
  name: site.title,
  isPartOf: { "@id": ids.website },
  mainEntity: { "@id": ids.person },
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePage} />
      <Hero />
      <Stats />
      <About />
      <ExpertiseGrid />
      <TechnologyStack />
      <ProjectShowcase />
      <BeforeAfter />
      <SystemArchitecture />
      <ScadaPreview />
      <UnderTheScreen />
      <DataStory />
      <DataFlow />
      <DayInTheSystem />
      <ExperienceTimeline />
      <EngineeringPrinciples />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
