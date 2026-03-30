import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Agent World",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-aw-text tracking-tight mb-2">
        Privacy Policy
      </h1>
      <p className="text-aw-muted text-sm mb-10">
        Last updated: March 2026
      </p>

      <div className="prose prose-sm max-w-none text-aw-text">
        <p>
          This Privacy Policy describes how Agent World (&ldquo;we&rdquo;,
          &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and shares
          information when you use agent-world.dev.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Account information</h3>
        <p>
          When you sign in via GitHub or Google, we receive your name, email
          address, avatar, and (for GitHub) your GitHub profile URL. This
          information is stored in our database (Supabase) to power your profile
          and community features.
        </p>
        <h3>Content you post</h3>
        <p>
          We store worlds, screenshots, forum threads, replies, and private
          messages that you submit through the site.
        </p>
        <h3>Usage data</h3>
        <p>
          We use Google Analytics to collect anonymized data about how visitors
          use the site (pages visited, session duration, browser/device type).
          No personally identifiable information is shared with Google Analytics.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To operate and improve the site and community features.</li>
          <li>To display your profile, posts, and activity to other users.</li>
          <li>
            To send administrative notifications (account activity, replies to
            your posts) — you can opt out by deleting your account.
          </li>
          <li>To analyze usage patterns and improve the user experience.</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal data. We share data only with the
          third-party services necessary to operate the site:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — database and authentication (data stored
            in the EU).
          </li>
          <li>
            <strong>Vercel</strong> — website hosting and deployment.
          </li>
          <li>
            <strong>Google Analytics</strong> — anonymized usage analytics.
          </li>
          <li>
            <strong>Resend</strong> — transactional email delivery.
          </li>
        </ul>

        <h2>4. Data Retention</h2>
        <p>
          We retain your account data for as long as your account is active. You
          may delete your account at any time by contacting us, after which we
          will delete your personal information within 30 days.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use cookies to maintain your login session (via Supabase) and to
          remember your theme preference (dark/light mode). Google Analytics
          also sets cookies. You can disable cookies in your browser settings,
          though some features may not work correctly.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access,
          correct, or delete your personal data. To exercise these rights,
          contact us at{" "}
          <a href="mailto:hello@agent-world.dev" className="underline underline-offset-2">
            hello@agent-world.dev
          </a>
          .
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will note the updated
          date at the top of this page.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@agent-world.dev" className="underline underline-offset-2">
            hello@agent-world.dev
          </a>
          .
        </p>
      </div>
    </div>
  );
}
