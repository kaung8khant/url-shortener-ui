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

const getAllUrl = async (filter) => {
  let response = await axios.get(`admin/url?filter=${filter}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};
const deleteUrl = async (id) => {
  let response = await axios.delete(`admin/url/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};
export { shortenUrl, getUrl, getAllUrl, deleteUrl };
