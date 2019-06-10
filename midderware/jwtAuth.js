const jwt = require("jsonwebtoken");

const jwtConfig = require("../config/jwtToken");

module.exports = authJwt = function(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      jwtConfig.secret,
      (err, decode) => {
        if (err) {
          req.user = undefined;
          // err khi nguoi dung thay doi token ma khong trung key
          res.status(404).json({ err: "Token error" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ err: "Error Authentication !" });
  }
};
