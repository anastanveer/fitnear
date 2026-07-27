/** Wrapper kept for layout stability; the footer renders on every route. */
export function FooterGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
