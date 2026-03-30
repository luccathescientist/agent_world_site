import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, githubAvatar } from "@/components/Avatar";
import { MessageComposer } from "./MessageComposer";

export const metadata: Metadata = {
  title: "Messages — Agent World",
};

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: partnerId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (partnerId === user.id) redirect("/messages");

  // Mark incoming messages as read (inline — no revalidatePath needed here)
  await supabase
    .from("direct_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .eq("sender_id", partnerId)
    .is("read_at", null);

  const [{ data: messages }, { data: partnerProfile }] = await Promise.all([
    supabase
      .from("direct_messages")
      .select("*")
      .or(
        `and(sender_id.eq.${user.id},recipient_id.eq.${partnerId}),` +
          `and(sender_id.eq.${partnerId},recipient_id.eq.${user.id})`
      )
      .order("created_at", { ascending: true }),
    supabase.from("profiles").select("id, github_url").eq("id", partnerId).single(),
  ]);

  const partnerGh = partnerProfile?.github_url?.replace("https://github.com/", "");
  const partnerName = partnerGh ? `@${partnerGh}` : `user_${partnerId.slice(0, 6)}`;
  const partnerAvatar = githubAvatar(partnerProfile?.github_url ?? null);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link
          href="/messages"
          className="text-sm text-aw-muted hover:text-aw-text transition-colors"
        >
          ← Messages
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Avatar src={partnerAvatar} name={partnerName} size={36} />
        <h1 className="text-xl font-bold text-aw-text tracking-tight">
          {partnerName}
        </h1>
      </div>

      <div className="space-y-3 mb-6 min-h-[120px]">
        {messages && messages.length > 0 ? (
          messages.map((msg) => {
            const isMe = msg.sender_id === user.id;
            const date = new Date(msg.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm rounded-xl px-4 py-2.5 text-sm ${
                    isMe
                      ? "bg-aw-text text-aw-bg"
                      : "bg-aw-border/40 text-aw-text border border-aw-border"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isMe ? "text-aw-bg/60" : "text-aw-muted"
                    }`}
                  >
                    {date}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-aw-muted text-center py-8">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>

      <div className="border-t border-aw-border pt-4">
        <MessageComposer recipientId={partnerId} />
      </div>
    </div>
  );
}
