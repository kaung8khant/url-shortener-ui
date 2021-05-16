import React, { useEffect, useState } from "react";
import "../assets/css/home.scss";
import { getUrl } from "../api/url";
import { useParams } from "react-router-dom";

const ShortenUrl = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
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
  return <div>Loading...</div>;
};

export default ShortenUrl;
