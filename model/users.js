const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const userSchema = Schema({
  name: {
    require: true,
    type: String,
    maxlength: 30
  },
  pwd: {
    require: true,
    type: String,
    minlength: 6
  },
  email: {
    require: true,
    type: String,
    unique: true,
    lowercase: true
  },
  sex: {
    type: String,
    enum: ["Nam", "Nữ", "Bí mật"],
    default: "Bí mật"
  },
  avatar: {
    type: String,
    default: "avatar_default.png"
  },
  dateCreate: {
    default: Date.now,
    type: Date // khi gui ngay len can chuyen toString()
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
