import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import FontSizeController from "./FontSizeController";

export default function Header() {
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Navbar fixed on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Close modal on outside click
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // Enter key → go to search results page
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const q = searchQuery.trim();
      
      // Navigate to search results page with query
      navigate(`/search?search=${encodeURIComponent(q)}`);
      
      // Clear search query
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="container-fluid position-relative z-2 p-0">
        {/* TOP BAR */}
        <div className="header navbar-top d-none d-lg-flex align-items-center justify-content-center py-1 transition">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-auto">
                <ul className="list-unstyled d-flex gap-5 m-0">
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt text-white fs-5"></i>
                    <div className="fw-bold">
                      <a
                        className="text-decoration-none text-white small"
                        href="/"
                      >
                        Victoria &amp; NSW
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-telephone text-white fs-5"></i>
                    <div className="text-start fw-bold d-flex flex-column">
                      <a
                        className="text-decoration-none text-white small"
                        href="tel:1300 845 766"
                      >
                        1300 845 766
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope text-white fs-5"></i>
                    <div className="text-start fw-bold d-flex flex-column">
                      <a
                        className="text-decoration-none text-white small"
                        href="mailto:info@rosewoodgardens.com.au"
                      >
                        info@rosewoodgardens.com.au
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-md-auto d-flex align-items-center justify-content-end text-white fw-semibold p-0 gap-3">
                {/* SEARCH BOX - WITHOUT SEARCH BUTTON */}
                <div
                  className="position-relative"
                  style={{ minWidth: "300px" }}
                >
                  <div className="input-group search-box bg-white input-group-sm">
                    <span className="input-group-text border-end-0 bg-white">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search our site..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </div>
                </div>

                <a
                  className="mb-0 px-3 border-light small text-white text-uppercase text-decoration-none"
                  href="/career"
                >
                  Career
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <nav
          className={`navbar navbar-expand-lg bg-white shadow-sm px-4 py-0 ${
            navbarFixed ? "fixed-top shadow-sm" : ""
          }`}
        >
          <div className="container px-0 py-3 py-lg-0">
            <div className="d-md-flex align-items-center p-0">
              <a
                className="navbar-brand d-flex flex-column align-items-start p-0"
                href="/"
              >
                <img src={Logo} alt="Logo" style={{ height: "75px" }} />
              </a>
            </div>

            {/* CENTER NAV LINKS */}
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul className="navbar-nav gap-4">
                <li className="nav-item py-3">
                  <a
                    className="nav-link fw-bold position-relative active-link"
                    href="/"
                  >
                    HOME
                  </a>
                </li>

                {/* About Dropdown */}
                <li
                  className="nav-item py-3 position-relative"
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <button className="nav-link fw-bold position-relative bg-transparent border-0">
                    ABOUT
                    <i className="bi bi-caret-down-fill ms-1"></i>
                  </button>

                  {isAboutDropdownOpen && (
                    <ul className="dropdown-menu show rounded-0 position-absolute start-50 translate-middle-x">
                      <li>
                        <a className="dropdown-item text-muted" href="/about">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-muted"
                          href="/visitussoon"
                        >
                          Our Story
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-muted"
                          href="/visitussoon"
                        >
                          Our Team
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Services Dropdown */}
                <li
                  className="nav-item py-3 position-relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <a
                    className="nav-link fw-bold position-relative bg-transparent border-0 text-decoration-none"
                    href="/services"
                  >
                    SERVICES
                    <i className="bi bi-caret-down-fill ms-1"></i>
                  </a>

                  {isServicesDropdownOpen && (
                    <ul className="dropdown-menu show rounded-0 position-absolute start-50 translate-middle-x">
                      <li>
                        <a
                          className="dropdown-item text-muted"
                          href="/support-at-home"
                        >
                          Support at Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-muted"
                          href="/visitussoon"
                        >
                          NDIS
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="nav-item py-3">
                  <a
                    className="nav-link fw-bold position-relative"
                    href="/facilities"
                  >
                    FACILITIES
                  </a>
                </li>

                <li className="nav-item py-3">
                  <a className="nav-link fw-bold position-relative" href="/faq">
                    FAQ
                  </a>
                </li>

                <li className="nav-item py-3">
                  <a
                    className="nav-link fw-bold position-relative"
                    href="/contact-us"
                  >
                    CONTACT US
                  </a>
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE: Font size controller (desktop only) */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <FontSizeController />
            </div>

            {/* MOBILE TOGGLER */}
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>

        {/* MOBILE OFFCANVAS */}
        <div
          className="offcanvas offcanvas-end w-100 z-2"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div className="offcanvas-header bg-white p-3">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img src={Logo} alt="Logo" style={{ height: "50px" }} />
            </a>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-flex align-items-center justify-content-center">
            <ul className="navbar-nav text-center">
              <li className="nav-item py-3">
                <a className="nav-link fw-bold fs-2 text-dark" href="/">
                  Home
                </a>
              </li>

              {/* Mobile About Dropdown */}
              <li
                className="nav-item py-3 position-relative justify-content-center"
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              >
                <button className="nav-item fw-bold fs-2 text-dark bg-transparent border-0">
                  About
                  <i className="bi bi-caret-down-fill ms-1"></i>
                </button>

                {isAboutDropdownOpen && (
                  <ul className="dropdown-menu show position-static border-0 bg-transparent">
                    <li>
                      <a
                        className="dropdown-item text-muted fs-3"
                        href="/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-muted fs-3"
                        href="/visitussoon"
                      >
                        Our Story
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-muted fs-3"
                        href="/visitussoon"
                      >
                        Our Team
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Mobile Services Dropdown */}
              <li className="nav-item py-3 position-relative justify-content-center">
                <a
                  className="nav-link fw-bold fs-2 text-dark text-decoration-none"
                  href="/services"
                >
                  Services
                </a>
                <button
                  className="position-absolute bg-transparent border-0"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                >
                  <i className="bi bi-caret-down-fill"></i>
                </button>

                {isServicesDropdownOpen && (
                  <ul className="dropdown-menu show position-static border-0 bg-transparent mt-2">
                    <li>
                      <a
                        className="dropdown-item text-muted fs-3"
                        href="/support-at-home"
                      >
                        Support at Home
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-muted fs-3"
                        href="/visitussoon"
                      >
                        NDIS
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item py-3 fs-2">
                <a className="nav-link fw-bold text-dark" href="/facilities">
                  Facilities
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <a className="nav-link fw-bold text-dark" href="/faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <a className="nav-link fw-bold text-dark" href="/contact-us">
                  Contact Us
                </a>
              </li>
              
              {/* Mobile Search Box - WITHOUT SEARCH BUTTON */}
              <li className="nav-item py-3">
                <div className="input-group search-box bg-white input-group-sm mt-3">
                  <span className="input-group-text border-end-0 bg-white">
                    <i className="bi bi-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search our site... (Press Enter)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        const q = searchQuery.trim();
                        navigate(`/search?search=${encodeURIComponent(q)}`);
                        setSearchQuery("");
                        // Close mobile menu
                        document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                      }
                    }}
                  />
                </div>
              </li>
              
              <div className="row py-4">
                <div className="col-12 d-flex align-items-center justify-content-center text-dark">
                  <a
                    className="mb-0 px-3 fs-2 fw-bold border-light text-dark text-decoration-none"
                    href="/career"
                  >
                    Career
                  </a>
                </div>
              </div>
              
              <FontSizeController />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}