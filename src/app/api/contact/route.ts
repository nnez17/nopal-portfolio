import { NextResponse } from "next/server";

const MAX_LEN = { name: 120, email: 254, message: 8000 };

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(name: string, email: string, message: string) {
  const escapedName = escapeHtml(name.trim());
  const escapedEmail = escapeHtml(email.trim());
  const escapedMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:32px 40px;text-align:center">
              <div style="display:inline-block;width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.2);line-height:48px;font-size:22px;font-weight:700;color:#fff;margin-bottom:8px">N</div>
              <h1 style="margin:8px 0 0;font-size:20px;font-weight:600;color:#ffffff">New Portfolio Message</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px">
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:4px">From</div>
                    <div style="font-size:15px;font-weight:600;color:#0f172a">${escapedName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:24px">
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:4px">Email</div>
                    <a href="mailto:${escapedEmail}" style="font-size:14px;color:#3b82f6;text-decoration:none">${escapedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td><hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 24px"></td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px">
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:8px">Message</div>
                    <div style="font-size:14px;line-height:1.7;color:#334155">${escapedMessage}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0">
              <p style="margin:0;font-size:12px;color:#94a3b8">Sent via nopal-portfolio</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON.");
  }

  if (!body || typeof body !== "object") return badRequest("Invalid body.");

  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || name.trim().length === 0)
    return badRequest("Name is required.");
  if (name.trim().length > MAX_LEN.name) return badRequest("Name too long.");
  if (typeof email !== "string" || email.trim().length === 0)
    return badRequest("Email is required.");
  if (email.length > MAX_LEN.email) return badRequest("Email too long.");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) return badRequest("Invalid email.");
  if (typeof message !== "string" || message.trim().length === 0)
    return badRequest("Message is required.");
  if (message.length > MAX_LEN.message) return badRequest("Message too long.");

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { error: "Resend not configured. Add RESEND_API_KEY to .env" },
      { status: 503 },
    );
  }

  const contactTo =
    process.env.CONTACT_TO_EMAIL ??
    process.env.CONTACT_RECEIVER ??
    "novala1710@gmail.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    const html = buildEmailHtml(name, email, message);
    const text = [
      `From: ${name.trim()} <${email.trim()}>`,
      "",
      message.trim(),
    ].join("\n");

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactTo,
      replyTo: email.trim(),
      subject: `[Portfolio] Message from ${name.trim()}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json(
      { error: "Could not send message." },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
