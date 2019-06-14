const question = require("../model/question.model");

module.exports = {
  loadTag: function(req, res) {
    let tag = question.schema.path("tag").enumValues;
    return res.json({ tag });
  }
};
