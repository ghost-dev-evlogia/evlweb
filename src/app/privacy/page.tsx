import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Evlogia",
  description: "Privacy Policy for evlogia.ai",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly: for example, when you fill out a contact form, send an email, or schedule a call through our booking tool. This may include your name, email address, company name, and the contents of your message. We also collect limited usage data automatically, such as pages visited and referral sources, through analytics tools.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to respond to inquiries, schedule and manage calls and engagements, improve this website, and understand how people find us. We do not use your information for advertising, and we do not sell it to third parties under any circumstances.`,
  },
  {
    title: "3. Cookies and Analytics",
    body: `This site may use cookies and similar tracking technologies to understand usage patterns. These are standard session and analytics cookies. They do not identify you personally. You can configure your browser to refuse cookies, though some functionality may be affected. We use privacy-conscious analytics and do not build individual profiles from this data.`,
  },
  {
    title: "4. Third-Party Services",
    body: `We use third-party services to operate this site, including Cal.com for scheduling. These services have their own privacy policies and may collect information in accordance with those policies. We choose service providers carefully, but we are not responsible for their data practices. Links to third-party sites are not endorsements.`,
  },
  {
    title: "5. Data Sharing",
    body: `We do not sell, trade, or rent your personal information. We may share information with service providers who assist in operating this site (subject to confidentiality obligations), or if required to do so by law or to protect our legal rights. We will not share your data for marketing purposes with third parties.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain personal information only as long as necessary for the purposes described in this policy: typically the duration of a business relationship or inquiry, plus a reasonable period thereafter. You may request deletion of your data at any time.`,
  },
  {
    title: "7. Security",
    body: `We take reasonable technical and organizational measures to protect your information against unauthorized access, disclosure, or destruction. No method of transmission or storage is completely secure, but we take this seriously and act accordingly.`,
  },
  {
    title: "8. Your Rights",
    body: `You have the right to access the personal information we hold about you, request corrections, or ask us to delete it. You may also withdraw any consent you have given. To exercise any of these rights, contact us at the address below. We will respond within a reasonable time.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be reflected in the "Last updated" date at the top of this page. We encourage you to review this page periodically. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact",
    body: `For any privacy-related questions, requests, or concerns, please contact us at privacy@evlogia.ai. We take every inquiry seriously and will respond promptly.`,
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-sans text-black/30 text-[11px] tracking-wide">
              Last updated: March 2026
            </p>
          </div>

          {/* Divider */}
          <div className="divider mb-14" />

          {/* Intro */}
          <p className="font-sans text-black/50 text-sm leading-relaxed mb-14">
            Evlogia respects your privacy. This policy explains what information we collect, how we use it, and what rights you have. It applies to evlogia.ai and any direct communications with us.
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
