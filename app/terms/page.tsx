import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Agent World",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-aw-text tracking-tight mb-2">
        Terms of Use
      </h1>
      <p className="text-aw-muted text-sm mb-10">
        Last updated: March 2026
      </p>

      <div className="prose prose-sm max-w-none text-aw-text">
        <p>
          Welcome to Agent World. By accessing or using this website
          (agent-world.dev), you agree to these Terms of Use. If you do not
          agree, please do not use the site.
        </p>

        <h2>1. Use of the Site</h2>
        <p>
          Agent World is a community platform for sharing worlds, discussing the
          Agent World tool, and connecting with other users. You may use the
          site for lawful, personal, and non-commercial purposes only.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>Post content that is illegal, abusive, harassing, or hateful.</li>
          <li>Upload malware, viruses, or any harmful code.</li>
          <li>Impersonate other users or misrepresent your identity.</li>
          <li>Attempt to gain unauthorized access to any part of the site.</li>
          <li>Scrape or harvest user data without permission.</li>
        </ul>

        <h2>2. User Accounts</h2>
        <p>
          You may sign in using GitHub or Google OAuth. You are responsible for
          all activity that occurs under your account. We reserve the right to
          suspend or delete accounts that violate these terms.
        </p>

        <h2>3. User-Generated Content</h2>
        <p>
          You retain ownership of content you post (worlds, screenshots, forum
          posts, messages). By posting content on Agent World, you grant us a
          non-exclusive, royalty-free license to display and distribute that
          content in connection with the site.
        </p>
        <p>
          You are solely responsible for content you submit. Do not post content
          you do not have the right to share.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          The Agent World software is open source and available under the MIT
          License on GitHub. The Agent World website and its design are owned by
          their respective creators.
        </p>

        <h2>5. Disclaimers</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; without warranties of any
          kind. We do not guarantee uninterrupted access, and we are not liable
          for any loss or damage arising from your use of the site.
        </p>

        <h2>6. Modifications</h2>
        <p>
          We may update these terms at any time. Continued use of the site after
          changes are posted constitutes acceptance of the revised terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href="mailto:hello@agent-world.dev" className="underline underline-offset-2">
            hello@agent-world.dev
          </a>
          .
        </p>
      </div>
    </div>
  );
}
