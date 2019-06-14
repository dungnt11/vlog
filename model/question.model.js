const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = Schema({
  title: {
    type: String,
    required: "Title need to required",
    maxlength: 350,
    trim: true,
    uppercase: true
  },
  datePost: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
    enum: ["html", "css", "javascript", "sql", "nosql", "nodejs", "mongodb"],
    required: true
  },
  countReply: {
    type: Number,
    default: 0
  },
  vote: {
    type: Number,
    default: 0
  },
  watch: {
    type: Number,
    default: 0
  },
  comment: {
    type: Schema.ObjectId,
    ref: "comment"
  },
  authorPost: {
    type: Schema.ObjectId,
    ref: "user"
  },
  check: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("question", question);
