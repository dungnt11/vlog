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
          res.status(404).json({ err: "Token sai" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  }
};
