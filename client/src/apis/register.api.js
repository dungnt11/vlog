import axios from "axios";

export const registerApi = user => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return new Promise((resolve, reject) => {
    axios
      .post("/register", user, config)
      .then(res => resolve(res))
      .catch(err =>
        err.response.data ? reject(err.response.data) : reject(err)
      );
  });
};
