"use client";

import { useRef } from "react";
import { sendMessage } from "@/app/messages/actions";

export function MessageComposer({ recipientId }: { recipientId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(formData: FormData) {
    await sendMessage(recipientId, formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={submit} className="flex gap-3">
      <textarea
        name="body"
        placeholder="Write a message..."
        required
        rows={2}
        className="flex-1 text-sm rounded-lg border border-aw-border bg-white px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-aw-text/20 placeholder:text-aw-muted"
      />
      <button
        type="submit"
        className="self-end text-sm font-medium bg-aw-text text-white px-4 py-2 rounded-lg hover:bg-aw-accent-hover transition-colors"
      >
        Send
      </button>
    </form>
  );
}
