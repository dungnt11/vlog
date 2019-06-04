const jwt = require("jsonwebtoken");
const path = require("path");

const db = require("../model/users");
const jwtConfig = require("../config/jwtToken");
const Resize = require("../routes/Resize");


module.exports = {
  register: async function(req, res) {
    // folder upload
    const imagePath = path.join(__dirname, "../../public/uploads");
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }
    const filename = await fileUpload.save(req.file.buffer);

    return res.status(200).json({ name: filename });
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
  }
};
