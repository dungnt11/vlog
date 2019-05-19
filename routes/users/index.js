const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authJwt = require("../../midderware/jwtAuth");

const db = require("../../model/users");
const checkRegister = require("../../validators/users/register");
const checkLogin = require("../../validators/users/login");
const isEmpty = require("../../validators/isEmpty");
const jwtConfig = require("../../config/jwtToken");
// check validator register
const checkValue = (req, res, next) => {
  const { isError, err } = checkRegister(req.body);
  if (isError) {
    res.status(401).json({ err });
  } else {
    next();
  }
};

// check validator login
const checkValueLogin = (req, res, next) => {
  const { isError, err } = checkLogin(req.body);
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
      // check avatar
      if (isEmpty(avatar)) {
        newUser.avatar = "/public/img/avatar_default.png";
      }
      // hash password
      newUser.hashPwd(pwd, (err, newPwd) => {
        if (err) throw err;
        if (newPwd) {
          newUser.pwd = newPwd;
          newUser
            .save()
            .then(() => res.json({ msg: "Đăng kí thành công !" }))
            .catch(err => {
              console.log(err);
              res.json({ msg: "Đăng kí thất bại" });
            });
        }
      });
    }
    return;
  });
});

/**
 * @Route POST /login
 * @Desc  login user return jwt-token
 * @Access Private
 */
router.post("/login", checkValueLogin, (req, res) => {
  const { email, pwd } = req.body;
  // tim email
  db.findOne({ email })
    .then(user => {
      if (user) {
        // so sanh mat khau
        let _db = new db();
        _db.dehash(pwd, user.pwd, done => {
          if (!done) {
            res.status(404).json({ pwd: "Mật khẩu sai" });
          } else {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            // add jwt
            let token = jwt.sign(payload, jwtConfig.secret, {
              expiresIn: jwtConfig.expires
            }); // expires : 1 hour
            res.json({ token: "Bearer " + token });
          }
        });
      } else {
        // neu email trung khop
        res.status(404).json({ email: "Email không đúng" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Lỗi không xác định" + err });
    });
});
// test
router.get("/hello", authJwt, (req, res) => {
  res.json({ msg: req.user });
});
module.exports = router;
