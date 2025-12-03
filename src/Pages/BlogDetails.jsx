import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { slugify } from "../Utils/slugify";
import { blogData } from "../Constants/Data";
import NewsletterSection from "../Components/Newsletter";
import GlobalButton from "../Components/Button";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Find the blog post that matches the slug
    const foundBlog = blogData.find((item) => slugify(item.title) === slug);
    setBlog(foundBlog);
  }, [slug]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Rosewood Gardens</title>
        <meta name="description" content={blog.description} />
        <meta
          name="keywords"
          content="Private residential aged care, 24/7 nursing and clinical care, Aged care facility Melbourne, Aged care facility Victoria, NDIS support services, NDIS registered provider, Supported independent living (SIL), Government funded support at home, Private self-funded aged care, Supported residential accommodation, High intensity care provider, Compassionate aged and disability care, Dementia care Melbourne, Palliative Care Victoria, Respite care services, Aged care consultation services, Disability support coordinator, Personalised care plans, Aged care services Sydney NSW, Aged care services Melbourne VIC"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
        />
        <meta
          property="og:description"
          content="Rosewood Gardens is a trusted leader in Aged & Disability Care, NDIS Support Services, and the Government-funded Support at Home program, proudly serving communities across Sydney and Melbourne."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rosewoodgardens.com.au" />
        <meta
          property="og:image"
          content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
        />
        <meta
          name="twitter:description"
          content="Rosewood Gardens is a trusted leader in Aged & Disability Care, NDIS Support Services, and the Government-funded Support at Home program, proudly serving communities across Sydney and Melbourne."
        />
        <meta
          name="twitter:image"
          content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
        />
        <meta name="twitter:site" content="@rosewoodgardens" />
        <meta name="twitter:creator" content="@rosewoodgardens" />
      </Helmet>

      <div className="container-fluid p-0">
        {/* Hero section */}
        <section
          className="py-5 position-relative text-white d-flex align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div
            className="container d-flex flex-column justify-content-end align-items-start rounded-4 position-relative text-start p-4"
            style={{
              height: "50vh",
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 40%, rgba(161, 39, 65, 0.7) 100%), url(${blog.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="d-flex small mb-2">
              <p className="card-text text-white fw-semibold border-end pe-3 m-0">
                {blog.author}
              </p>
              <p className="text-white ps-3 m-0">{blog.date}</p>
            </div>
            <h5 className="fw-bold heading text-white">{blog.title}</h5>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-8 p-4 text-start testimonal rounded-4">
                <h2 className="dark-text heading mb-3">{blog.title} </h2>
                <p className="text-muted">{blog.description}</p>

                <div className="bg-white rounded-4 mb-4 p-3">
                  <h5 className="dark-text heading">{blog.title} </h5>
                  <p className="text-muted m-0">{blog.description}</p>
                  <ul className="m-0">
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                  </ul>
                  <p className="text-muted">{blog.description}</p>
                </div>

                <div className="bg-white rounded-4 mb-4 p-3">
                  <h5 className="dark-text heading">{blog.title} </h5>
                  <p className="text-muted m-0">{blog.description}</p>
                  <ul className="m-0">
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                  </ul>
                  <p className="text-muted">{blog.description}</p>
                </div>

                <div className="bg-white rounded-4 mb-4 p-3">
                  <h5 className="dark-text heading">{blog.title} </h5>
                  <p className="text-muted m-0">{blog.description}</p>
                  <ul className="m-0">
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                  </ul>
                  <p className="text-muted">{blog.description}</p>
                </div>

                <div className="bg-white rounded-4 mb-4 p-3">
                  <h5 className="dark-text heading">{blog.title} </h5>
                  <p className="text-muted m-0">{blog.description}</p>
                  <ul className="m-0">
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                    <li>Key Points:</li>
                  </ul>
                  <p className="text-muted">{blog.description}</p>
                </div>
              </div>

              <div className="col-md-3 p-0 d-flex flex-column justify-content-end">
                {blogData.slice(0, 2).map((blog, index) => (
                  <div className="mb-3" key={index}>
                    <div className="card mb-4 shadow-sm border-0 rounded-4 p-4">
                      <img
                        src={blog.image}
                        className="card-img-fluid rounded-4"
                        alt={blog.title}
                        style={{ height: "245px" }}
                      />
                      <div className="card-body px-0">
                        <div className="d-flex align-items-center small">
                          <p className="card-text dark-text fw-semibold border-end pe-3">
                            {blog.author}
                          </p>
                          <p className="icon ps-3">{blog.date}</p>
                        </div>
                        <h5 className="card-title heading fw-bold text-start">
                          {blog.title}
                        </h5>
                        <p className="card-text text-start">
                          {blog.description}
                        </p>
                      </div>
                      <div className="card-footer border-0 bg-white d-flex justify-content-start p-0">
                        <GlobalButton
                          text="Read More"
                          variant="buttonv2 dark-text"
                          href={`/blog/${slugify(blog.title)}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </div>
    </>
  );
}
