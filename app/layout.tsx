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
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
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
        <footer className="border-t border-aw-border mt-24 py-10 text-center text-aw-muted text-sm">
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href="https://github.com/luccathescientist/agent_world"
                className="hover:text-aw-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="mailto:hello@agent-world.dev"
                className="hover:text-aw-text transition-colors"
              >
                Contact
              </a>
              <a href="/terms" className="hover:text-aw-text transition-colors">
                Terms of Use
              </a>
              <a href="/privacy" className="hover:text-aw-text transition-colors">
                Privacy Policy
              </a>
            </div>
            <p className="text-xs">
              © {new Date().getFullYear()} Agent World. Open source under the MIT
              License.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
