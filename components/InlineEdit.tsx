"use client";

import { useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import type { CategorySlug } from "@/lib/forum";
import { editThread, editReply } from "@/app/forum/actions";
import { editWorldComment } from "@/app/worlds/actions";

export function InlineEditThread({
  threadId,
  catSlug,
  title,
  body,
}: {
  threadId: string;
  catSlug: CategorySlug;
  title: string;
  body: string;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors"
      >
        Edit
      </button>
    );
  }

  async function submit(formData: FormData) {
    await editThread(threadId, formData);
    setEditing(false);
  }

  return (
    <form action={submit} className="space-y-3 w-full">
      <input
        name="title"
        type="text"
        defaultValue={title}
        required
        className="w-full border border-aw-border rounded-lg px-3 py-2 text-sm text-aw-text bg-aw-bg focus:outline-none focus:border-aw-text transition-colors"
      />
      <MarkdownEditor name="body" defaultValue={body} rows={8} required />
      <div className="flex gap-2">
        <button type="submit" className="text-xs font-medium bg-aw-text text-aw-bg px-3 py-1.5 rounded-lg hover:bg-aw-accent-hover transition-colors">
          Save
        </button>
        <button type="button" onClick={() => setEditing(false)} className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function InlineEditReply({
  replyId,
  threadId,
  catSlug,
  body,
}: {
  replyId: string;
  threadId: string;
  catSlug: CategorySlug;
  body: string;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors"
      >
        Edit
      </button>
    );
  }

  async function submit(formData: FormData) {
    await editReply(replyId, threadId, catSlug, formData);
    setEditing(false);
  }

  return (
    <form action={submit} className="space-y-3 w-full">
      <MarkdownEditor name="body" defaultValue={body} rows={6} required />
      <div className="flex gap-2">
        <button type="submit" className="text-xs font-medium bg-aw-text text-aw-bg px-3 py-1.5 rounded-lg hover:bg-aw-accent-hover transition-colors">
          Save
        </button>
        <button type="button" onClick={() => setEditing(false)} className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function InlineEditComment({
  commentId,
  worldId,
  body,
}: {
  commentId: string;
  worldId: string;
  body: string;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors"
      >
        Edit
      </button>
    );
  }

  async function submit(formData: FormData) {
    await editWorldComment(commentId, worldId, formData);
    setEditing(false);
  }

  return (
    <form action={submit} className="space-y-3 w-full">
      <textarea
        name="body"
        defaultValue={body}
        required
        rows={3}
        className="w-full border border-aw-border rounded-lg px-3 py-2 text-sm text-aw-text bg-aw-bg focus:outline-none focus:border-aw-text transition-colors resize-y"
      />
      <div className="flex gap-2">
        <button type="submit" className="text-xs font-medium bg-aw-text text-aw-bg px-3 py-1.5 rounded-lg hover:bg-aw-accent-hover transition-colors">
          Save
        </button>
        <button type="button" onClick={() => setEditing(false)} className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-aw-surface transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
