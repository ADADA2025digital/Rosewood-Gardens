import React, { useState, useEffect, useRef } from "react";
import heroImg from "../assets/banner-bg-1.jpg";
import NewsletterSection from "../Components/Newsletter";
import GlobalButton from "../Components/Button";

import { blogData, seoData, testimonials } from "../Constants/Data";
import SeoHead from "../Components/SeoHead";

export default function Newsletter() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNeswletter = blogData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Google reviews
  const containerRef = useRef(null);

  useEffect(() => {
    // Load the script
    const script = document.createElement("script");
    script.src = "https://widget.tagembed.com/embed.min.js";
    script.async = true;

    // Optional: Call Tagembed only if needed
    script.onload = () => {
      console.log("Tagembed script loaded.");
      // Optional: You can call window.tagembed('create', ...) if you are using manual embed
      // But it's not usually necessary with auto widgets
    };

    script.onerror = () => {
      console.error("Failed to load Tagembed script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SeoHead {...seoData.newsletters} />

      <div className="container-fluid p-0"> 
        {/* Hero section */}
        <section
          className="py-5 position-relative text-white d-flex align-items-center"
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
            style={{ zIndex: 2 }}
          >
            <h1 className="fw-bold display-4">Our Newsletters</h1>
          </div>
        </section>

        {/* Blog section */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <small className="text-uppercase dark-text fw-semibold">
              LATEST BLOG
            </small>
            <h1 className="heading fw-bold">
              Stay informed and inspired with our <br /> most recent posts.
            </h1>

            <div className="position-relative">
              <div className="row my-5">
                {currentNeswletter.map((blog, index) => (
                  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                    <div className="card mb-4 shadow border-0 rounded-4 p-4">
                      <img
                        src={blog.image}
                        className="card-img-fluid rounded-4"
                        alt={blog.title}
                        style={{ height: "245px" }}
                      />
                      <div className="card-body px-0">
                        <div className="d-flex align-items-center small">
                          <p className="card-text dark-text fw-semibold border-end pe-3">
                            {blog.author}
                          </p>
                          <p className="icon ps-3">{blog.date}</p>
                        </div>
                        <h5 className="card-title heading fw-bold text-start">
                          {blog.title}
                        </h5>
                        <p className="card-text text-start">
                          {blog.description}
                        </p>
                      </div>
                      <div className="card-footer border-0 bg-white d-flex justify-content-start p-0">
                        <GlobalButton
                          text="Read More"
                          variant="buttonv2 dark-text"
                        />
                      </div>
                    </div>
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
          </div>
        </section>

        {/* Testimonal section */}
        <section className="testimonal py-5">
          <div className="container rounded-5 my-5 bg-white text-center">
            <div className="row align-items-center justify-content-center p-4 p-sm-4 p-lg-5">
              <div className="col-md-12 text-center">
                <span className="text-uppercase badge p-2 dark-text mb-3">
                  Testimonials
                </span>
                <h1 className="heading fw-bold mb-5">
                  Hear From Our Residents & Families
                </h1>
                <div
                  className="tagembed-widget"
                  data-widget-id="295184"
                  data-tags=""
                  website="1"
                  ref={containerRef}
                  style={{ width: "100%", height: "100%", overflow: "auto" }}
                />
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
