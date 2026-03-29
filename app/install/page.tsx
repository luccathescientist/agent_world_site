import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install — Agent World",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-aw-surface border border-aw-border rounded p-4 text-aw-green text-sm overflow-x-auto my-4 select-all">
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
      <div className="flex-shrink-0 w-8 h-8 border border-aw-gold/40 text-aw-gold text-sm flex items-center justify-center font-bold">
        {n}
      </div>
      <div>
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
        <div className="text-aw-gold text-xs uppercase tracking-widest mb-3">Installation</div>
        <h1 className="text-3xl font-bold text-aw-text mb-4">Get Agent World running</h1>
        <p className="text-aw-muted">
          Agent World requires Python 3.10+ and an active{" "}
          <a href="https://github.com/luccathescientist/openclaw" className="text-aw-gold hover:underline">
            OpenClaw
          </a>{" "}
          installation.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-6">One-line install</h2>
        <CodeBlock>curl -fsSL https://agent-world.dev/install.sh | sh</CodeBlock>
        <p className="text-aw-muted text-sm">
          This clones the repository, installs dependencies, and prints the command to start the server.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-6">Manual install</h2>

        <Step n={1} title="Clone the repository">
          <CodeBlock>{`git clone https://github.com/luccathescientist/agent_world
cd agent_world`}</CodeBlock>
        </Step>

        <Step n={2} title="Install Python dependencies">
          <CodeBlock>pip install -r requirements.txt</CodeBlock>
          <p className="text-aw-muted text-sm">
            Dependencies: <code className="text-aw-text">fastapi</code>,{" "}
            <code className="text-aw-text">uvicorn</code>,{" "}
            <code className="text-aw-text">python-multipart</code>.
          </p>
        </Step>

        <Step n={3} title="Start the server">
          <CodeBlock>python server.py --port 8890</CodeBlock>
          <p className="text-aw-muted text-sm">
            Then open{" "}
            <a href="http://localhost:8890" className="text-aw-gold hover:underline">
              http://localhost:8890
            </a>
            .
          </p>
        </Step>

        <Step n={4} title="Connect to OpenClaw">
          <p className="text-aw-muted text-sm mb-2">
            Agent World reads agent session data from your OpenClaw home directory
            (default: <code className="text-aw-text">~/.openclaw</code>). If your
            OpenClaw home is in a different location, set it in{" "}
            <code className="text-aw-text">agent_world.json</code> or via environment variable:
          </p>
          <CodeBlock>OPENCLAW_HOME=/path/to/.openclaw python server.py --port 8890</CodeBlock>
        </Step>
      </section>

      <section className="mb-12">
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-6">Smoke test</h2>
        <p className="text-aw-muted text-sm mb-4">After starting the server, verify:</p>
        <ul className="text-aw-muted text-sm space-y-2 list-none">
          {[
            "The world renders without missing static assets",
            "The default office layout is visible",
            "An agent can be selected and the inspector populates",
            "The chat panel shows agent history",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-aw-gold mt-0.5">◆</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-aw-gold text-xs uppercase tracking-widest mb-4">Voice support</h2>
        <p className="text-aw-muted text-sm">
          Voice input/output requires Node.js and a valid OpenClaw workspace with{" "}
          <code className="text-aw-text">tsx</code> installed. Set{" "}
          <code className="text-aw-text">OPENCLAW_WORKSPACE</code> or place an
          OpenClaw checkout at <code className="text-aw-text">../openclaw</code>{" "}
          relative to the Agent World directory.
        </p>
      </section>
    </div>
  );
}
