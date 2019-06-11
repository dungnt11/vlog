const jwt = require("jsonwebtoken");
const path = require("path");

const db = require("../model/user.model");
const jwtConfig = require("../config/jwtToken.config");
const Resize = require("../routes/Resize");

module.exports = {
  register: async function(req, res) {
    const { name, email, pwd, sex } = req.body;
    /**
     * Check email
     */

    db.findOne({ email }).then(user => {
      if (user) {
        res.status(400).json({ err: { email: "Email đã được sử dụng" } });
        return;
      } else {
        (async function() {
          // folder upload
          const imagePath = path.join(__dirname, "../public/uploads");
          // call class Resize
          const fileUpload = new Resize(imagePath);

          if (req.file) {
            /**
             * Check duoi file
             */
            const filetypes = /\.(jpeg|jpg|png)$/;
            let checkExt = filetypes.test(req.file.originalname);
            if (!checkExt) {
              res.status(400).json({ err: { imgage: "Chỉ chấp nhận ảnh" } });
              return;
            }

            var avatar = await fileUpload.save(req.file.buffer);
          }
          const newUser = new db({
            name,
            email,
            pwd,
            sex,
            avatar
          });

          newUser.hashPwd(pwd, (err, newPwd) => {
            if (err) throw err;
            if (newPwd) {
              newUser.pwd = newPwd;
              newUser
                .save()
                .then(() => {
                  res.json({ msg: "Đăng kí thành công !" });
                })
                .catch(() => {
                  res.status(400).json({ msg: "Đăng kí thất bại" });
                });
            }
          });
        })();
      }
    });
  },

  login: (req, res) => {
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

              return res.json({ token: "Bearer " + token });
            }
          });
        } else {
          // neu email trung khop
          return res.status(404).json({ email: "Email không đúng" });
        }
      })
      .catch(err => {
        return res.status(500).json({ err: "Lỗi không xác định" + err });
      });
  }
};
