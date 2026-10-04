"use client";

import { useState } from "react";

// Where the form data is sent (POST, JSON). Point this at your own API route
// or a form service such as Formspree.
const ENDPOINT = "/api/contact";

type FieldDef = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  wide?: boolean; // spans all three columns
};

const fields: FieldDef[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "eventType", label: "Event Type" },
  { name: "eventDate", label: "Event Date", type: "date" },
  { name: "venue", label: "Venue Location" },
  { name: "headcount", label: "Estimated Headcount", type: "number" },
  { name: "residence", label: "Where do you reside?" },
  { name: "budget", label: "Have a budget in mind?" },
  { name: "referral", label: "How did you hear about us?", wide: true },
];

const labelClass = "block text-[11px] uppercase tracking-[0.22em] text-neutral-500";
const lineClass =
  "mt-3 w-full rounded-none border-0 border-b border-neutral-500 bg-transparent pb-2 text-sm text-neutral-900 outline-none transition-colors focus:border-b-2 focus:border-[#0D1B3D]";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capture before the await
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[786px] bg-white">
      {/* Header bar */}
      <div className="bg-[#bfad98] py-3 text-center text-[13px] uppercase tracking-[0.3em] text-white">
        For Inquiries
      </div>

      <form onSubmit={onSubmit} className="px-6 pb-12 pt-8 sm:px-11">
        <div className="grid gap-x-11 gap-y-9 sm:grid-cols-3">
          {fields.map((f) => (
            <label key={f.name} className={f.wide ? "sm:col-span-3" : undefined}>
              <span className={labelClass}>{f.label} *</span>
              <input
                name={f.name}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                required
                min={f.type === "number" ? 1 : undefined}
                className={lineClass}
              />
            </label>
          ))}
        </div>

        {/* Message */}
        <label className="mt-9 block">
          <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900">
            Please share any information or inspiration you have for your dream event! *
          </span>
          <textarea
            name="message"
            required
            rows={7}
            className="mt-5 h-44 w-full resize-y rounded-none border border-neutral-900 bg-transparent p-3 text-sm text-neutral-900 outline-none focus:border-2 focus:border-[#0D1B3D]"
          />
        </label>

        {/* Submit */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-[#D4AF37] px-12 py-3 text-xs font-medium uppercase tracking-[0.3em] text-[#0D1B3D] transition-colors hover:bg-[#0D1B3D] hover:text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit"}
          </button>

          <p role="status" aria-live="polite" className="min-h-5 text-center text-sm">
            {status === "sent" && "Thank you! We'll be in touch shortly."}
            {status === "error" && (
              <span className="text-red-700">
                Something went wrong. Please try again or email us directly.
              </span>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
