/**
 * Runs synchronously while the HTML is parsed (before first paint).
 * Rendered as text/plain on the client so React does not warn about script tags.
 * Pattern from the Next.js guide "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
