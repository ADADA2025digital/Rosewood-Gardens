import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSearchParams } from "react-router-dom";
import {
  goalData,
  seoData,
  teamData,
  testimonials,
  valuesData,
  whychooseusdata,
} from "../Constants/Data";
import CareerBanner from "../Components/Career";
import NewsletterSection from "../Components/Newsletter";
import aboutImg1 from "../assets/DSC00675.jpg";
import aboutImg2 from "../assets/DSC00744.jpg";
import aboutImg3 from "../assets/DSC00752.jpg";
import aboutImg4 from "../assets/DSC00770.jpg";
import aboutImg5 from "../assets/DSC00871.jpg";
import aboutImg6 from "../assets/DSC00918.jpg";
import aboutImg7 from "../assets/DSC00928.jpg";
import aboutImg8 from "../assets/DSC00938.jpg";
import aboutImg9 from "../assets/DSC00957.jpg";
import aboutImg10 from "../assets/DSC01068.jpg";
import aboutImg11 from "../assets/DSC01082-Edit.jpg";
import aboutImg12 from "../assets/DSC01111.jpg";
import SeoHead from "../Components/SeoHead";
import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

const allImages = [
  aboutImg1,
  aboutImg2,
  aboutImg3,
  aboutImg4,
  aboutImg5,
  aboutImg6,
  aboutImg7,
  aboutImg8,
  aboutImg9,
  aboutImg10,
  aboutImg11,
  aboutImg12,
];

