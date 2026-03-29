/**
 * Augments markdown bodies that contain quote markers.
 *
 * When a user clicks Quote, the generated markdown contains [](aw-ref:UUID)
 * before the blockquote. At render time we either:
 *  - Replace the marker with a "⚠ original edited" notice if the referenced
 *    reply has been edited since the quote was written.
 *  - Remove the marker silently if the original has not been edited.
 */
export function augmentQuoteMarkers(body: string, editedIds: Set<string>): string {
  return body.replace(/\[\]\(aw-ref:([0-9a-f-]{36})\)/g, (_, id: string) => {
    return editedIds.has(id)
      ? "*⚠ The quoted reply has since been edited.*"
      : "";
  });
}
