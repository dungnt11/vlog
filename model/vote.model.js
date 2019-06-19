const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vote = new Schema({
  userVote: [
    {
      type: Schema.ObjectId,
      required: true,
      ref: "user"
    }
  ],
  timeVote: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("vote", vote);
