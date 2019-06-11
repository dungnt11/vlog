const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chat = new Schema({
  fromId: {
    type: Schema.ObjectId,
    ref: "user"
  },
  toId: {
    type: Schema.ObjectId,
    ref: "user"
  },
  content: {
    type: String,
    maxlength: 500,
    required: "Content chat need to required"
  },
  timeChat: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('chat', chat)