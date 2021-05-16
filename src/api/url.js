import axios from "axios";

const shortenUrl = async (url, date) => {
  let response = await axios.post(`shorten`, {
    link: url,
    expired_at: date,
  });
  return response.data;
};

const getUrl = async (code) => {
  let response = await axios.get(`link/${code}`);
  return response.data;
};

const getAllUrl = async (page = 1, pagesize = 15, filter) => {
  let response = await axios.get(
    `admin/url?page=${page}&filter=${filter}&size=${pagesize}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
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
