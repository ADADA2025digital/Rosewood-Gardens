import heroImg from "../assets/20.png";
import NewsletterSection from "../Components/Newsletter";
import SeoHead from "../Components/SeoHead";
import { seoData } from "../Constants/Data";

export default function TermofUse() {
  return (
    <>
      <SeoHead {...seoData.terms} />

      <div className="container-fluid p-0">
        {/* Frist section */}
        <section className="testimonal mt-5 py-5">
          <div className="container mt-5 py-5">
            <div className="row flex-lg-row flex-column">
              <div className="col-lg-6 col-12 text-start">
                <h1 className="heading mb-4">Terms of Use</h1>
                <p className="small">
                  Please read these terms carefully before using our website.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">Who we are</h5>
                <p className="small">
                  This website is operated by BKV Aged Care Pty Ltd (ABN 87 635
                  762 612), trading as Rosewood Gardens ("Rosewood Gardens",
                  "we", "us"). By using this site you agree to these Terms and
                  our {" "}
                  <a href="/privacy-policy" className="dark-text">
                    Privacy Policy
                  </a>
                  .
                </p>
                <h5 className="fw-bold heading text-dark mt-3">
                  Website content
                </h5>
                <p className="small">
                  Information on this site is general in nature and not
                  clinical, medical, legal or financial advice. It does not
                  replace advice from qualified professionals. In an emergency
                  call 000.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">
                  Your responsibilities
                </h5>
                <ul className="list-unstyled">
                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Use the site lawfully and for its intended purpose.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Do not attempt to disrupt, hack, or otherwise compromise
                        the site or our services.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Provide accurate details in any forms and respect the
                        privacy of others.
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
                    maxWidth: "800px",
                    height: "auto",
                    aspectRatio: "3 / 2",
                    backgroundColor: "#f8f9fa", // optional, for contrast
                  }}
                >
                  {" "}
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
              <h5 className="fw-bold heading text-dark mt-3">
                Intellectual property
              </h5>
              <p className="small">
                Unless stated otherwise, all content is owned by or licensed to
                Rosewood Gardens. You may view and print content for personal
                use. You must not reproduce, distribute or adapt content without
                our prior written consent, except as permitted by law.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">
                Thirdparty sites
              </h5>
              <p className="small">
                Links to thirdparty sites are provided for convenience. We do
                not control and are not responsible for their content or
                practices.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">Liability</h5>
              <p className="small">
                To the maximum extent permitted by law, we exclude all
                warranties and are not liable for any loss, damage or cost
                arising from your use of this site. Nothing in these Terms
                excludes, restricts or modifies any consumer guarantee, right or
                remedy under the Australian Consumer Law that cannot be
                excluded, restricted or modified.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">Indemnity</h5>
              <p className="small">
                You indemnify us and our officers, employees and contractors
                against claims, loss or liability arising from your breach of
                these Terms or misuse of the site.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">
                Changes to the site and terms
              </h5>
              <p className="small">
                We may update the site and these Terms at any time. The updated
                Terms apply from the date published on this page.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">Governing law</h5>
              <p className="small">
                These Terms are governed by the laws of Victoria, Australia. The
                courts of Victoria have nonexclusive jurisdiction.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">Contact </h5>
              <p className="small">
                Questions about these Terms: {"  "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>
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
