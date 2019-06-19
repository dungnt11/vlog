const _ = require("lodash");

module.exports = (req, res, next) => {
  const { title, _tag, article } = req.body;

  if (_.isEmpty(title)) {
    res.status(400).json({
      err: {
        title: "Bài viết cần tiêu đề !"
      }
    });
  }

  if (title.length > 350) {
    res.status(400).json({
      err: {
        title: "Bài viết không được quá dài !"
      }
    });
  }

  if (_.isEmpty(_tag)) {
    res.status(400).json({
      err: {
        _tag: "Bài viết cần có tag !"
      }
    });
  }

  if (_tag.length >= 6) {
    res.status(400).json({
      err: {
        _tag: "Tối đa 5 tag !"
      }
    });
  }

  if (_.isEmpty(article)) {
    res.status(400).json({
      err: {
        article: "Bài viết cần có nội dung !"
      }
    });
  }

  if (article.length > 5000) {
    res.status(400).json({
      err: {
        article: "Bài viết không được vượt quá 5000 từ !"
      }
    });
  }

  next();
};
