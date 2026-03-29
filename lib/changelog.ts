export type ReleaseStatus = "complete" | "planned" | "in-progress";

export interface Release {
  version: string;
  title: string;
  status: ReleaseStatus;
  summary: string;
  highlights: string[];
}

// Sourced from VERSION_LOG.md in the core agent_world repo.
// Update this when new milestones ship.
export const releases: Release[] = [
  {
    version: "0.1.0",
    title: "Standalone extraction baseline",
    status: "complete",
    summary: "Agent World extracted into its own repository with a standalone FastAPI server.",
    highlights: [
      "Standalone repository extracted and published",
      "Standalone FastAPI server shipped",
      "Default office layout preserved as the clean-install world",
      "Unused bundled asset clutter removed",
      "Fresh-install smoke test documented",
    ],
  },
  {
    version: "0.2.0",
    title: "Settings and OpenClaw diagnostics",
    status: "planned",
    summary: "Global settings page, OpenClaw path configuration, and integration diagnostics.",
    highlights: [
      "Global settings page",
      "OpenClaw path/config selection",
      "Diagnostics for required OpenClaw files and voice readiness",
    ],
  },
  {
    version: "0.3.0",
    title: "Generic room model",
    status: "planned",
    summary: "Configurable room definitions with prose-based descriptions and JSON-backed layout.",
    highlights: [
      "Configurable room definitions",
      "Seeded default room types",
      "Prose-based room descriptions",
      "JSON-backed room/layout configuration",
    ],
  },
  {
    version: "0.4.0",
    title: "World builder generalization",
    status: "planned",
    summary: "Custom tile atlases, explicit tile-size configuration, and reduced office-specific assumptions.",
    highlights: [
      "Custom tile atlases",
      "Explicit tile-size configuration",
      "Freeform layouts plus semantic zones",
      "Reduced office-specific assumptions",
    ],
  },
  {
    version: "0.5.0",
    title: "Agent sprite configurator",
    status: "planned",
    summary: "Import raw character sheets, map directional frames, and assign sprites to agents.",
    highlights: [
      "Raw character sheet import",
      "Manual directional frame mapping",
      "Sprite assignment for discovered OpenClaw agents",
      "Animation preview tooling",
    ],
  },
  {
    version: "0.6.0",
    title: "Voice completion",
    status: "planned",
    summary: "Per-agent voice/text interaction completion and clearer voice settings.",
    highlights: [
      "Per-agent voice/text interaction completion",
      "Reply mode selection",
      "Clearer OpenClaw-backed voice settings and diagnostics",
    ],
  },
  {
    version: "0.7.0",
    title: "Hardening and docs",
    status: "planned",
    summary: "Backend/API regression coverage, targeted tests, and task-oriented setup documentation.",
    highlights: [
      "Backend/API regression coverage",
      "Targeted tests for world-builder and sprite systems",
      "Task-oriented setup/config documentation",
    ],
  },
];
