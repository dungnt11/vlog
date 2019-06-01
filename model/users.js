const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    require: true,
    type: String
  },
  pwd: {
    require: true,
    type: String
  },
  email: {
    require: true,
    type: String
  },
  sex: {
    type: String
  },
  avatar: {
    type: String
  },
  dateCreate: {
    default: Date.now,
    type: Date
  }
});
// hash password
userSchema.methods.hashPwd = (pwd, cb) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pwd, salt, function(err, hash) {
      if (err) throw cb(err, null);
      cb(null, hash);
    });
  });
};

// compare password
userSchema.methods.dehash = (pwd1, pwd2, cb) => {
  bcrypt.compare(pwd1, pwd2).then(result => cb(result));
};

module.exports = mongoose.model("user", userSchema);
