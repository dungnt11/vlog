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
  voteSum: {
    type: Number,
    required: true,
    default: 0
  },
  timeVote: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("vote", vote);
