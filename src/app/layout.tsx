import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FooterGate } from "@/components/layout/FooterGate";
import { ToastProvider } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiLauncher } from "@/components/ai/AiLauncher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FitNear — Find the right trainer, closer to you.",
    template: "%s · FitNear",
  },
  description:
    "FitNear is a location-based marketplace connecting clients with verified personal trainers, swimming instructors, boxing coaches, yoga trainers and more across the UAE. Search by area, sport, price and availability.",
  keywords: [
    "personal trainer Dubai",
    "fitness coach UAE",
    "swimming instructor",
    "boxing coach",
    "yoga trainer",
    "trainer marketplace",
  ],
  metadataBase: new URL("https://fitnear.example"),
  openGraph: {
    title: "FitNear — Find the right trainer, closer to you.",
    description:
      "A location-based marketplace for verified fitness trainers across the UAE.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-cloud text-fg">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FitNear",
            description:
              "A location-based marketplace connecting clients with verified fitness trainers across the UAE.",
            url: "https://fitnear.example",
            areaServed: ["Dubai", "Abu Dhabi", "United Arab Emirates"],
            slogan: "Find the right trainer, closer to you.",
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FitNear",
            url: "https://fitnear.example",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://fitnear.example/search?area={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <FooterGate>
            <Footer />
          </FooterGate>
          <AiLauncher />
        </ToastProvider>
      </body>
    </html>
  );
}
