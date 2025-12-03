import React from "react";

const BlogCard = ({ image, author, date, title, description, readTime }) => {
  return (
    <div className="card mb-4 shadow border-0 rounded-4 p-4">
      <img src={image} className="card-img-fluid rounded-4" alt={title} style={{height: '245px'}}/>
      <div className="card-body px-0">
        <div className="d-flex justify-content-between align-items-center mb-3 small">
          <p className="card-text dark-text fw-semibold">{author}</p>
          <p className="icon">{date}</p>
        </div>
        <h5 className="card-title heading fw-bold text-start">{title}</h5>
        <p className="card-text text-start">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="icon rounded-4 px-2 badge">{readTime}</small>
          <i className="bi bi-arrow-up-right-circle dark-text fs-3 zoom-effect"></i>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
