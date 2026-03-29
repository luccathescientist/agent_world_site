import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install — Agent World",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-aw-code-bg border border-aw-border rounded-lg p-4 text-aw-code-text text-sm overflow-x-auto my-4 select-all font-mono">
      <code>{children}</code>
    </pre>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5 mb-10">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-aw-text text-white text-xs flex items-center justify-center font-semibold">
        {n}
      </div>
      <div className="pt-0.5">
        <h3 className="text-aw-text font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function InstallPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Installation</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4 tracking-tight">Get Agent World running</h1>
        <p className="text-aw-muted leading-relaxed">
          Agent World requires Python 3.10+ and an active{" "}
          <a href="https://github.com/luccathescientist/openclaw" className="text-aw-text underline underline-offset-2">
            OpenClaw
          </a>{" "}
          installation.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-aw-muted text-xs uppercase tracking-widest mb-4 font-medium">One-line install</h2>
        <CodeBlock>curl -fsSL https://agent-world.dev/install.sh | sh</CodeBlock>
        <p className="text-aw-muted text-sm">
          This clones the repository, installs dependencies, and prints the command to start the server.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-aw-muted text-xs uppercase tracking-widest mb-6 font-medium">Manual install</h2>

        <Step n={1} title="Clone the repository">
          <CodeBlock>{`git clone https://github.com/luccathescientist/agent_world
cd agent_world`}</CodeBlock>
        </Step>

        <Step n={2} title="Install Python dependencies">
          <CodeBlock>pip install -r requirements.txt</CodeBlock>
          <p className="text-aw-muted text-sm">
            Dependencies: <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">fastapi</code>,{" "}
            <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">uvicorn</code>,{" "}
            <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">python-multipart</code>.
          </p>
        </Step>

        <Step n={3} title="Start the server">
          <CodeBlock>python server.py --port 8890</CodeBlock>
          <p className="text-aw-muted text-sm">
            Then open{" "}
            <a href="http://localhost:8890" className="text-aw-text underline underline-offset-2">
              http://localhost:8890
            </a>
            .
          </p>
        </Step>

        <Step n={4} title="Connect to OpenClaw">
          <p className="text-aw-muted text-sm mb-2">
            Agent World reads session data from your OpenClaw home directory
            (default: <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">~/.openclaw</code>).
            Override it via environment variable:
          </p>
          <CodeBlock>OPENCLAW_HOME=/path/to/.openclaw python server.py --port 8890</CodeBlock>
        </Step>
      </section>

      <section className="mb-12 border border-aw-border rounded-xl p-6">
        <h2 className="text-aw-text font-semibold mb-4">Smoke test</h2>
        <ul className="space-y-2">
          {[
            "The world renders without missing static assets",
            "The default office layout is visible",
            "An agent can be selected and the inspector populates",
            "The chat panel shows agent history",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-aw-muted">
              <span className="text-aw-text mt-0.5 font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-aw-muted text-xs uppercase tracking-widest mb-3 font-medium">Voice support</h2>
        <p className="text-aw-muted text-sm leading-relaxed">
          Voice input/output requires Node.js and a valid OpenClaw workspace with{" "}
          <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">tsx</code> installed. Set{" "}
          <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">OPENCLAW_WORKSPACE</code> or place an
          OpenClaw checkout at <code className="text-aw-code-text bg-aw-code-bg px-1 rounded text-xs">../openclaw</code>{" "}
          relative to the Agent World directory.
        </p>
      </section>

      <div className="flex gap-6 border-t border-aw-border pt-8">
        <a
          href="https://github.com/luccathescientist/agent_world"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-aw-muted hover:text-aw-text transition-colors underline underline-offset-2"
        >
          GitHub
        </a>
        <a
          href="/changelog"
          className="text-sm text-aw-muted hover:text-aw-text transition-colors underline underline-offset-2"
        >
          Changelog
        </a>
      </div>
    </div>
  );
}
