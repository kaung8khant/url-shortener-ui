import React, { useState } from "react";
import LinkPhoto from "../assets/img/link-photo.png";
import "../assets/css/home.scss";
import Arrow from "../assets/img/right-arrow.png";
import { shortenUrl } from "../api/url";

const Home = () => {
  const [url, setUrl] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [shorten, setShorten] = useState(null);
  const submitUrl = () => {
    shortenUrl(url, date)
      .then((response) => {
        setShorten(response.data);
        setError(null);
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
            <a
              href={window.location.href + shorten.code}
              className="home__url-item"
            >
              {window.location.href + shorten.code}
            </a>
          </div>
        )}
        {!shorten && (
          <>
            <div className="home__input-box">
              <input
                type="text"
                placeholder="Input your url..."
                className="home__input-box-input"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
              <div
                className="home__input-box-button"
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
                  className="home__input-box-button-icon"
                />
              </div>
            </div>
            <div className="home__input-box">
              <span className="home__input-box-label">Expire At : </span>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="home__input-box-date"
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>
          </>
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