export default function About() {
  const [isPaused, setIsPaused] = useState(false);

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

  // About image slider
  const [currentImages, setCurrentImages] = useState([]);

  // Shuffle function
  const shuffleImages = () => {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    setCurrentImages(shuffled.slice(0, 4)); // pick first 4 unique images
  };

  useEffect(() => {
    shuffleImages(); // Initial shuffle
    const interval = setInterval(() => {
      shuffleImages();
    }, 4000);

    return () => clearInterval(interval); // cleanup
  }, []);

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

  // Scroll to section based on ?search= query from global header search
  const [searchParams] = useSearchParams();

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

    // Only allow About page section IDs
    const ABOUT_SECTION_IDS = new Set([
      "about-vision",
      "about-values",
      "about-why-choose-us",
      "about-testimonials",
      "about-team",
    ]);

    if (!targetId || !ABOUT_SECTION_IDS.has(targetId)) return;

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


  return (
    <>
      <SeoHead {...seoData.about} />

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section className="pt-5 mt-5" id="heroCarousel">
          <div className="container mt-5">
            <div className="row mt-5">
              <h1 className="heading fw-semibold">
                Dedicated to enriching lives <br /> with{" "}
                <span className="dark-text">compassionate, respectful</span>{" "}
                <br /> aged and disabilities care services.
              </h1>
            </div>
            <div className="row position-relative d-flex flex-md-row flex-column justify-content-center align-items-center about-box gap-3 gap-lg-5">
              {currentImages.map((imgSrc, index) => {
                const isEdge = index === 0 || index === 3; // left and right
                const size = isEdge ? "200px" : "300px";

                return (
                  <div
                    key={index}
                    className="col-md-2 bg-white shadow rounded-5 p-2"
                    style={{ height: size, width: size }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Care Image ${index + 1}`}
                      className="img-fluid rounded-5 w-100 h-100 object-fit-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision section */}
        <section className="py-5 mt-5 bg-white">
          <div className="container pt-5">
            <div className="row mb-5">
              <h1 id="about-vision" className="heading fw-semibold">
                Caring <span className="dark-text">Vision</span>. Purposeful{" "}
                <span className="dark-text">Mission</span>. <br /> Meaningful{" "}
                <span className="dark-text">Service</span>.
              </h1>
            </div>

            <div className="row my-5 d-flex flex-column flex-md-row justify-content-center">
              {goalData.map((card, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 col-12 d-flex mb-3 mb-lg-0"
                >
                  <div className="card shadow-sm border-light rounded-4 w-100 d-flex flex-column">
                    <div className="card-body text-center flex-grow-1">
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

            <div
              className="container rounded-5 p-3 p-lg-5 d-flex flex-column justify-content-center align-items-center"
              id="heroCarousel"
            >
              <div className="text-dark text-center">
                <h3 className="text-uppercase fw-semibold dark-text">
                  ABOUT US
                </h3>
                <h1 className="mt-2 mb-4 heading">
                  Where professional skill, heartfelt <br /> compassion, and the
                  freedom to live your <br />
                  way come together - every single day.
                </h1>
                {/* <GlobalButton
                  text="View Our Services"
                  href="/services"
                  variant="buttonv1"
                /> */}
              </div>

              <div className="col-md-10 p-3 p-lg-5 rounded-5 bg-white text-start text-dark mt-4">
                <h5 className="fw-bold heading">About Us – Rosewood Gardens</h5>
                <p>
                  <i>
                    “Compassionate Aged &amp; Disability Care – in your home, in
                    our residence, or in the community.”
                  </i>
                </p>
                <h5 className="fw-bold">Who We Are</h5>
                <p className="m-0">
                  Rosewood Gardens is a proudly family-owned Aged and Disability
                  care provider, operated by{" "}
                  <strong>BKV Aged Care Pty Ltd (ABN 85 604 461 832)</strong>.
                  With deep roots in both <strong>Victoria</strong> and{" "}
                  <strong>New South Wales</strong>, we are committed to
                  delivering care that goes beyond services — care that reflects{" "}
                  <strong>dignity, independence,</strong> and{" "}
                  <strong>compassion</strong> at every stage of life.
                </p>

                {/* <p className="m-0">
                  Rosewood Gardens is deeply committed in supporting the
                  independence, dignity, and overall wellbeing of every
                  individual in our care. We strive to create an inclusive,
                  compassionate and empathetic environment where each client
                  receives the highest quality of personalised support -
                  empowering them to live life to the fullest, with confidence,
                  comfort, and choice. <br /> <br />
                  We deliver the best possible service by uniting expert
                  clinicians, innovative practices and heartfelt human
                  connection. Our clientcentred approach ensures personalised
                  Support at Home (HCP), NDIS support and Private Residential
                  Aged & Disability Care - exactly when and how you need it,
                  whether in the comfort of your own home or at our Rosewood
                  Gardens Residence or at the location of your choice (e.g. SIL)
                </p> */}

                <h4 id="about-why-choose-us" className="dark-text fw-bold text-start py-3">
                  Our care model is unique:
                </h4>
                <div className="row">
                  {whychooseusdata.map((item, index) => (
                    <div key={index} className="col-12 mb-4">
                      <div className="d-flex gap-3 align-items-start">
                        <i className={`bi bi-record2 fs-4 dark-text`}></i>
                        <div className="text-start">
                          <p className="fw-bold mb-1">{item.title}</p>
                          <p className="mb-0 small text-dark">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <p>
                  We make compliance effortless - so you can focus on living well,
                  with peace of mind and transparency at every step.
                </p> */}
              </div>
            </div>
          </div>
        </section>

        {/* Career section */}
        <CareerBanner />

        {/* Values section */}
        <section id="about-values" className="p-3 p-lg-5 icon-bg rounded-0 rounded-md-5">
          <div className="container py-3 py-lg-5 my-0 my-lg-5 text-white">
            <div className="row mb-3">
              <h1 className="heading fw-semibold">Our Values</h1>
            </div>
            <div className="row d-flex flex-column flex-md-row justify-content-center">
              {valuesData.map((card, index) => (
                <div key={index} className="col-md-4 p-4 d-flex">
                  <div className="card shadow-sm border-light rounded-4 w-100 d-flex flex-column p-3">
                    <div className="card-body text-center flex-grow-1">
                      <span className="mb-4 d-inline-block">
                        <i className={`fs-1 dark-text ${card.icon}`}></i>
                      </span>

                      <h5 className="card-title fw-bold heading dark-text">
                        {card.title}
                      </h5>
                      <p className="card-text subheading">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-3 d-flex flex-column flex-md-row justify-content-between">
              <div className="col-md-7 rounded-3 border text-white text-start p-4">
                <h4 className="heading">Affiliations & Compliance</h4>
                <p>
                  We operate in full alignment with Australian care frameworks
                  and standards:
                </p>
                <ul>
                  <li>
                    <strong>My Aged Care –</strong> Approved provider under
                    Support at Home and Home Care Packages
                  </li>
                  <li>
                    <strong>NDIS Quality & Safeguards Commission –</strong>{" "}
                    Registered provider, adhering to the NDIS Code of Conduct
                    and practice standards.
                  </li>
                  <li>
                    <strong>Aged Care Quality & Safety Commission –</strong>{" "}
                    Committed to the Aged Care Quality Standards and Charter of
                    Aged Care Rights
                  </li>
                  <li>
                    <strong>Transport Accident Commission (TAC) –</strong>{" "}
                    Approved TAC Care provider
                  </li>
                  <li>
                    <strong>
                      Victorian Supported Residential Services (SRS) –
                    </strong>{" "}
                    Licensed provider under SRS regulations
                  </li>
                </ul>
              </div>
              <div className="col-md-4 rounded-3 border text-white text-start p-4">
                <h4 className="heading">Code of Conduct & Consumer Rights</h4>
                <p>
                  At Rosewood Gardens, we believe in transparency and
                  accountability. We encourage clients and families to be
                  informed and empowered:
                </p>
                <ul>
                  <li>
                    <strong>NDIS Code of Conduct</strong>
                  </li>
                  <li>
                    <strong>Charter of Aged Care Rights</strong>
                  </li>
                  <li>
                    <strong>Consumer Rights & Responsibilities</strong>
                  </li>
                  <li>
                    <strong>Complaints & Feedback Process</strong> (
                    <a href="/contact-us" className="text-white">
                      View details
                    </a>
                    )
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonal section */}
        <section id="about-testimonials" className="testimonal py-5">
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

        {/* Team section */}
        <section id="about-team" className="py-5 bg-white">
          <div className="container">
            <div className="text-center">
              {/* <small className="text-uppercase fw-semibold">OUR TEAM</small> */}
              <h1 className="heading fw-bold mt-3">
                Outstanding skills our team brings <br />
                for care, connection, and excellence.
              </h1>
            </div>

            <div className="row mt-5">
              {teamData.map((team, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card border-0 team-card shadow-sm rounded-4 p-3 d-flex flex-column h-100">
                    <div className="card-body gap-3 d-flex">
                      <span className="p-3">
                        <i className={`fs-1 dark-text ${team.icon} mb-4`}></i>
                      </span>
                      <div className="text-start">
                        <h5 className="card-title heading dark-text fw-semibold">
                          {team.title}
                        </h5>
                        <p className="card-text small">{team.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div
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
              {profiles.map((logo, index) => (
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
          </div> */}
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
