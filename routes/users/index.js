const express = require("express");
const router = express.Router();

const db = require("../../model/users");
const checkRegister = require("../../validators/users/register");
const isEmpty = require("../../validators/isEmpty");

const checkValue = (req, res, next) => {
  const { isError, err } = checkRegister(req.body);
  if (isError) {
    res.status(401).json({ err });
  } else {
    next();
  }
};

/**
 * @Route POST /register
 * @Desc  register new user
 * @Access Public
 */
router.post("/register", checkValue, (req, res) => {
  const { name, pwd, email, avatar, dateCreate } = req.body;
  db.findOne({ email }).then(user => {
    // neu tim thay user
    if (user) {
      res.status(404).json({ email: "Email đã được đăng kí" });
    } else {
      // khoi tao doi tuong
      const newUser = new db({
        name,
        pwd,
        email,
        avatar,
        dateCreate
      });
      // hash password
      newUser.hashPwd(pwd, (err, newPwd) => {
        if (err) throw err;
        if (newPwd) newUser.pwd = newPwd;
      });
      // check avatar
      if (isEmpty(avatar)) {
        newUser.avatar = "/public/img/avatar_default.png";
      }
      newUser
        .save()
        .then(done => res.json({ msg: "Đăng kí thành công !" }))
        .catch(err => {
          console.log(err);
          res.json({ msg: "Đăng kí thất bại" });
        });
    }
    return;
  });
});

module.exports = router;
