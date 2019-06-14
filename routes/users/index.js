const express = require("express");
const router = express.Router();

const authJwt = require("../../midderware/jwtAuth.midderware");
const upload = require("../../config/multer.config");

const authController = require("../../controller/auth.controller");
const tagLoadController = require("../../controller/loadTag.controller");
// validator midderware
const valid = require("../../validators/index");

/**
 * @Route POST /register
 * @Desc  register new user
 * @Access Private
 */

router.post(
  "/register",
  upload.single("image"),
  valid.checkValueRegister,
  authController.register
);

/**
 * @Route POST /login
 * @Desc  login user return jwt-token
 * @Access Private
 */
router.post("/login", valid.checkValueLogin, authController.login);

router.post("/test", authJwt, (req, res) => {
  return res.json({ msg: req.user });
});

/**
 * @Route POST /load-tag
 * @Desc load tag
 * @access public
 */

router.get("/load-tag", authJwt, tagLoadController.loadTag);
router.post("/upload", upload.any("images", 12), (req, res) => {
  console.log(req.files);
  res.json({
    msg: "File was uploaded",
    error: 0,
    images: ["/975fd98b-f4e5-4cd9-b085-1661ad7ce8f8.png"]
  });
});

module.exports = router;
