import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import { Inter } from "next/font/google";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Pulse – Token Discovery",
  description: "Realtime token discovery table, Axiom-style UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${inter.className} min-h-screen bg-[#050813] text-slate-50 antialiased`}
      >
        <AppProviders>
          <main className="flex min-h-screen flex-col">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
