import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime-300 text-ink-900 hover:bg-lime-200 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(204,250,60,0.6)] active:translate-y-0",
  dark: "bg-ink-900 text-fg-invert hover:bg-ink-800 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-ink-900/15 text-fg hover:border-ink-900/40 hover:bg-ink-900/[0.03]",
  ghost: "text-fg hover:bg-ink-900/[0.05]",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 h-9",
  md: "text-sm px-5 h-11",
  lg: "text-base px-7 h-13 min-h-[3.25rem]",
};

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
