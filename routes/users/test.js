// --------------------------- REGISTER ----------------------

function randomName() {
  // tạo tên lưu ảnh
  return Math.random()
    .toString(36)
    .substring(2, 15);
}

function _nameFileChange(file) {
  return (
    randomName() +
    "-" +
    randomName() +
    "-" +
    randomName() +
    "-" +
    randomName() +
    path.extname(file.originalname)
  );
}

const storage = multer.diskStorage({
  // cau hinh multer upload
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, _nameFileChange(file));
  }
});
function checkBeforeUpload(req, file, cb) {
  const { isError, err } = checkRegister(req.body); // kiểm tra  { name, email, pwd, pwd1, sex }
  if (isError) {
    return cb(err);
  }
  if (file) {
    // check duoi file
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb({ images: "Only images are allowed" });
    }
    cb(null, true); // upload file
  } else {
    cb(null, false); // khong upload file
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    return checkBeforeUpload(req, file, cb);
  }
});

function _midErr(err, req, res, next) {
  // midderware xử lý lỗi từ upload.single
  if (err) {
    res.status(400).json({ err });
  } else next();
}

router.post("/register", upload.single("file"), _midErr, (req, res) => {
  if (req.file) {
    var avatar = req.file.path.replace(/\/\//, "/");
  } else {
    var avatar = "/public/img/avatar_default.png";
  }
  const { name, email, pwd, sex } = req.body;
  const newUser = new db({
    name,
    email,
    pwd,
    sex,
    avatar
  });
  newUser.hashPwd(pwd, (err, newPwd) => {
    if (err) throw err;
    if (newPwd) {
      newUser.pwd = newPwd;
      newUser
        .save()
        .then(() => res.json({ msg: "Đăng kí thành công !" }))
        .catch(() => {
          res.json({ msg: "Đăng kí thất bại" });
        });
    }
  });
});
