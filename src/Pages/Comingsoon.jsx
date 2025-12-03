import React from "react";
import heroImg from "../assets/banner-bg-1.jpg";
import NewsletterSection from "../Components/Newsletter";

export default function ComingSoon() {
  return (
    <>
      <div className="container-fluid p-0">
        {/* Hero section */}
        <section
          className="py-5 mt-5 position-relative text-white d-flex align-items-center"
          style={{
            height: "50vh",
            backgroundImage: `url(${heroImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              zIndex: 1,
            }}
          ></div>

          <div
            className="container position-relative text-center py-5"
          >
            <h1 className="fw-bold display-4">Coming Soon....</h1>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
