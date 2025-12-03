import React, { useState, useRef, useEffect } from "react";
import GlobalButton from "./Button";
import ServiceDetails from "./ServiceDetails";

const Servicecard = ({
  image,
  title,
  description,
  options,
  filteredOptions,
}) => {
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

  return (
    <>
      <div className="card shadow-sm rounded-4 p-3 border-0 d-flex flex-column h-100 service-card card-content position-relative overflow-hidden">
        <div className="image-wrapper overflow-hidden position relative">
          <img
            src={image}
            alt={title}
            className="card-img-top rounded-4 service-image w-100 object-fit-cover"
          />
        </div>

        <div className="card-body d-flex flex-column flex-grow-1 overflow-hidden">
          <h5 className="card-title heading dark-text fw-semibold">{title}</h5>
          <p className="card-text small service-description">{description}</p>
        </div>
        <div className="card-footer border-0 bg-transparent d-flex justify-content-center">
          <GlobalButton
            text="GET STARTED"
            variant="buttonv2 dark-text"
            onClick={() => setShowModal(title)}
          />
        </div>
      </div>

      {showModal && (
        <div
          className="modal-backdrop d-flex justify-content-center pt-5 align-items-start position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 overflow-auto py-5"
          style={{ zIndex: 1050 }}
        >
          <ServiceDetails
            setShowModal={setShowModal}
            modalRef={modalRef}
            videoRef={videoRef}
            selectedCareTitle={showModal} // Pass selected title
            selectedCareOptions={filteredOptions || options}
          />
        </div>
      )}
    </>
  );
};

export default Servicecard;
