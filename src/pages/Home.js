import React, { useState } from "react";
import LinkPhoto from "../assets/img/link-photo.png";
import "../assets/css/home.scss";
import Arrow from "../assets/img/right-arrow.png";
import { shortenUrl } from "../api/url";

const Home = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [shorten, setShorten] = useState(null);
  const submitUrl = () => {
    shortenUrl(url)
      .then((response) => {
        setShorten(response.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="home">
        <div className="home__title-box">
          <h3 className="home__title-box-text">Shorten Your URL</h3>
        </div>
        {shorten && (
          <div className="home__url">
            <span className="home__url-item">
              {window.location.href + shorten.code}
            </span>
          </div>
        )}
        {!shorten && (
          <div className="home__search-box">
            <input
              type="text"
              placeholder="Input your url..."
              className="home__search-box-input"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <div
              className="home__search-box-button"
              onClick={() => {
                if (url !== "") {
                  submitUrl();
                } else {
                  setError("Please enter url");
                }
              }}
            >
              <img
                src={Arrow}
                alt="arrow"
                className="home__search-box-button-icon"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="home__error">
            <span className="home__error-text">{error}</span>
          </div>
        )}

        <div className="home__img-wrapper">
          <img
            className="home__primary-img"
            src={LinkPhoto}
            alt="Link shortener"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
