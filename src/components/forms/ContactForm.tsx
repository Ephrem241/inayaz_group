"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm, type ContactActionState } from "@/lib/services/contact";
import { Button } from "@/components/ui/Button";
import { SERVICE_INTERESTS } from "@/constants/service-interests";
import { PROJECT_TYPES } from "@/constants/project-types";
import { cn } from "@/lib/utils/cn";

const initialState: ContactActionState = { status: "idle" };

const defaultValues: ContactFormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  serviceInterest: "",
  projectType: "",
  estimatedBudget: "",
  projectLocation: "",
  targetStartDate: "",
  developmentInterest: "",
  preferredUnitType: "",
  visitDate: "",
  preferredContactMethod: "",
  equipmentType: "",
  rentalPeriod: "",
  rentalLocation: "",
  requiredDate: "",
  message: "",
  consent: false,
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  leadSource: "",
  honeypot: "",
};

const inputClassName =
  "mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-red-600">
        {" "}
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [lastHandledState, setLastHandledState] = useState(state);
  const [phase, setPhase] = useState<"form" | "success">("form");
  const isSubmittingRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    // Default is true — would auto-focus the first invalid input and win a
    // race against the summary-focus effect below. The summary-first
    // pattern (focus the summary, let the user pick a link) is the more
    // accessible one, so RHF's own competing focus management is disabled.
    shouldFocusError: false,
  });

  const serviceInterest = watch("serviceInterest");

  // Pre-fills service interest / development / lead-attribution from the
  // URL — the division and real-estate CTAs (Phase E) link here with
  // ?interest=<id>&development=<slug>, and campaign links may add
  // utm_source/utm_medium/utm_campaign. Read via window.location instead of
  // next/navigation's useSearchParams() so this doesn't force every page
  // that renders <Contact /> into a Suspense boundary for one optional
  // prefill.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    const development = params.get("development");
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    if (interest && SERVICE_INTERESTS.some((option) => option.id === interest)) {
      setValue("serviceInterest", interest);
    }
    if (development) setValue("developmentInterest", development);
    if (utmSource) setValue("utmSource", utmSource);
    if (utmMedium) setValue("utmMedium", utmMedium);
    if (utmCampaign) setValue("utmCampaign", utmCampaign);
    setValue("leadSource", document.referrer || "direct");
  }, [setValue]);

  // Derived during render (not an effect) per React's "adjusting state based
  // on a change" pattern: flips to the success panel exactly once per new
  // action-state object, while still letting "Send another message" below
  // set phase back to "form" independently without state.status changing.
  if (state !== lastHandledState) {
    setLastHandledState(state);
    isSubmittingRef.current = false;
    if (state.status === "success") setPhase("success");
  }

  const onValid = (data: ContactFormValues) => {
    // Guards against a double-click firing two submissions before isPending
    // re-renders the disabled button — reset above once the action settles.
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "consent") {
        formData.set("consent", data.consent ? "on" : "");
      } else {
        formData.set(key, (value as string | undefined) ?? "");
      }
    }
    formAction(formData);
  };

  // A useEffect (not the onInvalid callback handleSubmit accepts) because
  // onInvalid fires synchronously inside handleSubmit, before React has
  // necessarily committed the DOM update that renders the summary — an
  // effect is guaranteed to run only after that commit, so the ref is
  // reliably non-null here.
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      summaryRef.current?.focus();
    }
  }, [errors]);

  if (phase === "success") {
    return (
      <div data-contact-form-success className="py-8 text-center">
        <h3 className="text-2xl font-medium">Thank you — your message has been submitted.</h3>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            reset(defaultValues);
            setPhase("form");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, error]) => error?.message);

  return (
    <form data-contact-form noValidate onSubmit={handleSubmit(onValid)}>
      {state.status === "error" && (
        <p role="alert" className="mb-6 rounded border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          data-validation-summary
          className="mb-6 rounded border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p className="font-medium">Please fix the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {errorEntries.map(([field, error]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline">
                  {error?.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-5 text-xs text-muted-foreground">
        Fields marked <span className="text-red-600">*</span> are required. We usually respond
        within one business day.
      </p>

      {/* Honeypot: visually hidden but present in the DOM and accessibility
          tree excluded, so unsophisticated bots that autofill it still get
          caught while real users never see or reach it. */}
      <div className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
        <label htmlFor="contact-honeypot">Leave this field empty</label>
        <input
          id="contact-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("honeypot")}
        />
      </div>

      {/* Hidden lead-attribution fields — never shown to the user. */}
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("leadSource")} />

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium">
            Full name
            <RequiredMark />
          </label>
          <input
            id="fullName"
            type="text"
            className={inputClassName}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          <FieldError id="fullName" message={errors.fullName?.message} />
        </div>

        <div>
          <label htmlFor="companyName" className="text-sm font-medium">
            Company name
          </label>
          <input
            id="companyName"
            type="text"
            className={inputClassName}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            {...register("companyName")}
          />
          <FieldError id="companyName" message={errors.companyName?.message} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
            <RequiredMark />
          </label>
          <input
            id="email"
            type="email"
            className={inputClassName}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+251 9XX XXX XXX"
            className={inputClassName}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <FieldError id="phone" message={errors.phone?.message} />
        </div>

        <div>
          <label htmlFor="serviceInterest" className="text-sm font-medium">
            Service interest
          </label>
          <select id="serviceInterest" className={inputClassName} {...register("serviceInterest")}>
            <option value="">Select a service</option>
            {SERVICE_INTERESTS.map((interest) => (
              <option key={interest.id} value={interest.id}>
                {interest.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conditional field groups — only the fields relevant to the selected
          service interest render, per CLAUDE.md's "do not overwhelm users
          with irrelevant fields." */}
      {serviceInterest === "construction-real-estate" && (
        <div data-field-group="construction" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label htmlFor="projectType" className="text-sm font-medium">
              Project type
            </label>
            <select id="projectType" className={inputClassName} {...register("projectType")}>
              <option value="">Select a project type</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="projectLocation" className="text-sm font-medium">
              Project location
            </label>
            <input id="projectLocation" type="text" className={inputClassName} {...register("projectLocation")} />
          </div>

          <div>
            <label htmlFor="estimatedBudget" className="text-sm font-medium">
              Estimated budget
            </label>
            <input
              id="estimatedBudget"
              type="text"
              placeholder="e.g. 5,000,000 – 10,000,000 ETB"
              className={inputClassName}
              {...register("estimatedBudget")}
            />
          </div>

          <div>
            <label htmlFor="targetStartDate" className="text-sm font-medium">
              Target start date
            </label>
            <input id="targetStartDate" type="date" className={inputClassName} {...register("targetStartDate")} />
          </div>
        </div>
      )}

      {serviceInterest === "real-estate" && (
        <div data-field-group="real-estate" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label htmlFor="developmentInterest" className="text-sm font-medium">
              Development
            </label>
            <input
              id="developmentInterest"
              type="text"
              placeholder="e.g. Ameliyaz"
              className={inputClassName}
              {...register("developmentInterest")}
            />
          </div>

          <div>
            <label htmlFor="preferredUnitType" className="text-sm font-medium">
              Preferred unit type
            </label>
            <input
              id="preferredUnitType"
              type="text"
              placeholder="e.g. 2 Bedroom"
              className={inputClassName}
              {...register("preferredUnitType")}
            />
          </div>

          <div>
            <label htmlFor="visitDate" className="text-sm font-medium">
              Preferred visit date
            </label>
            <input id="visitDate" type="date" className={inputClassName} {...register("visitDate")} />
          </div>

          <div>
            <label htmlFor="preferredContactMethod" className="text-sm font-medium">
              Preferred contact method
            </label>
            <select
              id="preferredContactMethod"
              className={inputClassName}
              {...register("preferredContactMethod")}
            >
              <option value="">No preference</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
        </div>
      )}

      {serviceInterest === "machinery-equipment-rental" && (
        <div data-field-group="rental" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label htmlFor="equipmentType" className="text-sm font-medium">
              Equipment type
            </label>
            <input
              id="equipmentType"
              type="text"
              placeholder="e.g. Excavator"
              className={inputClassName}
              {...register("equipmentType")}
            />
          </div>

          <div>
            <label htmlFor="rentalPeriod" className="text-sm font-medium">
              Rental period
            </label>
            <input
              id="rentalPeriod"
              type="text"
              placeholder="e.g. 2 weeks"
              className={inputClassName}
              {...register("rentalPeriod")}
            />
          </div>

          <div>
            <label htmlFor="rentalLocation" className="text-sm font-medium">
              Location
            </label>
            <input id="rentalLocation" type="text" className={inputClassName} {...register("rentalLocation")} />
          </div>

          <div>
            <label htmlFor="requiredDate" className="text-sm font-medium">
              Required date
            </label>
            <input id="requiredDate" type="date" className={inputClassName} {...register("requiredDate")} />
          </div>
        </div>
      )}

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
          <RequiredMark />
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClassName}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message" message={errors.message?.message} />
      </div>

      <div className="mt-5">
        <label htmlFor="consent" className="flex items-start gap-2 text-sm">
          <input
            id="consent"
            type="checkbox"
            className={cn("mt-0.5", errors.consent && "outline outline-1 outline-red-600")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I consent to INAYAZ Group contacting me about this inquiry and processing the
            information I&apos;ve submitted.
            <RequiredMark />
          </span>
        </label>
        <FieldError id="consent" message={errors.consent?.message} />
      </div>

      <Button type="submit" disabled={isPending} className="mt-6">
        {isPending ? "Submitting…" : "Send Message"}
      </Button>
    </form>
  );
}
