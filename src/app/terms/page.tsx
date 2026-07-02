import type { Metadata } from "next";
import { FarmPageShell } from "@/components/farm-page-shell";

export const metadata: Metadata = {
  title: "Terms of Service | Evlogia",
  description: "Terms of Service for evlogia.ai",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using evlogia.ai, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site. These Terms apply to all visitors and users.`,
  },
  {
    title: "2. Use of the Website",
    body: `This website is for informational purposes only. You may not use it in any way that violates applicable law, disrupts its operation, scrapes content at scale, impersonates Evlogia, or attempts unauthorized access to any system or account. We reserve the right to restrict access at our discretion.`,
  },
  {
    title: "3. Intellectual Property",
    body: `All content on this site, including text, design, graphics, logos, research summaries, and visual elements, is the property of Evlogia or its licensors and is protected by applicable copyright and intellectual property law. You may not reproduce, distribute, or create derivative works without explicit written permission.`,
  },
  {
    title: "4. Services and Engagements",
    body: `Accessing or browsing this site does not create a client relationship with Evlogia. All consulting, research, or product engagements are governed by separate written agreements entered into between Evlogia and the relevant client. Nothing on this site constitutes an offer or contract.`,
  },
  {
    title: "5. Disclaimers",
    body: `This site is provided "as is" and "as available" without warranties of any kind, express or implied. Evlogia makes no representations regarding the accuracy, completeness, or fitness for a particular purpose of any content on this site. We do not warrant that the site will be uninterrupted or error-free.`,
  },
  {
    title: "6. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Evlogia and its affiliates, officers, and employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this site or its content, even if we have been advised of the possibility of such damages.`,
  },
  {
    title: "7. Third-Party Links and Services",
    body: `This site may contain links to third-party websites or services, including scheduling tools, external research publications, and other resources. These links are provided for convenience only. Evlogia does not control and is not responsible for the content, privacy practices, or terms of any third-party sites. Linking to a third party does not constitute endorsement.`,
  },
  {
    title: "8. Changes to These Terms",
    body: `We may update these Terms from time to time. When we do, we will revise the "Last updated" date at the top of this page. Continued use of the site after any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.`,
  },
  {
    title: "9. Governing Law",
    body: `These Terms are governed by and construed in accordance with applicable law. Any disputes arising from or relating to these Terms or your use of this site shall be subject to the exclusive jurisdiction of the competent courts in the applicable jurisdiction.`,
  },
  {
    title: "10. Contact",
    body: `If you have any questions about these Terms, please contact us at legal@evlogia.ai.`,
  },
];

export default function TermsPage() {
  return (
    <FarmPageShell eyebrow="Legal" title="Terms of Service" updated="Last updated: March 2026">
      <p className="font-sans text-ink-2 text-[15px] leading-relaxed mb-10">
        These Terms of Service govern your access to and use of evlogia.ai, operated by Evlogia.
        Please read them carefully.
      </p>
      <div className="space-y-9">
        {sections.map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-display text-ink text-lg mb-2.5 leading-snug">{title}</h2>
            <p className="font-sans text-ink-2 text-[15px] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </FarmPageShell>
  );
}
