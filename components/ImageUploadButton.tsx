"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUploadButton({
  onInsert,
}: {
  onInsert: (markdown: string, cursorOffset: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("forum-images")
        .upload(path, file, { upsert: false });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("forum-images")
        .getPublicUrl(path);

      const markdown = `![image](${publicUrl})`;
      onInsert(markdown, markdown.length);
    } catch (e) {
      console.error("Image upload failed", e);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="text-xs px-3 py-1 rounded transition-colors text-aw-muted border border-aw-border hover:bg-aw-surface disabled:opacity-40"
        title="Upload image"
      >
        {uploading ? "Uploading…" : "Image"}
      </button>
    </>
  );
}
