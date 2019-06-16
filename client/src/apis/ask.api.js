import axios from "axios";

export const postAsk = data => {
  return new Promise((resolve, reject) => {
    axios
      .post("/ask-new", data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
