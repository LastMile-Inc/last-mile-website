import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router";
import { trackEvent } from "@/app/lib/analytics";

interface FormData { firstname: string; lastname: string; email: string; company: string; roleResponsibility: string; industry: string; intent: string; operatingIssue: string; systemsInvolved: string; recoveryMeasurement: string; businessConsequence: string; }
const intents = [
  ["demo", "Request a product demo"], ["private-beta", "Request private beta access"], ["operation", "Discuss a physical operations use case"], ["data-center-cooling", "Discuss cooling redundancy"], ["partner", "Discuss an ecosystem relationship"], ["architecture", "Technical or architecture inquiry"], ["media", "Media or Signal 2 Action inquiry"],
] as const;
const industries = ["Data centers / mission-critical facilities", "Manufacturing", "Water / wastewater", "Cold storage / food operations", "Utilities / infrastructure", "Distributed facilities", "Other"];

function buildMessage(data: FormData) { return [`Type of conversation: ${data.intent}`, `Role: ${data.roleResponsibility || "Not provided"}`, `Industry: ${data.industry || "Not provided"}`, "", "Operating issue:", data.operatingIssue || "Not provided", "", "Systems involved:", data.systemsInvolved || "Not provided", "", "Measurement that would prove recovery:", data.recoveryMeasurement || "Not provided", "", "Business consequence:", data.businessConsequence || "Not provided"].join("\n"); }

