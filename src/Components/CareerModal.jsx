import React, { useState, useEffect, useRef } from "react";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import GlobalButton from "./Button";
import { careerPortalData } from "../Constants/Data";
import InputBox from "./InputBox";
import TextBox from "./TextBox";
import emailjs from '@emailjs/browser';

const CareerModal = ({ setShowModal, modalRef, videoRef, jobTitle }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize from sessionStorage
  const [selectedEngagement, setSelectedEngagement] = useState(
    sessionStorage.getItem("engagement_type") || null
  );
  const [selectedHours, setSelectedHours] = useState(
    sessionStorage.getItem("work_hours") || null
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    sessionStorage.getItem("start_date") || null
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState("");

  // Location states
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStateStep2, setSelectedStateStep2] = useState(
    sessionStorage.getItem("work_location")
      ? {
          value: sessionStorage.getItem("state_value_step2") || "",
          label: sessionStorage.getItem("work_location"),
        }
      : null
  );
  const [selectedStateStep5, setSelectedStateStep5] = useState(
    sessionStorage.getItem("state_step5")
      ? {
          value: sessionStorage.getItem("state_value_step5") || "",
          label: sessionStorage.getItem("state_step5"),
        }
      : null
  );
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  // Form data initialized from sessionStorage
  const [formData, setFormData] = useState({
    fullName: sessionStorage.getItem("fullName") || "",
    email: sessionStorage.getItem("email") || "",
    phone: sessionStorage.getItem("phone") || "",
    preferredContactTime: sessionStorage.getItem("preferredContactTime") || "",
    state: sessionStorage.getItem("state") || "",
    suburb: sessionStorage.getItem("suburb") || "",
    postcode: sessionStorage.getItem("postcode") || "",
    notes: sessionStorage.getItem("notes") || "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // reCAPTCHA states
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState(null);
  const recaptchaRef = useRef(null);

  // Initialize EmailJS
  const EMAILJS_SERVICE_ID = "service_24g96ge";
  const EMAILJS_TEMPLATE_ID = "template_v6vl8rv";
  const EMAILJS_PUBLIC_KEY = "dYh6H0ZdHIlh5o3rI";

  // Initialize country, states, and job title
  useEffect(() => {
    if (jobTitle) {
      sessionStorage.setItem("job_title", jobTitle);
    }

    const australia = Country.getAllCountries().find((c) => c.isoCode === "AU");
    setSelectedCountry({ value: australia.isoCode, label: australia.name });
    const australiaStates = State.getStatesOfCountry(australia.isoCode);
    setStates(australiaStates);

    // Initialize Step 2 state
    const savedStateStep2 = sessionStorage.getItem("state_value_step2");
    if (savedStateStep2) {
      const state = australiaStates.find((s) => s.isoCode === savedStateStep2);
      if (state) {
        setSelectedStateStep2({
          value: state.isoCode,
          label: state.name,
        });
      }
    }

    // Initialize Step 5 state and cities
    const savedStateStep5 = sessionStorage.getItem("state_value_step5");
    if (savedStateStep5) {
      const state = australiaStates.find((s) => s.isoCode === savedStateStep5);
      if (state) {
        setSelectedStateStep5({
          value: state.isoCode,
          label: state.name,
        });
        const stateCities = City.getCitiesOfState("AU", state.isoCode);
        setCities(stateCities);
      }
    }

    // Initialize documents
    const savedDocs = sessionStorage.getItem("documents");
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs);
        setSelectedFiles(parsedDocs);
      } catch (e) {
        console.error("Error parsing documents", e);
      }
    }
  }, [jobTitle]);

  // Update cities when Step 5 state changes
  useEffect(() => {
    if (selectedStateStep5?.value) {
      const stateCities = City.getCitiesOfState("AU", selectedStateStep5.value);
      setCities(stateCities);
      setFormData((prev) => ({ ...prev, suburb: "" }));
      sessionStorage.setItem("suburb", "");
    }
  }, [selectedStateStep5]);

  // Improved reCAPTCHA loading effect
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        setRecaptchaLoaded(true);
        return true;
      }
      return false;
    };

    if (!loadRecaptcha()) {
      const existingScript = document.querySelector('script[src*="google.com/recaptcha"]');
      
      if (existingScript) {
        const waitForRecaptcha = setInterval(() => {
          if (loadRecaptcha()) {
            clearInterval(waitForRecaptcha);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(waitForRecaptcha);
        }, 5000);
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          const initRecaptcha = setInterval(() => {
            if (loadRecaptcha()) {
              clearInterval(initRecaptcha);
            }
          }, 100);
        };
        script.onerror = () => {
          console.error('Failed to load reCAPTCHA script');
          setRecaptchaLoaded(false);
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
    };
  }, []);

  // Initialize reCAPTCHA when loaded and needed
  useEffect(() => {
    if (recaptchaLoaded && showRecaptcha && recaptchaRef.current) {
      initializeRecaptcha();
    }
  }, [recaptchaLoaded, showRecaptcha]);

  // Reset reCAPTCHA when hiding it
  useEffect(() => {
    if (!showRecaptcha && recaptchaWidgetId !== null && window.grecaptcha) {
      window.grecaptcha.reset(recaptchaWidgetId);
      setRecaptchaVerified(false);
    }
  }, [showRecaptcha, recaptchaWidgetId]);

  // Show reCAPTCHA when user interacts with notes field
  useEffect(() => {
    if (formData.notes.trim() !== "" && currentStep === 5) {
      setShowRecaptcha(true);
    } else {
      setShowRecaptcha(false);
      setRecaptchaVerified(false);
    }
  }, [formData.notes, currentStep]);

  const initializeRecaptcha = () => {
    if (!window.grecaptcha || !recaptchaRef.current) {
      console.error('reCAPTCHA not available or container missing');
      return;
    }

    if (recaptchaRef.current.hasChildNodes()) {
      return;
    }

    try {
      const widgetId = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: '6LdsrrYrAAAAANlNnYAS0kC-tWgHlRBKF97lDgyx',
        callback: (response) => {
          setRecaptchaVerified(true);
          setErrorMessage('');
        },
        'expired-callback': () => {
          setRecaptchaVerified(false);
        },
        'error-callback': () => {
          setRecaptchaVerified(false);
        },
      });

      setRecaptchaWidgetId(widgetId);
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
      setRecaptchaLoaded(false);
    }
  };

  const regexValidators = {
    fullName: /^[a-zA-Z]+ [a-zA-Z]+$/,
    phone: /^\d{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    preferredContactTime: /^(?!\s*$).+/,
    postcode: /^\d{4,6}$/,
  };

  const getValidationMessage = (field) => {
    switch (field) {
      case "fullName":
        return "Please enter your full name (first and last).";
      case "email":
        return "Enter a valid email address.";
      case "phone":
        return "Enter a 10-digit phone number.";
      case "preferredContactTime":
        return "Please specify a preferred contact time.";
      case "postcode":
        return "Enter a valid postcode.";
      case "state":
        return "State is required.";
      case "suburb":
        return "Suburb is required.";
      default:
        return "This field is required.";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    sessionStorage.setItem(name, value);

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setFileErrors("Only PDF, DOCX, PNG, JPG, or JPEG files are allowed.");
      setSelectedFiles([]);
      sessionStorage.removeItem("documents");
    } else {
      setFileErrors("");
      setSelectedFiles(files);
      const filesInfo = files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));
      sessionStorage.setItem("documents", JSON.stringify(filesInfo));
    }
  };

  const sendEmailNotification = async (formData, applicationType = "Career Inquiry") => {
    try {
      const templateParams = {
        first_name: formData.fullName.split(' ')[0] || 'User',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        application_type: applicationType,
        job_title: sessionStorage.getItem("job_title") || jobTitle,
        date_time: new Date().toLocaleString(),
        engagement_type: selectedEngagement,
        work_location: selectedStateStep2?.label || "",
        work_hours: selectedHours,
        preferred_contact_time: formData.preferredContactTime,
        state: selectedStateStep5?.label || "",
        suburb: formData.suburb,
        postcode: formData.postcode,
        additional_notes: formData.notes,
        message: `New ${applicationType} application received from ${formData.fullName}`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
     
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced reCAPTCHA check
    if (showRecaptcha) {
      if (!recaptchaLoaded) {
        setErrorMessage("Security verification is still loading. Please wait a moment.");
        return;
      }
      
      if (!recaptchaVerified) {
        setErrorMessage("Please complete the security verification.");
        return;
      }
    }

    const newErrors = {};
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "preferredContactTime",
      "state",
      "suburb",
      "postcode",
    ];

    requiredFields.forEach((key) => {
      if (!formData[key] || formData[key].trim() === "") {
        newErrors[key] = getValidationMessage(key);
      }
    });

    Object.keys(regexValidators).forEach((key) => {
      if (formData[key] && !regexValidators[key].test(formData[key])) {
        newErrors[key] = getValidationMessage(key);
      }
    });

    if (!selectedStateStep5) {
      newErrors.state = "Please select a state";
    }

    setErrors(newErrors);
    setSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const formDataToSubmit = new FormData();

        formDataToSubmit.append(
          "career_title",
          sessionStorage.getItem("job_title") || jobTitle
        );
        formDataToSubmit.append("engagement_type", selectedEngagement);
        formDataToSubmit.append(
          "work_location",
          selectedStateStep2?.label || ""
        );
        formDataToSubmit.append("work_hours", selectedHours);
        formDataToSubmit.append("full_name", formData.fullName);
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("phone", formData.phone);
        formDataToSubmit.append(
          "preferred_contact_time",
          formData.preferredContactTime
        );
        formDataToSubmit.append("state", selectedStateStep5?.label || "");
        formDataToSubmit.append("suburb", formData.suburb);
        formDataToSubmit.append("postcode", formData.postcode);
        formDataToSubmit.append("additional_notes", formData.notes);

        if (selectedFiles.length > 0) {
          selectedFiles.forEach((file) => {
            formDataToSubmit.append("document", file);
          });
        }

        const response = await fetch(
          "https://rosewoodgardens.com.au/backend/api/career-applications",
          {
            method: "POST",
            body: formDataToSubmit,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Success:", data);

        await sendEmailNotification(formData, "Career Inquiry");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredContactTime: "",
          state: "",
          suburb: "",
          postcode: "",
          notes: "",
        });

        setErrors({});
        setSubmitted(false);
        setSelectedEngagement(null);
        setSelectedHours(null);
        setSelectedStartDate(null);
        setSelectedFiles([]);
        setCurrentStep(1);
        setSubmitSuccess(true);

        Object.keys(formData).forEach((key) => sessionStorage.removeItem(key));
        sessionStorage.removeItem("job_title");
        sessionStorage.removeItem("engagement_type");
        sessionStorage.removeItem("work_location");
        sessionStorage.removeItem("state_value_step2");
        sessionStorage.removeItem("work_hours");
        sessionStorage.removeItem("start_date");
        sessionStorage.removeItem("state_step5");
        sessionStorage.removeItem("state_value_step5");
        sessionStorage.removeItem("documents");
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(
          "There was an error submitting your application. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const showError = (field) => submitted && errors[field];

  const handleSingleSelect = (item, step) => {
    if (step === 1) {
      setSelectedEngagement(item);
      sessionStorage.setItem("engagement_type", item);
    } else if (step === 3) {
      setSelectedHours(item);
      sessionStorage.setItem("work_hours", item);
    } else if (step === 4) {
      setSelectedStartDate(item);
      sessionStorage.setItem("start_date", item);
    }
    setErrorMessage("");
  };

  const handleNext = () => {
    let message = "";

    switch (currentStep) {
      case 1:
        if (!selectedEngagement) {
          message = "Please select your preferred engagement type.";
        }
        break;
      case 2:
        if (!selectedStateStep2) {
          message = "Please select your preferred state location.";
        }
        break;
      case 3:
        if (!selectedHours) {
          message = "Please select how many hours you'd like to work.";
        }
        break;
      case 4:
        if (!selectedStartDate) {
          message = "Please select when you'd like to start.";
        }
        break;
      default:
        break;
    }

    if (message) {
      setErrorMessage(message);
      return;
    }

    setErrorMessage("");
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div
      ref={modalRef}
      className="col-md-9 col-11 bg-white shadow rounded-4 p-4 position-relative"
    >
      <button
        onClick={() => {
          setShowModal(false);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
        className="btn-close position-absolute top-0 end-0 m-3"
      />

      {submitSuccess ? (
        <div className="text-center py-5">
          <i className="bi bi-check-circle-fill dark-text display-4 mb-3"></i>
          <h2 className="heading dark-text fw-bold mb-3">Thank You!</h2>
          <p className="lead">
            Your application has been submitted successfully
          </p>
          <p>We will review your application and contact you shortly.</p>

          <GlobalButton
            text="Close"
            variant="buttonv2 dark-text"
            onClick={() => setShowModal(false)}
          />
        </div>
      ) : (
        <>
          {currentStep === 1 && (
            <div className="mb-3">
              <h2 className="heading fw-bold mb-4">
                What is your preferred engagement type?
              </h2>
              {errorMessage && (
                <p className="text-danger fw-semibold">{errorMessage}</p>
              )}
              <div className="d-flex flex-column justify-content-center align-items-center">
                {careerPortalData
                  .find((item) => item.title === "Engagement Model")
                  .options.map((engagement, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-8 col-md-4 mx-auto"
                    >
                      <div
                        onClick={() => handleSingleSelect(engagement, 1)}
                        className={`card mb-4 shadow-sm rounded-3 p-3 ${
                          selectedEngagement === engagement
                            ? "selected-card"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex justify-content-between align-items-center gap-5">
                          <h6 className="heading dark-text fw-bold">
                            {engagement}
                          </h6>
                          <i className="bi bi-chevron-right dark-text"></i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <h2 className="heading fw-bold mb-4">
                Select your preferred work location
              </h2>
              {errorMessage && (
                <p className="text-danger fw-semibold">{errorMessage}</p>
              )}
              <div className="col-md-5 col-12 d-flex flex-column justify-content-center align-items-center">
                <select
                  className="form-select d-none mb-3 py-3"
                  value={selectedCountry?.value || ""}
                  disabled
                >
                  <option value="AU">Australia</option>
                </select>

                <select
                  className="form-select mb-3 py-3"
                  value={selectedStateStep2?.value || ""}
                  onChange={(e) => {
                    const selected = states.find(
                      (s) => s.isoCode === e.target.value
                    );
                    if (selected) {
                      const stateData = {
                        value: selected.isoCode,
                        label: selected.name,
                      };
                      setSelectedStateStep2(stateData);
                      sessionStorage.setItem("work_location", selected.name);
                      sessionStorage.setItem(
                        "state_value_step2",
                        selected.isoCode
                      );
                    }
                  }}
                  disabled={!selectedCountry}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-3">
              <h2 className="heading fw-bold mb-4">
                How many hours a week would you like to work?
              </h2>
              {errorMessage && (
                <p className="text-danger fw-semibold">{errorMessage}</p>
              )}
              <div className="d-flex flex-column justify-content-center align-items-center">
                {careerPortalData
                  .find((item) => item.title === "Preferred Weekly Hours")
                  .options.map((hour, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-8 col-md-4 mx-auto"
                    >
                      <div
                        onClick={() => handleSingleSelect(hour, 3)}
                        className={`card mb-4 shadow-sm rounded-3 p-3 ${
                          selectedHours === hour ? "selected-card" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex justify-content-between align-items-center gap-5">
                          <h6 className="heading dark-text fw-bold">{hour}</h6>
                          <i className="bi bi-chevron-right dark-text"></i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-3">
              <h2 className="heading fw-bold mb-4">
                When would you like to start working?
              </h2>
              {errorMessage && (
                <p className="text-danger fw-semibold">{errorMessage}</p>
              )}
              <div className="d-flex flex-column justify-content-center align-items-center">
                {careerPortalData
                  .find((item) => item.title === "Earliest Start Date")
                  .options.map((start, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-8 col-md-4 mx-auto"
                    >
                      <div
                        onClick={() => handleSingleSelect(start, 4)}
                        className={`card mb-4 shadow-sm rounded-3 p-3 ${
                          selectedStartDate === start ? "selected-card" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex justify-content-between align-items-center gap-5">
                          <h6 className="heading dark-text fw-bold">{start}</h6>
                          <i className="bi bi-chevron-right dark-text"></i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mb-3">
              <h2 className="heading fw-bold mb-4">
                Please fill out your contact details:
              </h2>
              <div className="w-100 p-4 testimonal rounded-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Full Name (First and Last)"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={showError("fullName")}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputBox
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={showError("email")}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={showError("phone")}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="group position-relative mb-3">
                        <select
                          className="form-control custom-input input rounded-0"
                          id="homeCareStatus"
                          name="preferredContactTime"
                          value={formData.preferredContactTime}
                          onChange={handleChange}
                        >
                          <option value="" disabled hidden>
                            Preferred Contact Time
                          </option>
                          <option value="8 AM - 10 AM">8 AM - 10 AM</option>
                          <option value="10 AM - 12 PM">10 AM - 12 PM</option>
                          <option value="12 PM - 2 PM">12 PM - 2 PM</option>
                          <option value="2 PM - 4 PM">2 PM - 4 PM</option>
                          <option value="4 PM - 6 PM">4 PM - 6 PM</option>
                        </select>
                        {showError("preferredContactTime") && (
                          <div className="text-danger text-start mt-1">
                            This field is required.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <select
                        className="form-select input form-control custom-input mb-3"
                        value={selectedStateStep5?.value || ""}
                        name="state"
                        onChange={(e) => {
                          const selected = states.find(
                            (s) => s.isoCode === e.target.value
                          );
                          if (selected) {
                            const stateData = {
                              value: selected.isoCode,
                              label: selected.name,
                            };
                            setSelectedStateStep5(stateData);
                            setFormData((prev) => ({
                              ...prev,
                              state: selected.name,
                            }));
                            sessionStorage.setItem(
                              "state_step5",
                              selected.name
                            );
                            sessionStorage.setItem(
                              "state_value_step5",
                              selected.isoCode
                            );

                            const stateCities = City.getCitiesOfState(
                              "AU",
                              selected.isoCode
                            );
                            setCities(stateCities);
                          }
                        }}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {showError("state") && (
                        <div className="text-danger text-start small">
                          This field is required
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <select
                        className="form-select input form-control custom-input mb-3"
                        value={formData.suburb}
                        name="suburb"
                        onChange={handleChange}
                        disabled={!selectedStateStep5 || cities.length === 0}
                      >
                        <option value="">
                          {!selectedStateStep5
                            ? "Select State first"
                            : cities.length === 0
                            ? "No cities available"
                            : "Select Suburb"}
                        </option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {showError("suburb") && (
                        <div className="text-danger text-start small">
                          This field is required
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <InputBox
                        label="Postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        error={showError("postcode")}
                      />
                    </div>
                  </div>

                  <div className="text-start mb-3">
                    <label className="form-label dark-text small">
                      Upload Documents (PDF, DOCX, PNG, JPG, JPEG)
                    </label>
                    <input
                      type="file"
                      className="form-control form-upload"
                      multiple
                      accept=".pdf,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                    {fileErrors && (
                      <div className="text-danger mt-2">{fileErrors}</div>
                    )}
                    {selectedFiles.length > 0 && (
                      <ul className="mt-2 small">
                        {selectedFiles.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <TextBox
                    label="Additional Notes or Specific Requirements"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />

                  {/* Improved reCAPTCHA display */}
                  {showRecaptcha && (
                    <div className="my-3">
                      {!recaptchaLoaded ? (
                        <div className="text-muted">Loading security verification...</div>
                      ) : (
                        <div ref={recaptchaRef} className="g-recaptcha"></div>
                      )}
                      {showRecaptcha && !recaptchaVerified && submitted && (
                        <div className="text-danger mt-2">
                          Please complete the security verification.
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <GlobalButton
                      type="submit"
                      text={isSubmitting ? "Submitting..." : "Submit"}
                      variant="buttonv1 fw-semibold"
                      disabled={isSubmitting}
                    />
                  </div>
                  {submitted && Object.keys(errors).length > 0 && (
                    <div className="text-danger mt-3">
                      Please correct the errors above to continue.
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          <div className="rounded-4 mt-5 d-flex justify-content-between">
            {currentStep !== 1 ? (
              <button
                className="dark-text rounded-3 border p-2 d-flex align-items-center gap-2"
                onClick={handlePrev}
              >
                <i className="bi bi-chevron-left"></i> Prev
              </button>
            ) : (
              <div></div>
            )}

            {currentStep !== 5 && (
              <button
                className="dark-text rounded-3 border p-2 d-flex align-items-center gap-2"
                onClick={handleNext}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CareerModal;