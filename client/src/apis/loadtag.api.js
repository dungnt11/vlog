import axios from "axios";

export const loadTagApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/load-tag")
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  });
};
