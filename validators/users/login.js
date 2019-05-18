const isEmpty = require("../isEmpty");

module.exports = checkLogin = data => {
  let err = {};
  const { email, pwd } = data;

  if (isEmpty(email)) {
    err.email = "Email không được để trống";
  }

  if (isEmpty(pwd)) {
    err.pwd = "Password không được để trống";
  }
  return {
    isError: !isEmpty(err), // neu length === 0 la co loi xay ra
    err
  };
};
