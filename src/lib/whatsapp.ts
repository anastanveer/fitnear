import type { Trainer } from "./types";

/** Demo WhatsApp number — replace with real trainer numbers on backend integration. */
const DEMO_NUMBER = "971500000000";

export function whatsappLink(trainer: Trainer, context?: string) {
  const msg =
    context ??
    `Hi ${trainer.name.split(" ")[0]}, I found you on FitNear and I'm interested in ${trainer.primarySport.replace("-", " ")} sessions. Are you available?`;
  return `https://wa.me/${DEMO_NUMBER}?text=${encodeURIComponent(msg)}`;
}
