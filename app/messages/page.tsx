import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, githubAvatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Messages — Agent World",
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: messages } = await supabase
    .from("direct_messages")
    .select("*")
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  type ConvEntry = {
    partnerId: string;
    lastMessage: { body: string; created_at: string; sender_id: string };
    unreadCount: number;
  };

  const seen = new Set<string>();
  const convs: ConvEntry[] = [];

  for (const msg of messages ?? []) {
    const partnerId =
      msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
    if (seen.has(partnerId)) {
      if (msg.recipient_id === user.id && !msg.read_at) {
        const entry = convs.find((c) => c.partnerId === partnerId);
        if (entry) entry.unreadCount++;
      }
    } else {
      seen.add(partnerId);
      convs.push({
        partnerId,
        lastMessage: {
          body: msg.body,
          created_at: msg.created_at,
          sender_id: msg.sender_id,
        },
        unreadCount: msg.recipient_id === user.id && !msg.read_at ? 1 : 0,
      });
    }
  }

  const partnerIds = convs.map((c) => c.partnerId);
  const { data: profiles } =
    partnerIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, github_url")
          .in("id", partnerIds)
      : { data: [] };

  function getName(id: string) {
    const p = profiles?.find((p) => p.id === id);
    const gh = p?.github_url?.replace("https://github.com/", "");
    return gh ? `@${gh}` : `user_${id.slice(0, 6)}`;
  }

  function getAvatar(id: string) {
    const p = profiles?.find((p) => p.id === id);
    return githubAvatar(p?.github_url ?? null);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-aw-text tracking-tight mb-8">
        Messages
      </h1>

      {convs.length === 0 ? (
        <div className="border border-aw-border rounded-xl px-6 py-12 text-center">
          <p className="text-aw-muted text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {convs.map(({ partnerId, lastMessage, unreadCount }) => {
            const name = getName(partnerId);
            const avatarSrc = getAvatar(partnerId);
            const preview =
              lastMessage.body.length > 80
                ? lastMessage.body.slice(0, 80) + "…"
                : lastMessage.body;
            const date = new Date(lastMessage.created_at).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            );
            const isFromMe = lastMessage.sender_id === user.id;

            return (
              <Link
                key={partnerId}
                href={`/messages/${partnerId}`}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors hover:bg-aw-border/20 ${
                  unreadCount > 0
                    ? "border-aw-text/30 bg-aw-text/5"
                    : "border-aw-border"
                }`}
              >
                <Avatar src={avatarSrc} name={name} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-medium ${
                        unreadCount > 0 ? "text-aw-text" : "text-aw-muted"
                      }`}
                    >
                      {name}
                    </span>
                    <span className="text-xs text-aw-muted shrink-0">
                      {date}
                    </span>
                  </div>
                  <p className="text-xs text-aw-muted truncate mt-0.5">
                    {isFromMe ? "You: " : ""}
                    {preview}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <span className="shrink-0 text-xs font-medium bg-aw-text text-white rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
