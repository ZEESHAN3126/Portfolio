import { Resend } from "resend";

/**
 * Resend client — initialised with the API key from environment variables.
 *
 * Add RESEND_API_KEY to your .env.local file.
 * Get your key at: https://resend.com/api-keys
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

/** The address Resend sends FROM. Must be a verified domain in your Resend account. */
export const FROM_EMAIL = "hello@zeeshanvahora.dev";

/** Where contact form submissions are delivered. */
export const TO_EMAIL = "hello@zeeshanvahora.dev";
