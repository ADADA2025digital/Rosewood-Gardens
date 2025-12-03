import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    console.log("Subscribed with email:", email);

    setSuccessMessage("Thank you for subscribing!");
    setErrorMessage("");
    setEmail("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="newsletter py-2 py-lg-5">
      <div className="container py-4 px-md-0">
        <div className="row align-items-center">
          {/* Left Column: Content */}
          <div className="col-md-6 text-white text-start">
            <h2 className="display-4 heading mb-3">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4">
              Subscribe for updates on our care services, community events, and
              how we’re enhancing lives every day.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="col-md-6">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <form onSubmit={handleSubmit} className="w-100 d-flex">
                <input
                  type="email"
                  className="input-email py-3 px-2 bg-white text-dark border-0 w-75"
                  id="Email"
                  name="Email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="off"
                />
                <input
                  className="button-submit p-3 text-white border-0 w-25"
                  value="Subscribe"
                  type="submit"
                />
              </form>
            </div>
            {successMessage && (
              <div className="mt-3 text-white text-start fw-semibold">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mt-3 text-warning text-start fw-semibold">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
