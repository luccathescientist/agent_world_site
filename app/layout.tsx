import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Agent World",
  description:
    "A browser UI that renders your AI agents as characters in a living, 16-bit office world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-mono antialiased">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-aw-border mt-24 py-8 text-center text-aw-muted text-sm">
          <p>
            Agent World is open source.{" "}
            <a
              href="https://github.com/luccathescientist/agent_world_site"
              className="text-aw-gold hover:underline"
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
