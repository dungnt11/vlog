const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  fromUser: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  toUser: {
    type: Schema.ObjectId,
    ref: "user"
  },
  contentCmt: {
    type: String,
    maxlength: 350,
    required: "Content comment need to required"
  },
  dateCmt: {
    type: Date,
    default: Date.now
  },
  voteCmt: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('comment', comment)