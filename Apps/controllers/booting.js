const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get admin by ID
 */
exports.getInfoBooting = asyncHandler(async (req, res, next) => {
	console.log("go to route booting")
    data_booting = {
        "data": [{
            "idSubject":"MH001",
            "nameSubject":"MATH",
            "idTeacher":"18520651",
            "nameTeacher":"Tu Thanh Duong",
            "idClass":"PH001",
            "nameClass":"10A1",
            "idRoom":"E21",
            "startTime":"2023-03-14T13:30:00.000+00:00",
            "endTime":"2023-03-14T17:45:00.000+00:00",
            "imgurl": [
                "https://ik.imagekit.io/duongtt/smartclass/18520651_1.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_2.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_5.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_6.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_3.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_4.jpg",
                "https://ik.imagekit.io/duongtt/smartclass/18520651_7.jpg",
            ]
        }]
    } 
    res.status(200).json({ success: true, data: data_booting });
});

