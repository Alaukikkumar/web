"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const projectTypes = ["SCADA", "PLC", "EMS", "HMI", "Industrial IoT", "Energy Monitoring", "Data / Reporting", "Other"];

interface Values {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "mail" | "error" | "unconfigured";

const EMPTY: Values = { name: "", email: "", company: "", projectType: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Name should be under 80 characters.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.company.trim().length > 100) errors.company = "Company should be under 100 characters.";
  if (!values.projectType) errors.projectType = "Please choose a project type.";
  const message = values.message.trim();
  if (message.length < 20) errors.message = "Please describe the process in at least 20 characters.";
  else if (message.length > 2000) errors.message = "Message should be under 2000 characters.";
  return errors;
}

const fieldOrder: Array<keyof Values> = ["name", "email", "company", "projectType", "message"];

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const fieldId = (key: keyof Values) => `${id}-${key}`;

  const change = (key: keyof Values, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);

    // Honeypot — real visitors never fill this hidden field.
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = fieldOrder.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      projectType: values.projectType,
      message: values.message.trim(),
    };

    if (site.contactEndpoint) {
      setStatus("sending");
      try {
        const response = await fetch(site.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setStatus("sent");
        setValues(EMPTY);
        setSubmitted(false);
      } catch {
        setStatus("error");
      }
      return;
    }

    if (site.email) {
      const subject = `${payload.projectType} project enquiry — ${payload.name}`;
      const body = [
        payload.message,
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.company ? `Company: ${payload.company}` : "",
        `Project type: ${payload.projectType}`,
      ]
        .filter((line, i, all) => line !== "" || all[i - 1] !== "")
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mail");
      return;
    }

    setStatus("unconfigured");
  };

  const inputClass = (key: keyof Values) =>
    cn(
      "w-full border bg-bg px-3.5 py-3 text-base text-fg placeholder:text-dim transition-colors duration-200 focus-visible:outline-offset-0 focus:border-accent",
      errors[key] ? "border-alarm" : "border-line-strong hover:border-muted",
    );

  const describedBy = (key: keyof Values) => (errors[key] ? `${fieldId(key)}-error` : undefined);

  const fieldError = (name: keyof Values) =>
    errors[name] ? (
      <p id={`${fieldId(name)}-error`} className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-alarm">
        {errors[name]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit} className="panel corner-marks flex flex-col" aria-describedby={`${id}-privacy`}>
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
        <span className="label text-muted">Project enquiry</span>
        <span className="label">4 required fields</span>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
        {submitted && errorCount > 0 && (
          <p role="alert" className="border border-alarm/50 bg-alarm/[0.06] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-alarm sm:col-span-2">
            {errorCount} {errorCount === 1 ? "field needs" : "fields need"} attention
          </p>
        )}

        <div>
          <label htmlFor={fieldId("name")} className="label mb-2 block text-muted">
            Name <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => change("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="label mb-2 block text-muted">
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => change("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor={fieldId("company")} className="label mb-2 block text-muted">
            Company <span className="normal-case tracking-normal text-dim">(optional)</span>
          </label>
          <input
            id={fieldId("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => change("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={inputClass("company")}
          />
          {fieldError("company")}
        </div>

        <div>
          <label htmlFor={fieldId("projectType")} className="label mb-2 block text-muted">
            Project type <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("projectType")}
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => change("projectType", e.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy("projectType")}
            className={cn(inputClass("projectType"), "appearance-none bg-[length:10px] bg-[right_1rem_center] bg-no-repeat", !values.projectType && "text-dim")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%239ba1a8'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select…
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-surface text-fg">
                {type}
              </option>
            ))}
          </select>
          {fieldError("projectType")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId("message")} className="label mb-2 block text-muted">
            Message <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={(e) => change("message", e.target.value)}
            placeholder="What does the process do today, and what should the system do?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={cn(inputClass("message"), "resize-y")}
          />
          {fieldError("message")}
        </div>

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p id={`${id}-privacy`} className="text-xs leading-relaxed text-dim">
          Your details are used only to reply to your message.
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
        </button>
      </div>

      <div aria-live="polite" className="px-5 sm:px-7">
        {status === "sent" && (
          <p className="mb-5 flex items-center gap-2 border border-accent/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            <Check className="size-4" aria-hidden="true" /> Message delivered. I will reply by email.
          </p>
        )}
        {status === "mail" && (
          <p className="mb-5 border border-accent/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            Your email app should open with the message ready to send.
          </p>
        )}
        {status === "error" && (
          <p className="mb-5 border border-alarm/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-alarm">
            The message could not be sent. Please try again in a moment.
          </p>
        )}
        {status === "unconfigured" && (
          <p className="mb-5 border border-alarm/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-alarm">
            Online messaging is not configured on this deployment yet.
          </p>
        )}
      </div>
    </form>
  );
}
