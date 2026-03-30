import { Resend } from "resend";

const ADMIN_EMAIL = "luccathescientist@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Agent World <notifications@agent-world.dev>";

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function notifyAdmin(subject: string, html: string) {
  const resend = client();
  if (!resend) return;
  try {
    await resend.emails.send({ from: FROM_EMAIL, to: ADMIN_EMAIL, subject, html });
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
  }
}

export async function notifyNewUser(email: string, name: string) {
  await notifyAdmin(
    `New user signed up: ${name}`,
    `<p>A new user just signed up on Agent World.</p>
     <p><strong>Name:</strong> ${name}<br>
     <strong>Email:</strong> ${email}</p>
     <p><a href="https://agent-world.dev">agent-world.dev</a></p>`
  );
}

export async function notifyNewThread(
  title: string,
  category: string,
  threadId: string,
  authorName: string
) {
  await notifyAdmin(
    `New forum thread: ${title}`,
    `<p><strong>${authorName}</strong> posted a new thread in <strong>${category}</strong>.</p>
     <p><strong>Title:</strong> ${title}</p>
     <p><a href="https://agent-world.dev/forum/${category}/${threadId}">View thread →</a></p>`
  );
}

export async function notifyNewReply(
  threadTitle: string,
  category: string,
  threadId: string,
  authorName: string
) {
  await notifyAdmin(
    `New reply in: ${threadTitle}`,
    `<p><strong>${authorName}</strong> replied in <strong>${threadTitle}</strong>.</p>
     <p><a href="https://agent-world.dev/forum/${category}/${threadId}">View thread →</a></p>`
  );
}

export async function notifyNewWorld(
  title: string,
  worldId: string,
  authorName: string
) {
  await notifyAdmin(
    `New world posted: ${title}`,
    `<p><strong>${authorName}</strong> shared a new world.</p>
     <p><strong>Title:</strong> ${title}</p>
     <p><a href="https://agent-world.dev/worlds/${worldId}">View world →</a></p>`
  );
}
