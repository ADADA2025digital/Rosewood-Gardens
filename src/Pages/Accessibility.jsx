import heroImg from "../assets/20.png";
import NewsletterSection from "../Components/Newsletter";
import SeoHead from "../Components/SeoHead";
import { seoData } from "../Constants/Data";

export default function Accessibility() {
  return (
    <>
      <SeoHead {...seoData.accessibility} />

      <div className="container-fluid p-0">
        <section className="testimonal mt-5 py-5">
          <div className="container mt-5 py-5">
            <div className="row flex-lg-row flex-column">
              <div className="col-lg-6 col-12 text-start">
                <h1 className="heading mb-4">Accessibility</h1>
                <p className="small">
                  We aim to meet WCAG 2.2 AA and welcome your feedback to
                  improve. Our commitment
                </p>
                <h5 className="fw-bold heading text-dark mt-3">
                  Our commitment{" "}
                </h5>
                <p className="small">
                  We are committed to inclusive services and accessible
                  information for people of all abilities. We aim to conform to
                  the <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.</strong>
                </p>

                <h5 className="fw-bold heading text-dark mt-3">
                  What we’re doing
                </h5>
                <ul className="list-unstyled">
                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Semantic HTML structure with clear landmarks and one H1
                        per page
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Keyboardnavigable menus and forms with visible focus
                        styles.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Text alternatives for meaningful images; decorative
                        icons hidden from assistive tech.
                      </p>
                    </div>
                  </li>
                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Colour contrast meeting or exceeding WCAG AA.
                      </p>
                    </div>
                  </li>
                  <li className="d-flex gap-2 mb-2 small">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Captions or transcripts for key media where applicable.
                      </p>
                    </div>
                  </li>
                  <li className="d-flex gap-2 mb-2">
                    <i className="bi bi-record2"></i>
                    <div>
                      <p className="mb-0">
                        Ongoing automated and manual testing with user feedback.
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
              <h5 className="fw-bold heading text-dark mt-3">Compatibility </h5>
              <p className="small">
                We support current versions of major browsers on desktop and
                mobile. Some legacy browsers may not fully support all features.
              </p>

              <h5 className="fw-bold heading text-dark mt-3">
                Feedback and contact{" "}
              </h5>
              <p className="small">
                If you encounter an accessibility barrier, please contact us at {" "}
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="dark-text"
                >
                  info@rosewoodgardens.com.au
                </a>{" "}
                Tell us the page URL, the issue and any assistive tech you’re
                using. We aim to acknowledge within 2 business days.
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
