import React from "react";
import Logo from "../assets/logo.png";
import Partner1 from "../assets/Partner1.png";
import Partner2 from "../assets/Partner2.png";

export default function Footer() {
  return (
    <footer className="container-fluid text-white p-0 w-100 footer">
      <div className="container p-0 p-lg-auto m-0 m-lg-auto">
        {/* First Row */}
        <div className="row mx-0 pb-4">
          <div className="col-12 col-md-4 my-0 my-lg-4 d-flex flex-column text-center text-md-start align-items-center align-items-md-start">
            <div className="row">
              <img
                src={Logo}
                alt="logo"
                style={{ maxWidth: "250px", height: "auto" }}
              />
            </div>

            <p className="text-dark small mt-3">
              At Rosewood Gardens, we deliver Support at Home (in-home aged care
              - HCP) and NDIS supports that let you live life your way - at Home
              or in our Residence or at a Preferred location of your choice
              (e.g. SIL). Our caring team tailors every service to your needs,
              safeguarding independence, dignity, and a safe, supportive
              experience.
            </p>

            <div className="mb-4 d-flex flex-column">
              <img
                src={Partner2}
                alt="Partner logo"
                style={{ height: "50px" }}
              />
              <img
                src={Partner1}
                alt="Partner logo"
                style={{ height: "50px" }}
                className="mt-3"
              />
            </div>
          </div>

          <div className="col-12 col-md-3 my-0 my-lg-4 d-flex flex-column text-center text-md-start align-items-center align-items-md-start">
            <h4 className="my-4 text-dark heading fw-bold">Services</h4>
            <ul className="list-unstyled text-dark lh-lg">
              <li className="mb-2">
                {" "}
                <a href="/services" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>Residential
                  Aged & Disability Care Facility
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>Support at
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>NDIS
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>Private Care
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-2 my-0 my-lg-4 d-flex flex-column text-center text-md-start align-items-center align-items-md-start">
            <h4 className="my-4 text-dark fw-bold heading">Quick Links</h4>
            <ul className="list-unstyled text-dark lh-lg">
              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>Services
                </a>
              </li>
              {/* <li className="mb-2">
                <a href="/services" className="text-decoration-none text-dark">
                  Care Option
                </a>
              </li> */}
              {/* <li className="mb-2">
                <a href="#donate" className="text-decoration-none text-dark">
                  Donate
                </a>
              </li> */}
              {/* <li className="mb-2">
                <a href="/blog" className="text-decoration-none text-dark">
                  <i className="bi bi-chevron-right dark-text"></i>Blog
                </a>
              </li> */}
              <li className="mb-2">
                <a
                  href="/contact-us"
                  className="text-decoration-none text-dark small"
                >
                  <i className="bi bi-chevron-right dark-text"></i>Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/career" className="text-decoration-none text-dark small">
                  <i className="bi bi-chevron-right dark-text"></i>Career
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/privacypolicy"
                  className="text-decoration-none text-dark small"
                >
                  <i className="bi bi-chevron-right dark-text"></i>Privacy
                  Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/term-of-conditions"
                  className="text-decoration-none text-dark small"
                >
                  <i className="bi bi-chevron-right dark-text"></i>Terms &
                  Conditions
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/clinical-disclaimer"
                  className="text-decoration-none text-dark small"
                >
                  <i className="bi bi-chevron-right dark-text"></i>Clinical Disclaimer 
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/accessibility"
                  className="text-decoration-none text-dark small"
                >
                  <i className="bi bi-chevron-right dark-text"></i>Accessibility 
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3 my-0 my-lg-4 d-flex flex-column text-center text-md-start align-items-center align-items-md-start">
            <h4 className="my-4 text-dark heading fw-bold">Contact</h4>
            <ul className="list-unstyled lh-lg">
              <li className="mb-2 text-dark">
                <span className="fw-semibold">Locations</span> <br />
                <ul className="list-unstyled lh-lg">
                  <li>
                    <a
                      href="https://maps.app.goo.gl/LcwwehEMavTHKsf2A"
                      target="_blank"
                      className="text-decoration-none text-dark small"
                    >
                      <i className="bi bi-arrow-right-short dark-text"></i>436
                      Warrigal Road, Ashburton, Vic 3147
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.app.goo.gl/aNbdkRCV5Pi18NtN8"
                      target="_blank"
                      className="text-decoration-none text-dark small"
                    >
                      <i className="bi bi-arrow-right-short dark-text"></i>25
                      Day Road Cheltenham NSW 2119
                    </a>
                  </li>
                </ul>
              </li>

              <li className="mb-2 text-dark">
                <span className="fw-semibold">Phone Number</span> <br />
                <a
                  href="tel:1300 845 766"
                  className="text-decoration-none text-dark small"
                >
                  1300 845 766
                </a>
              </li>

              <li className="mb-2 text-dark">
                <span className="fw-semibold">Email Address</span> <br />
                <a
                  href="mailto:info@rosewoodgardens.com.au"
                  className="text-decoration-none text-dark small"
                >
                  info@rosewoodgardens.com.au
                </a>
              </li>

              {/* <li className="mb-2 text-dark">
                <span className="fw-semibold">Open Hours</span> <br />
                <p className="m-0 small">
                  Mon - Sat: 9:00 AM - 9:00 PM <br />
                  Sun: 9:00 AM - 7:00 PM
                </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row justify-content-between align-items-center py-3">
            <div className="social-icons d-flex justify-content-center align-items-center">
              <a
                href="https://www.facebook.com"
                className="d-flex justify-content-center align-items-center border-0 fs-4 dark-text text-decoration-none rounded-circle social-icon zoom-effect"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.linkedin.com"
                className="d-flex justify-content-center align-items-center border-0 fs-4 dark-text text-decoration-none rounded-circle social-icon zoom-effect"
                aria-label="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href="https://www.instagram.com"
                className="d-flex justify-content-center align-items-center border-0 fs-4 dark-text text-decoration-none rounded-circle social-icon zoom-effect"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
            <div className="col-12 text-center">
              <p className="dark-text fw-bold mb-0">
                © {new Date().getFullYear()} Rosewood Gardens. All right
                reserved.
              </p>
              <p className="small dark-text m-0">Web solution by <a href="https://adada.com.au" target="_blank" className="text-decoration-none dark-text"> ADADA Digital</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
