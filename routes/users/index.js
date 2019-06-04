const express = require("express");
const router = express.Router();

const authJwt = require("../../midderware/jwtAuth");
const upload = require("../../config/multer");

const authController = require("../../controller/auth.controller");

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

module.exports = router;
