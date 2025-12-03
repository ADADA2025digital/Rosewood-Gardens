import React, { useEffect, useState } from "react";
import sideImg from "../assets/3.png";
import {
  careoption,
  facilities,
  facilitieslist,
  facilityHero,
  seoData,
} from "../Constants/Data";
import NewsletterSection from "../Components/Newsletter";
import Gallery from "../Components/Gallerys";
import GlobalButton from "../Components/Button";
import SeoHead from "../Components/SeoHead";

export default function Facilities() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facilityHero.slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facilityHero.slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % facilityHero.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + facilityHero.slides.length) % facilityHero.slides.length
    );
  };

  return (
    <>
      <SeoHead {...seoData.facilities} />

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section
          className="hero-carousel d-flex flex-column justify-content-center align-items-center py-5 mt-5"
          id="heroCarousel"
          style={{
            backgroundImage: `url(${facilityHero.slides[currentSlide].backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.8s ease-in-out",
            position: "relative",
            height: "50vh",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mt-5 w-100"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div
              className="text-white blur-bg py-2"
              style={{ backgroundColor: "#00000073", padding: "0 20px" }}
            >
              <h1 className="fw-bold heading display-5 mb-3">
                {facilityHero.slides[currentSlide].title}
              </h1>
              <p className="lead m-0" style={{ fontSize: "1.25rem" }}>
                {facilityHero.slides[currentSlide].subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row">
              <h5 className="text-muted fw-semibold">
                Your Home, Your Comfort
              </h5>
              <h1 className="dark-text heading mb-5">
                A new standard in Supported Residential Aged & Disability Care
              </h1>
              <p>
                Rosewood Gardens’ Ashburton facility operates as a privately run
                Supported Residential Service (SRS), providing Aged and
                Disability Care of the highest quality. Designed to feel like
                home, we combine independence, dignity, and security with 24/7
                professional support in a safe and welcoming environment.
              </p>
              <p>
                Residents enjoy freshly prepared meals, beautiful gardens, and a
                homelike atmosphere - all supported by our dedicated team of
                qualified nurses and care staff who provide compassion and
                clinical excellence around the clock.
              </p>
              <div>
                <GlobalButton
                  text="Speak to Our Advisor"
                  href="/contact-us"
                  className="py-3 text-uppercase icon-bg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5 bg-white">
          <div className="container text-start">
            <div className="row justify-content-center text-center">
              <h1 className="dark-text heading text-start mt-5">
                Life at Rosewood Gardens{" "}
              </h1>
              <div className="row mt-3 d-flex align-items-stretch p-0">
                {facilities.map((facility, index) => (
                  <div key={index} className="col-12 col-md-4 d-flex">
                    <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
                      <img
                        src={facility.image}
                        className="card-img-fluid rounded-4"
                        alt={facility.title}
                        style={{ height: "245px" }}
                      />
                      <div className="card-body text-start pt-3 px-0 pb-0">
                        <h5 className="dark-text">{facility.title}</h5>
                        <p className="small">{facility.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h1 className="dark-text heading text-start mt-5">
                Care Options{" "}
              </h1>
              <div className="row mt-3 g-3">
                {careoption.map((care, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div className="card shadow-sm rounded dark-text p-3 d-flex align-items-center flex-row">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <p className="m-0">{care}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-5">
                <div className="col-md-7 text-start">
                  <h1 className="dark-text heading">
                    What Makes Rosewood Gardens Different
                  </h1>
                  <h6 className="mb-3">
                    <i>"Where care, comfort, and community come together."</i>
                  </h6>
                  <h6>✔ Clinical Excellence Onsite</h6>
                  <p className="small">
                    Registered & Enrolled Nurses available 24/7, ensuring
                    professional and compassionate support around the clock.
                  </p>
                  <h6>✔ Dedicated Staff Assignment</h6>
                  <p className="small">
                    Our staff work with the same residents every day, creating
                    warm, secure, trusting relationships. Families see familiar
                    faces at every visit, building continuity and confidence in
                    care.
                  </p>
                  <h6>✔ Nutritious Dining</h6>
                  <p className="small">
                    Fresh, chef-prepared meals are served daily, tailored to
                    individual dietary needs and preferences for health and
                    enjoyment.{" "}
                  </p>
                  <h6>✔ Lifestyle & Wellbeing Programs</h6>
                  <p className="small">
                    Engaging social activities, recreational outings, and
                    wellness programs that bring joy, connection, and purpose to
                    everyday living.{" "}
                  </p>
                  <h6>✔ Beautiful Grounds & Private Spaces</h6>
                  <p className="small">
                    Enjoy landscaped gardens, welcoming lounges, and quiet
                    private areas that create a true sense of home.{" "}
                  </p>
                  <h6>✔ Safety & Security</h6>
                  <p className="small">
                    A modern facility designed with safety and peace of mind in
                    mind, offering both comfort and protection for residents.{" "}
                  </p>
                </div>

                <div className="col-md-5">
                  <img
                    src={sideImg}
                    alt="Rosewood Gardens"
                    className="img-fluid rounded-4 w-100 object-fit-cover"
                  />
                </div>
              </div>
              {/* <h1 className="dark-text heading my-5">
                Dedicated Staff Assignment
              </h1>
              <p>
                Creating warm, secure, trusting relationships. Our staff work
                with the same residents every day. Each time family visits, they
                see familiar faces-and feel confident their loved one is in the
                care of people who truly understand their needs.
              </p>
              <p>
                It’s continuity that builds trust, supports wellbeing, and makes
                Rosewood Gardens feel like home.
              </p> */}
              <div className="row mt-3 align-items-stretch p-0">
                {facilitieslist.map((facility, index) => (
                  <div key={index} className="col-12 col-md-6 mb-3">
                    <div className="card shadow-sm border rounded-4 p-3 text-start h-100 w-100">
                      <h4 className="dark-text">{facility.title}</h4>

                      {facility.description &&
                      Array.isArray(facility.description)
                        ? facility.description.map((desc, i) => (
                            <p key={i} className="lh-base">
                              {desc}
                            </p>
                          ))
                        : facility.description && (
                            <p className="lh-lg">{facility.description}</p>
                          )}

                      {facility.list && Array.isArray(facility.list) && (
                        <ul className="list-unstyled lh-base">
                          {facility.list.map((item, i) => (
                            <li key={i}>✓ {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities section */}
        <section className="bg-white py-5">
          <div className="container mt-3">
            <div className="col-md-12 border bg-white rounded-4 shadow-sm p-3">
              <div className="card rounded-4 border-0 text-start p-4 align-items-center justify-content-center testimonal">
                <div className="rounded-circle chatBtn d-flex align-items-center mb-3 justify-content-center icon-bg position-relative">
                  <i className="bi bi-calendar-day text-white"></i>
                </div>
                <h6 className="dark-text">BOOK A TOUR</h6>
                <p className="text-muted text-center m-0">
                  We welcome the opportunity to show you around Rosewood
                  Gardens.
                </p>
                <p className="text-muted text-center m-0">
                  We know you'll love our community areas, rooms and grounds.
                </p>
                <p className="text-muted text-center m-0">
                  Book a time with us to walk around, meet the staff and
                  residents and talk about any concerns you may have.
                </p>
                <div className="d-flex mt-3">
                  <a
                    href="/contact-us"
                    className="btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 py-2 px-3 position-relative fw-bold  px-4 py-2"
                    role="button"
                  >
                    Book a tour
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12 p-3 p-lg-5">
              <h4 className="text-muted text-center">
                "Whatever the length of stay, residents are encouraged to bring
                their important personal belongings to ensure they continue
                their independent journey through life."
              </h4>
            </div>
          </div>

          <div className="container text-center pt-5">
            <small className="text-uppercase dark-text fw-semibold">
              Facilities
            </small>
            <h1 className="heading fw-bold">
              Everything You Need, <br />
              All in One Place
            </h1>
            <p className="small">
              Modern amenities with a personal touch to support daily living.
            </p>
            <div className="pt-5">
              <Gallery />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
