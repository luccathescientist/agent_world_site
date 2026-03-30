import Link from "next/link";

const features = [
  {
    title: "Spatial agent state",
    body: "Agents move through a semantic office — library, terminal, desk, comms — based on what tools they're actually using.",
  },
  {
    title: "Live world stream",
    body: "The world updates in real time via SSE. Watch your agents animate, react, and move as sessions progress.",
  },
  {
    title: "Send commands",
    body: "Type directly in the chat composer to send instructions into a live OpenClaw session without leaving the world view.",
  },
  {
    title: "Tilemap editor",
    body: "Customize your office layout, define rooms, place furniture, and save the world geometry you want.",
  },
  {
    title: "Voice I/O",
    body: "Speak to your agents and hear them respond. Powered by the OpenClaw voice bridge.",
  },
  {
    title: "Multi-agent ready",
    body: "Built for Lucca by default, but the data model and renderer support additional agents and benchmark workers.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <section className="pt-24 pb-16 text-center">
        <div className="inline-block border border-aw-border text-aw-muted text-xs px-3 py-1 mb-8 rounded-full tracking-wide">
          v0.1.0 — now available
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-aw-text leading-tight tracking-tight mb-6">
          Your AI agents,<br />rendered as characters
        </h1>
        <p className="text-aw-muted text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Agent World turns OpenClaw session state into a living, 16-bit office.
          Watch your agents work, move, and respond — in real time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <div className="bg-aw-code-bg border border-aw-border rounded-lg px-5 py-3 text-sm text-aw-code-text font-mono select-all">
            curl -fsSL https://agent-world.dev/install.sh | sh
          </div>
          <Link
            href="/install"
            className="text-sm font-medium bg-aw-text text-aw-bg px-5 py-3 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Installation guide →
          </Link>
        </div>
        <p className="text-aw-muted text-sm">Requires Python 3.10+ and OpenClaw</p>
      </section>

      {/* World preview */}
      <section className="mb-24">
        <div className="border border-aw-border rounded-xl overflow-hidden shadow-sm bg-aw-surface">
          <img
            src="/media/agent_world_preview.gif"
            alt="Agent World — Lucca moving through the office in real time"
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <p className="text-center text-aw-muted text-sm mt-3">
          Lucca, live — moving between rooms based on what she&apos;s actually doing
        </p>
      </section>

      {/* Features */}
      <section className="mb-24">
        <h2 className="text-xs uppercase tracking-widest text-aw-muted font-medium mb-10 text-center">
          What Agent World does
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-aw-border rounded-xl p-6 hover:border-aw-muted transition-colors"
            >
              <h3 className="text-aw-text font-semibold mb-2">{f.title}</h3>
              <p className="text-aw-muted text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap teaser */}
      <section className="mb-24 border border-aw-border rounded-xl p-8">
        <h2 className="text-xs uppercase tracking-widest text-aw-muted font-medium mb-6">
          What&apos;s coming
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["0.2.0", "Settings & OpenClaw diagnostics"],
            ["0.3.0", "Generic room model"],
            ["0.4.0", "World builder generalization"],
            ["0.5.0", "Agent sprite configurator"],
            ["0.6.0", "Voice completion"],
            ["0.7.0", "Hardening & docs"],
          ].map(([ver, label]) => (
            <div key={ver} className="flex items-center gap-3 text-sm">
              <span className="text-aw-muted font-mono text-xs">{ver}</span>
              <span className="text-aw-text">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-aw-border">
          <Link href="/changelog" className="text-sm font-medium text-aw-text hover:text-aw-muted transition-colors">
            Full changelog →
          </Link>
        </div>
      </section>

      {/* Community CTA */}
      <section className="mb-24 text-center border border-aw-border rounded-xl p-12">
        <h2 className="text-aw-text text-2xl font-bold mb-3 tracking-tight">
          Share your world
        </h2>
        <p className="text-aw-muted mb-8 max-w-sm mx-auto">
          Post your office layout, share custom sprites, and discuss what
          you&apos;re building.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/worlds"
            className="text-sm font-medium bg-aw-text text-aw-bg px-5 py-2.5 rounded-lg hover:bg-aw-accent-hover transition-colors"
          >
            Browse worlds
          </Link>
          <Link
            href="/forum"
            className="text-sm font-medium border border-aw-border text-aw-text px-5 py-2.5 rounded-lg hover:bg-aw-surface transition-colors"
          >
            Forum
          </Link>
        </div>
      </section>

    </div>
  );
}
