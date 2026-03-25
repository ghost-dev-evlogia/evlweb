import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

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
    body: `All content on this site — including text, design, graphics, logos, research summaries, and visual elements — is the property of Evlogia or its licensors and is protected by applicable copyright and intellectual property law. You may not reproduce, distribute, or create derivative works without explicit written permission.`,
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
    body: `To the maximum extent permitted by applicable law, Evlogia and its affiliates, officers, and employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this site or its content — even if we have been advised of the possibility of such damages.`,
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
    <>
      <SiteNav />

      <main className="pt-24 md:pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
              Legal
            </p>
            <h1
              className="font-serif text-black/90 leading-[1.07] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.01em" }}
            >
              Terms of Service
            </h1>
            <p className="font-sans text-black/30 text-[11px] tracking-wide">
              Last updated: March 2026
            </p>
          </div>

          {/* Divider */}
          <div className="divider mb-14" />

          {/* Intro */}
          <p className="font-sans text-black/50 text-sm leading-relaxed mb-14">
            These Terms of Service govern your access to and use of evlogia.ai, operated by Evlogia. Please read them carefully.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="font-serif text-black/80 text-lg mb-3 leading-snug">
                  {title}
                </h2>
                <p className="font-sans text-black/50 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
