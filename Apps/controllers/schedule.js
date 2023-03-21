const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Register user
 */
exports.getScheduleByIdTeacher = asyncHandler(async (req, res, next) => {
    data = {
        success: true,
        data: [
            {
                nameClass: "IT001",
                idClass: "IT001.MTCL.2",
                startTime: "07:30",
                endTime: "09:45",
                status: "unactive",
            },
            {
                nameClass: "IT007",
                idClass: "IT007.MTCL.2",
                startTime: "10:00",
                endTime: "11:30",
                status: "active",
            },
        ],
    };
    res.status(200).json(data);
});
