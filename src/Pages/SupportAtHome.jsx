// src/Pages/SupportAtHome.jsx
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalButton from "../Components/Button";
import NewsletterSection from "../Components/Newsletter";
import ServiceDetails from "../Components/ServiceDetails";

import {
  categories,
  classificationsItems,
  contributions,
  faqsupportdata,
  features,
  howItWorks,
  pathways,
  pricingLeft,
  pricingRight,
  tablesections,
  servicesData,
} from "../Constants/Data";

import Hero from "../assets/21.png";
import careathome from "../assets/serv2-sub1.jpg";
import careatrosewood from "../assets/DSC00957.jpg";
import ATHM from "../assets/serv2-sub5.jpg";

import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

export default function SupportAtHome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const scrollToServices = () => {
    navigate("/?scrollTo=services");
  };

  // Split features array in half
  const half = Math.ceil(features.length / 2);
  const left = features.slice(0, half);
  const right = features.slice(half);

  // Single-open accordion - track only one open ID at a time (Support at Home FAQs)
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  // Get Support At Home data from servicesData
  const supportAtHomeData = servicesData.find(
    (service) => service.title === "Support At Home"
  );
  const supportAtHomeOptions = supportAtHomeData
    ? supportAtHomeData.features
    : [];

  // Lock / unlock body scroll when modal opens
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

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // 🔎 IDs that belong to this page (must match the ids we add in JSX below)
  const SUPPORT_HOME_SECTION_IDS = [
    "support-home-hero",
    "support-home-care-at-home",
    "support-home-care-at-rosewood",
    "support-home-categories",
    "support-home-how-it-works",
    "support-home-at-hm",
    "support-home-pathways",
    "support-home-contributions",
    "support-home-price-list",
    "support-home-faq",
    "support-home-cta",
  ];

  // 🔎 Handle ?search=... → scroll to the right section on this page
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    // Fuzzy match if not found directly (e.g., "support at home price list")
    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    // Only scroll if this keyword maps to a Support at Home section
    if (!targetId || !SUPPORT_HOME_SECTION_IDS.includes(targetId)) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    setTimeout(() => {
      const HEADER_HEIGHT = 180; // adjust if your fixed header height changes
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
      <Helmet>
        {/* Basic SEO */}
        <title>
          Support at Home | NDIS & Home Care Providers in Melbourne & Sydney |
          Rosewood Gardens
        </title>
        <meta
          name="description"
          content="Rosewood Gardens provides trusted Support at Home, NDIS and Home Care Package services across Ashburton, Melbourne, Burwood, East Malvern, and Sydney. Compassionate aged and disability support tailored to your needs."
        />
        <meta
          name="keywords"
          content="Support at Home provider Melbourne, Support at Home provider Sydney, Home Care Package provider Ashburton, Home Care Package provider Melbourne, NDIS provider Ashburton, NDIS provider Burwood, NDIS provider East Malvern, NDIS provider Melbourne, NDIS Support Coordination Ashburton, NDIS Support Coordination Melbourne, NDIS Supported Independent Living Melbourne, NDIS Supported Independent Living Ashburton, Private aged care residence Ashburton, Supported Residential Service Ashburton, Support at Home NSW and VIC, Complex and High Intensity NDIS support services, Home Care Package Sydney, Home Care Package Melbourne, Support at Home Western Suburbs Sydney"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.rosewoodgardens.com.au" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Support at Home | NDIS & Home Care Providers in Melbourne & Sydney | Rosewood Gardens"
        />
        <meta
          property="og:description"
          content="Rosewood Gardens provides trusted Support at Home, NDIS and Home Care Package services across Ashburton, Melbourne, Burwood, East Malvern, and Sydney. Compassionate aged and disability support tailored to your needs."
        />
        <meta
          property="og:url"
          content="https://www.rosewoodgardens.com.au/support-at-home"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
        />
        {/* Facebook  */}
        <meta property="fb:app_id" content="#" />
        <meta
          property="fb:admins"
          content="https://www.facebook.com/rosewoodgardensac"
        />

        {/* Instagram */}
        <meta
          name="instagram:title"
          content="Support at Home | NDIS & Home Care Providers in Melbourne & Sydney"
        />
        <meta
          name="instagram:description"
          content="Rosewood Gardens — providing personalised Support at Home and NDIS services in Melbourne, Sydney, and Ashburton."
        />
        <meta
          name="instagram:image"
          content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
        />
        <meta name="instagram:site" content="@rosewoodgardensau" />
      </Helmet>

      <div className="container-fluid px-0 py-5 mt-5">
        {/* Hero Section */}
        <section className="py-5" id="heroCarousel">
          <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="container">
              <div className="row align-items-center">
                {/* Left: Text Content */}
                <div className="col-md-6 text-white text-center text-md-start">
                  <p className="fs-4 fw-bold dark-text">
                    Rosewood Gardens • Support at Home
                  </p>
                  <h1
                    className="fw-bold text-dark heading display-3"
                    id="support-home-hero"
                  >
                    Live well at home or at{" "}
                    <span className="dark-text"> Rosewood Gardens </span>
                  </h1>
                  <p className="text-dark">
                    The new Support at Home Program is now live from 1 November
                    2025. It replaces the Home Care Packages system, making it
                    easier for older Australians to access the right mix of care
                    and services with clarity and simplicity.
                  </p>
                  <div className="d-flex flex-md-row flex-column justify-content-center justify-content-md-start mt-4 gap-4">
                    <GlobalButton
                      text="Explore Our Services"
                      className="py-3 text-uppercase"
                      onClick={scrollToServices}
                    />
                    <GlobalButton
                      text="Contact Us"
                      href="/contact-us"
                      className="py-3 text-uppercase"
                    />
                  </div>
                </div>

                {/* Right: Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={Hero}
                    alt="Care Image"
                    className="img-fluid rounded-5 w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Care Options Section */}
        <section className="py-5">
          <div className="container p-md-0">
            <div className="row g-4">
              <div
                className="col-12 col-md-6"
                id="support-home-care-at-home"
              >
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 p-3">
                  <img
                    src={careathome}
                    alt="Care in your own home"
                    className="card-img-top object-fit-cover rounded-4"
                    style={{ height: 280 }}
                  />
                  <div className="card-body py-4 d-flex flex-column text-center text-md-start p-0">
                    <h5 className="fw-semibold heading dark-text mb-2">
                      Care in your own home
                    </h5>
                    <p className="text-dark mb-0">
                      Receive Support at Home services where you feel most
                      comfortable — in the familiar surroundings of your own
                      home. Our team comes to you with nursing, personal care,
                      domestic assistance, and more.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-12 col-md-6"
                id="support-home-care-at-rosewood"
              >
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 p-3">
                  <img
                    src={careatrosewood}
                    alt="Care at Rosewood Gardens"
                    className="card-img-top object-fit-cover rounded-4"
                    style={{ height: 280 }}
                  />
                  <div className="card-body py-4 d-flex flex-column p-0 text-center text-md-start">
                    <h5 className="heading dark-text fw-semibold mb-2">
                      Care at Rosewood Gardens
                    </h5>
                    <p className="text-dark mb-0">
                      Enjoy short stays, respite, therapy, or community
                      connection within our welcoming Rosewood Gardens facility.
                      The same compassionate team, transparent pricing, and
                      personalised attention — just in a different setting.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories Section */}
        <section className="py-5 testimonal">
          <div className="container p-md-0">
            <h3
              className="fw-bold heading dark-text mb-2 text-center text-md-start"
              id="support-home-categories"
            >
              Support at Home Service Categories
            </h3>
            <p className="text-dark mb-5 text-center text-md-start">
              To keep things simple, your services are grouped into three
              easy-to-understand categories. Together, they cover your health,
              independence, and day-to-day living.
            </p>

            <div className="row g-3 mb-4">
              {categories.map((item, index) => (
                <div className="col-12 col-md-4" key={index}>
                  <div className="card rounded-4 border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column align-items-center align-items-md-start text-center text-md-start">
                      <span className="fs-4 mb-2">{item.icon}</span>
                      <h6 className="fw-semibold heading dark-text mb-2">
                        {item.title}
                      </h6>
                      <p className="mb-0 text-dark">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* How It Works Section */}
            <div
              className="rounded-4 p-4 shadow-sm"
              id="support-home-how-it-works"
              style={{ background: "#ffd9de" }}
            >
              <h5 className="fw-bold text-center text-md-start dark-text heading mb-3">
                How Support at Home Works
              </h5>
              <div className="row g-3">
                {howItWorks.map((item, index) => (
                  <div className="col-12 col-md-4" key={index}>
                    <div className="card rounded-4 border-0 shadow-sm h-100">
                      <div className="card-body text-center text-md-start">
                        <h6 className="fw-semibold mb-2 heading dark-text">
                          {item.title}
                        </h6>
                        <p className="text-dark mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Assistive Technology Section */}
        <section className="py-5">
          <div className="container p-md-0 text-center text-md-start">
            <h3
              className="fw-bold heading dark-text mb-2"
              id="support-home-at-hm"
            >
              Assistive Technology & Home Modifications (AT-HM)
            </h3>
            <p className="text-dark mb-1">
              Access a dedicated funding pool for equipment and home
              modifications that help you stay independent and safe.
            </p>
            <p className="text-dark mb-4">
              Our team supports you through assessments, quotes, and
              installation - all integrated into your care plan, so everything
              feels coordinated and simple.
            </p>

            <div className="rounded-4 overflow-hidden shadow-sm mb-4">
              <img
                src={ATHM}
                alt="Assistive Technology at home"
                className="w-100 object-fit-cover"
                style={{ height: 450 }}
              />
            </div>

            <h4
              className="fw-bold heading dark-text mb-3"
              id="support-home-pathways"
            >
              Short-Term Pathways
            </h4>
            <div className="row g-3">
              {pathways.map((p, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <div className="card rounded-4 border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h6 className="fw-semibold mb-1">{p.title}</h6>
                      <p className="text-dark mb-0">{p.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose & Contributions Section */}
        <section className="pb-5">
          <div className="container p-md-0">
            {/* Contributions Section */}
            <div
              className="card rounded-4 border-0 shadow-sm"
              id="support-home-contributions"
            >
              <div className="card-body text-center text-md-start">
                <h5 className="fw-bold heading dark-text mb-3">
                  Support at Home - Contributions
                </h5>
                <p className="text-dark">
                  Under the Support at Home program, participant contributions
                  are set by the Australian Government. You only contribute
                  towards services you actually receive, and your contribution
                  percentage is based on the type of service and what you can
                  afford.
                </p>

                <div className="row g-3">
                  {contributions.map((c, i) => (
                    <div className="col-12 col-md-4" key={i}>
                      <div className="h-100 bg-white border rounded-4 p-3">
                        <div className="d-flex flex-column align-items-center align-items-md-start mb-1">
                          <span className="fw-semibold">{c.tag}</span>
                          <span className="badge dark-text border small fw-semibold my-2">
                            {c.badge}
                          </span>
                        </div>
                        <p className="text-dark mb-0">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-dark mt-3 mb-0">
                  Exact contribution percentages, lifetime caps and any hardship
                  arrangements are determined by the Government. Your Care
                  Manager can help you understand what this means for you and
                  your budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Price List Section */}
        <section
          className="py-5 testimonal"
          id="support-home-price-list"
        >
          <div className="container">
            {/* CTA Section */}
            <div className="row mt-4 justify-content-center">
              <div className="col-12 col-lg-8 text-center">
                <h5 className="mb-0 text-dark">
                  To view detailed pricing for all Rosewood Garden Support at
                  Home services and make <br />
                  an informed decision about your care needs, please use the
                  button below.
                </h5>

                <div className="d-flex justify-content-center mt-4 gap-2">
                  <a
                    href="/support-at-home-price-list"
                    target="_blank"
                    className="btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 position-relative fw-bold px-4 py-2"
                  >
                    Click here to view the Price List
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & CTA Section */}
        <section className="py-5">
          <div className="container px-3 px-md-4 text-center text-md-start">
            {/* FAQ Section */}
            <div className="row py-3 py-md-5">
              <div className="col-12">
                <h3
                  className="fw-bold heading dark-text mb-4 text-center text-md-start"
                  id="support-home-faq"
                >
                  Support at Home – FAQs
                </h3>

                {faqsupportdata.map((item) => {
                  const id = item.id;
                  const isOpen = openId === id;

                  return (
                    <div key={id} className="mb-3 p-0">
                      <button
                        type="button"
                        onClick={() => toggleFaq(id)}
                        className={`w-100 border d-flex justify-content-between align-items-start px-4 py-3 bg-light flex-nowrap ${
                          isOpen ? "border-bottom-0 rounded-top-3" : "rounded-3"
                        }`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${id}`}
                      >
                        <span className="fw-medium text-start flex-grow-1 me-3 text-wrap">
                          {item.question}
                        </span>

                        <span className="faq-icon d-flex align-items-center justify-content-center flex-shrink-0">
                          <i
                            className={`bi ${
                              isOpen
                                ? "bi-x-circle-fill"
                                : "bi-plus-circle-fill"
                            } fs-4 dark-text`}
                          />
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={`faq-panel-${id}`}
                          className="px-3 px-md-4 pb-3 border border-top-0 text-start rounded-bottom bg-light"
                        >
                          {item.answer && (
                            <p
                              className="text-muted mb-2"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {item.answer}
                            </p>
                          )}
                          {item.list?.length > 0 && (
                            <ul className="text-muted ps-3 mb-0">
                              {item.list.map((point, liIdx) => (
                                <li key={liIdx}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="row mt-4" id="support-home-cta">
              <div className="col-12">
                <div
                  className="rounded-4 shadow-sm px-3 px-md-4 px-lg-5 py-3 py-md-4"
                  style={{ background: "#ffd9de" }}
                >
                  <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
                    <div className="text-center text-lg-start">
                      <h6 className="fw-bold heading dark-text mb-2">
                        Ready to get started?
                      </h6>
                      <p className="mb-0 text-dark">
                        Book a Care Plan Call and we'll talk through your goals,
                        funding and preferences - then design a personalised
                        Support at Home plan for care at your home or at
                        Rosewood Gardens.
                      </p>
                    </div>

                    <div className="d-flex justify-content-end gap-2 d-lg-flex w-100 w-lg-auto">
                      <a
                        href="tel:1300 845 766"
                        className="btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 position-relative fw-bold px-4 py-2"
                      >
                        Book a Care Plan Call
                      </a>
                      <button
                        onClick={handleOpenModal}
                        className="btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 position-relative fw-bold px-4 py-2"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>

      {/* Service Details Modal */}
      {showModal && (
        <div
          className="modal-backdrop d-flex justify-content-center pt-5 align-items-start position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 overflow-auto py-5"
          style={{ zIndex: 1050 }}
        >
          <ServiceDetails
            setShowModal={setShowModal}
            modalRef={modalRef}
            videoRef={videoRef}
            selectedCareTitle="Support At Home"
            selectedCareOptions={supportAtHomeOptions}
          />
        </div>
      )}
    </>
  );
}
