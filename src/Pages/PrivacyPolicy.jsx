import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import heroImg from "../assets/20.png";
import NewsletterSection from "../Components/Newsletter";
import SeoHead from "../Components/SeoHead";
import { seoData } from "../Constants/Data";
import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

export default function PrivacyPolicy() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    if (!targetId) {
      targetId = q;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    setTimeout(() => {
      const HEADER_HEIGHT = 180;
      const elementY = el.getBoundingClientRect().top + window.scrollY;
      const offsetY = elementY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
    }, 200);
  }, [searchParams]);

  return (
    <>
      <SeoHead {...seoData.privacypolicy} />

      <div className="container-fluid p-0">
        {/* First section */}
        <section className="testimonal mt-5 py-5">
          <div className="container mt-5 py-5">
            <div className="row flex-lg-row flex-column">
              <div className="col-lg-6 col-12 text-start">
                <h1 className="heading mb-4" id="privacy-policy-overview">
                  Privacy Policy
                </h1>

                <p className="small">
                  <strong>Last updated </strong>: 3 September 2025 <br />
                  <strong>Legal entity</strong>: BKV Aged Care Pty Ltd (trading
                  as Rosewood Gardens) <br />
                  <strong>ABN</strong>: 87 635 762 612 <br />
                  <strong>Contact</strong>:{" "}
                  <a
                    href="mailto:info@rosewoodgardens.com.au"
                    className="text-decoration-none text-dark"
                  >
                    info@rosewoodgardens.com.au{" "}
                  </a>
                </p>

                <h5 className="fw-bold heading text-dark mt-3" id="at-a-glance">
                  1) At a glance
                </h5>
                <ul className="list-unstyled">
                  <li className="d-flex gap-2 mb-2">
                    <i className="bi bi-record-fill"></i>
                    <div>
                      <p className="mb-0 small">
                        We respect your privacy and handle personal information
                        in line with the{" "}
                        <strong>
                          Privacy Act 1988 (Cth) and the Australian Privacy
                          Principles (APPs).{" "}
                        </strong>
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record-fill"></i>
                    <div>
                      <p className="mb-0">
                        We collect only what we need to deliver our services
                        (residential aged care, in‑home care, and NDIS supports
                        including SDA/SIL) and to run our business safely.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record-fill"></i>
                    <div>
                      <p className="mb-0">
                        You can ask to <strong>access or correct</strong> your
                        information at any time and you can opt out of direct
                        marketing.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record-fill"></i>
                    <div>
                      <p className="mb-0">
                        We secure information and keep it only as long as needed
                        or required by law.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 small">
                    <i className="bi bi-record-fill"></i>
                    <div>
                      <p className="mb-0">
                        If a serious breach occurs, we follow the{" "}
                        <strong>Notifiable Data Breaches (NDB) scheme. </strong>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6 col-12 mb-4">
                <div
                  className="position-relative overflow-hidden d-flex justify-content-center align-items-center"
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderTopLeftRadius: "999px",
                    borderBottomLeftRadius: "999px",
                    width: "100%",
                    maxWidth: "900px",
                    height: "auto",
                    aspectRatio: "3 / 2",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <img
                    className="w-100 h-100 object-fit-cover"
                    style={{
                      objectFit: "cover",
                    }}
                    src={heroImg}
                    alt="Privacy Policy"
                  />
                </div>
              </div>
            </div>

            <div className="row text-start mt-5 mt-lg-0">
              <h5 className="fw-bold heading text-dark mt-3" id="who-we-are-scope">
                2) Who we are and scope
              </h5>
              <p className="small">
                This policy explains how{" "}
                <strong>BKV Aged Care Pty Ltd (ABN 87 635 762 612)</strong>,
                trading as <strong>Rosewood Gardens</strong> ("Rosewood
                Gardens", "we", "us", "our"), collects, uses, discloses and
                protects personal information when you: - visit our websites and
                digital channels; - enquire about or receive our services
                (residential care, in‑home care, disability supports including
                SDA/SIL); - apply for or hold a role with us; or - otherwise
                interact with us. <br /> <br />
                This policy sits alongside our{" "}
                <strong>
                  Complaints & Feedback, Accessibility, Terms of Use
                </strong>{" "}
                and <strong>Clinical Disclaimer.</strong>{" "}
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="what-we-collect">
                3) What we collect
              </h5>
              <p className="small">
                Depending on your relationship with us, we may collect: <br />
                <br />
                <strong>Identity & contact</strong> — name, address, phone,
                email, date of birth, next of kin, authorised
                representatives/advocates. <br />
                <strong>Care & support </strong>— relevant health information,
                assessments, care plans, progress notes, risk/incident details,
                behaviour support information, mobility/nutrition needs,
                equipment details. <br />
                <strong>Funding & billing</strong> — HCP/NDIS identifiers,
                plan/budget details, service bookings, invoices/payments,
                concession details. <br />
                <strong>Employment</strong> — CV, qualifications, references,
                right‑to‑work checks, screening outcomes (e.g., police/NDIS
                Worker Screening), rosters, training records. <br />
                <strong>Online/device</strong> — IP address, pages viewed,
                browser type, cookies and analytics events; optional push
                notification settings. <br />
                <strong>Media & testimonials</strong> — photos, videos, feedback
                (only with consent where required). <br />
                <strong>Sensitive information</strong> (including health
                information) is collected only where reasonably necessary for
                your care or our legal obligations, with your consent or as
                otherwise permitted by law.
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="how-we-collect">
                4) How we collect
              </h5>
              <ul className="list-unstyled">
                <li className="d-flex gap-2 mb-2 small">
                  <i className="bi bi-record2"></i>
                  <div>
                    <p className="mb-0">
                      <strong>Directly from you</strong> (forms, phone, email,
                      meetings, assessments, service delivery).
                    </p>
                  </div>
                </li>

                <li className="d-flex gap-2 mb-2 small">
                  <i className="bi bi-record2"></i>
                  <div>
                    <p className="mb-0">
                      <strong>From your authorised representative</strong>{" "}
                      (e.g., family, guardian, plan manager).
                    </p>
                  </div>
                </li>

                <li className="d-flex gap-2 mb-2 small">
                  <i className="bi bi-record2"></i>
                  <div>
                    <p className="mb-0">
                      <strong>From referrers and care partners</strong> (e.g.,
                      My Aged Care, clinicians, allied health, support
                      coordinators), where you have consented or as permitted by
                      law.
                    </p>
                  </div>
                </li>

                <li className="d-flex gap-2 mb-2 small">
                  <i className="bi bi-record2"></i>
                  <div>
                    <p className="mb-0">
                      <strong>Automatically</strong> when you use our website
                      (cookies/analytics) and systems we operate.{" "}
                    </p>
                  </div>
                </li>
                <li className="d-flex gap-2 mb-2 small">
                  <i className="bi bi-record2"></i>
                  <div>
                    <p className="mb-0">
                      <strong>Recruitment</strong> processes (applications,
                      screening and onboarding systems).{" "}
                    </p>
                  </div>
                </li>
              </ul>
              <p className="small">
                If you do not provide information we reasonably require, we may
                be unable to provide some services.
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="why-we-use">
                5) Why we use your information
              </h5>
              <p className="small">
                We use personal information to: - deliver, coordinate and
                evaluate your care and supports; <br />- communicate with you
                and your authorised representatives; <br />
                - manage bookings, billing, funding and compliance; <br />- meet
                legal, regulatory and reporting obligations (including{" "}
                <strong>Aged Care Quality Standards</strong> and{" "}
                <strong>NDIS Practice Standards</strong>); <br />
                - ensure safety and quality (audits, incidents, continuous
                improvement); <br />
                - recruit, train and manage staff and contractors; <br />
                - operate and improve our websites, apps and services; <br />
                - send service updates and information you've opted to receive
                (you can unsubscribe at any time). <br /> <br />
                We <strong>do not sell</strong> your personal information.
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="when-we-disclose">
                6) When we disclose information
              </h5>
              <p className="small">
                We may disclose personal information to: - your authorised
                representatives; <br />
                - clinicians, hospitals and allied health providers involved in
                your care; <br />
                - funding bodies (e.g., Services Australia, My Aged Care, NDIS)
                and plan managers; <br />
                - regulators and oversight bodies where required (e.g., Aged
                Care Quality and Safety Commission; NDIS Quality and Safeguards
                Commission); <br />
                - service partners and IT providers who help us operate our
                services (e.g., secure care management, rostering, medication
                and communication systems) under confidentiality and security
                terms; <br />- insurers and professional advisers (legal,
                accounting, audit); <br />-{" "}
                <strong>law enforcement or other authorities</strong> where
                required or authorised by law. <br />
                <br />
                We may also use or disclose information where reasonably
                necessary to{" "}
                <strong>
                  prevent or respond to unlawful activity or serious threats to
                  health or safety
                </strong>
                , or to{" "}
                <strong>establish, exercise or defend legal claims</strong>.
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="overseas-disclosure">
                7) Overseas disclosure
              </h5>
              <p className="small">
                Some service providers may store data in Australia or overseas
                (for example, cloud hosting or email). Where information may be
                held outside Australia, we take reasonable steps to ensure
                appropriate safeguards consistent with the APPs and our
                contractual obligations.
              </p>

              <h5 className="fw-bold heading text-dark mt-3" id="direct-marketing">
                8) Direct marketing and preferences
              </h5>
              <p className="small">
                We may send you updates about services you use or may find
                helpful. You can opt out at any time using the unsubscribe link
                in an email or by contacting{" "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>
                . We comply with the <strong>Spam Act 2003 (Cth)</strong>.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="cookies-analytics">
                9) Cookies, analytics and notifications
              </h5>
              <p className="small">
                Our websites use cookies and similar technologies to operate,
                improve performance and understand usage. You can control
                cookies via your browser, and you can decline analytics cookies
                if we offer that choice. If we offer browser notifications, you
                can enable or disable them in your browser at any time.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="cctv-site-visitors">
                10) CCTV and site visitors (if applicable)
              </h5>
              <p className="small">
                Where CCTV is used at our premises, it is for safety and
                security. Footage may capture images of residents, visitors and
                staff. Signs will be displayed where CCTV operates. Footage is
                retained for a limited period and may be disclosed to law
                enforcement or regulators where required or authorised by law.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="security">
                11) Security
              </h5>
              <p className="small">
                We use technical, physical and organisational measures to
                protect personal information, including role‑based access,
                multi‑factor authentication for key systems, encryption in
                transit, secure premises, staff training and auditing. Standard
                email is not suitable for highly sensitive information—please
                use our secure forms or phone us to discuss alternatives. If a
                data breach is likely to result in <strong>serious harm</strong>
                , we will assess and notify affected individuals and the OAIC as
                required under the{" "}
                <strong>Notifiable Data Breaches scheme</strong>.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="retention-deletion">
                12) Retention and deletion
              </h5>
              <p className="small">
                We keep personal information only as long as necessary for care,
                legal, regulatory and business purposes, then securely destroy
                or de‑identify it in line with our retention schedules and
                applicable laws.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="access-correction">
                13) Access and correction
              </h5>
              <p className="small">
                You can request access to, or correction of, your personal
                information. We will respond within a reasonable time. Email{" "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>{" "}
                and tell us what you need. We may need to verify your identity
                and, if lawful, we'll explain any limits on access.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="employment-records">
                14) Employment records
              </h5>
              <p className="small">
                For current and former employees, some handling of employee
                records may be exempt from the APPs under the Privacy Act. Even
                where the exemption applies, we protect employee information and
                comply with other legal obligations (e.g., workplace and safety
                laws). This exemption <strong>does not</strong> apply to
                applicants, contractors or volunteers—APPs still apply to those
                records.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="children-decision-making">
                15) Children and supported decision‑making
              </h5>
              <p className="small">
                Where required, we seek consent from a parent, guardian or
                authorised representative, and we support people to make their
                own choices wherever possible.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="complaints">
                16) Complaints
              </h5>
              <p className="small">
                If you have a privacy concern or wish to make a complaint,
                contact us at{" "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>
                . We aim to acknowledge within <strong>2 business days</strong>{" "}
                and resolve within <strong>10 business days</strong>. If you are
                not satisfied, you may contact the{" "}
                <strong>
                  Office of the Australian Information Commissioner (OAIC)
                </strong>{" "}
                at{" "}
                <a href="www.oaic.gov.au" className="dark-text">
                  www.oaic.gov.au
                </a>
                .
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="changes-policy">
                17) Changes to this policy
              </h5>
              <p className="small">
                We may update this policy from time to time. The{" "}
                <strong>"Last updated"</strong> date above reflects the latest
                version. Significant changes will be highlighted on this page.
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="contact-us">
                18) Contact us
              </h5>
              <p className="small">
                <strong>Rosewood Gardens</strong> (BKV Aged Care Pty Ltd, ABN 87
                635 762 612) <br />
                Email:{" "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>
                <br />
                If your request is about a current service, please include your
                full name and how we can contact you.{" "}
              </p>

              <h5 className="fw-bold heading text-dark mt-4" id="definitions">
                19) Definitions (summary)
              </h5>
              <p className="small">
                <strong>Personal information</strong>: information or opinion
                about an identified individual or reasonably identifiable
                individual. <br />
                <strong>Sensitive information</strong>: a subset of personal
                information that includes health information. <br />
                <strong>APPs</strong>: the Australian Privacy Principles in the
                Privacy Act 1988 (Cth). <br />
                <strong>NDB scheme</strong>: Notifiable Data Breaches scheme
                under the Privacy Act.{" "}
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}