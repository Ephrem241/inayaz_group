"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm, type ContactActionState } from "@/lib/services/contact";
import { Button } from "@/components/ui/Button";
import { DIVISIONS } from "@/constants/divisions";
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
  message: "",
  consent: false,
  honeypot: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [lastHandledState, setLastHandledState] = useState(state);
  const [phase, setPhase] = useState<"form" | "success">("form");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  // Derived during render (not an effect) per React's "adjusting state based
  // on a change" pattern: flips to the success panel exactly once per new
  // action-state object, while still letting "Send another message" below
  // set phase back to "form" independently without state.status changing.
  if (state !== lastHandledState) {
    setLastHandledState(state);
    if (state.status === "success") setPhase("success");
  }

  const onValid = (data: ContactFormValues) => {
    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("companyName", data.companyName ?? "");
    formData.set("email", data.email);
    formData.set("phone", data.phone ?? "");
    formData.set("serviceInterest", data.serviceInterest ?? "");
    formData.set("projectType", data.projectType ?? "");
    formData.set("estimatedBudget", data.estimatedBudget ?? "");
    formData.set("projectLocation", data.projectLocation ?? "");
    formData.set("message", data.message);
    formData.set("consent", data.consent ? "on" : "");
    formData.set("honeypot", data.honeypot ?? "");
    formAction(formData);
  };

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

  return (
    <form data-contact-form noValidate onSubmit={handleSubmit(onValid)}>
      {state.status === "error" && (
        <p role="alert" className="mb-6 rounded border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

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

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
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
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            {...register("companyName")}
          />
          <FieldError id="companyName" message={errors.companyName?.message} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
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
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
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
          <select
            id="serviceInterest"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
            {...register("serviceInterest")}
          >
            <option value="">Select a service</option>
            {DIVISIONS.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectType" className="text-sm font-medium">
            Project type
          </label>
          <select
            id="projectType"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
            {...register("projectType")}
          >
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="estimatedBudget" className="text-sm font-medium">
            Estimated budget
          </label>
          <input
            id="estimatedBudget"
            type="text"
            placeholder="e.g. 5,000,000 – 10,000,000 ETB"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
            {...register("estimatedBudget")}
          />
        </div>

        <div>
          <label htmlFor="projectLocation" className="text-sm font-medium">
            Project location
          </label>
          <input
            id="projectLocation"
            type="text"
            className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
            {...register("projectLocation")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1.5 w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm"
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
