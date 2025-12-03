import React from 'react';

const PageLoader = () => {
  return (
    <section className="dots-container gap-3 position-fixed top-0 start-0 d-flex align-items-center justify-content-center vh-100 w-100 bg-white" style={{zIndex: '9999'}}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );
};

export default PageLoader;
