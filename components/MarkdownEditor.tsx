"use client";

import { useRef, useState } from "react";
import { MarkdownContent } from "./MarkdownContent";
import { ImageUploadButton } from "./ImageUploadButton";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertAtCursor(text: string) {
    const el = textareaRef.current;
    if (!el) {
      setValue((v) => v + text);
      return;
    }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + text + value.slice(end);
    setValue(next);
    // Restore cursor after the inserted text
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    });
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
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
        {!preview && (
          <ImageUploadButton onInsert={(md) => insertAtCursor(md)} />
        )}
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
          ref={textareaRef}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="w-full border border-aw-border rounded-lg px-3 py-2.5 text-sm text-aw-text bg-white placeholder:text-aw-muted focus:outline-none focus:border-aw-text transition-colors resize-y font-mono"
        />
      )}
      {/* Hidden input ensures value is submitted even when previewing */}
      {preview && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
