import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

const NewsletterSection = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle search parameter to scroll to newsletter section
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

    // Only scroll if the target is the newsletter section
    if (targetId === "newsletter-section") {
      // Give the component time to mount
      setTimeout(() => {
        const newsletterElement = document.getElementById("newsletter-section");
        if (newsletterElement) {
          const HEADER_HEIGHT = 160; // Adjust to your header height
          const elementY =
            newsletterElement.getBoundingClientRect().top + window.scrollY;
          const offsetY = elementY - HEADER_HEIGHT;

          window.scrollTo({
            top: offsetY,
            behavior: "smooth",
          });

          // Optional: Add a highlight effect
          newsletterElement.style.boxShadow =
            "0 0 0 3px rgba(59, 130, 246, 0.5)";
          newsletterElement.style.transition = "box-shadow 0.3s ease";

          setTimeout(() => {
            if (newsletterElement) {
              newsletterElement.style.boxShadow = "";
            }
          }, 2000);

          // Optional: Focus on email input
          setTimeout(() => {
            const emailInput = document.getElementById("newsletter-email");
            if (emailInput) {
              emailInput.focus();
            }
          }, 600);
        }
      }, 300);
    }
  }, [searchParams]);

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      setSuccessMessage("");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    // Here you would typically send the email to your backend
    console.log("Subscribed with email:", email);

    // Simulate API call
    setSuccessMessage("Thank you for subscribing to our newsletter!");
    setErrorMessage("");
    setEmail("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section id="newsletter-section" className="newsletter py-2 py-lg-5">
      <div className="container py-4 px-md-0">
        <div className="row align-items-center">
          {/* Left Column: Content */}
          <div className="col-md-6 text-white text-start">
            <h2 className="display-4 heading mb-3">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4">
              Subscribe for updates on our care services, community events, and
              how we're enhancing lives every day.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="col-md-6">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <form onSubmit={handleSubmit} className="w-100 d-flex">
                <input
                  type="email"
                  id="newsletter-email"
                  className="input-email py-3 px-2 bg-white text-dark border-0 w-75"
                  name="Email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="off"
                  aria-label="Email address for newsletter subscription"
                  aria-describedby={
                    errorMessage
                      ? "newsletter-error"
                      : successMessage
                      ? "newsletter-success"
                      : undefined
                  }
                />
                <button
                  type="submit"
                  className="button-submit p-3 text-white border-0 w-25"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {successMessage && (
              <div
                id="newsletter-success"
                className="mt-3 text-white text-start fw-semibold"
                role="alert"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div
                id="newsletter-error"
                className="mt-3 text-warning text-start fw-semibold"
                role="alert"
                aria-live="assertive"
              >
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;