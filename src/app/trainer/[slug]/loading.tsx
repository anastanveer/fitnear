import { Container } from "@/components/ui/Container";

export default function TrainerLoading() {
  return (
    <div className="pt-16">
      <div className="skeleton h-64 w-full sm:h-80" />
      <Container>
        <div className="-mt-16 h-28 w-28 rounded-3xl border-4 border-cloud sm:h-36 sm:w-36">
          <div className="skeleton h-full w-full rounded-2xl" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="skeleton h-8 w-64 rounded-lg" />
          <div className="skeleton h-4 w-96 max-w-full rounded" />
          <div className="skeleton h-4 w-72 max-w-full rounded" />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-11/12 rounded" />
            <div className="skeleton h-4 w-4/5 rounded" />
            <div className="skeleton mt-6 h-40 w-full rounded-2xl" />
          </div>
          <div className="skeleton h-96 rounded-3xl" />
        </div>
      </Container>
    </div>
  );
}
