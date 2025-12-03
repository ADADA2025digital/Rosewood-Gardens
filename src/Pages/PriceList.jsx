import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import GlobalButton from "../Components/Button";
import {
  pricelistPageData,
  faqsupportdata,
  features,
  servicesData,
} from "../Constants/Data";
import Hero from "../assets/DSC01424.jpg";
import Logo from "../assets/logo.png";
import NewsletterSection from "../Components/Newsletter";
import ServiceDetails from "../Components/ServiceDetails";
import { useNavigate } from "react-router-dom";

export default function PriceList() {
  const navigate = useNavigate();

  const scrollToServices = () => {
    navigate("/?scrollTo=services");
  };

  // Split features array in half
  const half = Math.ceil(features.length / 2);
  const left = features.slice(0, half);
  const right = features.slice(half);

  // Single-open accordion - track only one open ID at a time
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
  // Function to handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>
          Price List | Rosewood Gardens | Compassionate Aged & Disability Care
          in Sydney & Melbourne
        </title>
        <meta
          name="description"
          content="Rosewood Gardens provides trusted Support at Home, NDIS and Home Care Package services across Ashburton, Melbourne, Burwood, East Malvern, and Sydney. Compassionate aged and disability support tailored to your needs."
        />
        <meta
          name="keywords"
          content="Price List, Support at Home provider Melbourne, Support at Home provider Sydney, Home Care Package provider Ashburton, Home Care Package provider Melbourne, NDIS provider Ashburton, NDIS provider Burwood, NDIS provider East Malvern, NDIS provider Melbourne, NDIS Support Coordination Ashburton, NDIS Support Coordination Melbourne, NDIS Supported Independent Living Melbourne, NDIS Supported Independent Living Ashburton, Private aged care residence Ashburton, Supported Residential Service Ashburton, Support at Home NSW and VIC, Complex and High Intensity NDIS support services, Home Care Package Sydney, Home Care Package Melbourne, Support at Home Western Suburbs Sydney"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.rosewoodgardens.com.au" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Price List | Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
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
          content="Price List | Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
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
          <div className="d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row align-items-center">
                {/* Left: Text Content */}
                <div className="col-md-6 text-white text-center text-md-start">

                  <h1 className="fw-bold text-dark heading display-3">
                    Live well at home or at{" "}
                    <span className="dark-text"> Rosewood Gardens </span>
                  </h1>
                  <p className="text-dark">
                    The new Support at Home Program is now live from 1 November
                    2025. It replaces the Home Care Packages system, making it
                    easier for older Australians to access the right mix of care
                    and services with clarity and simplicity.
                  </p>
                </div>

                {/* Right: Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center mt-4 mt-md-0">
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

        {/* Price List Section */}
        <section className="py-5 testimonal">
          <div className="container">
            <h2 className="text-center dark-text heading fw-bold mb-1">
              Support at Home - Price List
            </h2>
            <p className="text-center text-muted mb-4">
              Effective November 2025
            </p>

            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="row g-3 justify-content-center">
                  {pricelistPageData.map((sec, idx) => (
                    <div
                      className={`col-12 col-md-6 ${
                        idx < 3 ? "order-1" : "order-2"
                      }`}
                      key={idx}
                    >
                      <div className="card rounded-4 border-0 shadow-sm h-100 mx-auto">
                        <div className="card-body">
                          <h6 className="fw-semibold dark-text text-center mb-3">
                            {sec.title}
                          </h6>

                          <div className="table-scroll rounded-3">
                            <table className="table table-sm align-middle mb-0">
                              <thead>
                                <tr className="table-rose">
                                  <th className="small fw-semibold text-start">
                                    Service
                                  </th>
                                  <th className="small fw-semibold text-end">
                                    Price
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {sec.rows.map((r, i) => (
                                  <tr key={i} className="row-divider">
                                    <td className="small text-start">
                                      {r.service}
                                    </td>
                                    <td className="small text-end fw-semibold">
                                      {r.price}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-4">
              <div className="col-lg-8">
                <p className="text-center text-muted mb-0">
                  For any service provided after hours, weekends, or public
                  holidays, standard approved loading in line with the
                  Australian Government Support at Home pricing schedule will
                  apply. Final charges may vary by booking.
                </p>
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
                <h3 className="fw-bold heading dark-text mb-4 text-center text-md-start">
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
            <div className="row mt-4">
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
