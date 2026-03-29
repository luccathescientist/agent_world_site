"use client";

import { useState } from "react";
import { MarkdownContent } from "./MarkdownContent";

export function MarkdownEditor({
  name,
  defaultValue = "",
  placeholder = "Write something...",
  rows = 8,
  required,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <div className="flex gap-3 mb-2">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            !preview
              ? "bg-aw-text text-white"
              : "text-aw-muted border border-aw-border hover:bg-aw-surface"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setPreview(true)}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            preview
              ? "bg-aw-text text-white"
              : "text-aw-muted border border-aw-border hover:bg-aw-surface"
          }`}
        >
          Preview
        </button>
      </div>

      {preview ? (
        <div className="min-h-[120px] border border-aw-border rounded-lg px-3 py-2.5 bg-aw-surface">
          {value.trim() ? (
            <MarkdownContent body={value} />
          ) : (
            <span className="text-aw-muted text-sm italic">Nothing to preview.</span>
          )}
        </div>
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-white placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors resize-y font-mono"
        />
      )}
      {/* Hidden input so the value is always submitted even when previewing */}
      {preview && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
