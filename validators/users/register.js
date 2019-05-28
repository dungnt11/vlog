const isEmpty = require("../isEmpty");
const isEmail = data => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(data).toLowerCase());
};

const isText = data => {
  let regex = /^[a-zA-Z]*$/;
  return regex.test(String(data).toLowerCase());
};
module.exports = checkRegister = data => {
  let err = {};
  let { name, pwd, email } = data;

  // bo khoang trang and tab
  name = String(name).trim();
  pwd = String(pwd).trim();
  email = String(email).trim();

  if (!isText(name)) {
    err.name = "Sai định dạng tên";
  }

  if (isEmpty(name)) {
    err.name = "Tên không được để trống";
  }
  if (isEmpty(pwd)) {
    err.pwd = "Mật khẩu không được để trống";
  }
  if (isEmpty(email)) {
    err.email = "Email không được để trống";
  }
  if (!isEmpty(email) && !isEmail(email)) {
    err.email = "Sai định dạng email";
  }
  return {
    isError: !isEmpty(err), // neu length === 0 la co loi xay ra
    err
  };
};