import { Container } from "@/components/ui/Container";

export default function SearchLoading() {
  return (
    <div className="pt-24">
      <div className="border-b border-ink-900/8 bg-cloud/85">
        <Container className="py-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="skeleton h-12 flex-1 rounded-2xl" />
            <div className="skeleton h-12 flex-1 rounded-2xl" />
            <div className="skeleton h-12 w-32 rounded-2xl" />
          </div>
        </Container>
      </div>
      <Container className="py-8">
        <div className="flex gap-8">
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="skeleton h-[32rem] rounded-3xl" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="skeleton mb-5 h-8 w-56 rounded-lg" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-3xl border border-ink-900/8 bg-white"
                >
                  <div className="skeleton h-44 w-full" />
                  <div className="space-y-3 p-4">
                    <div className="skeleton h-4 w-32 rounded" />
                    <div className="skeleton h-3 w-40 rounded" />
                    <div className="skeleton h-9 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
