/**
 * Contact API Route — src/app/api/contact/route.ts
 *
 * Handles contact form submissions and sends emails via Resend.
 * Full implementation will be added in Feature 12: Let's Build Together.
 */

import { NextResponse } from "next/server";

// Temporary stub — prevents TypeScript from complaining about the missing route.
// Feature 12 will implement the full Resend integration.
export async function POST() {
  return NextResponse.json(
    { error: "Contact API not yet implemented." },
    { status: 501 },
  );
}
