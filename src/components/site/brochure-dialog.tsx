"use client";

// Brochure gate: a button that opens a modal form (full name + email + mobile + course — all required).
// On submit the server action saves the lead to the Google Sheet and the Apps Script emails the PDFs.
// No direct download: the success screen confirms the email and nudges towards a free demo class.
// Details are remembered in this browser so a second request is quicker.
import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  IconBrandWhatsapp,
  IconCircleCheckFilled,
  IconFileText,
  IconFileTypePdf,
  IconLoader2,
  IconLock,
  IconMailFast,
  IconPhone,
  IconX,
} from "@tabler/icons-react";
import { requestBrochure, type BrochureState } from "@/app/actions/brochure";
import { btn } from "@/components/site/ui";
import { contact, courses, type Course } from "@/lib/brand";
import { cn } from "@/lib/utils";

const STORE = "nnl-lead";

type Saved = { name?: string; phone?: string; email?: string; brochure?: string };
function readSaved(): Saved {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? "{}") as Saved;
  } catch {
    return {};
  }
}

export function BrochureButton({ course, className, children }: { course?: Course; className?: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        {children ?? (
          <>
            <IconFileText className="size-5" aria-hidden />
            Get the brochure
          </>
        )}
      </button>
      {open && <BrochureDialog course={course} onClose={() => setOpen(false)} />}
    </>
  );
}

const inside = ["Course fees & duration", "Full module-by-module syllabus", "Projects you'll build", "Batch options"];

