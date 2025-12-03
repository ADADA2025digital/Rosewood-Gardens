import React, { useState, useEffect } from "react";

function FontSizeController() {
  const [fontSize, setFontSize] = useState(1); // in rem

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--base-font-size",
      `${fontSize}rem`
    );
  }, [fontSize]);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 0.1, 1.5)); // max 1.5rem (150%)
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 0.1, 0.8)); // min 0.8rem (80%)
  const resetFont = () => setFontSize(1);

  return (
    // <div className="position-fixed bottom-0 start-0 m-3 z-3">
    <div className="hour-card selected bg-white rounded-5 d-flex gap-2 align-items-center justify-content-center p-2">
      <button
        className="border-0 bg-white rounded-circle dark-text fw-bold"
        onClick={decreaseFont}
      >
        A−
      </button>
      <button
        className="border-0 bg-white rounded-circle dark-text fw-bold"
        onClick={resetFont}
      >
        A
      </button>
      <button
        className="border-0 bg-white rounded-circle dark-text fw-bold"
        onClick={increaseFont}
      >
        A+
      </button>
    </div>
    // </div>
  );
}

export default FontSizeController;
