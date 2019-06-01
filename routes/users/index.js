const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const authJwt = require("../../midderware/jwtAuth");
const db = require("../../model/users");
const checkRegister = require("../../validators/users/register");
const checkLogin = require("../../validators/users/login");
const isEmpty = require("../../validators/isEmpty");
const jwtConfig = require("../../config/jwtToken");

// check validator login
const checkValueLogin = (req, res, next) => {
  const { isError, err } = checkLogin(req.body);
  if (isError) {
    res.status(401).json({ err });
  } else {
    next();
  }
};

// cau hinh lay file
function changeNameFile(str, newName) {
  const regex = /(.*)\.(jpg|png|jpeg)/gm;
  const subst = `${newName}.$2`;
  return str.replace(regex, subst);
}

function register(feild) {
  const { isError, err } = checkRegister(feild);
  if (isError) {
    throw err;
  }
}
const upload = multer({
  fileFilter: function(req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }

    cb(null, true);
  },
  storage
});
// cau hinh dia chi upload va ten file upload
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

/**
 * @Route POST /register
 * @Desc  register new user
 * @Access Public
 */

router.post("/register", upload.single("file"), (req, res) => {
  console.log(req)
  // const { name, email, pwd, sex, file, dateCreate } = req.body;
  // db.findOne({ email }).then(user => {
  //   // neu tim thay user
  //   if (user) {
  //     res.status(404).json({ email: "Email đã được đăng kí" });
  //   } else {
  //     // khoi tao doi tuong
  //     const newUser = new db({
  //       name,
  //       pwd,
  //       email,
  //       sex,
  //       avatar: file,
  //       dateCreate
  //     });
  //     // check avatar
  //     if (isEmpty(newUser.avatar)) {
  //       newUser.avatar = "/public/img/avatar_default.png";
  //     }
  //     // hash password
  //     newUser.hashPwd(pwd, (err, newPwd) => {
  //       if (err) throw err;
  //       if (newPwd) {
  //         newUser.pwd = newPwd;
  //         newUser
  //           .save()
  //           .then(() => res.json({ msg: "Đăng kí thành công !" }))
  //           .catch(err => {
  //             console.log(err);
  //             res.json({ msg: "Đăng kí thất bại" });
  //           });
  //       }
  //     });
  //   }
  //   return;
  // });
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
