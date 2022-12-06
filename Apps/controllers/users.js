const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

const User = require("../models/User");

exports.getUsers = asyncHandler(async (req, res, next) => {
  await User.find().exec(function (err, persons) {
    if (err) {
      return next(
        new ErrorResponse(`Lỗi khi lấy danh sách người đăng ký`, 400)
      );
    } else {
      res.status(200).json({ success: true, data: persons });
    }
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new ErrorResponse(`Không tìm thấy người có id: ${req.params.id}`)
    );

  res.status(200).json({ success: true, data: user });
});

exports.createUser = asyncHandler(async (req, res, next) => {
    // console.log("first")
  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    context: "query",
  });

  if (!user) {
    return next(
      new ErrorResponse(`Không tìm thấy người có id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new ErrorResponse(`người có id: ${req.params.id} không có trong CSDL`)
    );

  await User.findByIdAndDelete(req.params.id).exec(function (err) {
    if (err) {
      return next(new ErrorHandler(`Delete không thành công!`, 400));
    }
    res.status(200).json({ success: true, data: user });
  });
});
