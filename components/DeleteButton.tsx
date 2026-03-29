"use client";

import { useRef } from "react";

export function DeleteButton({
  action,
  label,
  confirmMessage,
  disabled,
  disabledTitle,
}: {
  action: () => void;
  label: string;
  confirmMessage: string;
  disabled?: boolean;
  disabledTitle?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  if (disabled) {
    return (
      <span
        title={disabledTitle}
        className="text-xs text-aw-border border border-aw-border px-3 py-1.5 rounded-lg cursor-not-allowed select-none"
      >
        {label}
      </span>
    );
  }

  return (
    <form ref={formRef} action={action}>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(confirmMessage)) formRef.current?.requestSubmit();
        }}
        className="text-xs text-aw-muted border border-aw-border px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-aw-red hover:border-red-200 transition-colors"
      >
        {label}
      </button>
    </form>
  );
}
