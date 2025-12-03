import React from "react";
import StatsImage from "../assets/4.png";
import { stats } from "../Constants/Data";

const StatsBanner = () => {
  return (
    <section className="bg-white py-5">
      <div className="container jumbotron rounded-5 my-5">
        <div className="d-flex flex-row stats-banner">
          {/* Left Side Image */}
          <div className="col-lg-4 col-12 text-white text-start align-items-end justify-content-center p-5">
            <h1 className="mt-2 heading">
              Caring Backed <br />
              by Impact
            </h1>
            <p className="mb-5">
              Our numbers reflect the trust families <br />
              place in us every day
            </p>
          </div>

          {/* Right Side Content */}
          <div className="col-md-8 p-0 d-none d-lg-flex">
            <img
              src={StatsImage}
              alt="Nurse and Elderly"
              className="img-fluid object-cover"
              style={{ height: "400px" }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-lg-5 gap-2 position-relative stat-box flex-column flex-lg-row">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="col-12 col-md-9 col-lg-2 align-items-center text-start bg-white rounded-4 p-3"
            >
              <h3 className="dark-text fw-bold">{stat.number}</h3>
              <p className="subheading">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
