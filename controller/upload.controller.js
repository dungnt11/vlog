const path = require("path");
const Resize = require("../routes/Resize");
const _ = require("lodash");
/**
 * Xu ly upload trong editor
 */

module.exports = async (req, res) => {
  // folder upload
  const imagePath = path.join(__dirname, "../public/uploads");
  // call class Resize
  const fileUpload = new Resize(imagePath);
  /**
   * dinh nghia file tra ve
   */
  if (req.files) {
    let data = [];
    let lengthData = req.files.length; // check do dai file ban dau
    _.forEach(req.files, img => {
      const filetypes = /\.(jpeg|jpg|png)$/;
      let checkExt = filetypes.test(img.originalname);
      if (!checkExt) {
        res.status(400).json({ err: { imgage: "Chỉ chấp nhận ảnh" } });
        reject({ err: { imgage: "Chỉ chấp nhận ảnh" } });
        return;
      } else {
        (async () => {
          let name = await fileUpload.save(img.buffer);
          data.push(name);
          if (data.length === lengthData) {
            /**
             * thuc hien upload file, neu upload 2 file thanh cong se gui ve client
             */
            res.json({
              msg: "File was uploaded",
              error: 0,
              images: data
            });
          }
        })();
      }
    });
  }
};
