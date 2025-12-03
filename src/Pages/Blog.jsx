import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../Utils/slugify";
import heroImg from "../assets/27.png";
import {
  blogData,
  categoryData,
  testimonials,
  featuredblog,
  seoData,
} from "../Constants/Data";
import NewsletterSection from "../Components/Newsletter";
import GlobalButton from "../Components/Button";
import SeoHead from "../Components/SeoHead";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogData.slice(startIndex, startIndex + itemsPerPage);

  // Testimonal profile slider
  const [profileImagesToShow, setProfileImagesToShow] = useState(5);

  const updateProfileImagesToShow = useCallback(() => {
    if (window.innerWidth <= 480) {
      setProfileImagesToShow(2);
    } else {
      setProfileImagesToShow(5);
    }
  }, []);

  useEffect(() => {
    updateProfileImagesToShow();
    window.addEventListener("resize", updateProfileImagesToShow);
    return () =>
      window.removeEventListener("resize", updateProfileImagesToShow);
  }, [updateProfileImagesToShow]);

  // Testimonal slider
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewSlidesToShow, setReviewSlidesToShow] = useState(2);

  const updateReviewSlidesToShow = useCallback(() => {
    if (window.innerWidth <= 480) {
      setReviewSlidesToShow(1);
    } else if (window.innerWidth <= 768) {
      setReviewSlidesToShow(1);
    } else {
      setReviewSlidesToShow(2);
    }
  }, []);

  useEffect(() => {
    updateReviewSlidesToShow();
    window.addEventListener("resize", updateReviewSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateReviewSlidesToShow);
    };
  }, [updateReviewSlidesToShow]);

  const handleReviewNext = useCallback(() => {
    setActiveReviewIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handleReviewPrev = useCallback(() => {
    setActiveReviewIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const getCurrentReviewItems = () => {
    const length = testimonials.length;
    const visibleItems = [];
    for (let i = 0; i < reviewSlidesToShow; i++) {
      visibleItems.push(testimonials[(activeReviewIndex + i) % length]);
    }
    return visibleItems;
  };

  const navigate = useNavigate();

  return (
    <>
      <SeoHead {...seoData.blogs} />

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section className="py-5" id="heroCarousel">
          <div className="d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row align-items-center">
                {/* Left: Text Content */}
                <div className="col-md-6 text-white text-center text-md-start">
                  <p className="fs-4 fw-bold dark-text">Our Blogs</p>
                  <h1 className="fw-bold text-dark heading display-3">
                    Real stories. Real care. Real connection.
                  </h1>
                  <p className="lead text-dark">
                    Dive into a world of meaningful moments, health insights,
                    and caregiving advice-all written to uplift, educate, and
                    bring us closer as a community.
                  </p>
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

        {/* Featured Blog section */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <small className="text-uppercase dark-text fw-semibold">
              FEATURED BLOG
            </small>
            <h1 className="heading fw-bold">
              Our Work. Their Comfort. Our Promise
            </h1>

            <div className="position-relative">
              <div className="row justify-content-center my-5">
                {featuredblog.map((featuredblog, index) => (
                  <div className="col-12 col-md-10 col-lg-6 mb-4" key={index}>
                    <div className="card bg-light mb-4 border-0 p-4">
                      <img
                        src={featuredblog.image}
                        className="card-img-fluid rounded-4"
                        alt={featuredblog.title}
                        style={{ height: "300px" }}
                      />
                      <div className="card-body px-0">
                        <div className="d-flex align-items-center small">
                          {/* <p className="card-text dark-text fw-semibold border-end pe-3">
                            {featuredblog.author}
                          </p> */}
                          <p className="icon">{featuredblog.date}</p>
                        </div>
                        <h5 className="card-title heading fw-bold text-start">
                          {featuredblog.title}
                        </h5>
                        <p className="card-text text-start">
                          {featuredblog.description}
                        </p>
                      </div>
                      <div className="card-footer border-0 bg-light d-flex justify-content-start p-0">
                        <GlobalButton
                          text="Read More"
                          variant="buttonv2 dark-text"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog categories section */}
        <section className="py-5 testimonal">
          <div className="container">
            <div className="text-center">
              <small className="text-uppercase fw-semibold">
                BLOG CATEGORIES
              </small>
              <h1 className="heading fw-bold mt-3">
                Caring for Seniors with Compassion, <br />
                Dignity, and Dedication
              </h1>
            </div>

            <div className="row mt-5">
              {categoryData.map((category, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                  <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-column h-100">
                    <div className="card-body text-start">
                      <h5 className="card-title heading dark-text fw-semibold">
                        {category.title}
                      </h5>
                      <ul className="mt-3 ps-3">
                        {category.category.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                {currentBlogs.map((blog, index) => (
                  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                    <div className="card mb-4 shadow-sm border-0 rounded-4 p-4">
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
                          href={`/blog/${slugify(blog.title)}`}
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

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
