"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-ghost no-print">
      <Printer className="size-4" aria-hidden="true" />
      Print / save as PDF
    </button>
  );
}
