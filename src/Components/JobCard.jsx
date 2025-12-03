import React, { useState, useRef, useEffect } from "react";
import GlobalButton from "./Button";
import CareerModal from "./CareerModal";

const JobCard = ({ title, time, sector, description, requirements }) => {
  // const [showDetails, setShowDetails] = useState(false);

  // const contentRef = useRef(null);
  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   if (showDetails) {
  //     setHeight(contentRef.current.scrollHeight);
  //   } else {
  //     setHeight(0);
  //   }
  // }, [showDetails]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  return (
    <>
      <div className="card custom-border rounded-4 p-3 d-flex flex-column h-100">
        <div className="card-body text-start d-flex flex-column flex-grow-1">
          <div>
            <span className="text-uppercase badge p-2 dark-text mb-3">
              {sector}
            </span>
          </div>
          <h5 className="card-title heading dark-text fw-semibold">{title}</h5>
          <p className="card-text small">{time}</p>
          <div className="job-details-wrapper">
            <div className="job-details-content">
              <p className="mt-3">{description}</p>
              {requirements && requirements.length > 0 && (
                <ul>
                  {requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-auto d-flex justify-content-start align-items-center">
            <GlobalButton text="Apply Now" variant="buttonv1" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 overflow-auto py-5"
          style={{ zIndex: 1050 }}
        >
          <CareerModal
            setShowModal={setShowModal}
            modalRef={modalRef}
            videoRef={videoRef}
            jobTitle={title}  
          />
        </div>
      )}
    </>
  );
};

export default JobCard;
