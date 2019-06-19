const express = require("express");
const router = express.Router();

/******************************
 *  Auth Component
 ******************************/
const authJwt = require("../../midderware/jwtAuth.midderware");
const upload = require("../../config/multer.config");
const authController = require("../../controller/auth.controller");
/******************************
 *  ASK Component
 ******************************/
const uploadImgEditor = require("../../controller/upload.controller");
const askController = require("../../controller/ask.controller");
const tagLoadController = require("../../controller/loadTag.controller");
const validatorAsk = require("../../validators/users/post.validator");

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
router.post("/upload", authJwt, upload.any("images", 12), uploadImgEditor);

router.post("/ask-new", authJwt, validatorAsk, askController.article);
module.exports = router;
