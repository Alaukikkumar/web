import Link from "next/link";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { DataLine } from "@/components/signature/DataLine";
import { LogoMark } from "./LogoMark";

const footerStack = ["SCADA", "PLC", "EMS", "SQL", "Modbus", "Industrial Automation"];

export function Footer() {
  return (
    <footer className="no-print border-t border-line bg-bg">
      <div className="container-x py-16 md:py-20">
        <DataLine className="mb-16" duration={8} />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-fg">
              <LogoMark />
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.14em]">{site.brand}</span>
            </div>
            <p className="text-2xl font-semibold uppercase tracking-[-0.02em] text-fg">{site.role}</p>
            <p className="label text-muted">SCADA • PLC • EMS • IIoT</p>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-5">Links</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className="text-sm text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/case-studies/" className="text-sm text-muted transition-colors hover:text-fg">
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="/resume/" className="text-sm text-muted transition-colors hover:text-fg">
                  Resume
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="label mb-5">Technical stack</p>
            <ul className="flex flex-wrap gap-2">
              {footerStack.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-dim">© 2026 {site.name}. All rights reserved.</p>
          <p className="label">Reliable before impressive</p>
        </div>
      </div>
    </footer>
  );
}