function BrochureDialog({ course, onClose }: { course?: Course; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [state, action, pending] = useActionState<BrochureState, FormData>(requestBrochure, { status: "idle" });
  const [saved] = useState(readSaved);
  const [ctx, setCtx] = useState({ page: "", utm: "" });

  useEffect(() => {
    // No close() in a cleanup: closing fires the dialog's `close` event → onClose → unmount, so React's
    // dev double-run of effects would shut the popup the instant it opened. Unmounting removes it anyway.
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const p = new URLSearchParams(window.location.search);
    const utm = [...p].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => `${k}=${v}`).join("&");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only values once on open
    setCtx({ page: window.location.pathname, utm });
  }, []);

  const values = state.status === "error" ? state.values : saved;
  const errors = state.status === "error" ? state.errors : {};

  function remember(fd: FormData) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email") }));
    } catch {}
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto border-2 border-ink-900 bg-white p-0 text-ink-900 shadow-hard-lg backdrop:bg-ink-900/50 backdrop:backdrop-blur-sm"
    >
      {state.status === "ok" ? (
        <Success state={state} onClose={onClose} titleId={titleId} />
      ) : (
        <>
          <div className="flex items-start justify-between gap-4 border-b-2 border-ink-900 bg-spark-300 p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center border-2 border-ink-900 bg-white text-ink-900">
                <IconFileTypePdf className="size-6" aria-hidden />
              </span>
              <div>
                <h2 id={titleId} className="font-display text-xl font-extrabold leading-snug">
                  {course ? `Get the ${course.title} brochure` : "Get the course brochure"}
                </h2>
                <p className="mt-0.5 text-sm font-semibold text-ink-800">Free PDF, sent straight to your email.</p>
              </div>
            </div>
            <CloseButton onClose={onClose} />
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-b-2 border-ink-900 bg-cream px-5 py-3 text-xs font-bold text-ink-800">
            {inside.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <IconCircleCheckFilled className="size-4 shrink-0 text-success" aria-hidden />
                {t}
              </li>
            ))}
          </ul>

          <form
            action={(fd) => {
              remember(fd);
              return action(fd);
            }}
            noValidate
            className="space-y-4 p-5"
          >
            {state.status === "error" && state.formError && (
              <p role="alert" className="border-2 border-danger bg-white p-3 text-sm font-semibold text-danger">
                {state.formError}
              </p>
            )}

            <Field label="Full name" error={errors.name}>
              <input name="name" autoComplete="name" required placeholder="e.g. Priya Sharma" defaultValue={values.name ?? ""} className={input(!!errors.name)} />
            </Field>

            <Field label="Email" hint="We'll email the brochure here" error={errors.email}>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                defaultValue={values.email ?? ""}
                className={input(!!errors.email)}
              />
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

            {course ? (
              <input type="hidden" name="brochure" value={course.slug} />
            ) : (
              <Field label="Course" error={errors.brochure}>
                <select name="brochure" defaultValue={values.brochure ?? "general"} className={input(!!errors.brochure)}>
                  <option value="general">All courses (full catalogue)</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <input type="hidden" name="page" value={ctx.page} />
            <input type="hidden" name="utm" value={ctx.utm} />
            {/* honeypot — hidden from people, tempting to bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px" />

            <button type="submit" disabled={pending} className={btn({ block: true }, "disabled:opacity-70")}>
              {pending ? <IconLoader2 className="size-5 animate-spin" aria-hidden /> : <IconMailFast className="size-5" aria-hidden />}
              {pending ? "Sending your brochure…" : "Email me the brochure"}
            </button>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-600">
              <IconLock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              We only use your details to share course and batch information. No spam, never shared.
            </p>
          </form>
        </>
      )}
    </dialog>
  );
}

const nextSteps = [
  { t: "Read it", d: "Fees, syllabus and projects — all in the PDF." },
  { t: "Try a free demo class", d: "See the lab and meet your trainer before you decide." },
  { t: "Pick your batch", d: "Weekday or weekend — whatever fits you." },
];

function Success({ state, onClose, titleId }: { state: Extract<BrochureState, { status: "ok" }>; onClose: () => void; titleId: string }) {
  return (
    <div role="status">
      <div className="flex items-start justify-between gap-4 border-b-2 border-ink-900 bg-aqua-200 p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center border-2 border-ink-900 bg-white">
            <IconMailFast className="size-6" aria-hidden />
          </span>
          <div>
            <h2 id={titleId} className="font-display text-xl font-extrabold leading-snug">
              {state.emailed ? "Check your inbox" : "You're all set"}
              {state.name ? `, ${state.name}` : ""}! 📬
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink-800">
              {state.emailed ? (
                <>
                  We&apos;ve emailed the <b>{state.title}</b> brochure to <b className="break-all">{state.email}</b>.
                </>
              ) : (
                <>
                  Our team will email the <b>{state.title}</b> brochure to <b className="break-all">{state.email}</b> shortly.
                </>
              )}
            </p>
          </div>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      <div className="p-5">
        <p className="border-2 border-dashed border-ink-900 bg-cream px-3 py-2 text-xs font-semibold text-ink-700">
          Not there in 5 minutes? Check your Spam or Promotions folder.
        </p>

        <p className="mt-5 font-display text-lg font-extrabold">What happens next</p>
        <ol className="mt-3 space-y-3">
          {nextSteps.map((s, i) => (
            <li key={s.t} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center border-2 border-ink-900 bg-spark-300 font-display font-extrabold">{i + 1}</span>
              <span className="text-sm">
                <b className="block text-ink-900">{s.t}</b>
                <span className="text-ink-700">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <a
          href={contact.whatsappHref(`Hi NovaNxt Lab, I just requested the ${state.title} brochure. I'd like to book a free demo class.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={btn({ block: true }, "mt-6")}
        >
          <IconBrandWhatsapp className="size-5" aria-hidden />
          Book my free demo class
        </a>
        <a href={contact.phoneHref} className={btn({ variant: "secondary", block: true }, "mt-3")}>
          <IconPhone className="size-5" aria-hidden />
          Call {contact.phone}
        </a>
        <button type="button" onClick={onClose} className="mt-3 min-h-11 w-full text-sm font-bold text-ink-600 hover:text-ink-900 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="grid size-10 shrink-0 place-items-center border-2 border-ink-900 bg-white text-ink-900 hover:bg-cream"
    >
      <IconX className="size-5" />
    </button>
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

export const input = (invalid: boolean) =>
  cn(
    "min-h-12 w-full border-2 bg-white px-3 text-base text-ink-900 outline-none transition placeholder:text-mist-400 focus:bg-aqua-50 focus:shadow-hard-sm",
    invalid ? "border-danger" : "border-ink-900",
  );
