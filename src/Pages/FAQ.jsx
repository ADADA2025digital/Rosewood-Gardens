import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import heroImg from "../assets/27.png";
import NewsletterSection from "../Components/Newsletter";
import { faqItems as RAW_FAQ, seoData } from "../Constants/Data";
import SeoHead from "../Components/SeoHead";
import { KEYWORD_TO_SECTION } from "../Config/searchConfig";

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState(null); // stores item._k
  const toggleFaq = (id) => setOpenFaqId((prev) => (prev === id ? null : id));

  // --- Category labels (and display order)
  const CATEGORY_ORDER = [
    "All",
    "General",
    "In-Home Care (HCP → Support at Home)",
    "NDIS & SIL",
    "Residential Care",
    "Clinical & Safety",
    "Costs & Funding",
    "Admissions & Tours",
  ];

  // --- Map categories → DOM ids (used for scrolling from global search)
  const CATEGORY_ID_MAP = {
    General: "faq-general",
    "In-Home Care (HCP → Support at Home)": "faq-in-home-care",
    "NDIS & SIL": "faq-ndis-sil",
    "Residential Care": "faq-residential-care",
    "Clinical & Safety": "faq-clinical-safety",
    "Costs & Funding": "faq-costs-funding",
    "Admissions & Tours": "faq-admissions-tours",
  };

  // --- Infer category when one is not provided in RAW_FAQ
  const inferCategory = (q = "") => {
    const s = q.toLowerCase();
    if (/(ndis|sil|sda|support coordinator)/.test(s)) return "NDIS & SIL";
    if (/(home care|hcp|support at home|in[- ]home)/.test(s))
      return "In-Home Care (HCP → Support at Home)";
    if (/(residential|room|facility|rad|dap|admission|tour|acat)/.test(s))
      return "Residential Care";
    if (/(cost|fee|rad|dap|weekly|funding|package|cover)/.test(s))
      return "Costs & Funding";
    if (/(clinical|nursing|medication|safety|wellbeing)/.test(s))
      return "Clinical & Safety";
    if (/(visit|tour|admission|start receiving care|how quickly)/.test(s))
      return "Admissions & Tours";
    return "General";
  };

  // --- Normalize FAQ items (ensure category + stable key)
  const faqItems = useMemo(
    () =>
      RAW_FAQ.map((it, i) => {
        const cat = it.category || inferCategory(it.question || "");
        return {
          ...it,
          category: cat,
          _k: `${cat}-${i}`, // stable key per item
        };
      }),
    []
  );

  // --- Category pills based on data
  const dataCategories = useMemo(() => {
    const present = new Set(faqItems.map((it) => it.category));
    return CATEGORY_ORDER.filter((c) => c === "All" || present.has(c));
  }, [faqItems]);

  // --- Local FAQ search (only when user types)
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(dataCategories[0] || "All");

  const inputRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    inputRef.current?.blur();
  };

  const placeholder = "Search questions (e.g., fees, SIL, respite)";

  // --- Filter FAQ by category + query
  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const inCategory = active === "All" || item.category === active;
      if (!q) return inCategory;
      const haystack = [
        item.question || "",
        item.answer || "",
        ...(item.list || []),
      ]
        .join(" ")
        .toLowerCase();
      return inCategory && haystack.includes(q);
    });
  }, [faqItems, query, active]);

  // --- Grouped view for "All" category
  const groupedForAll = useMemo(() => {
    if (active !== "All") return [];
    const map = new Map();
    for (const it of filteredFaqs) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    }
    return CATEGORY_ORDER.filter((c) => c !== "All" && map.has(c)).map((c) => ({
      category: c,
      items: map.get(c),
    }));
  }, [filteredFaqs, active]);

  // --- URL search params (from global header search)
  const [searchParams] = useSearchParams();

  // ✅ Use ?search= ONLY to scroll + open; do NOT push into `query`
  useEffect(() => {
    const raw = searchParams.get("search");
    if (!raw) return;

    const q = raw.toLowerCase().trim();
    if (!q) return;

    let targetId = KEYWORD_TO_SECTION[q];

    // Fuzzy match fallback (e.g. "ndis plan" contains "ndis")
    if (!targetId) {
      for (const [keyword, sectionId] of Object.entries(KEYWORD_TO_SECTION)) {
        if (q.includes(keyword)) {
          targetId = sectionId;
          break;
        }
      }
    }

    // Only scroll if the section id is one of our FAQ headings
    if (targetId && Object.values(CATEGORY_ID_MAP).includes(targetId)) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const HEADER_HEIGHT = 180; // adjust for your fixed header height
          const elementY = el.getBoundingClientRect().top + window.scrollY;
          const offsetY = elementY - HEADER_HEIGHT;

          window.scrollTo({
            top: offsetY,
            behavior: "smooth",
          });
        }, 200);
      }
    }

    // Also auto-open the first FAQ that matches this term
    const match = faqItems.find((item) => {
      const haystack = [
        item.question || "",
        item.answer || "",
        ...(item.list || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    if (match) {
      setOpenFaqId(match._k);
    }
  }, [searchParams, faqItems]);

  return (
    <>
      <SeoHead {...seoData.faq} />

      <div className="container-fluid p-0">
        {/* Hero */}
        <section className="py-5 mt-5" id="heroCarousel">
          <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <h1 className="fw-bold text-dark display-3">
                    Frequently Asked Questions
                  </h1>
                  <p className="lead text-dark">
                    Compassionate care, dignified living – delivered at home, in
                    our residence, or in the community (e.g., SIL/SDA).
                  </p>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={heroImg}
                    alt="Care"
                    className="img-fluid rounded-5 w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search + Categories + List */}
        <section className="py-4">
          <div className="container">
            <div className="row">
              {/* Left column: search + FAQs */}
              <div className="col-md-9">
                <div className="bg-light border rounded p-3 mb-4">
                  {/* FAQ local search */}
                  <form onSubmit={onSubmit}>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-search" aria-hidden="true"></i>
                      </span>
                      <input
                        ref={inputRef}
                        type="search"
                        className="form-control bg-white border-start-0"
                        placeholder={placeholder}
                        value={query} // only user typing changes this
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search questions"
                      />
                    </div>
                  </form>

                  {/* Category pills */}
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {dataCategories.map((c) => {
                      const isActive = c === active;
                      return (
                        <button
                          key={c}
                          type="button"
                          className={
                            "btn btn-sm rounded-pill " +
                            (isActive ? "button-filled" : "button-outline")
                          }
                          onClick={() => setActive(c)}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* No results */}
                {filteredFaqs.length === 0 && (
                  <div className="alert alert-secondary" role="alert">
                    No results found. Try a different search or category.
                  </div>
                )}

                {/* ALL view: grouped by category */}
                {active === "All" &&
                  groupedForAll.map(({ category, items }) => (
                    <div key={category} className="mb-4">
                      <h4
                        id={CATEGORY_ID_MAP[category]}
                        className="fw-semibold text-start mb-3"
                      >
                        {category}
                      </h4>
                      {items.map((item) => {
                        const key = item._k;
                        const isOpen = openFaqId === key;
                        return (
                          <div key={key} className="mb-3 p-0">
                            <button
                              type="button"
                              onClick={() => toggleFaq(key)}
                              className={`w-100 border d-flex justify-content-between align-items-center px-4 py-3 bg-light ${
                                isOpen
                                  ? "border-bottom-0 rounded-top-3"
                                  : "rounded-3"
                              }`}
                              aria-expanded={isOpen}
                              aria-controls={`faq-panel-${key}`}
                            >
                              <span className="fw-medium text-start">
                                {item.question}
                              </span>
                              <i
                                className={`bi ${
                                  isOpen
                                    ? "bi-x-circle-fill"
                                    : "bi-plus-circle-fill"
                                } fs-4 dark-text`}
                              />
                            </button>

                            {isOpen && (
                              <div
                                id={`faq-panel-${key}`}
                                className="px-4 pb-3 border border-top-0 text-start rounded-bottom bg-light"
                              >
                                {item.answer && (
                                  <p
                                    className="text-muted small mb-2"
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {item.answer}
                                  </p>
                                )}
                                {item.list?.length > 0 && (
                                  <ul className="text-muted small ps-3 mb-0">
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
                  ))}

                {/* Single-category view */}
                {active !== "All" && filteredFaqs.length > 0 && (
                  <h4
                    id={CATEGORY_ID_MAP[active]}
                    className="fw-semibold text-start mb-3"
                  >
                    {active}
                  </h4>
                )}

                {active !== "All" &&
                  filteredFaqs.map((item) => {
                    const key = item._k;
                    const isOpen = openFaqId === key;
                    return (
                      <div key={key} className="mb-3 p-0">
                        <button
                          type="button"
                          onClick={() => toggleFaq(key)}
                          className={`w-100 border d-flex justify-content-between align-items-center px-4 py-3 bg-light ${
                            isOpen
                              ? "border-bottom-0 rounded-top-3"
                              : "rounded-3"
                          }`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${key}`}
                        >
                          <span className="fw-medium text-start">
                            {item.question}
                          </span>
                          <i
                            className={`bi ${
                              isOpen
                                ? "bi-x-circle-fill"
                                : "bi-plus-circle-fill"
                            } fs-4 dark-text`}
                          />
                        </button>

                        {isOpen && (
                          <div
                            id={`faq-panel-${key}`}
                            className="px-4 pb-3 border border-top-0 text-start rounded-bottom bg-light"
                          >
                            {item.answer && (
                              <p
                                className="text-muted small mb-2"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {item.answer}
                              </p>
                            )}
                            {item.list?.length > 0 && (
                              <ul className="text-muted small ps-3 mb-0">
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

              {/* Right column: contact box */}
              <div className="col-md-3">
                <div className="card icon-bg rounded-3 text-white text-start p-4">
                  <h6 className="mb-2 fw-semibold">Can’t find your answer?</h6>
                  <p className="mb-3 small opacity-90">
                    Talk to our care team now. We’ll listen, explain your
                    options, and help you get started.
                  </p>

                  <div className="d-grid gap-2">
                    <a
                      href="tel:1300 845 766"
                      className="btn btn-light text-start rounded fw-semibold"
                      style={{ fontSize: "12px" }}
                    >
                      Call 1300 845 766
                    </a>

                    <a
                      href="mailto:info@rosewoodgardens.com.au"
                      className="btn text-white rounded text-start fw-semibold"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      Email info@rosewoodgardens.com.au
                    </a>
                  </div>
                </div>

                <div className="bg-white border text-start mt-3 rounded-3 p-3 small">
                  <span className="fw-semibold me-1">Emergency:</span>
                  If anyone is at immediate risk, call{" "}
                  <a href="tel:000" className="link-danger fw-semibold">
                    000
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </div>
    </>
  );
}
