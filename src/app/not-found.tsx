import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <p className="label text-alarm">Alarm · 404 · Tag not found</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">
          No signal<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          This address does not map to any page. The link may be outdated, or the tag was never configured.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Return to overview</ButtonLink>
          <ButtonLink href="/#projects" variant="ghost">
            View systems
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
