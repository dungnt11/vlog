const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const authJwt = require("../../midderware/jwtAuth");
const db = require("../../model/users");
const checkRegister = require("../../validators/users/register");
const checkLogin = require("../../validators/users/login");
const jwtConfig = require("../../config/jwtToken");

// kiểm tra dữ liệu login ( midderware )
const checkValueLogin = (req, res, next) => {
  const { isError, err } = checkLogin(req.body);
  if (isError) {
    res.status(401).json({ err });
  } else {
    next();
  }
};

function randomName() {
  // tạo tên lưu ảnh
  return Math.random()
    .toString(36)
    .substring(2, 15);
}

// cau hinh dia chi upload va ten file upload
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      randomName() +
        "-" +
        randomName() +
        "-" +
        randomName() +
        "-" +
        randomName() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    // kiểm tra file trước khi upload
    const { isError, err } = checkRegister(req.body); // kiểm tra bằng midderware
    if (isError) return cb(err);

    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      // kiểm tra đuôi file 1 lần nữa
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  }
});

/**
 * @Route POST /register
 * @Desc  register new user
 * @Access Public
 */

router.post(
  "/register",
  upload.single("file"),
  function(err, req, res, next) {
    // midderware xử lý lỗi từ upload.single
    if (err) {
      res.status(400).json({ err });
    } else next();
  },
  (req, res) => {
    let avatar = req.file.path.replace(/\/\//, "/");
    const { name, email, pwd, sex, dateCreate } = req.body;
    db.findOne({ email }).then(user => {
      // neu tim thay user
      if (user) {
        res.status(404).json({ email: "Email đã được đăng kí" });
      } else {
        // khoi tao doi tuong
        const newUser = new db({
          name,
          email,
          pwd,
          sex,
          avatar,
          dateCreate
        });
        // check avatar
        if (isEmpty(newUser.avatar)) {
          newUser.avatar = "/public/img/avatar_default.png";
        }
        // hash password
        newUser.hashPwd(pwd, (err, newPwd) => {
          if (err) throw err;
          if (newPwd) {
            newUser.pwd = newPwd;
            newUser
              .save()
              // .then(() => res.json({ msg: "Đăng kí thành công !" }))
              .then((user) => res.json({ msg: user }))
              .catch(err => {
                console.log(err);
                res.json({ msg: "Đăng kí thất bại" });
              });
          }
        });
      }
      return;
    });
  }
);

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
              expiresIn: Math.floor(Date.now() / 1000) + jwtConfig.expires
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
