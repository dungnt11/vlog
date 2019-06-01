import axios from "axios";

export const registerApi = user => {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", user, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
