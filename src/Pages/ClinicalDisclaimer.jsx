import heroImg from "../assets/20.png";
import NewsletterSection from "../Components/Newsletter";
import SeoHead from "../Components/SeoHead";
import { seoData } from "../Constants/Data";

export default function ClinicalDisclaimer() {
  return (
    <>
      <SeoHead {...seoData.clinicaldisclaimer} />

      <div className="container-fluid p-0">
        <section className="testimonal mt-5 py-5">
          <div className="container mt-5 py-5">
            <div className="row flex-lg-row flex-column">
              <div className="col-lg-6 col-12 text-start">
                <h1 className="heading mb-4">Clinical Disclaimer</h1>

                <p className="small">
                  Our website content is general in nature and not a substitute
                  for professional advice.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">
                  General information only{" "}
                </h5>
                <p className="small">
                  Content on this website is provided for general information
                  only and is not a substitute for professional medical or
                  clinical advice. Always seek the advice of a qualified health
                  professional with any questions you may have regarding a
                  medical condition.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">Emergencies </h5>
                <p className="small">
                  If you think you may be having a medical emergency, call 000
                  immediately.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">
                  No client‑provider relationship{" "}
                </h5>
                <p className="small">
                  Use of this website does not create a client‑provider
                  relationship between you and Rosewood Gardens.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">
                  Third‑party content{" "}
                </h5>
                <p className="small">
                  We are not responsible for the content of external sites
                  linked from this website.
                </p>

                <h5 className="fw-bold heading text-dark mt-3">Liability </h5>
                <p className="small">
                  To the extent permitted by law, Rosewood Gardens is not liable
                  for any loss arising from reliance on information on this
                  site.
                </p>
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
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
