const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ClassRoomModel = require("../models/ClassRoomModel");
const SubjectModel = require("../models/SubjectModel");
const UserModel = require("../models/UserModel");
const ClassModel = require("../models/ClassModel");
const DeviceModel = require("../models/DeviceModel");

exports.getInfoRoomFromIdDevice = asyncHandler(async (req, res, next) => {
    try {
        // data: [{
        //     "idSubject": "MH001",
        //     "nameSubject": "MATH",
        //     "idTeacher": "18520651",
        //     "nameTeacher": "Tu Thanh Duong",
        //     "idClass": "PH001",
        //     "nameClass": "10A1",
        //     "idRoom": "E21",
        //     "startTime": "2023-03-14T13:30:00.000+00:00",
        //     "endTime": "2023-03-14T17:45:00.000+00:00",
        //     "imgurl": [
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_1.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_2.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_5.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_6.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_3.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_4.jpg",
        //         "https://ik.imagekit.io/duongtt/smartclass/18520651_7.jpg",
        //     ]
        // }]


        // {
        //     "success": true,
        //     "data": [
        //         {
        //             "idSubject": "PH001",
        //             "nameSubject": "Nhap mon mach so",
        //             "idTeacher": "642323a2ef77c23b9f2ea4d8",
        //             "nameTeacher": "Tu Thanh Duong",
        //             "idClass": "642bc4435a02f5505a8579d5",
        //             "nameClass": "KTMT0001",
        //             "idRoom": "642b98d69ef42a20bf21292b",
        //             "nameRoom": "E21",
        //             "startTime": "2023-04-04T13:30:00.000Z",
        //             "endTime": "2023-04-04T17:30:00.000Z",
        //             "imgurl": [
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_1.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_2.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_5.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_6.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_3.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_4.jpg",
        //                 "https://ik.imagekit.io/duongtt/smartclass/18520651_7.jpg"
        //             ]
        //         }
        //     ]
        // }

        const idDevice = req.params.id;

        let cr = await DeviceModel.findById(idDevice).populate("room")
            .populate()
            .exec();
        if (cr == null) {
            res.status(400).json({ success: false });
        }
        console.log(cr);
        res.status(400).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});