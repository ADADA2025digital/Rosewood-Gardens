import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // ✅ NEW
import emailjs from "@emailjs/browser";
import countryList from "react-select-country-list";
import bgImage from "../assets/2.png";
import GlobalButton from "./Button";
import InputBox from "./InputBox";
import TextBox from "./TextBox";

import { KEYWORD_TO_SECTION } from "../Config/searchConfig"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState(null);
  const recaptchaRef = useRef(null);

  // ✅ For reading ?search= from URL
  const [searchParams] = useSearchParams();

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_24g96ge";
  const EMAILJS_TEMPLATE_ID = "template_v6vl8rv";
  const EMAILJS_PUBLIC_KEY = "dYh6H0ZdHIlh5o3rI";

  const options = countryList().getData();

  const regexValidators = {
    full_name: /^[A-Za-z\s]{3,}$/,
    phone: /^\d{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    address: /^.{0,}$/, // Allow empty address
    message: /^.{10,}$/,
  };

  const requiredFields = ["full_name", "phone", "email", "message"];

  // ✅ SCROLL LOGIC – specific to the contact component
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    // Fuzzy match: if no exact keyword, try "includes"
    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    // Only allow IDs relevant to this component
    // This uses PAGE_SEARCH_CONFIG.contactComponent (sectionId: "form")
    const CONTACT_SECTION_IDS = new Set([
      "form",          // Contact component section
      // add more IDs here if you reuse the component elsewhere
    ]);

    if (!targetId || !CONTACT_SECTION_IDS.has(targetId)) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    setTimeout(() => {
      const HEADER_HEIGHT = 160; // adjust: your global header height
      const elementY = el.getBoundingClientRect().top + window.scrollY;
      const offsetY = elementY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
    }, 200);
  }, [searchParams]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Load reCAPTCHA script
  useEffect(() => {
    const SCRIPT_ID = "recaptcha-script";
    const onLoad = () => setRecaptchaReady(true);

    if (window.grecaptcha) {
      onLoad();
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", onLoad);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", onLoad);
  }, []);

  // Render or reset reCAPTCHA when conditions change
  useEffect(() => {
    if (!recaptchaReady || !recaptchaRef.current) return;

    const shouldShowRecaptcha = formData.message.length >= 10;

    if (shouldShowRecaptcha) {
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId);
      } else if (window.grecaptcha && recaptchaRef.current) {
        recaptchaRef.current.innerHTML = "";
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LdsrrYrAAAAANlNnYAS0kC-tWgHlRBKF97lDgyx",
          callback: (token) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(null),
          "error-callback": () => setRecaptchaToken(null),
        });
        setRecaptchaWidgetId(widgetId);
      }
    } else {
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
      setRecaptchaToken(null);
    }
  }, [formData.message, recaptchaReady, recaptchaWidgetId]);

  const getValidationMessage = (field) => {
    switch (field) {
      case "full_name":
        return "Name should be at least 3 letters";
      case "phone":
        return "Please enter a valid 10-digit phone number";
      case "email":
        return "Please enter a valid email address";
      case "message":
        return "Message should be at least 10 characters";
      default:
        return "Invalid input";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to send email notification via EmailJS
  const sendEmailNotification = async (formData) => {
    try {
      const templateParams = {
        first_name: formData.full_name.split(" ")[0] || "Customer",
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || "Not provided",
        message: formData.message,
        enquiry_date: new Date().toLocaleDateString("en-AU", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        enquiry_time: new Date().toLocaleTimeString("en-AU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        to_email: "info@rosewoodgardens.com.au",
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
      console.error("Email sending failed - Full error details:", {
        errorCode: error.code,
        errorText: error.text,
        errorStatus: error.status,
        errorMessage: error.message,
      });

      if (error.code === 400) {
        console.error("400 Error - Likely template parameter issues");
        console.error(
          "Check that all template variables match your EmailJS template"
        );
      } else if (error.code === 401) {
        console.error(
          "401 Error - Authentication issue. Check your Public Key"
        );
      } else if (error.code === 404) {
        console.error("404 Error - Service or Template not found");
      }

      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Validate field formats
    Object.keys(regexValidators).forEach((key) => {
      if (
        formData[key] &&
        formData[key].trim() !== "" &&
        !regexValidators[key].test(formData[key])
      ) {
        newErrors[key] = getValidationMessage(key);
      }
    });

    // Validate reCAPTCHA for longer messages
    if (formData.message.length >= 10 && !recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }

    setErrors(newErrors);
    setSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const submitData = { ...formData };
        if (recaptchaToken) {
          submitData.recaptchaToken = recaptchaToken;
        }

        const response = await fetch(
          "https://rosewoodgardens.com.au/backend/api/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json();

        const emailSent = await sendEmailNotification(formData);

        if (!emailSent) {
          console.warn(
            "Form submitted successfully but email notification failed"
          );
        }

        setSubmitSuccess(true);
        setFormData({
          full_name: "",
          phone: "",
          email: "",
          address: "",
          message: "",
        });
        setRecaptchaToken(null);
        setErrors({});
        setSubmitted(false);

        if (window.grecaptcha && recaptchaWidgetId !== null) {
          window.grecaptcha.reset(recaptchaWidgetId);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors((prev) => ({
          ...prev,
          api: "There was an error submitting your form. Please try again later.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const showError = (field) => submitted && errors[field];

  return (
    <div
      className="contact-wrapper d-flex align-items-center justify-content-start vh-100"
      style={{
        background: `url(${bgImage}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="container p-3 p-sm-3 p-lg-5">
        {/* ✅ give this an ID matching sectionId: "form" */}
        <div
          id="form"
          className="col-lg-5 rounded-4 p-3 p-sm-3 p-lg-5 bg-white text-start shadow-sm position-relative"
        >
          <h1 className="form-title fw-bold fs-3 heading">
            Speak to Our Care Team
          </h1>
          <p className="text-muted mb-4">
            Speak to Our Care Team for friendly guidance, service details, and
            personalized Aged & Disability Care support options.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <InputBox
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              required
              onChange={handleChange}
              error={showError("full_name") ? errors.full_name : ""}
              aria-describedby={
                showError("full_name") ? "name-error" : undefined
              }
            />

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <InputBox
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  required
                  onChange={handleChange}
                  error={showError("phone") ? errors.phone : ""}
                  aria-describedby={
                    showError("phone") ? "phone-error" : undefined
                  }
                />
              </div>
              <div className="col-md-6">
                <InputBox
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  error={showError("email") ? errors.email : ""}
                  aria-describedby={
                    showError("email") ? "email-error" : undefined
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <InputBox
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={showError("address") ? errors.address : ""}
                aria-describedby={
                  showError("address") ? "address-error" : undefined
                }
              />
            </div>

            <div className="mt-3">
              <TextBox
                label="Message"
                name="message"
                value={formData.message}
                required
                onChange={handleChange}
                error={showError("message") ? errors.message : ""}
                aria-describedby={
                  showError("message") ? "message-error" : undefined
                }
              />
            </div>

            {formData.message.length >= 10 && recaptchaReady && (
              <div className="my-3">
                <div ref={recaptchaRef} />
                {showError("recaptcha") && (
                  <div className="text-danger mt-2">{errors.recaptcha}</div>
                )}
              </div>
            )}

            {errors.api && (
              <div className="alert alert-danger mt-3" role="alert">
                {errors.api}
              </div>
            )}

            <div className="text-start mt-4">
              <GlobalButton
                type="submit"
                text={isSubmitting ? "Submitting..." : "Submit"}
                variant="buttonv1 fw-semibold"
                disabled={
                  isSubmitting ||
                  (formData.message.length >= 10 && !recaptchaToken)
                }
              />
            </div>

            {submitSuccess && (
              <div
                className="alert alert-success mt-3"
                role="alert"
                aria-live="polite"
              >
                Thank you for contacting us! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
