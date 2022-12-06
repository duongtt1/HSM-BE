const multer = require("multer");
const moment = require("moment");
const Regex = require("regex");

const regex_check_img = new Regex(/\.(jpg|png|jpeg)$/);
const regex_check_file = new Regex(/\.(doc|docx|pdf|xlsx|xls|xltx|xlt)$/);
moment.locale("vi");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const arrExt = ["doc", "docx", "pdf", "xlsx", "xls", "xltx", "xlt"];
    const arrImg = ["jpg", "png", "jpeg"];
    console.log(file);
    let ext = file.originalname.split(".")[1];
    if (arrImg.includes(ext)) {
      cb(null, __dirname + "/../storage/image/avatar");
    } else if (arrExt.includes(ext)) {
      cb(null, __dirname + "/../storage/fileRecord");
    } else {
      cb(null, __dirname + "/../storage/another");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (req.body.event == "imgAvatar") {
    if (regex_check_img.test(file.originalname)) {
      cb(
        new Error(
          "Vui lòng chọn lại định dạng file, bạn chỉ có thể chọn file ảnh"
        )
      );
    } else {
      imgName = Date.now().toString() + "-" + file.originalname;
      cb(null, true);
    }
  } else if (req.body.event == "fileRecord") {
    if (regex_check_file.test(file.originalname)) {
      cb(
        new Error(
          "Vui lòng chọn lại định dạng file, bạn chỉ có thể chọn file pdf, word, excel"
        )
      );
    } else {
      imgName = Date.now().toString() + "-" + file.originalname;
      cb(null, true);
    }
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 30, // 30Mb
  },
});

module.exports = upload;
