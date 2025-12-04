import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import heroImg from "../assets/26.png";
import { jobData, seoData } from "../Constants/Data";
import NewsletterSection from "../Components/Newsletter";
import JobCard from "../Components/JobCard";
import SeoHead from "../Components/SeoHead";
import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

export default function Career() {
  const [searchParams] = useSearchParams();
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
                  <h1 className="fw-bold text-dark heading display-3" id="career-overview">
                    Be the Reason They
                    <span className="dark-text"> Smile Today </span>
                  </h1>
                  <p className="lead text-dark">
                    Whether you're a caregiver, nurse, or volunteer, your time
                    and heart can change someone's day - or even their life.
                    Come serve with compassion.. View Openings
                  </p>
                </div>

                {/* Right: Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={heroImg}
                    alt="Care Image"
                    className="img-fluid rounded-5 w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-start">
              <small className="text-uppercase fw-semibold">
                JOIN OUR TEAM
              </small>
              <h1 className="heading fw-bold mt-3" id="job-openings">
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
                          <span className="page-link p-0">
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