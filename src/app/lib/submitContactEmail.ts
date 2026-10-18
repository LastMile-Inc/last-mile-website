export const CONTACT_RECIPIENT_EMAIL = "contact@lastmileinc.ai";

export interface ContactEmailSubmission {
  firstname?: string;
  lastname?: string;
  name?: string;
  email: string;
  company: string;
  role?: string;
  industry?: string;
  intent: string;
  intentLabel?: string;
  operatingIssue?: string;
  message?: string;
  systemsInvolved?: string;
  recoveryMeasurement?: string;
  businessConsequence?: string;
  apiDocsUrl?: string;
  fileName?: string;
  pageName: string;
  pageUri?: string;
}

export async function submitContactEmail(payload: ContactEmailSubmission): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact.php";
  const pageUri =
    payload.pageUri ??
    (typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "https://lastmileinc.ai");

  const body = {
    recipient: CONTACT_RECIPIENT_EMAIL,
    ...payload,
    pageUri,
  };

  if (!import.meta.env.PROD) {
    // On the Vite preview server, hit the dev middleware endpoint so the full request cycle runs smoothly.
    const previewResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).catch(() => null);

    if (previewResponse && previewResponse.ok) {
      return;
    }
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (response.ok && contentType.includes("application/json")) {
    const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (result?.ok) {
      return;
    }
  }

  throw new Error(`Contact submission to ${CONTACT_RECIPIENT_EMAIL} failed with status ${response.status}`);
}
