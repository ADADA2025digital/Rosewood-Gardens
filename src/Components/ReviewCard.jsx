import React from "react";

const ReviewCard = ({ id, name, rating, text, location, image }) => {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="card custom-border rounded-4">
      <div className="card-body align-items-">
        <div className="d-flex align-items-center position-relative py-4">
          <div
            key={id}
            className="col-6 col-lg-2 rounded-circle col-md-6 d-flex justify-content-center p-0"
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "absolute",
              bottom: "5px",
            }}
          >
            <img
              src={image}
              alt={`Testimonial ${id}`}
              className="img-fluid w-100"
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="card-title heading fw-semibold">{name}</h5>
          <span className="dark-text">{stars}</span>
        </div>
        <div className="mt-2 text-start ">
          <p className="card-text">{text}</p>
        </div>
        <div className="dark-text mt-3 text-start subheading">
          <a href="https://www.google.com/search?q=rosewood+gardens+google+review&sca_esv=019a27fe4d8e4bed&sxsrf=AE3TifN29O-fr_Ij4FITFTMt0W5JNL4-nA%3A1753875289787&ei=WQOKaMPiL_Hj2roP2c2fwAI&ved=0ahUKEwiD84LNvuSOAxXxsVYBHdnmBygQ4dUDCBA&uact=5&oq=rosewood+gardens+google+review&gs_lp=Egxnd3Mtd2l6LXNlcnAiHnJvc2V3b29kIGdhcmRlbnMgZ29vZ2xlIHJldmlldzIFECEYoAFIwStQAFjsKXACeAGQAQGYAb0CoAG2LqoBBjItMjMuMbgBA8gBAPgBAZgCGaAC3CyoAhTCAgcQIxgnGOoCwgINEC4YxwEYJxjqAhivAcICDRAjGPAFGCcYyQIY6gLCAhAQABgDGLQCGOoCGI8B2AEBwgIQEC4YAxi0AhjqAhiPAdgBAcICChAjGIAEGCcYigXCAgsQABiABBiRAhiKBcICChAAGIAEGEMYigXCAgsQABiABBixAxiDAcICCxAuGIAEGLEDGIMBwgIOEC4YgAQYsQMY0QMYxwHCAhAQLhiABBixAxhDGIMBGIoFwgIWEC4YgAQYQxjHARiYBRiZBRiKBRivAcICDRAuGIAEGLEDGEMYigXCAgUQABiABMICCBAAGIAEGLEDwgIREC4YgAQYsQMYxwEYjgUYrwHCAhEQLhiABBiRAhjHARiKBRivAcICHBAuGIAEGLEDGEMYxwEYmAUYmQUYigUYngUYrwHCAhAQABiABBixAxhDGMkDGIoFwgIKEC4YgAQYQxiKBcICCxAAGIAEGJIDGIoFwgIQEAAYgAQYsQMYQxiDARiKBcICGRAuGIAEGEMYxwEYmAUYmQUYigUYngUYrwHCAggQLhiABBixA8ICFxAuGIAEGLEDGMcBGJgFGJoFGJ4FGK8BwgIOEC4YgAQYxwEYjgUYrwHCAgsQLhiABBjHARivAcICBhAAGBYYHsICCBAAGKIEGIkFwgIFEAAY7wXCAggQABiABBiiBMICBxAhGKABGArCAgQQIRgVmAME8QVpYg2HmdPrgroGBggBEAEYCpIHCDIuMC4yMC4zoAfA0AGyBwYyLTIwLjO4B9UswgcGNS44LjEyyAc9&sclient=gws-wiz-serp&lqi=Ch5yb3Nld29vZCBnYXJkZW5zIGdvb2dsZSByZXZpZXciBTgBiAEBSKjr7frmgICACFoaEAAQARgAGAEiEHJvc2V3b29kIGdhcmRlbnOSARxzZW5pb3JfY2l0aXplbnNfY2FyZV9zZXJ2aWNlqgE4EAEyHhABIhpLx0uj8lAqOvNvmp31CZym1_HKLbWaTpzD_DIUEAIiEHJvc2V3b29kIGdhcmRlbnM#lkt=LocalPoiReviews&rlimm=13034550148020623189" target="_blank" className="card-text dark-text text-decoration-none">{location}</a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
