import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NewsletterSection from "../Components/Newsletter";
import heroImg from "../assets/11.png";
import middleImg from "../assets/DSC00770.jpg";

import { leftData, rightData, seoData, servicesData } from "../Constants/Data";
import GlobalButton from "../Components/Button";
import ServiceDetails from "../Components/ServiceDetails";
import SeoHead from "../Components/SeoHead";

export default function Services() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("facility");

  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const detailsSectionRef = useRef(null);

  useEffect(() => {
    if (showDetails && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [showDetails, selectedService]);

  const handleLearnMoreClick = (service) => {
    const isSameService = selectedService?.title === service.title;

    setSelectedService(isSameService ? selectedService : service);
    setShowDetails(isSameService ? !showDetails : true);

    // Scroll to details after state updates
    setTimeout(() => {
      if (!isSameService && detailsSectionRef.current) {
        const offset = -100; // Adjust this value as needed
        const elementPosition =
          detailsSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const updateSlidesToShow = useCallback(() => {
    if (window.innerWidth <= 480) {
      setSlidesToShow(1);
    } else if (window.innerWidth <= 768) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(4);
    }
  }, []);

  const [showModal, setShowModal] = useState(null);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const renderServiceDetails = (service) => {
    // Filter features based on active tab for specific services
    let filteredFeatures = service.features;
    
    if (activeTab === "facility") {
      if (service.title === "NDIS Support Services") {
        // For NDIS services in facility tab, exclude the last two features
        filteredFeatures = service.features.slice(0, -2);
      } else if (service.title === "Support At Home") {
        // For Support At Home in facility tab, exclude Domestic Assistance, Meal Preparation, and Home & Garden Maintenance
        filteredFeatures = service.features.filter(
          feature => 
            feature.subservice !== "Domestic Assistance" &&
            feature.subservice !== "Meal Preparation" && 
            feature.subservice !== "Home & Garden Maintenance"
        );
      }
       else if (service.title === "Private Self-Funded Care") {
        // For Support At Home in facility tab, exclude Domestic Assistance, Meal Preparation, and Home & Garden Maintenance
        filteredFeatures = service.features.filter(
          feature => 
            feature.subservice !== "Domestic Assistance" &&
            feature.subservice !== "Meal Preparation" && 
            feature.subservice !== "Home Maintenance"
        );
      }
    } else if (activeTab === "home" && service.title === "Support At Home") {
      // For Support At Home in home tab, exclude only the "Care & Case Management" feature
      filteredFeatures = service.features.filter(
        feature => feature.subservice !== "Care & Case Management"
      );
    }

    const { details } = service;

    return (
      <>
        <SeoHead {...seoData.services} />

        <div className="job-details-content row">
          <div className="col-md-6 mb-3 mb-md-0">
            <img
              src={details?.subImage}
              alt="About"
              className="img-fluid"
              style={{ height: "300px" }}
            />
          </div>
          <div className="col-md-6 text-start">
            <h5 className="dark-text fw-bold">{details?.subHeading}</h5>
            {details?.subDescriptions?.map((desc, idx) => (
              <p key={idx}>{desc}</p>
            ))}

            <ul className="list-unstyled">
              {details?.subList?.map((item, idx) => (
                <li key={idx} className="gap-2 d-flex">
                  <i className="bi bi-record2 dark-text"></i> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {filteredFeatures?.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3 mb-3">
              <div className="card border-0 p-3 h-100" id="heroCarousel">
                <h5 className="dark-text fw-bold mb-3">{feature.subservice}</h5>
                <ul className="list-unstyled text-start">
                  {feature.servicesList.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-start mb-1">
                      <i className="bi bi-record2 dark-text me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center">
            <GlobalButton
              text="GET STARTED"
              variant="buttonv2 dark-text"
              onClick={() => setShowModal(service?.title)}
            />
          </div>
        </div>

        {showModal && selectedService?.title === service?.title && (
          <div
            className="modal-backdrop d-flex justify-content-center align-items-start position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 overflow-auto py-5"
            style={{ zIndex: 1050 }}
          >
            <ServiceDetails
              setShowModal={setShowModal}
              modalRef={modalRef}
              videoRef={videoRef}
              selectedCareTitle={service?.title}
              selectedCareOptions={filteredFeatures}
              activeTab={activeTab}
            />
          </div>
        )}
      </>
    );
  };

  const handleFirstClick = () => {
    setActiveTab("facility");
    setShowDetails(false);
    setSelectedService(null);
  };

  const handleSecondClick = () => {
    setActiveTab("home");
    setShowDetails(false);
    setSelectedService(null);
  };

  return (
    <>
      <SeoHead {...seoData.services} />

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section className="py-5 mt-5" id="heroCarousel">
          <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="container">
              <div className="row align-items-center">
                {/* Left: Text Content */}
                <div className="col-md-6 text-white text-center text-md-start">
                  <p className="fs-4 fw-bold dark-text">TAILORED SERVICES</p>
                  <h1 className="fw-bold text-dark heading display-3">
                    Comprehensive{" "}
                    <span className="dark-text">
                      {" "}
                      Aged and Disability Care Services{" "}
                    </span>{" "}
                    Tailored to Your Needs
                  </h1>
                  <p className="lead text-dark">
                    Personalised Aged and Disability care tailored to uphold independence,
                    dignity and comfort.
                  </p>
                </div>

                {/* Right: Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={heroImg}
                    alt="Care Image"
                    className="img-fluid rounded-5 w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className="bg-white py-5">
          <div className="container text-center py-5">
            <small className="text-uppercase dark-text fw-semibold">
              OUR SERVICES
            </small>
            <h1 className="heading fw-bold">
              Dignity, <span className="dark-text">Comfort & Support</span> for{" "}
              <br />
              Every Stage of Life
            </h1>

            <div className="d-flex justify-content-center my-4">
              <div className="d-flex gap-4 px-3 flex-wrap justify-content-center">
                <button
                  className={`social-icon rounded global p-3 fw-bold ${
                    activeTab === "facility" ? "icon-bg text-white" : "bg-light"
                  }`}
                  onClick={handleFirstClick}
                >
                  Aged & Disability Care Facility
                </button>

                <button
                  className={`social-icon rounded global p-3 fw-bold ${
                    activeTab === "home" ? "icon-bg text-white" : "bg-light"
                  }`}
                  onClick={handleSecondClick}
                >
                  At Your Home or at Your Preferred Setting
                </button>
              </div>
            </div>

            <p>Choose one of our care options:</p>

            <div className="position-relative">
              <div className="row mt-5 d-flex justify-content-center align-items-stretch">
                {(activeTab === "facility" 
                  ? servicesData 
                  : servicesData.filter(service => service.title !== "Residential Services")
                ).map((service, index) => (
                  <React.Fragment key={index}>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                      <div
                        className={`card service-card shadow-sm rounded-4 p-3 d-flex flex-column h-100 card-content position-relative overflow-hidden ${
                          selectedService?.title === service.title
                            ? "selected-card"
                            : ""
                        }`}
                      >
                        <div className="image-wrapper overflow-hidden position relative">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="card-img-top rounded-4 service-image w-100 object-fit-cover"
                            style={{ height: "200px" }}
                          />
                        </div>
                        <div className="card-body d-flex flex-column flex-grow-1 overflow-hidden">
                          <h5 className="card-title heading dark-text fw-semibold">
                            {service.title}
                          </h5>
                          <p className="card-text small service-description">
                            {service.description}
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleLearnMoreClick(service)}
                            className="btn btn-link dark-text text-decoration-underline p-0"
                            style={{ cursor: "pointer" }}
                            aria-expanded={
                              showDetails &&
                              selectedService?.title === service.title
                            }
                          >
                            Learn More{" "}
                            <i
                              className={`bi ${
                                showDetails &&
                                selectedService?.title === service.title
                                  ? "bi-caret-up-fill"
                                  : "bi-caret-down-fill"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile View Details Below Card */}
                    <div className="col-12 d-block d-md-none">
                      {showDetails &&
                        selectedService?.title === service.title && (
                          <div className="job-details-wrapper bg-light border rounded-3 p-3 mb-4">
                            {renderServiceDetails(service)}
                          </div>
                        )}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Desktop View Details Below All Cards */}
              <div
                ref={detailsSectionRef}
                className="d-none d-md-block mt-4"
              >
                <div
                  ref={contentRef}
                  className={`job-details-wrapper ${
                    showDetails ? "bg-light border rounded-3 p-4" : ""
                  }`}
                  style={{
                    maxHeight: `${height}px`,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out",
                  }}
                >
                  {showDetails &&
                    selectedService &&
                    renderServiceDetails(selectedService)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose us  */}
        <section className="py-5" id="heroCarousel">
          <div className="container">
            <div className="row mb-5">
              <small className="text-uppercase dark-text fw-semibold mb-2">
                WHY CHOOSE US
              </small>
              <h1 className="heading fw-semibold">
                Helping You Live <span className="dark-text">Comfortably</span>{" "}
                and <br /> <span className="dark-text">Confidently</span>
              </h1>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
              {/* Left Section */}
              <div className="col-lg-3 col-12">
                <div className="row">
                  {leftData.map((service, index) => (
                    <div key={index} className="col-md-12 mb-4">
                      <div className="card service-card shadow-sm rounded-4 p-3 d-flex flex-column h-100">
                        <i className={`fs-1 dark-text ${service.icon}`}></i>
                        <div className="card-body d-flex flex-column flex-grow-1">
                          <h5 className="card-title heading dark-text fw-semibold">
                            {service.title}
                          </h5>
                          <p className="card-text small">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Section - Image */}
              <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center p-3 rounded-5 bg-light shadow">
                <img
                  src={middleImg}
                  alt="Care Image"
                  className="img-fluid rounded-5 w-100"
                  style={{ objectFit: "cover", height: "700px" }}
                />
              </div>

              {/* Right Section */}
              <div className="col-lg-3 col-12">
                <div className="row">
                  {rightData.map((service, index) => (
                    <div key={index} className="col-md-12 mb-4">
                      <div className="card service-card shadow-sm rounded-4 p-3 d-flex flex-column h-100">
                        <i className={`fs-1 dark-text ${service.icon}`}></i>
                        <div className="card-body d-flex flex-column flex-grow-1">
                          <h5 className="card-title heading dark-text fw-semibold">
                            {service.title}
                          </h5>
                          <p className="card-text small">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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