import axios from "axios";

const shortenUrl = async (url) => {
  let response = await axios.post(`shorten`, {
    link: url,
  });
  return response.data;
};

const getUrl = async (code) => {
  let response = await axios.get(`link/${code}`);
  return response.data;
};

export { shortenUrl, getUrl };
