import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Carousel from "bootstrap/js/dist/carousel";
import { Carousel as BsCarousel } from "bootstrap";

import { aboutData, blogData, seoData, servicesData } from "../Constants/Data";
import GlobalButton from "../Components/Button";
import ContactForm from "../Components/ContactForm";
import CareerBanner from "../Components/Career";
import NewsletterSection from "../Components/Newsletter";
import Gallery from "../Components/Gallerys";
import Servicecard from "../Components/ServiceCard";
import AboutImg from "../assets/8.png";
import Partner1 from "../assets/Partner1.png";
import Partner2 from "../assets/Partner2.png";
import video from "../assets/video.mp4";
import SeoHead from "../Components/SeoHead";
import { useLocation, useSearchParams } from "react-router-dom";
import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

export default function Home({ id = "contentCarousel" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Scroll to section based on ?search= query from global header search
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    // Fuzzy match if there is no exact key in KEYWORD_TO_SECTION
    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    // Only allow *Home page* section IDs
    const HOME_SECTION_IDS = new Set([
      "home-hero",
      "services",
      "home-about",
      "home-careers",
      "home-facilities",
      "home-testimonials",
      "home-newsletter",
      "home-contact",
    ]);

    if (!targetId || !HOME_SECTION_IDS.has(targetId)) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    setTimeout(() => {
      const HEADER_HEIGHT = 160; // adjust to your header height
      const elementY = el.getBoundingClientRect().top + window.scrollY;
      const offsetY = elementY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
    }, 200);
  }, [searchParams]);

  // Function to scroll to services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Check both location state AND URL parameters
    const searchParams = new URLSearchParams(location.search);
    const shouldScroll =
      location.state?.scrollTo === "services" ||
      searchParams.get("scrollTo") === "services";

    if (shouldScroll) {
      // console.log('Scrolling to services section');
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          servicesSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);

        // Clear both state and URL parameters
        window.history.replaceState({}, document.title);

        // Remove the search parameter from URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [location]);

  // Hero section carousel
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;

    // Find all content cards inside slides
    const cards = root.querySelectorAll(".carousel-item .blur-bg");
    let maxH = 0;
    cards.forEach((card) => {
      maxH = Math.max(maxH, card.offsetHeight);
    });

    // Apply the tallest height as min-height to every slide’s content wrapper
    cards.forEach((card) => {
      card.style.minHeight = `${maxH}px`;
    });

    // Recalculate on resize/orientation changes
    const onResize = () => {
      let mh = 0;
      cards.forEach((card) => {
        card.style.minHeight = "";
        mh = Math.max(mh, card.offsetHeight);
      });
      cards.forEach((card) => {
        card.style.minHeight = `${mh}px`;
      });
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [id]);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    // Ensure we have a single instance and it starts auto-sliding immediately
    const instance = BsCarousel.getOrCreateInstance(el, {
      interval: 6000,
      ride: "carousel",
      pause: false, // keep cycling even on hover (optional)
      touch: true,
      keyboard: true,
      wrap: true,
    });

    const onSlid = (e) => {
      // e.to is the new active index
      if (typeof e.to === "number") setActiveIndex(e.to);
    };

    el.addEventListener("slid.bs.carousel", onSlid);
    carouselRef.current = instance;

    return () => {
      el.removeEventListener("slid.bs.carousel", onSlid);
      instance.dispose();
    };
  }, [id]);

  // Handle manual slide change
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Blog slider
  const [slidesToShow, setSlidesToShow] = useState(3);
  const interval = 3000;

  const updateSlidesToShow = useCallback(() => {
    if (window.innerWidth <= 480) {
      setSlidesToShow(1);
    } else if (window.innerWidth <= 768) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  }, []);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, [updateSlidesToShow]);

  const handleBlogNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % blogData.length);
  }, [blogData.length]);

  const handleBlogPrev = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + blogData.length) % blogData.length
    );
  }, [blogData.length]);

  const getCurrentItems = () => {
    const length = blogData.length;
    const visibleItems = [];
    for (let i = 0; i < slidesToShow; i++) {
      visibleItems.push(blogData[(activeIndex + i) % length]);
    }
    return visibleItems;
  };

  const containerRef = useRef(null);

  useEffect(() => {
    // Load the script
    const script = document.createElement("script");
    script.src = "https://widget.tagembed.com/embed.min.js";
    script.async = true;

    // Optional: Call Tagembed only if needed
    script.onload = () => {
      // console.log("Tagembed script loaded.");
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

  // Service tabs
  const [activeTab, setActiveTab] = useState("facility");
  const [isSecondButtonDisabled, setIsSecondButtonDisabled] = useState(true);

  const handleFirstClick = () => {
    setActiveTab("facility");
    setIsSecondButtonDisabled(false); // Enable second button after clicking the first
  };

  const handleSecondClick = () => {
    setActiveTab("home");
  };

  return (
    <>
      <SeoHead {...seoData.home} />

      <div id="home-hero" className="container-fluid p-0">
        {/* Hero section */}
        <section className="vh-100 position-relative">
          {/* Static Video Background */}
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-100 h-100 object-fit-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>

          {/* Content Carousel */}
          <div className="container position-relative h-100 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center w-100">
              <div
                id={id}
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="6000"
              >
                <div className="carousel-inner">
                  {/* Slide 1 */}
                  <div className="carousel-item active">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="col-12 col-lg-10 text-white text-center p-4 rounded-4 blur-bg">
                        <h1 className="fw-bold heading display-6 py-2 px-md-4 px-0">
                          Compassionate Aged & Disability Care in Sydney &
                          Melbourne
                        </h1>
                        <p className="fs-4 fw-bold text-white">
                          Welcome to Rosewood Gardens
                        </p>
                        <span className="fs-5 fw-bold text-white">
                          <i>
                            “Where Compassion Meets Excellence - At your Home or
                            In Our Facility"
                          </i>
                        </span>
                        <p className="mt-3 fs-5 fw-bold text-white">
                          Rosewood Gardens Offers: <br />
                          ✔ 24/7 Nursing & Clinical Care <br />
                          ✔ NDIS Supports (incl. SIL Services) <br />
                          ✔ Support at Home (HCP)
                          <br />✔ Private Residential Aged & Disability Care
                        </p>
                        <div className="d-flex flex-md-row flex-column justify-content-center mt-4 gap-4">
                          <GlobalButton
                            text="Explore Our Services"
                            onClick={scrollToServices}
                            className="py-3 text-uppercase"
                          />
                          <GlobalButton
                            text="Contact Us"
                            href="/contact-us"
                            className="py-3 text-uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="carousel-item">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="col-12 col-lg-10 text-white text-center p-4 rounded-4 blur-bg d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold heading display-6 py-2 px-md-4 px-0">
                          Your Wellbeing is Our Purpose - Every Step of the Way
                        </h1>
                        <p className="fs-4 fw-bold fs-5 text-white">
                          Why Families Choose Us
                        </p>
                        {/* <span>
                          <i>"Compassionate Care, Wherever You Call Home"</i>
                        </span> */}
                        <p className="mt-3 fs-5 fw-bold text-white">
                          ✔ Truly Person - Centred and Compassionate Care,
                          Wherever You Are <br />✔ 24/7 Clinical Excellence -
                          Wherever You Call Home <br />✔ 4.8★ Organic Google
                          Rating
                        </p>
                        <div className="d-flex flex-md-row flex-column justify-content-center mt-4 gap-4">
                          <GlobalButton
                            text="Explore Our Services"
                            onClick={scrollToServices}
                            className="py-3 text-uppercase"
                          />
                          <GlobalButton
                            text="Contact Us"
                            href="/contact-us"
                            className="py-3 text-uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="carousel-item">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="col-12 col-lg-10 text-white text-center p-4 rounded-4 blur-bg d-flex flex-column align-items-center justify-content-center">
                        <h1 className="fw-bold heading display-6 py-2 px-md-4 px-0">
                          Excellence in Aged & Disability Care
                        </h1>
                        <p className="fs-4 fw-bold text-white">
                          Compassionate, Personalised Support - at Your Home, in
                          Our facility
                        </p>
                        <p className="mt-3 fs-5 fw-bold text-white">
                          ✔ 24/7 Seamless Support – NDIS, Support at Home and
                          Private Residential Aged &amp; Disability Care <br />✔
                          Skilled & Caring Team delivering genuine connection{" "}
                          <br />✔ Personalised Care Plans tailored to your needs
                        </p>
                        <div className="d-flex flex-md-row flex-column justify-content-center mt-4 gap-4">
                          <GlobalButton
                            text="Explore Our Services"
                            onClick={scrollToServices}
                            className="py-3 text-uppercase"
                          />
                          <GlobalButton
                            text="Contact Us"
                            href="/contact-us"
                            className="py-3 text-uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls (Arrows) */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{ width: "3rem", height: "3rem" }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{ width: "3rem", height: "3rem" }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Indicators (Dots at Bottom) */}
          <div className="carousel-indicators" style={{ bottom: "40px" }}>
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#${id}`}
                data-bs-slide-to={index}
                className={index === activeIndex ? "active" : ""}
                aria-current={index === activeIndex ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                onClick={() => handleSelect(index)}
              ></button>
            ))}
          </div>
        </section>

        {/* What we are doing section */}
        <section
          className="bg-white py-5"
          id="services"
          style={{ scrollMarginTop: "100px" }}
        >
          <div className="container d-flex flex-column justify-content-center text-center py-5">
            <small className="text-uppercase dark-text fw-semibold fs-5 mb-3">
              We help you to access the support you need
            </small>
            <h1 className="heading fw-bold">
              Patient-Centred & Personalised Care <br />
              with compassion, dignity and dedication
            </h1>

            <div className="d-flex justify-content-center mt-4">
              <div className="d-flex gap-4 px-3">
                <button
                  className={`social-icon rounded global p-3 fw-bold ${
                    activeTab === "facility" ? "icon-bg text-white" : ""
                  }`}
                  onClick={handleFirstClick}
                >
                  Aged & Disability Care Facility
                </button>

                <button
                  className={`social-icon rounded global p-3 fw-bold ${
                    activeTab === "home" ? "icon-bg text-white " : ""
                  }`}
                  onClick={handleSecondClick}
                >
                  At Your Home or Your Preferred Setting
                </button>
              </div>
            </div>

            <p className="mt-4">
              Choose the Care option that best suits your needs and click 'Get
              Started' to explore your options
            </p>

            <div className="row mt-5 d-flex justify-content-center align-items-stretch">
              {(activeTab === "facility"
                ? servicesData
                : servicesData.slice(1)
              ).map((service, index) => {
                // Determine which features to show based on service and active tab
                let filteredFeatures = service.features;

                if (activeTab === "facility") {
                  if (service.title === "NDIS Support Services") {
                    filteredFeatures = service.features.slice(0, -2); // Remove last 2 features
                  } else if (service.title === "Support At Home") {
                    // Remove Domestic Assistance, Meal Preparation, and Home & Garden Maintenance
                    filteredFeatures = service.features.filter(
                      (feature) =>
                        feature.subservice !== "Domestic Assistance" &&
                        feature.subservice !== "Meal Preparation" &&
                        feature.subservice !== "Home & Garden Maintenance"
                    );
                  } else if (service.title === "Private Self-Funded Care") {
                    // Remove Domestic Assistance and Meal Preparation for facility tab
                    filteredFeatures = service.features.filter(
                      (feature) =>
                        feature.subservice !== "Domestic Assistance" &&
                        feature.subservice !== "Home Maintenance" &&
                        feature.subservice !== "Meal Preparation"
                    );
                  }
                } else if (activeTab === "home") {
                  if (service.title === "Support At Home") {
                    // Remove only the "Care & Case Management" feature
                    filteredFeatures = service.features.filter(
                      (feature) =>
                        feature.subservice !== "Care & Case Management"
                    );
                  }
                  // For Private Self-Funded Care in home tab, keep all features (no filtering needed)
                }

                return (
                  <div key={index} className="col-lg-3 col-md-6 col-12 mb-4">
                    <Servicecard
                      image={service.image}
                      title={service.title}
                      description={service.description}
                      options={filteredFeatures}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About us section */}
        <section id="home-about" className="testimonal py-5">
          <div className="container py-5">
            <div className="row flex-lg-row flex-column">
              <div className="col-lg-6 col-12 mb-4">
                <img
                  src={AboutImg}
                  alt="About Image"
                  className="img-fluid"
                  style={{ height: "600px" }}
                />
                <div className="d-flex justify-content-end position-relative">
                  <a
                    className="text-white rounded-4 px-3 px-lg-4 py-3 text-decoration-none position-relative call-button"
                    href="tel:1300 845 766"
                  >
                    <i className="bi bi-telephone-fill me-3"></i>1300 845 766
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-12 text-start">
                <small className="text-uppercase dark-text fs-5 fw-semibold">
                  GET TO KNOW US
                </small>
                <h1 className="heading mb-4">
                  Transforming Care into Comfort and Connection
                </h1>

                <div className="row">
                  <div className="text-start d-flex align-items-center">
                    <p>
                      At{" "}
                      <span className="dark-text fw-semibold">
                        Rosewood Gardens
                      </span>
                      , we believe care should feel like family. Proudly owned
                      and operated by BKV Aged Care Pty Ltd, we were founded on
                      a simple promise: everyone deserves to live with dignity,
                      joy, and choice.
                      <br /> <br />
                      {/* <span className="dark-text fw-semibold">
                        Rosewood Gardens
                      </span> */}
                      From our purpose-built Melbourne residence to the comfort
                      of your own home across Sydney, Melbourne, and beyond, we
                      deliver award-winning aged and disability support tailored
                      to your needs. Whether it’s day-to-day assistance,
                      specialised programs, or 24/7 care, our focus is always on
                      compassion, professionalism, and genuine connection.
                      <br />
                      <br />
                      Our skilled team partners with you to create a
                      personalised care plan that upholds your independence,
                      dignity, and wellbeing — every single day.
                    </p>
                  </div>
                  <div className="d-flex flex-column flex-md-row gap-3 mt-5">
                    <div className="col-md-6">
                      <img
                        src={Partner1}
                        alt="Partner logo"
                        style={{ width: "320px", height: "auto" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <img src={Partner2} alt="Partner logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row text-start">
              <h4 className="dark-text fw-semibold p-2">
                At Rosewood Gardens, we are committed to continuous improvement.
                That means we:
              </h4>
              <ul className="list-unstyled px-3 lh-">
                <li>
                  <i className="bi bi-record2 dark-text"></i>conduct background
                  checks on all our staff and home care partners.
                </li>
                <li>
                  <i className="bi bi-record2 dark-text"></i>provide staff with
                  regular training.
                </li>
                <li>
                  <i className="bi bi-record2 dark-text"></i>continue to review
                  our service delivery through consumer feedback and internal
                  audits.
                </li>
                <li>
                  <i className="bi bi-record2 dark-text"></i>meet the national
                  aged care quality standards.
                </li>
              </ul>
            </div> */}

            <div className="row mt-4 d-flex align-items-stretch">
              {aboutData.map((card, index) => (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                  <div className="card border rounded-4 h-100">
                    <div className="card-body text-center d-flex flex-column">
                      <i className={`fs-1 dark-text ${card.icon} mb-3`}></i>
                      <h5 className="card-title fw-bold heading dark-text">
                        {card.title}
                      </h5>
                      <p className="card-text subheading">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career section */}
        <CareerBanner />

        {/* Facilities section */}
        <section id="home-facilities" className="bg-white py-5">
          <div className="container text-center pt-5">
            <small className="text-uppercase dark-text fs-5 fw-semibold">
              Facilities
            </small>
            <h1 className="heading fw-bold">
              Everything You Need, <br />
              All in One Place
            </h1>
            <p className="small">
              Modern amenities with a personal touch to support daily living.
            </p>
            <div className="pt-5">
              <Gallery />
            </div>
          </div>
        </section>

        {/* Stats section */}
        {/* <StatsBanner /> */}

        {/* Testimonal section */}
        <section id="home-testimonials" className="testimonal py-5">
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
              {/* <div className="col-md-6 profile-slider">
                <div className="row justify-content-center gap-2">
                  {Array.from({ length: profileImagesToShow }).map((_, i) => {
                    const testimonial =
                      testimonials[
                        (activeReviewIndex + i) % testimonials.length
                      ];
                    return (
                      <div
                        key={testimonial.id}
                        className="col-6 col-lg-2 rounded-circle col-md-6 mb-3 d-flex justify-content-center p-0"
                        style={{
                          height: "84px",
                          width: "84px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={testimonial.image}
                          alt={`Testimonial ${testimonial.id}`}
                          className="img-fluid w-100"
                        />
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>

            {/* <div className="position-relative">
              <div className="d-flex flex-row justify-content-center my-5 gap-3">
                {getCurrentReviewItems().map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 col-12 col-lg-5 col-md-6 mb-3 d-flex align-items-stretch"
                  >
                    <ReviewCard
                      name={testimonial.name}
                      rating={testimonial.rating}
                      text={testimonial.text}
                      location={testimonial.location}
                      image={testimonial.image}
                    />
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center gap-4 pb-5">
                <button
                  className="border-0 bg-transparent dark-text fs-1"
                  onClick={handleReviewPrev}
                  aria-label="Previous"
                >
                  <i className="bi bi-arrow-left-circle"></i>
                </button>
                <button
                  className="border-0 bg-transparent dark-text fs-1"
                  onClick={handleReviewNext}
                  aria-label="Next"
                >
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>
            </div> */}
          </div>
        </section>

        {/* Blog section */}
        {/* <section className="bg-white py-5">
          <div className="container text-center">
            <small className="text-uppercase dark-text fw-semibold">
              Blogs
            </small>
            <h1 className="heading fw-bold">
              Everything You Need,
              <br /> All in One Place
            </h1>
            <p className="small">
              Modern amenities with a personal touch to support daily living.
            </p>

            <div className="position-relative">
              <button
                className="prev border-0 bg-transparent dark-text fs-1"
                onClick={handleBlogPrev}
                aria-label="Previous"
              >
                <i className="bi bi-arrow-left-circle"></i>
              </button>

              <div className="row my-5">
                {getCurrentItems().map((blog, index) => (
                  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                    <BlogCard
                      image={blog.image}
                      author={blog.author}
                      date={blog.date}
                      title={blog.title}
                      description={blog.description}
                      readTime={blog.readTime}
                    />
                  </div>
                ))}
              </div>

              <button
                className="next border-0 bg-transparent dark-text fs-1"
                onClick={handleBlogNext}
                aria-label="Next"
              >
                <i className="bi bi-arrow-right-circle"></i>
              </button>
            </div>
          </div>
        </section> */}

        {/* Contact Form */}
        <ContactForm />

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
