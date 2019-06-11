const checkRegister = require("../validators/users/login");
const checkLogin = require("../validators/users/login");

module.exports = {
  checkValueRegister: (req, res, next) => {
    const { isError, err } = checkRegister(req.body);
    if (isError) {
      res.status(401).json({ err });
    } else {
      next();
    }
  },

  checkValueLogin: (req, res, next) => {
    const { isError, err } = checkLogin(req.body);
    if (isError) {
      res.status(401).json({ err });
    } else {
      next();
    }
  }
};
