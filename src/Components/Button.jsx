import React from "react";

const GlobalButton = ({
  text,
  onClick,
  href,
  className = "",
  type = "submit",
}) => {
  const combinedClasses = `btn globalbutton rounded-3 text-decoration-none overflow-hidden z-1 py-2 px-3 position-relative fw-bold ${className} px-4 py-2`;

  // If href is provided, render an anchor tag styled like a button
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClasses}
        role="button"
      >
        {text}
      </a>
    );
  }

  // Otherwise render a button
  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
    >
      {text}
    </button>
  );
};

export default GlobalButton;
