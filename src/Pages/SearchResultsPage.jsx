import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SEARCH_ITEMS } from "../Config/searchConfig";

export default function SearchResultsPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query);
  }, [location]);

  // Filter search results when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
      return;
    }

    const q = searchQuery.trim().toLowerCase();
    const itemsArray = Array.isArray(SEARCH_ITEMS) ? SEARCH_ITEMS : [];

    const results = itemsArray.filter((item) => {
      if (!item) return false;

      const label = item.label ? String(item.label).toLowerCase() : "";
      const keywordsArray = Array.isArray(item.keywords) ? item.keywords : [];

      const inLabel = label.includes(q);
      const inKeywords = keywordsArray.some((kw) =>
        String(kw || "")
          .toLowerCase()
          .includes(q)
      );

      return inLabel || inKeywords;
    });

    setSearchResults(results);
    setFilteredResults(results);
  }, [searchQuery]);

  // Group results by page
  const groupedResults = filteredResults.reduce((acc, item) => {
    const pageKey = item.path || "other";
    if (!acc[pageKey]) {
      acc[pageKey] = {
        pageName: getPageName(item.path),
        pagePath: item.path,
        results: [],
      };
    }
    acc[pageKey].results.push(item);
    return acc;
  }, {});

  function getPageName(path) {
    const pageNames = {
      "/": "Home",
      "/about": "About",
      "/support-at-home": "Support at Home",
      "/facilities": "Facilities",
      "/faq": "FAQ",
      "/contact-us": "Contact Us",
      "/career": "Careers",
      "/support-at-home-price-list": "Price List",
      "/term-of-conditions": "Terms of Use",
      "/clinical-disclaimer": "Clinical Disclaimer",
      "/privacypolicy": "Privacy Policy",
      "/services": "Services",
    };
    return pageNames[path] || path;
  }

  // Function to render keywords with dot separators
  const renderKeywords = (keywords, maxCount) => {
    const limitedKeywords = keywords.slice(0, maxCount);
    
    return (
      <div className="mt-1">
        <small className="text-muted text-capitalize">
          {limitedKeywords.map((keyword, index) => (
            <span key={index}>
              {keyword}
              {index < limitedKeywords.length - 1 && (
                <i className="bi bi-dot mx-1" style={{ fontSize: "0.8em" }}></i>
              )}
            </span>
          ))}
          {keywords.length > maxCount && (
            <>
              <span>....</span>
            </>
          )}
        </small>
      </div>
    );
  };

  return (
    <div className="container-fluid testimonal p-0">
      <section className="mt-5 pt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              {/* Search Header - Left Aligned */}
              <div className="mb-4 text-start">
                <h1 className="h2 mb-3 text-start">Search Results</h1>
                {searchQuery && (
                  <p className="text-muted text-start">
                    Showing results for: <strong>"{searchQuery}"</strong>
                    {filteredResults.length > 0 && (
                      <span> - {filteredResults.length} result(s) found</span>
                    )}
                  </p>
                )}
              </div>

              {/* Search Results */}
              {!searchQuery.trim() ? (
                <div className="alert alert-info text-start">
                  <p className="mb-0">
                    Please enter a search term to see results.
                  </p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="alert alert-warning text-start">
                  <p className="mb-0">
                    No results found for "<strong>{searchQuery}</strong>". Try
                    different keywords.
                  </p>
                </div>
              ) : (
                <div className="search-results-container text-start">
                  {/* Show all results */}
                  <div className="mb-4">
                    {Object.entries(groupedResults).map(([pageKey, group]) => (
                      <div key={pageKey} className="mb-4">
                        <div className="card border-0 shadow-sm mb-3">
                          <div className="card-header bg-light border-0 text-start">
                            <h3 className="h5 mb-0">
                              <Link
                                to={group.pagePath}
                                className="text-decoration-none dark-text"
                              >
                                {group.pageName}
                              </Link>
                            </h3>
                          </div>
                          <div className="card-body text-start">
                            <ul className="list-unstyled mb-0">
                              {group.results.map((item, idx) => (
                                <li
                                  key={`${item.path}-${idx}`}
                                  className={idx === group.results.length - 1 ? "" : "mb-3"}
                                >
                                  <div className="d-flex align-items-start">
                                    <div className="flex-grow-1">
                                      <h5 className="h6 mb-1">
                                        <Link
                                          to={`${item.path}?search=${encodeURIComponent(
                                            searchQuery
                                          )}${
                                            item.sectionId
                                              ? `#${item.sectionId}`
                                              : ""
                                          }`}
                                          className="text-decoration-none text-dark"
                                        >
                                          {item.label}
                                        </Link>
                                      </h5>
                                      {item.keywords && (
                                        <>
                                          {/* Desktop: Show 5 keywords with dots */}
                                          <div className="d-none d-lg-block">
                                            {renderKeywords(item.keywords, 5)}
                                          </div>
                                          {/* Mobile: Show 3 keywords with dots */}
                                          <div className="d-lg-none">
                                            {renderKeywords(item.keywords, 3)}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center px-3">
                                      <Link
                                        to={`${item.path}?search=${encodeURIComponent(
                                          searchQuery
                                        )}${
                                          item.sectionId
                                            ? `#${item.sectionId}`
                                            : ""
                                        }`}
                                        className="btn btn-link p-0"
                                        style={{
                                          color: "#8d173d",
                                          textDecoration: "none",
                                        }}
                                        title={`Go to ${item.label}`}
                                      >
                                        <i className="bi bi-arrow-right-circle fs-4"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}