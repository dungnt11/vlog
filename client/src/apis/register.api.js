import axios from "axios";

export const registerApi = user => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return new Promise((resolve, reject) => {
    axios
      .post("/register", user, config)
      .then(res => resolve(res))
      .catch(err => reject(err.response.data));
  });
};
