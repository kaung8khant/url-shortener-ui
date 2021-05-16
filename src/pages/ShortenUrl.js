import React, { useEffect, useState } from "react";
import "../assets/css/home.scss";
import { getUrl } from "../api/url";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ShortenUrl = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        let response = await getUrl(code);
        console.log(response.data.link);
        setLink(response.data.link);
      } catch (e) {}
    })();
  }, [code]);
  if (link) {
    window.location = link;
  }
  return (
    <div>
      {!error && <span>Loading...</span>}
      <section className="page_401">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <Link to="/">Go to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShortenUrl;
