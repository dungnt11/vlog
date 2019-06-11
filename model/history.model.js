const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const history = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "user"
  },
  action: {
    type: String,
    required: true
  },
  timeHistory: {
    type: Date,
    default: Date.now
  },
  idAction: {
    type: Schema.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("history", history);
