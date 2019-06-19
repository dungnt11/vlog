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
  timePost: {
    type: Date,
    default: Date.now
  },
  article: {
    type: String,
    require: "Need to required article",
    maxlength: 5000
  },
  tag: {
    type: String,
    enum: ["html", "css", "javascript", "sql", "nosql", "nodejs", "mongodb"]
  },
  _tag: {
    type: Array,
    require: true
  },
  countReply: {
    type: Number,
    default: 0
  },
  vote: {
    type: Schema.ObjectId,
    ref: "vote"
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
