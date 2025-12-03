import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Header from "./Components/Header";
import ScrollToTop from "./Components/ScrollToTop";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import About from "./Pages/About";
import Career from "./Pages/Career";
import Blog from "./Pages/Blog";
import Cookies from "./Components/Cookies";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ComingSoon from "./Pages/Comingsoon";
import Facilities from "./Pages/Facilities";
import PageLoader from "./Components/PageLoader";
import Newsletter from "./Pages/Newsletter";
import Events from "./Pages/Events";
import FAQ from "./Pages/FAQ";
import BlogDetails from "./Pages/BlogDetails";
import BackToTop from "./Components/BacktToTop";
import TermofUse from "./Pages/TermsofUse";
import Accessibility from "./Pages/Accessibility";
import ClinicalDisclaimer from "./Pages/ClinicalDisclaimer";
import Video from "./assets/video.mp4";
import SupportAtHome from "./Pages/SupportAtHome";
import PriceList from "./Pages/PriceList";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Combined approach: Use both methods for better coverage
    let preloadVideoElement;

    // Method 1: Link preload for browsers that support it
    try {
      const videoLink = document.createElement("link");
      videoLink.rel = "preload";
      videoLink.as = "fetch";
      videoLink.href = Video;
      videoLink.type = "video/mp4";
      videoLink.crossOrigin = "anonymous";
      document.head.appendChild(videoLink);
    } catch (error) {
      console.log("Link preload not supported:", error);
    }

    // Method 2: Video element preload as fallback
    preloadVideoElement = document.createElement("video");
    preloadVideoElement.preload = "auto";
    preloadVideoElement.muted = true;
    preloadVideoElement.style.display = "none";
    preloadVideoElement.style.position = "absolute";
    preloadVideoElement.style.left = "-9999px";

    const source = document.createElement("source");
    source.src = Video;
    source.type = "video/mp4";

    preloadVideoElement.appendChild(source);
    document.body.appendChild(preloadVideoElement);

    return () => {
      // Cleanup video element
      if (preloadVideoElement && document.body.contains(preloadVideoElement)) {
        document.body.removeChild(preloadVideoElement);
      }
    };
  }, []);

  return (
    <>
      <Router>
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <Header />

            <div
              className="App"
              style={{ position: "relative", top: "-113px" }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/career" element={<Career />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/events" element={<Events />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/term-of-conditions" element={<TermofUse />} />
                <Route
                  path="/clinical-disclaimer"
                  element={<ClinicalDisclaimer />}
                />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/visitussoon" element={<ComingSoon />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support-at-home" element={<SupportAtHome />} />
                <Route path="/support-at-home-price-list" element={<PriceList />} />
              </Routes>
            </div>

            {/* <Chatbot /> */}
            <Cookies />
            <ScrollToTop />
            <BackToTop />
            <Footer />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
