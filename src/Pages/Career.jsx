import React, { useState } from "react";
import heroImg from "../assets/26.png";
import { jobData, seoData } from "../Constants/Data";
import NewsletterSection from "../Components/Newsletter";
import JobCard from "../Components/JobCard";
import SeoHead from "../Components/SeoHead";

export default function Career() {
  const [isPaused, setIsPaused] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(jobData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = jobData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <SeoHead {...seoData.career} />

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section className="py-5 mt-5" id="heroCarousel">
          <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="container">
              <div className="row align-items-center">
                {/* Left: Text Content */}
                <div className="col-md-6 mb-4 mb-lg-0 text-white text-center text-md-start">
                  <p className="fs-4 fw-bold dark-text">CAREERS</p>
                  <h1 className="fw-bold text-dark heading display-3">
                    Be the Reason They
                    <span className="dark-text"> Smile Today </span>
                  </h1>
                  <p className="lead text-dark">
                    Whether you’re a caregiver, nurse, or volunteer, your time
                    and heart can change someone’s day - or even their life.
                    Come serve with compassion.. View Openings
                  </p>
                  {/* <GlobalButton
                    text="Join Today"
                    variant="buttonv1"
                    onClick={() => setShowModal(true)}
                  /> */}
                </div>

                {/* Right: Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={heroImg}
                    alt="Care Image"
                    className="img-fluid rounded-5 w-100" // Ensures the image is responsive
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        {/* <section className="py-5 bg-white">
          <div className="container">
            <div className="text-center">
              <small className="text-uppercase fw-semibold">
                WHY CHOOSE US?
              </small>
              <h1 className="heading fw-bold mt-3">
                Our Work. Their Comfort. Our Promise
              </h1>
            </div>

            <div className="row mt-5">
              {careData.map((team, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card border-0 team-card shadow rounded-4 p-4 d-flex flex-column h-100">
                    <div className="card-bodyd-flex text-start">
                      <h5 className="card-title heading dark-text fw-semibold">
                        {team.title}
                      </h5>
                      <p className="card-text small">{team.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="logo-carousel-container mx-auto my-2 py-2 px-0 overflow-hidden position-relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="logo-carousel d-flex gap-4"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {profiles.concat(profiles).map((logo, index) => (
                <div
                  className="logo-item d-flex align-items-end rounded-3 justify-content-center col-md-2 overflow-hidden"
                  key={index}
                >
                  <img
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    className="w-100 object-fit-cover rounded-3"
                  />
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Job Openings Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-start">
              <small className="text-uppercase fw-semibold">
                JOIN OUR TEAM
              </small>
              <h1 className="heading fw-bold mt-3">
                Support That Starts With Truly Knowing You
              </h1>
            </div>

            <div className="row align-items-stretch">
              {currentJobs.map((job, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <JobCard
                    title={job.title}
                    description={job.description}
                    sector={job.sector}
                    time={job.time}
                    requirements={job.requirements}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => setCurrentPage(page)}
                        >
                          <span
                            className="page-link p-0 
                        "
                          >
                            <i className="bi bi-dash"></i>
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
