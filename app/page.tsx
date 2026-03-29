import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: "◈",
    title: "Spatial agent state",
    body: "Agents move through a semantic office — library, terminal, desk, comms — based on what tools they're actually using.",
  },
  {
    icon: "◉",
    title: "Live world stream",
    body: "The world updates in real time via SSE. Watch your agents animate, react, and move as sessions progress.",
  },
  {
    icon: "◇",
    title: "Send commands",
    body: "Type directly in the chat composer to send instructions into a live OpenClaw session without leaving the world view.",
  },
  {
    icon: "◆",
    title: "Tilemap editor",
    body: "Customize your office layout, define rooms, place furniture, and save the world geometry you want.",
  },
  {
    icon: "◎",
    title: "Voice I/O",
    body: "Speak to your agents and hear them respond. Powered by the OpenClaw voice bridge.",
  },
  {
    icon: "◐",
    title: "Multi-agent ready",
    body: "Built for Lucca by default, but the data model and renderer support additional agents and benchmark workers.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-24 pb-20 text-center">
        <div className="inline-block border border-aw-gold/40 bg-aw-gold/5 text-aw-gold text-xs px-3 py-1 mb-6 uppercase tracking-widest">
          v0.1.0 — now available
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-aw-text leading-tight mb-6">
          Your AI agents,<br />
          <span className="text-aw-gold">rendered as characters</span>
        </h1>
        <p className="text-aw-muted text-lg max-w-xl mx-auto mb-10">
          Agent World turns OpenClaw session state into a living, 16-bit office.
          Watch your agents work, move, and respond — in real time.
        </p>

        {/* Install command */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div className="bg-aw-surface border border-aw-border rounded px-5 py-3 text-sm text-aw-green font-mono select-all">
            curl -fsSL https://boya.dev/install.sh | sh
          </div>
          <Link
            href="/install"
            className="text-sm text-aw-gold border border-aw-gold/40 px-5 py-3 rounded hover:bg-aw-gold/10 transition-colors"
          >
            Installation guide →
          </Link>
        </div>
        <p className="text-aw-muted text-xs">Requires Python 3.10+ and OpenClaw</p>
      </section>

      {/* World preview */}
      <section className="mb-24">
        <div className="border border-aw-border bg-aw-surface rounded-lg overflow-hidden">
          <img
            src="/media/agent_world_preview_small.gif"
            alt="Agent World — Lucca moving through the office in real time"
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <p className="text-center text-aw-muted text-xs mt-3">
          Lucca, live — moving between rooms based on what she&apos;s actually doing
        </p>
      </section>

      {/* Features */}
      <section className="mb-24">
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-8 text-center">
          What Agent World does
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-aw-border bg-aw-surface rounded-lg p-5"
            >
              <div className="text-aw-gold text-xl mb-3">{f.icon}</div>
              <h3 className="text-aw-text font-semibold mb-2">{f.title}</h3>
              <p className="text-aw-muted text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap teaser */}
      <section className="mb-24 border border-aw-border bg-aw-surface rounded-lg p-8">
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-6">
          What&apos;s coming
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          {[
            ["0.2.0", "Settings & OpenClaw diagnostics"],
            ["0.3.0", "Generic room model"],
            ["0.4.0", "World builder generalization"],
            ["0.5.0", "Agent sprite configurator"],
            ["0.6.0", "Voice completion"],
            ["0.7.0", "Hardening & docs"],
          ].map(([ver, label]) => (
            <div key={ver} className="flex items-center gap-3 text-aw-muted">
              <span className="text-aw-border font-mono">{ver}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/changelog" className="text-aw-gold text-sm hover:underline">
            Full changelog →
          </Link>
        </div>
      </section>

      {/* Community CTA */}
      <section className="mb-24 text-center">
        <h2 className="text-aw-text text-2xl font-bold mb-4">
          Share your world
        </h2>
        <p className="text-aw-muted mb-8 max-w-md mx-auto">
          Post your office layout, share custom sprites, and discuss what
          you&apos;re building with Agent World.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/worlds"
            className="text-sm bg-aw-gold text-aw-bg font-semibold px-6 py-3 rounded hover:bg-aw-gold-dim transition-colors"
          >
            Browse worlds
          </Link>
          <Link
            href="/forum"
            className="text-sm border border-aw-border text-aw-text px-6 py-3 rounded hover:bg-aw-surface transition-colors"
          >
            Forum
          </Link>
        </div>
      </section>
    </div>
  );
}
