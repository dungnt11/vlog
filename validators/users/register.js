const _ = require("lodash");
const isEmail = data => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(data).toLowerCase());
};

module.exports = checkRegister = data => {
  let err = {};
  let { name, email, pwd, pwd1, sex, selectFile } = data;
  // bo khoang trang and tab
  name = _.trim(name);
  pwd = _.trim(pwd);
  pwd1 = _.trim(pwd1);
  email = _.trim(email);

  if (_.isEmpty(name)) {
    err.name = "Tên không được để trống";
  }
  if (_.isEmpty(pwd)) {
    err.pwd = "Mật khẩu không được để trống";
  }

  if (!_.isEqual(pwd, pwd1)) {
    err.pwd = "Mật khẩu không trùng khớp";
  }

  if (_.isEmpty(email)) {
    err.email = "Email không được để trống";
  }
  if (!isEmail(email)) {
    err.email = "Sai định dạng email";
  }
  return {
    isError: !isEmpty(err), // neu length === 0 la co loi xay ra
    err
  };
};
