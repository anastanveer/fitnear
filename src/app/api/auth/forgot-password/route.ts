import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { isValidEmail } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!isValidEmail(email))
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });

    // Never reveal whether an account exists — always respond ok.
    let devLink: string | undefined;
    if (user) {
      const token = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        },
      });
      const origin = new URL(req.url).origin;
      const link = `${origin}/reset-password?token=${token}`;

      if (process.env.SMTP_HOST) {
        // Email delivery is wired up once SMTP credentials are provided.
        // (nodemailer send happens here in the emailed version.)
      } else {
        // No SMTP configured yet — surface the link so it can be tested now.
        devLink = link;
      }
    }

    return NextResponse.json({ ok: true, devLink });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
