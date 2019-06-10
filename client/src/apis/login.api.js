import axios from "axios";

export const loginApi = user => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", user)
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  });
};
