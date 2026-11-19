"use client";

// Contact / enquiry form → leads Google Sheet (via the sendEnquiry server action).
// Full name + mobile required; email, course and message optional.
import { useActionState, useEffect, useState, type ReactNode } from "react";
import { IconBrandWhatsapp, IconCircleCheckFilled, IconLoader2, IconLock, IconSend } from "@tabler/icons-react";
import { sendEnquiry, type ContactState } from "@/app/actions/contact";
import { input } from "@/components/site/brochure-dialog";
import { btn } from "@/components/site/ui";
import { contact, courses } from "@/lib/brand";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });
  const [ctx, setCtx] = useState({ page: "", utm: "" });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const utm = [...p].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => `${k}=${v}`).join("&");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only values once on mount
    setCtx({ page: window.location.pathname, utm });
  }, []);

  if (state.status === "ok") {
    return (
      <div role="status" className="border-2 border-ink-900 bg-white p-6 shadow-hard-lg sm:p-8">
        <IconCircleCheckFilled className="size-12 text-success" aria-hidden />
        <h3 className="mt-4 font-display text-3xl font-extrabold text-ink-900">Thanks{state.name ? `, ${state.name}` : ""}! 🙌</h3>
        <p className="mt-3 text-ink-700">
          We&apos;ve got your message. Our team will call or WhatsApp you soon to help you pick the right course and book a
          free demo class.
        </p>
        <a
          href={contact.whatsappHref("Hi NovaNxt Lab, I just sent an enquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className={btn({}, "mt-6")}
        >
          <IconBrandWhatsapp className="size-5" aria-hidden />
          Can&apos;t wait? WhatsApp us now
        </a>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : {};
  const errors = state.status === "error" ? state.errors : {};

  return (
    <form action={action} noValidate className="space-y-4 border-2 border-ink-900 bg-white p-5 shadow-hard-lg sm:p-8">
      <h3 className="font-display text-2xl font-extrabold text-ink-900">Send us a message</h3>
      <p className="-mt-2 text-sm text-ink-700">We&apos;ll call you back — no spam, promise.</p>

      {state.status === "error" && state.formError && (
        <p role="alert" className="border-2 border-danger bg-white p-3 text-sm font-semibold text-danger">
          {state.formError}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input name="name" autoComplete="name" required placeholder="e.g. Priya Sharma" defaultValue={values.name ?? ""} className={input(!!errors.name)} />
        </Field>
        <Field label="Mobile number" error={errors.phone}>
          <span className="flex">
            <span className="grid place-items-center border-2 border-r-0 border-ink-900 bg-cream px-3 text-sm font-bold text-ink-900">+91</span>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              placeholder="98765 43210"
              defaultValue={values.phone ?? ""}
              className={input(!!errors.phone)}
            />
          </span>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" hint="optional" error={errors.email}>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" defaultValue={values.email ?? ""} className={input(!!errors.email)} />
        </Field>
        <Field label="Interested in">
          <select name="course" defaultValue={values.course ?? "unsure"} className={input(false)}>
            <option value="unsure">Not sure yet — help me choose</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" hint="optional" error={errors.message}>
        <textarea
          name="message"
          rows={4}
          maxLength={1500}
          placeholder="Tell us your goal, preferred batch timing, or any question…"
          defaultValue={values.message ?? ""}
          className={input(!!errors.message) + " py-3"}
        />
      </Field>

      <input type="hidden" name="page" value={ctx.page} />
      <input type="hidden" name="utm" value={ctx.utm} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px" />

      <button type="submit" disabled={pending} className={btn({ block: true }, "disabled:opacity-70")}>
        {pending ? <IconLoader2 className="size-5 animate-spin" aria-hidden /> : <IconSend className="size-5" aria-hidden />}
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-600">
        <IconLock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Your details are only used to reply to you about courses and batches.
      </p>
    </form>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2 text-sm font-extrabold text-ink-900">
        {label}
        {hint && <span className="text-xs font-semibold text-ink-500">{hint}</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1.5 block text-sm font-semibold text-danger">{error}</span>}
    </label>
  );
}
