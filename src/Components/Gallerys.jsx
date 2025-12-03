import React, { useEffect } from "react";
import { galleryItems } from "../Constants/Data";

const Gallery = () => {
  useEffect(() => {
    const videos = document.querySelectorAll(".video-item video");

    videos.forEach((video) => {
      const index = video.dataset.index;
      const button = document.querySelector(
        `.play-button[data-index="${index}"]`
      );
      let timeout;

      const toggleVideo = () => {
        if (video.paused) {
          video.play();
          if (button) {
            button.innerHTML = `<i className="bi bi-pause-fill fs-3 dark-text"></i>`;
            button.style.display = "flex";
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              button.style.display = "none";
            }, 2000);
          }
        } else {
          video.pause();
          if (button) {
            button.innerHTML = `<i className="bi bi-play-fill fs-3 dark-text"></i>`;
            button.style.display = "flex";
          }
        }
      };

      // Clicking the video toggles play/pause and shows button again
      video.addEventListener("click", () => {
        toggleVideo();
      });

      // Cleanup
      return () => {
        video.removeEventListener("click", toggleVideo);
      };
    });
  }, []);

  return (
    <div className="row justify-content-center align-items-stretch g-4">
      {galleryItems.map((item, index) => (
        <div
          className={`${
            item.type === "video" ? "col-lg-5 col-md-5" : "col-lg-3 col-md-3"
          }`}
          key={index}
        >
          <div
            className={`gallery-item position-relative rounded-4 shadow-lg h-100 overflow-hidden ${
              item.type === "video" ? "video-item" : ""
            }`}
          >
            {item.type === "image" ? (
              <>
                <img src={item.src} alt={item.title} className="img-fluid" />
                <div className="gallery-overlay top-0 bottom-0 end-0 start-0 position-absolute d-flex align-items-end justify-content-start p-3">
                  <div className="overlay-content text-start bottom-0 start-0 text-white">
                    <h5 className="heading fw-bold">{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <video
                  className="h-100 video-fixed"
                  muted
                  loop
                  data-index={index}
                  poster={item.coverSrc}
                  style={{ height: "300px", objectFit: "cover" }}
                >
                  <source src={item.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span
                  className="play-button position-absolute m-4 bottom-0 end-0 d-flex justify-content-center align-items-center"
                  data-index={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling to video
                    const video = document.querySelector(
                      `video[data-index="${index}"]`
                    );
                    const button = e.currentTarget;

                    if (video.paused) {
                      video.play();
                      button.innerHTML = `<i className="bi bi-pause-fill fs-3 dark-text"></i>`;
                      setTimeout(() => {
                        button.style.display = "none";
                      }, 2000);
                    } else {
                      video.pause();
                      button.innerHTML = `<i className="bi bi-play-fill fs-3 dark-text"></i>`;
                      button.style.display = "flex";
                    }
                  }}
                >
                  <i className="bi bi-play-fill fs-3 dark-text"></i>
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
