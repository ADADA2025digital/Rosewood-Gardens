import React, { useState, useRef, useEffect } from "react";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import GlobalButton from "./Button";
import video from "../assets/video.mp4";
import posterImage from "../assets/7.png";
import {} from "../Constants/Data";
import InputBox from "./InputBox";
import TextBox from "./TextBox";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';

const ServiceDetails = ({
  setShowModal,
  modalRef,
  videoRef,
  selectedCareTitle,
  selectedCareOptions = [],
  activeTab
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Track selected subservices
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const hasSelectedSubServices = selectedSubServices.length > 0;
  const [videoCompleted, setVideoCompleted] = useState(false);
  const canProceed = videoCompleted && hasSelectedSubServices;
  const [selectedOption, setSelectedOption] = useState("");

  // Add reCAPTCHA state
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_24g96ge";
  const EMAILJS_TEMPLATE_ID = "template_v6vl8rv";
  const EMAILJS_PUBLIC_KEY = "dYh6H0ZdHIlh5o3rI";

  // Filter options based on active tab
  const getFilteredOptions = () => {
    if (activeTab === "facility" && selectedCareTitle === "Support At Home") {
      return selectedCareOptions.filter(
        feature => 
          feature.subservice !== "Domestic Assistance" &&
          feature.subservice !== "Meal Preparation" && 
          feature.subservice !== "Home & Garden Maintenance"
      );
    } else if (activeTab === "home" && selectedCareTitle === "Support At Home") {
      return selectedCareOptions.filter(
        feature => feature.subservice !== "Care & Case Management"
      );
    }
    return selectedCareOptions;
  };

  const filteredOptions = getFilteredOptions();

  const handleOptionClick = (title) => {
    setSelectedSubServices((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
    setErrorMessage("");
  };

  const handleNext = () => {
    if (currentStep === 1 && !canProceed) {
      setErrorMessage(
        "Please select at least one option and click Next to proceed."
      );
      return;
    }

    if (currentStep === 2 && !selectedOption) {
      setErrorMessage("Please select one option to move further.");
      return;
    }

    setErrorMessage("");
    setCurrentStep((prev) => prev + 1);
    // Store the selectedCareTitle and subservice titles in sessionStorage
    sessionStorage.setItem("service_title", selectedCareTitle);
    sessionStorage.setItem(
      "sub_service_titles",
      JSON.stringify(selectedSubServices)
    );
  };

  const handlePrev = () => {
    if (currentStep === 1 && videoClosed) {
      setVideoClosed(false);
      setVideoCompleted(false);

      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    } else {
      setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
    }
  };

  // Form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    state: "",
    suburb: "",
    postcode: "",
    homeCareStatus: "",
    contactDetails: "",
    preferredContactTime: "",
    notes: "",
    programType: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const countries = countryList().getData();
  const defaultCountry = countries.find((c) => c.label === "Australia");

  const [selectedCity, setSelectedCity] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Load data from sessionStorage if available
    const storedData = {};
    Object.keys(formData).forEach((key) => {
      const value = sessionStorage.getItem(key);
      if (value) storedData[key] = value;
    });

    const serviceTitle = sessionStorage.getItem("service_title");
    const subServiceTitles = sessionStorage.getItem("sub_service_titles");
    const label = sessionStorage.getItem("label");

    if (Object.keys(storedData).length > 0) {
      setFormData((prev) => ({ ...prev, ...storedData }));
    }

    if (subServiceTitles) {
      setSelectedSubServices(JSON.parse(subServiceTitles));
    }

    if (label) {
      setSelectedOption(label);
    }

    // Initialize country/state data
    const australia = Country.getAllCountries().find((c) => c.isoCode === "AU");
    setSelectedCountry({ value: australia.isoCode, label: australia.name });
    setStates(State.getStatesOfCountry(australia.isoCode));
  }, []);

  useEffect(() => {
    if (formData.state) {
      const stateCities = City.getCitiesOfState("AU", formData.state);
      setCities(stateCities);
      setFormData((prev) => ({ ...prev, suburb: "" })); // Reset suburb when state changes
    }
  }, [formData.state]);

  // Add reCAPTCHA change handler
  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.recaptcha;
      return newErrors;
    });
  };

  // Function to send email notification for service requests
  const sendServiceEmailNotification = async (formData) => {
    try {
      const templateParams = {
        first_name: formData.fullName.split(' ')[0] || 'User',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        application_type: "Service Request",
        service_title: sessionStorage.getItem("service_title") || selectedCareTitle,
        sub_service_titles: JSON.parse(sessionStorage.getItem("sub_service_titles") || "[]").join(", "),
        relationship: sessionStorage.getItem("label") || selectedOption,
        date_time: new Date().toLocaleString(),
        state: formData.state,
        suburb: formData.suburb,
        postcode: formData.postcode,
        home_care_status: formData.homeCareStatus,
        program_type: formData.programType,
        preferred_time: formData.preferredContactTime,
        contact_details: formData.contactDetails,
        additional_notes: formData.notes,
        message: `New Service Request received from ${formData.fullName} for ${sessionStorage.getItem("service_title") || selectedCareTitle}`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
     
      console.log('Service email notification sent successfully');
    } catch (error) {
      console.error('Error sending service email notification:', error);
      // Don't throw error here - form submission should continue even if email fails
    }
  };

  const regexValidators = {
    fullName: /^[a-zA-Z]+ [a-zA-Z]+$/,
    phone: /^\d{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    preferredContactTime: /^(?!\s*$).+/,
    postcode: /^\d{4,6}$/,
    programType: /^.{3,}$/,
  };

  const getValidationMessage = (field) => {
    switch (field) {
      case "fullName":
        return "Please enter your full name (first and last).";
      case "email":
        return "Enter a valid email address.";
      case "confirmEmail":
        return "Email addresses do not match.";
      case "phone":
        return "Enter a 10-digit phone number.";
      case "postcode":
        return "Enter a valid postcode.";
      case "state":
        return "State is required.";
      case "suburb":
        return "Suburb is required.";
      case "homeCareStatus":
        return "Please select a Home Care Package status.";
      case "preferredContactTime":
        return "Please specify a preferred contact time.";
      case "programType":
        return "Please tell us the program/package type";
      case "contactDetails":
        return "Contact details are required.";
      default:
        return "This field is required.";
    }
  };

  const validateField = (name, value) => {
    let error = "";
   
    // Check if field is required and empty
    if (!value || value.trim() === "") {
      error = getValidationMessage(name);
    }
    // Check regex validation for specific fields
    else if (regexValidators[name] && !regexValidators[name].test(value)) {
      error = getValidationMessage(name);
    }
    // Special case for email confirmation
    else if (name === "confirmEmail" && value !== formData.email) {
      error = getValidationMessage(name);
    }
   
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Store the updated value directly in sessionStorage
    sessionStorage.setItem(name, value);

    // Validate field in real-time if form has been submitted
    if (submitted) {
      const error = validateField(name, value);
     
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate all fields
    const newErrors = {};
   
    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "confirmEmail",
      "phone",
      "state",
      "suburb",
      "postcode",
      "homeCareStatus",
      "preferredContactTime",
      "contactDetails",
      "programType",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Add reCAPTCHA validation
    if (!recaptchaVerified) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Prepare the data for API submission
        const submissionData = {
          full_name: formData.fullName,
          email: formData.email,
          confirm_email: formData.confirmEmail,
          phone: formData.phone,
          postcode: formData.postcode,
          suburb: formData.suburb,
          state: formData.state,
          home_care_status: formData.homeCareStatus,
          preferred_time: formData.preferredContactTime,
          contact_details: formData.contactDetails,
          notes: formData.notes,
          program_type: formData.programType,
          service_title:
            sessionStorage.getItem("service_title") || selectedCareTitle,
          sub_service_titles: JSON.parse(
            sessionStorage.getItem("sub_service_titles") || "[]"
          ),
          label: sessionStorage.getItem("label") || selectedOption,
        };

        const response = await fetch(
          "https://rosewoodgardens.com.au/backend/api/service-requests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Success:", data);

        // Send email notification
        await sendServiceEmailNotification(formData);

        // Clear session storage after successful submission
        Object.keys(formData).forEach((key) => sessionStorage.removeItem(key));
        sessionStorage.removeItem("service_title");
        sessionStorage.removeItem("sub_service_titles");
        sessionStorage.removeItem("label");

        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          confirmEmail: "",
          phone: "",
          contactDetails: "",
          preferredContactTime: "",
          notes: "",
          state: "",
          suburb: "",
          postcode: "",
          programType: "",
        });

        setErrors({});
        setSubmitted(false);
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(
          "There was an error submitting the form. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const showError = (field) => submitted && errors[field];

  // Video
  const [showSkip, setShowSkip] = useState(false);
  const [videoClosed, setVideoClosed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();

      const timer = setTimeout(() => {
        setShowSkip(true);
      }, 2000);

      const handleEnded = () => {
        setVideoCompleted(true);
        setVideoClosed(true);
      };

      video.addEventListener("ended", handleEnded);

      return () => {
        clearTimeout(timer);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const skipVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setVideoCompleted(true);
    setVideoClosed(true);
  };

  const relationshipOptions = [
    { label: "Myself", icon: "bi-person-fill" },
    { label: "My Partner", icon: "bi-person-hearts" },
    { label: "My Family Member", icon: "bi-people-fill" },
    { label: "My Friend", icon: "bi-person-arms-up" },
    { label: "My Participant", icon: "bi-heart-pulse-fill" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Store selected option in sessionStorage
    sessionStorage.setItem("label", option);
  };

  return (
    <div
      ref={modalRef}
      className="col-md-8 col-11 bg-white shadow rounded-4 p-4 position-relative"
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
      {currentStep === 1 && (
        <div className="my-5">
          {!videoClosed && (
            <>
              <div
                className="rounded-4 overflow-hidden shadow position-relative transition-video"
                style={{
                  height: "400px",
                  width: "100%",
                  margin: "auto",
                  transition: "all 1s ease-in-out",
                }}
              >
                <video
                  ref={videoRef}
                  muted
                  className="rounded-4 w-100 h-100"
                  style={{ objectFit: "cover" }}
                  poster={posterImage}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {showSkip && (
                  <div className="btn-container d-flex justify-content-end position-relative me-3">
                    <a
                      className="btn-content rounded-3 d-flex align-items-center justify-content-center heading text-white px-2 text-decoration-none"
                      onClick={skipVideo}
                    >
                      <h5 className="btn-title small">Skip</h5>
                      <span className="icon-arrow position-relative ">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 66 43"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="arrow" fill="none" fillRule="evenodd">
                            <path
                              id="arrow-icon-one"
                              fill="#FFFFFF"
                              d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 L56.9937789,21.8567812 L40.1545208,4.60825197 Z"
                            />
                            <path
                              id="arrow-icon-two"
                              fill="#FFFFFF"
                              d="M20.1543933,3.89485454 L23.9763149,0.139296592 L45.6916134,20.7848311 L24.677098,42.8607841 L20.1545186,39.1069479 L36.9937789,21.8567812 L20.1545208,4.60825197 Z"
                            />
                            <path
                              id="arrow-icon-three"
                              fill="#FFFFFF"
                              d="M0.154393339,3.89485454 L3.97631488,0.139296592 L25.6916134,20.7848311 L4.67709797,42.8607841 L0.154518591,39.1069479 L16.9937789,21.8567812 L0.15452076,4.60825197 Z"
                            />
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>
                )}
              </div>
              <h2 className="heading fw-bold mt-5 text-center">
                Services are loading...
              </h2>
            </>
          )}

          {videoClosed && (
            <>
              <h2 className="heading fw-bold mb-4 text-center">
                Which Type of Care are you looking for in
                {selectedCareTitle ? ` in ${selectedCareTitle}` : ""}?
              </h2>

              {errorMessage && (
                <p className="text-danger fw-semibold text-center">
                  {errorMessage}
                </p>
              )}
              <div className="d-flex flex-wrap gap-3 justify-content-center align-items-stretch w-100">
                {filteredOptions.map((feature, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(feature.subservice)}
                    className={`card mb-4 shadow rounded-4 p-3 position-relative subservice-card h-100 d-flex flex-column${
                      selectedSubServices.includes(feature.subservice)
                        ? "selected-card"
                        : ""
                    }`}
                    style={{ width: "18rem", cursor: "pointer" }}
                  >
                    <div className="card-body p-0 d-flex flex-column flex-grow-1">
                      <div className="subimage-wrapper overflow-hidden position relative">
                        <img
                          src={feature.serviceImage}
                          alt="Sub services image"
                          className="img-fluid w-100 rounded-3 overflow-hidden position-relative"
                          style={{ objectFit: "cover", height: "150px" }}
                        />{" "}
                      </div>
                      <div className="subservice-content">
                        <h6 className="heading fw-bold text-start my-2">
                          {feature.subservice}
                        </h6>
                        <ul className="small text-start ps-3 subservice-description">
                          {feature.servicesList.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start p-0">
                      <button
                        type="button"
                        className={`btn btn-link p-0 ${
                          selectedSubServices.includes(feature.subservice)
                            ? "text-success fw-semibold"
                            : "dark-text"
                        }`}
                      >
                        {selectedSubServices.includes(feature.subservice) && (
                          <i className="bi bi-check-circle me-1"></i>
                        )}
                        {selectedSubServices.includes(feature.subservice)
                          ? "Selected"
                          : "Select Here"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="mb-3 d-flex flex-column align-items-center">
          <h2 className="heading fw-bold dark-text mb-4">
            Rosewood Gardens delivers personalised, Trusted, <br />{" "}
            compassionated support services at your home or <br /> at our 24/7
            facility
          </h2>
          <p className="small">
            To understand the person's needs, so we can offer care
            recommendations that are thoughtful, personalised, and filled with
            compassion.
          </p>
          <span className="small fw-semibold">
            Please Kindly let us know who you would like this care to support.
          </span>
          {errorMessage && (
            <p className="text-danger fw-semibold">{errorMessage}</p>
          )}

          <div className="col-md-8 mt-5 d-flex flex-wrap justify-content-center align-items-center gap-4">
            {relationshipOptions.map((option, index) => (
              <div
                key={index}
                className={`shadow rounded-3 px-4 py-3 d-flex align-items-center gap-3 ${
                  selectedOption === option.label ? "selected-card" : ""
                }`}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  minWidth: "220px",
                }}
                onClick={() => handleOptionSelect(option.label)}
              >
                <i className={`${option.icon} fs-4 text-danger`}></i>
                <span className="fw-semibold text-dark">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="mb-3">
          {submitSuccess ? (
            <div className="text-center py-5">
              <i className="bi bi-check-circle-fill dark-text display-4 mb-3"></i>
              <h2 className="heading dark-text fw-bold mb-3">Thank You!</h2>
              <p className="lead">
                Your request has been submitted successfully.
              </p>
              <p>Our team will contact you shortly.</p>

              <GlobalButton
                text="Close"
                variant="buttonv2 dark-text"
                onClick={() => setShowModal(false)}
              />
            </div>
          ) : (
            <>
              <h2 className="heading fw-bold mb-4">
                For us to assist you further, kindly provide the contact details
                requested below
              </h2>

              {errorMessage && (
                <p className="text-danger fw-semibold">{errorMessage}</p>
              )}

              <div className="w-100 p-4 testimonal rounded-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Full Name (First and Last)"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={showError("fullName") ? errors.fullName : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputBox
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={showError("phone") ? errors.phone : ""}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <InputBox
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={showError("email") ? errors.email : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <InputBox
                        label="Confirm Email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        error={showError("confirmEmail") ? errors.confirmEmail : ""}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-4">
                      {/* State Dropdown */}
                      <select
                        className={`form-select input form-control custom-input mb-3 ${showError("state") ? "is-invalid" : ""}`}
                        value={formData.state}
                        name="state"
                        onChange={handleChange}
                        style={{
                          color: formData.state ? "#212529" : "#be004f",
                          fontSize: formData.state ? "16px" : "14px",
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
                          {errors.state}
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <select
                        className={`form-select bg-transparent input form-control custom-input mb-3 ${showError("suburb") ? "is-invalid" : ""}`}
                        value={formData.suburb}
                        name="suburb"
                        onChange={handleChange}
                        disabled={!formData.state || cities.length === 0}
                        style={{
                          color: formData.suburb ? "#212529" : "#be004f",
                          fontSize: formData.suburb ? "16px" : "14px",
                        }}
                      >
                        <option value="">
                          {cities.length === 0
                            ? "Select State first"
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
                          {errors.suburb}
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <InputBox
                        label="Postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        error={showError("postcode") ? errors.postcode : ""}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="group position-relative mb-3">
                        <select
                          className={`form-control custom-input input rounded-0 ${showError("homeCareStatus") ? "is-invalid" : ""}`}
                          id="homeCareStatus"
                          name="homeCareStatus"
                          value={formData.homeCareStatus}
                          onChange={handleChange}
                          style={{
                            color: formData.homeCareStatus
                              ? "#212529"
                              : "#be004f",
                            fontSize: formData.homeCareStatus ? "16px" : "14px",
                          }}
                        >
                          <option value="" disabled hidden>
                            Care/ Support Package status:
                          </option>
                          <option value="not_applied">Not Applied</option>
                          <option value="pending">Pending Approval</option>
                          <option value="approved">Approved</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <span className="highlight"></span>
                        <span className="bar position-relative d-block"></span>
                        {showError("homeCareStatus") && (
                          <div className="text-danger text-start mt-1">
                            {errors.homeCareStatus}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="group position-relative mb-3">
                        <select
                          className={`form-control custom-input input rounded-0 ${showError("programType") ? "is-invalid" : ""}`}
                          id="programType"
                          name="programType"
                          value={formData.programType}
                          onChange={handleChange}
                          style={{
                            color: formData.programType ? "#212529" : "#be004f",
                            fontSize: formData.programType ? "16px" : "14px",
                          }}
                        >
                          <option value="" disabled hidden>
                            What type of program or package you are referring
                            to?
                          </option>
                          <option value="NDIS">NDIS</option>
                          <option value="Support at home">
                            Support at home
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        <span className="highlight"></span>
                        <span className="bar position-relative d-block"></span>
                        {showError("programType") && (
                          <div className="text-danger text-start mt-1">
                            {errors.programType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="group position-relative mb-3">
                        <select
                          className={`form-control custom-input input rounded-0 ${showError("preferredContactTime") ? "is-invalid" : ""}`}
                          id="preferredContactTime"
                          name="preferredContactTime"
                          value={formData.preferredContactTime}
                          onChange={handleChange}
                          style={{
                            color: formData.preferredContactTime
                              ? "#212529"
                              : "#be004f",
                            fontSize: formData.preferredContactTime
                              ? "16px"
                              : "14px",
                          }}
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
                        <span className="highlight"></span>
                        <span className="bar position-relative d-block"></span>
                        {showError("preferredContactTime") && (
                          <div className="text-danger text-start mt-1">
                            {errors.preferredContactTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <TextBox
                    label="Contact Details"
                    name="contactDetails"
                    value={formData.contactDetails}
                    onChange={handleChange}
                    error={showError("contactDetails") ? errors.contactDetails : ""}
                  />

                  <TextBox
                    label="Additional Notes or Specific Requirements"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    error={false}
                  />

                  {/* reCAPTCHA + Submit */}
                  <div className="row align-items-center g-3 my-3">
                    {/* Left: reCAPTCHA */}
                    <div className="col-12 col-md-6">
                      <div className="d-flex d-md-block justify-content-center">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6LdsrrYrAAAAANlNnYAS0kC-tWgHlRBKF97lDgyx"
                          onChange={handleRecaptchaChange}
                        />
                      </div>

                      {showError("recaptcha") && (
                        <div className="text-danger text-center text-md-start mt-2">
                          {errors.recaptcha}
                        </div>
                      )}
                    </div>

                    {/* Right: Submit button */}
                    <div className="col-12 col-md-6">
                      <div className="text-center text-md-end mt-2 mt-md-0">
                        <GlobalButton
                          type="submit"
                          text={isSubmitting ? "Submitting..." : "Submit"}
                          variant="buttonv1 fw-semibold"
                          disabled={isSubmitting || !recaptchaVerified}
                        />
                      </div>
                    </div>
                  </div>

                  {submitted && Object.keys(errors).length > 0 && (
                    <div className="text-danger mt-3">
                      Please correct the errors above to continue.
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {!submitSuccess && (
        <div className="rounded-4 mt-5">
          {/* First row - navigation buttons */}
          <div className="d-flex justify-content-between align-items-center">
            {currentStep === 1 && !videoClosed ? (
              // Show CLOSE instead of Prev when video is showing
              <button
                className="dark-text border-danger border-3 rounded-3 d-flex align-items-center gap-2 px-3 py-1"
                onClick={() => {
                  setShowModal(false);
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                }}
              >
                Close
              </button>
            ) : currentStep > 1 || (currentStep === 1 && videoClosed) ? (
              // Show Prev normally
              <button
                className="dark-text border-danger border-3 rounded-3 d-flex align-items-center gap-2 px-3 py-1 fs-5"
                onClick={handlePrev}
              >
                <i className="bi bi-chevron-left"></i> Prev
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                className="dark-text border-danger border-3 rounded-3 p-2 d-flex align-items-center gap-2 fs-5"
                onClick={handleNext}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            ) : (
              <div></div> // Space filler
            )}
          </div>

          {/* Second row - call us section (only for step 3) */}
          {currentStep === 3 && !submitSuccess && (
            <div className="d-flex justify-content-center justify-content-md-end align-items-center text-start gap-4 mt-3 mt-md-2">
              Alternatively, call us for <br />
              further details
              <a
                href="tel:1300 845 766"
                className="btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 py-2 px-3 position-relative fw-bold"
              >
                1300 845 766
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;