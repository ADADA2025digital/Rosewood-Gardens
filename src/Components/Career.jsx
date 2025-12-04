import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CareerImage from "../assets/3.png";
import GlobalButton from "./Button";
import { Link } from "react-router-dom";

import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

const CareerBanner = () => {
  const [searchParams] = useSearchParams();

  // Handle search parameter to scroll to career banner section
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    // Fuzzy match if there is no exact key
    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    // Only scroll if the target is the career banner section
    if (targetId === "career-banner-section") {
      // Give the component time to mount
      setTimeout(() => {
        const careerElement = document.getElementById("career-banner-section");
        if (careerElement) {
          const HEADER_HEIGHT = 160; // Adjust to your header height
          const elementY = careerElement.getBoundingClientRect().top + window.scrollY;
          const offsetY = elementY - HEADER_HEIGHT;

          window.scrollTo({
            top: offsetY,
            behavior: "smooth",
          });

          // Optional: Add a highlight effect
          careerElement.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.5)";
          careerElement.style.transition = "box-shadow 0.3s ease";
          
          setTimeout(() => {
            if (careerElement) {
              careerElement.style.boxShadow = "";
            }
          }, 2000);

          // Optional: Add a subtle animation to the list items
          const listItems = careerElement.querySelectorAll('li');
          listItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transform = "translateX(0)";
              item.style.opacity = "1";
            }, 100 * index);
          });
        }
      }, 300);
    }
  }, [searchParams]);

  return (
    <section 
      id="career-banner-section"
      className="bg-white py-5"
    >
      <small className="text-uppercase dark-text fw-semibold fs-5 mb-3">
        Our Quality Promise
      </small>
      <h1 className="heading fw-bold">
        At Rosewood Gardens, we are committed to continuous <br />
        improvement
      </h1>
      <p className="mb-5">
        Practical actions that keep our care safe, consistent, and centred on
        you - at our Melbourne facility and in <br /> your own home.
      </p>

      <div className="container jumbotron rounded-5">
        <div className="d-flex flex-column flex-lg-row career-banner p-0">
          {/* Left Side Image */}
          <div className="col-12 col-lg-5 p-0 ">
            <div className="position-relative">
              <img
                src={CareerImage}
                alt="Nurse and Elderly"
                className="img-fluid career-image position-relative"
              />
            </div>
          </div>

          {/* Right Side Content */}
          <div className="col-12 col-lg-7 text-white text-start d-flex flex-column p-0 p-lg-4">
            <h2 className="text-white fw-semibold pb-2">That means</h2>
            <ul className="list-unstyled text-white">
              <li 
                className="d-flex gap-2 mb-2"
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease"
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "43px",
                    height: "37px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255,0.3)",
                  }}
                >
                  <i className="bi bi-shield-check"></i>
                </span>
                <div>
                  <h5 className="fw-bold mb-1">Safety &amp; Screening</h5>
                  <p className="mb-0">
                    We conduct rigorous background checks on every staff member
                    and carefully vet our home care partners.
                  </p>
                </div>
              </li>

              <li 
                className="d-flex gap-2 mb-2"
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s"
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "43px",
                    height: "37px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255,0.3)",
                  }}
                >
                  <i className="bi bi-mortarboard"></i>
                </span>
                <div>
                  <h5 className="fw-bold mb-1">Ongoing Training</h5>
                  <p className="mb-0">
                    Our team receives regular training, supervision, and
                    competency checks to ensure best-practice care.
                  </p>
                </div>
              </li>

              <li 
                className="d-flex gap-2 mb-2"
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s"
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "43px",
                    height: "37px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255,0.3)",
                  }}
                >
                  <i className="bi bi-arrow-repeat"></i>
                </span>
                <div>
                  <h5 className="fw-bold mb-1">Continuous Improvement</h5>
                  <p className="mb-0">
                    We review services through consumer feedback, incident
                    reviews, and internal audits—then act on what we learn.
                  </p>
                </div>
              </li>

              <li 
                className="d-flex gap-2"
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s"
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "43px",
                    height: "37px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255,0.3)",
                  }}
                >
                  <i className="bi bi-patch-check"></i>
                </span>
                <div>
                  <h5 className="fw-bold mb-1">Quality Standards</h5>
                  <p className="mb-0">
                    We meet the National Aged Care Quality Standards (NDIS
                    Practice Standards for disability services).
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerBanner;