import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─────────────── Status indicator ─────────────── */
export function StatusIndicator({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 label text-muted", className)}>
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ─────────────── Demo / concept badge ─────────────── */
export function DemoBadge({ children = "Demo system", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-line-strong bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      <span className="size-1.5 bg-muted" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ─────────────── Buttons ─────────────── */
type ButtonVariant = "primary" | "ghost";

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({ variant = "primary", arrow = true, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="btn-arrow size-4" aria-hidden="true" />}
    </Link>
  );
}

interface ExternalButtonProps extends ComponentProps<"a"> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function ExternalButton({ variant = "ghost", icon, className, children, ...rest }: ExternalButtonProps) {
  return (
    <a className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)} {...rest}>
      {children}
      {icon}
    </a>
  );
}

/* ─────────────── Section heading ─────────────── */
interface SectionHeadingProps {
  index: string;
  kicker: string;
  system?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
  id?: string;
}

export function SectionHeading({
  index,
  kicker,
  system,
  title,
  intro,
  className,
  titleClassName,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <header className={cn("relative", className)}>
      <div className="mb-8 flex items-center gap-4 md:mb-10" data-reveal="">
        <span className="label text-accent">{index}</span>
        <span className="label">{kicker}</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        {system && <span className="label hidden sm:inline">{system}</span>}
      </div>
      <Heading
        id={id}
        className={cn("display max-w-[18ch] text-[clamp(2.25rem,6vw,5.75rem)]", titleClassName)}
        data-reveal=""
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
      >
        {title}
      </Heading>
      {intro && (
        <div
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          data-reveal=""
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
        >
          {intro}
        </div>
      )}
    </header>
  );
}

/* ─────────────── Section wrapper ─────────────── */
interface SectionProps extends ComponentProps<"section"> {
  live?: boolean;
  bordered?: boolean;
}

export function Section({ live, bordered = true, className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn("relative py-24 md:py-32 lg:py-36", bordered && "border-t border-line", className)}
      data-live={live ? "" : undefined}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Staggered reveal delay helper for inline styles. */
export function revealDelay(index: number, step = 70, base = 0): CSSProperties {
  return { "--reveal-delay": `${base + index * step}ms` } as CSSProperties;
}
