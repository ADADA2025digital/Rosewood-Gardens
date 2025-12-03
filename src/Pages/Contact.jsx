import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NewsletterSection from "../Components/Newsletter";
import AboutImg from "../assets/10.png";
import { contactData, seoData } from "../Constants/Data";
import GlobalButton from "../Components/Button";
import InputBox from "../Components/InputBox";
import TextBox from "../Components/TextBox";
import SeoHead from "../Components/SeoHead";
import { useSearchParams } from "react-router-dom";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_24g96ge";
const EMAILJS_TEMPLATE_ID = "template_v6vl8rv";
const EMAILJS_PUBLIC_KEY = "dYh6H0ZdHIlh5o3rI";

export default function Contact() {
  const [searchParams] = useSearchParams();

  // 🔎 Handle ?search=... → scroll to section with offset
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const key = raw.toLowerCase();

    // Map ?search values → DOM IDs
    const SCROLL_TARGETS = {
      form: "form", // <div id="form" ...>
      "contact-data": "contact-data", // <div id="contact-data" ...>
      // add more mappings here if needed
    };

    const targetId = SCROLL_TARGETS[key] || key;
    const el = document.getElementById(targetId);
    if (!el) return;

    setTimeout(() => {
      const HEADER_HEIGHT = 180; // adjust to your fixed header height

      const elementY = el.getBoundingClientRect().top + window.scrollY;
      const offsetY = elementY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
    }, 200);
  }, [searchParams]);

  const regexValidators = {
    name: /^[A-Za-z\s]{3,}$/, // At least 3 letters
    phone: /^\d{10}$/, // 10 digits
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
    address: /^[A-Za-z0-9\s-]{3,}$/,
    message: /^.{10,}$/, // At least 10 characters
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // form data state
  const MyForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    });

    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [showRecaptcha, setShowRecaptcha] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const recaptchaRef = useRef(null);
    const recaptchaWidgetId = useRef(null);

    // Load reCAPTCHA script
    useEffect(() => {
      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      if (document.querySelector('script[src*="google.com/recaptcha"]')) {
        const checkLoaded = setInterval(() => {
          if (window.grecaptcha) {
            setRecaptchaLoaded(true);
            clearInterval(checkLoaded);
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
        console.log("reCAPTCHA script loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load reCAPTCHA script");
        setErrors((prev) => ({
          ...prev,
          recaptcha:
            "Failed to load security verification. Please refresh the page.",
        }));
      };
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }, []);

    // Show reCAPTCHA when message field has content and reCAPTCHA is loaded
    useEffect(() => {
      if (formData.message.length >= 10 && recaptchaLoaded) {
        setShowRecaptcha(true);

        if (recaptchaToken && window.grecaptcha && recaptchaRef.current) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          setRecaptchaToken(null);
        }
      } else {
        setShowRecaptcha(false);
        setRecaptchaToken(null);
      }
    }, [formData.message, recaptchaLoaded]);

    const handleRecaptchaChange = (token) => {
      setRecaptchaToken(token);
      if (errors.recaptcha) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.recaptcha;
          return newErrors;
        });
      }
    };

    const handleRecaptchaError = () => {
      console.error("reCAPTCHA encountered an error");
      setErrors((prev) => ({
        ...prev,
        recaptcha: "Security verification failed. Please try again.",
      }));
      setRecaptchaToken(null);
    };

    const handleRecaptchaExpired = () => {
      console.log("reCAPTCHA expired");
      setRecaptchaToken(null);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const showError = (field) => {
      if (field === "address" && !formData[field]) {
        return "";
      }

      if (!formData[field] && formSubmitted) {
        return "This field is required.";
      } else if (
        formData[field] &&
        !regexValidators[field].test(formData[field]) &&
        formSubmitted
      ) {
        return `Invalid ${field}.`;
      }
      return "";
    };

    // Function to send email using EmailJS
    const sendEmailNotification = async (formData) => {
      try {
        const templateParams = {
          first_name: formData.name.split(" ")[0],
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || "Not provided",
          message: formData.message,
          to_email: "admin@rosewoodgardens.com.au",
          to_name: "Rosewood Gardens Admin",
          from_name: formData.name,
          reply_to: formData.email,
          subject: `New Contact Form Submission from ${formData.name}`,
          date: new Date().toLocaleDateString("en-AU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: new Date().toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        console.log("Sending email with params:", templateParams);

        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );

        console.log("Email sent successfully:", response);
        return true;
      } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send email notification");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      setIsSubmitting(true);

      let formErrors = {};
      Object.keys(formData).forEach((field) => {
        if (field === "address" && !formData[field]) {
          return;
        }

        if (!formData[field]) {
          formErrors[field] = "This field is required.";
        } else if (!regexValidators[field].test(formData[field])) {
          formErrors[field] = `Invalid ${field}.`;
        }
      });

      if (formData.message.length >= 10 && !recaptchaToken) {
        formErrors.recaptcha = "Please complete the reCAPTCHA verification";
      }

      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        try {
          const apiData = {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          };

          if (formData.address) {
            apiData.address = formData.address;
          }

          if (recaptchaToken) {
            apiData.recaptchaToken = recaptchaToken;
          }

          const sessionData = sessionStorage.getItem("userData");
          if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            Object.assign(apiData, parsedData);
          }

          const response = await fetch(
            "https://rosewoodgardens.com.au/backend/api/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(apiData),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("API Response:", result);

          try {
            await sendEmailNotification(formData);
            console.log("Email notification sent successfully");
          } catch (emailError) {
            console.error(
              "Email notification failed, but form was submitted:",
              emailError
            );
          }

          setSuccessMessage(
            "Thank you for contacting us! We'll get back to you soon."
          );
          setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            message: "",
          });
          setErrors({});
          setFormSubmitted(false);
          setRecaptchaToken(null);

          if (window.grecaptcha && recaptchaWidgetId.current) {
            window.grecaptcha.reset(recaptchaWidgetId.current);
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setSuccessMessage(
            "There was an error submitting your form. Please try again later."
          );
        } finally {
          setIsSubmitting(false);
          setTimeout(() => setSuccessMessage(""), 5000);
        }
      } else {
        setIsSubmitting(false);
      }
    };

    // Function to manually render reCAPTCHA
    useEffect(() => {
      if (showRecaptcha && window.grecaptcha && recaptchaRef.current) {
        try {
          if (recaptchaWidgetId.current) {
            window.grecaptcha.reset(recaptchaWidgetId.current);
          }

          recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: "6LdsrrYrAAAAANlNnYAS0kC-tWgHlRBKF97lDgyx",
              callback: handleRecaptchaChange,
              "error-callback": handleRecaptchaError,
              "expired-callback": handleRecaptchaExpired,
              theme: "light",
            }
          );

          console.log("reCAPTCHA rendered with ID:", recaptchaWidgetId.current);
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error);
          setErrors((prev) => ({
            ...prev,
            recaptcha:
              "Failed to load security verification. Please refresh the page.",
          }));
        }
      }
    }, [showRecaptcha, recaptchaLoaded]);

    return (
      <>
        <SeoHead {...seoData.contact} />

        <div className="container-fluid p-0">
          {/* Contact banner section */}
          <section
            className="pt-5 d-flex flex-column align-items-center contact mt-5"
            id="heroCarousel"
          >
            <div className="container contact-hero-banner position-relative rounded-4 bg-white text-center p-0">
              <img
                src={AboutImg}
                alt="About Image"
                className="img-fluid w-100 rounded-4 contact-banner"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-8 col-md-10 icon-bg text-white d-flex flex-column flex-md-row position-relative rounded-4 text-start p-3 p-lg-4 contact-box">
              <div className="col-12 col-md-5 px-3 px-lg-5 border-end border-white border-2 order-md-1 d-flex align-items-center">
                <h3 className="heading fw-semibold">
                  Compassionate Care Begins with a Conversation
                </h3>
              </div>
              <div className="col-12 col-md-7 px-3 px-lg-5 order-md-2 d-flex align-items-center">
                <h5 className="m-0">
                  We listen, guide, and support you every step of the way
                </h5>
              </div>
            </div>
          </section>

          {/* Map / contact cards + form */}
          <section className="py-5 mt-5">
            <div className="container mt-5">
              <div className="row mb-5">
                <small className="text-uppercase dark-text mt-5 fw-semibold">
                  GET TO KNOW US
                </small>
                <h1 className="heading fw-semibold">
                  Transforming Care into <br />
                  Comfort and Connection
                </h1>
              </div>

              {/* CONTACT DATA SECTION – matches id "contact-data" */}
              <div
                id="contact-data"
                className="row mb-5 justify-content-center"
              >
                {contactData.map((card, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-lg-3 mb-4 d-flex"
                  >
                    <div className="card shadow-sm border rounded-4 w-100 d-flex flex-column">
                      <div className="card-body text-center flex-grow-1">
                        <i className={`fs-1 dark-text ${card.icon} mb-3`}></i>
                        <h5 className="card-title fw-bold heading dark-text">
                          {card.title}
                        </h5>
                        <a
                          className="card-text subheading text-muted text-decoration-none"
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {card.description}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FORM SECTION – matches id "form" */}
              <div
                id="form"
                className="container testimonal rounded-5 mt-5 p-2 p-lg-5"
              >
                <div className="row mb-5">
                  <h1 className="heading fw-semibold">Contact us Today</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row my-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={showError("name")}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <InputBox
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={showError("email")}
                        required
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={showError("phone")}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <InputBox
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={showError("address")}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <TextBox
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={showError("message")}
                      required
                    />
                  </div>

                  <div className="row">
                    {/* reCAPTCHA container - only shown when message has content */}
                    {showRecaptcha && (
                      <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <div ref={recaptchaRef} id="recaptcha-container"></div>
                        {errors.recaptcha && (
                          <div className="text-danger text-start text-md-center mt-2">
                            {errors.recaptcha}
                          </div>
                        )}
                        {!recaptchaLoaded && (
                          <div className="text-info mt-2">
                            Loading security verification...
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      className={`${
                        showRecaptcha
                          ? "col-12 col-md-6 text-end text-md-center"
                          : "col-12"
                      }`}
                    >
                      {Object.keys(errors).length > 0 && formSubmitted && (
                        <div
                          className="invalid-feedback d-block mb-3"
                          style={{
                            fontSize: "14px",
                            color: "red",
                          }}
                        >
                          All required fields should be filled correctly before
                          submitting.
                        </div>
                      )}

                      <div
                        className={`d-flex justify-content-${
                          showRecaptcha ? "md-end" : "center"
                        } align-items-${
                          showRecaptcha ? "md-start" : "center"
                        }`}
                      >
                        <GlobalButton
                          type="submit"
                          text={isSubmitting ? "Submitting..." : "Submit"}
                          variant="buttonv1 fw-semibold"
                          disabled={
                            isSubmitting || (showRecaptcha && !recaptchaToken)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {successMessage && (
                    <div
                      className="alert alert-success mt-3"
                      role="status"
                      aria-live="polite"
                      style={{
                        fontSize: "14px",
                        color: successMessage.includes("error")
                          ? "red"
                          : "green",
                      }}
                    >
                      {successMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>

          <NewsletterSection />
        </div>
      </>
    );
  };

  return <MyForm />;
}
