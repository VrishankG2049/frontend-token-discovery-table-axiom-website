import Head from "next/head";
import TokenDiscoveryShell from "@/components/token-table/TokenDiscoveryShell";

export const metadata = {
  title: "Pulse — Realtime Token Discovery",
  description: "Track trending new pairs with realtime WebSocket updates.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#050813",
};

export default function PulsePage() {
  return (
    <>
      {/* 👇 Preload API to improve performance + Lighthouse score */}
      <Head>
        <link
          rel="preload"
          href="/api/tokens"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <main className="flex flex-1 flex-col bg-gradient-to-b from-[#050813] to-[#05010f]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between">
            <div>
              {/* Remove duplicate heading from Shell */}
              <h1 className="text-2xl font-bold text-slate-50">Pulse</h1>
              <p className="text-sm text-slate-400">
                Realtime token discovery — Axiom style.
              </p>
            </div>
          </header>

          <TokenDiscoveryShell />
        </div>
      </main>
    </>
  );
}
