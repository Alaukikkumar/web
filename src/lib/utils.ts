export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function pad(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Bounded random walk used by demo telemetry. */
export function drift(value: number, step: number, min: number, max: number): number {
  return clamp(value + (Math.random() - 0.5) * 2 * step, min, max);
}

export function absoluteUrl(base: string, path = "/"): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
