import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Construction } from "lucide-react";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="pt-40 pb-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
            <Construction className="h-8 w-8" />
          </span>
          <h1 className="display-3 font-display mt-6 font-bold">{title}</h1>
          <p className="mt-4 text-fg-muted">{description}</p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/" variant="dark" size="md">
              Back to home
            </ButtonLink>
            <ButtonLink href="/search" variant="primary" size="md">
              Find a trainer
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-fg-muted">
            This page is part of the FitNear prototype and is being built next.
          </p>
        </div>
      </Container>
    </section>
  );
}