export function ContactLastMileForm({ mode = "contact" }: { mode?: "contact" | "demo" | "private-beta" }) {
  const compact = mode !== "contact";
  const submitLabel = mode === "demo" ? "Request a demo" : mode === "private-beta" ? "Request private beta access" : "Discuss Your Operation";
  const [params] = useSearchParams();
  const requested = compact ? mode : params.get("intent") ?? "operation";
  const initialIntent = intents.some(([value]) => value === requested) ? requested : "operation";
  const [submitting, setSubmitting] = useState(false); const [success, setSuccess] = useState(false); const [failed, setFailed] = useState(false); const [started, setStarted] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({ defaultValues: { intent: initialIntent, firstname: "", lastname: "", email: "", company: "", roleResponsibility: "", industry: "", operatingIssue: "", systemsInvolved: "", recoveryMeasurement: "", businessConsequence: "" } });
  useEffect(() => { setValue("intent", initialIntent); }, [initialIntent, setValue]);
  useEffect(() => { if (success) window.scrollTo({ top: 0, behavior: "smooth" }); }, [success]);
  const start = () => { if (!started) { setStarted(true); trackEvent("form_contact_start", { form_name: "contact_last_mile", intent: initialIntent }); } };
  const onSubmit = async (data: FormData) => { setSubmitting(true); setFailed(false); try {
    if (import.meta.env.PROD) {
      const response = await fetch("https://api.hsforms.com/submissions/v3/integration/submit/245388543/df5ed043-2fec-4e13-ae18-e1d17257e1da", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields: [{ name: "firstname", value: data.firstname }, { name: "lastname", value: data.lastname }, { name: "email", value: data.email }, { name: "company", value: data.company }, { name: "hs_role", value: data.roleResponsibility }, { name: "message", value: buildMessage(data) }], context: { pageUri: `${window.location.origin}${window.location.pathname}`, pageName: submitLabel } }) });
      if (!response.ok) throw new Error(`HubSpot submission failed with ${response.status}`);
    }
    trackEvent("form_contact_submit", { form_name: "contact_last_mile", intent: data.intent, review_mode: !import.meta.env.PROD }); setSuccess(true); reset();
  } catch (error) { console.error("Contact form submission failed", error); setFailed(true); } finally { setSubmitting(false); } };
  if (success) return <div className="lm-form-success" role="status" aria-live="polite"><CheckCircle2 aria-hidden="true" /><h2>{import.meta.env.PROD ? "Inquiry received." : "Preview check complete."}</h2><p>{!import.meta.env.PROD ? "Submission is simulated in this preview environment. No production request was transmitted and no CRM record was created." : "We have received the operating context you shared. Our team will review your inquiry and follow up directly to coordinate the most relevant next step."}</p>{!import.meta.env.PROD && <button className="lm-form__submit" type="button" onClick={() => { setSuccess(false); reset({ intent: initialIntent }); }}>Return to the form</button>}</div>;
  return <form className="lm-form" onSubmit={handleSubmit(onSubmit)} onFocusCapture={start} noValidate><div><p className="lm-eyebrow">{compact ? mode === "demo" ? "Your demo starts here" : "Build with us" : "Operational conversation"}</p><h2>{compact ? mode === "demo" ? "Let’s make it relevant to you." : "Start with a conversation." : "Describe one response."}</h2><p className="lm-form__next-step">{mode === "demo" ? "Share your contact details and, if you have one, an operating challenge you would like to explore. We’ll follow up to arrange a focused walkthrough." : mode === "private-beta" ? "Share your contact details and operational focus. We’ll review fit and reach out to discuss scope, participants, and evaluation criteria." : "Share your contact details and one operating challenge. We’ll review your context and follow up to coordinate the next conversation."}</p></div>
    {!import.meta.env.PROD && <p className="lm-form__review" role="note">Preview mode: form validation can be tested here. Submissions are simulated on the preview server and do not create CRM records.</p>}
    <div className="lm-form__two"><Field label="First name" error={errors.firstname?.message}><input autoComplete="given-name" aria-invalid={Boolean(errors.firstname)} {...register("firstname", { required: "First name is required" })} /></Field><Field label="Last name" error={errors.lastname?.message}><input autoComplete="family-name" aria-invalid={Boolean(errors.lastname)} {...register("lastname", { required: "Last name is required" })} /></Field></div>
    <Field label="Work email" error={errors.email?.message}><input type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email", { required: "Work email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter a valid email address" } })} /></Field>
    <div className="lm-form__two"><Field label="Organization" error={errors.company?.message}><input autoComplete="organization" aria-invalid={Boolean(errors.company)} {...register("company", { required: "Organization is required" })} /></Field><Field label={compact ? "Role (optional)" : "Role"} error={errors.roleResponsibility?.message}><input autoComplete="organization-title" aria-invalid={Boolean(errors.roleResponsibility)} {...register("roleResponsibility", { required: compact ? false : "Role is required" })} /></Field></div>
    {compact ? <><input type="hidden" {...register("intent")}/><Field label="Industry (optional)"><select {...register("industry")}><option value="">Select an industry</option>{industries.map(item => <option key={item}>{item}</option>)}</select></Field></> : <div className="lm-form__two"><Field label="Industry" error={errors.industry?.message}><select aria-invalid={Boolean(errors.industry)} {...register("industry", { required: "Industry is required" })}><option value="">Select an industry</option>{industries.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Type of conversation"><select {...register("intent", { onChange: (event) => trackEvent("form_conversation_type_selected", { intent: event.target.value }) })}>{intents.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field></div>}
    <Field label={compact ? "What would you like to explore? (optional)" : "Describe one operating issue"} error={errors.operatingIssue?.message}><textarea rows={4} aria-invalid={Boolean(errors.operatingIssue)} placeholder="What changes, and where does the response become disconnected?" {...register("operatingIssue", { required: compact ? false : "Describe one operating issue" })} /></Field>
    {!compact && <details className="lm-form__optional"><summary><span>Add systems and recovery details (optional)</span></summary><div><Field label="Which systems hold the signal, asset context, work, approvals, or provider communication? (optional)"><textarea rows={2} placeholder="e.g., SCADA / BMS, historian, CMMS / EAM, shift logs" {...register("systemsInvolved")} /></Field>
    <Field label="What measurement would prove the operation recovered? (optional)"><textarea rows={2} placeholder="e.g., pressure, flow, temperature, or stability window returning to expected range" {...register("recoveryMeasurement")} /></Field>
    <Field label="What is the business consequence when the response fails or takes too long? (optional)"><textarea rows={2} {...register("businessConsequence")} /></Field>
    </div></details>}
    <p className="lm-form__warning">Do not submit credentials, proprietary source data, regulated personal information, or sensitive facility details. By submitting, you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms</a>.</p>
    {failed ? <p className="lm-form__error" role="alert">Submission failed. Try again or email <a href="mailto:contact@lastmileinc.ai">contact@lastmileinc.ai</a>.</p> : null}
    <button className="lm-form__submit" type="submit" disabled={submitting}>{submitting ? <><Loader2 className="animate-spin" aria-hidden="true" />Sending…</> : submitLabel}</button>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const errorId = useId();
  return <label className="lm-field"><span>{label}</span>{children}{error ? <small id={errorId} role="alert">{error}</small> : null}</label>;
}
