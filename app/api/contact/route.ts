import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const MAX_LEN = { name: 120, email: 254, message: 8000 };

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
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
  if (typeof name !== "string" || name.trim().length === 0) {
    return badRequest("Name is required.");
  }
  if (name.trim().length > MAX_LEN.name) return badRequest("Name too long.");
  if (typeof email !== "string" || email.trim().length === 0) {
    return badRequest("Email is required.");
  }
  if (email.length > MAX_LEN.email) return badRequest("Email too long.");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) return badRequest("Invalid email.");
  if (typeof message !== "string" || message.trim().length === 0) {
    return badRequest("Message is required.");
  }
  if (message.length > MAX_LEN.message) return badRequest("Message too long.");

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const contactTo =
    process.env.CONTACT_TO_EMAIL ??
    process.env.CONTACT_RECEIVER ??
    "novala1710@gmail.com";

  if (!user || !pass) {
    return NextResponse.json(
      {
        error:
          "Mail is not configured. Set SMTP_USER and SMTP_PASS in .env.local (use a Gmail App Password).",
      },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: contactTo,
      subject: `[Portfolio] Message from ${name.trim()}`,
      replyTo: email.trim(),
      text: [`From: ${name.trim()} <${email.trim()}>`, "", message.trim()].join(
        "\n",
      ),
      html: `<p><strong>From:</strong> ${escapeHtml(name.trim())} &lt;<a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a>&gt;</p><p>${escapeHtml(message.trim()).replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact mail error:", err);
    return NextResponse.json(
      { error: "Could not send message. Try again later." },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const runtime = "nodejs";
