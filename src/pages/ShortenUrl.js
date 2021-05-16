import React, { useEffect, useState } from "react";
import "../assets/css/home.scss";
import { getUrl } from "../api/url";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/css/shorten-url.scss";

const ShortenUrl = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        let response = await getUrl(code);
        setLink(response.data.link);
      } catch (e) {
        console.log(e.response);
        setError(e.response.data.message);
      }
    })();
  }, [code]);
  if (link) {
    window.location = link;
  }
  return (
    <div>
      {!error && <span>Loading...</span>}
      {error && (
        <div className="error">
          <div className="error__div">
            <h1 className="error__code">410</h1>
          </div>
          <div className="error__div">
            <h3 className="error__title">Look like you're lost</h3>
          </div>
          <div className="error__div">
            <p>the page you are looking for not avaible anymore!</p>
          </div>
          <div className="error__div">
            <Link to="/" className="error__home-link">
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenUrl;
