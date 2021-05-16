import axios from "axios";

const login = async (username, password) => {
  let response = await axios.post(`admin/login`, {
    username: username,
    password: password,
  });
  return response.data;
};

export { login };
