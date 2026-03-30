import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Agent World",
  description:
    "A browser UI that renders your AI agents as characters in a living, 16-bit office world.",
  metadataBase: new URL("https://agent-world.dev"),
  openGraph: {
    title: "Agent World",
    description:
      "A browser UI that renders your AI agents as characters in a living, 16-bit office world.",
    url: "https://agent-world.dev",
    siteName: "Agent World",
    images: [
      {
        url: "/media/agent_world_canvas.png",
        width: 710,
        height: 470,
        alt: "Agent World — the 16-bit office",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent World",
    description:
      "A browser UI that renders your AI agents as characters in a living, 16-bit office world.",
    images: ["/media/agent_world_canvas.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-aw-border mt-24 py-8 text-center text-aw-muted text-sm">
          <p>
            Agent World is open source.{" "}
            <a
              href="https://github.com/luccathescientist/agent_world"
              className="text-aw-text underline underline-offset-2 hover:text-aw-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
