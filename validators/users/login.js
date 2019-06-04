const _ = require('lodash');

module.exports = checkLogin = data => {
  let err = {};
  const { email, pwd } = data;

  if (_.isEmpty(email)) {
    err.email = "Email không được để trống";
  }

  if (_.isEmpty(pwd)) {
    err.pwd = "Password không được để trống";
  }
  return {
    isError: !_.isEmpty(err), // neu length === 0 la co loi xay ra
    err
  };
};
