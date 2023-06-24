const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ScheduleModel = require("../models/ScheduleModel");
const DeviceModel = require("../models/DeviceModel");
const UserModel = require("../models/UserModel");

exports.createSchedule = asyncHandler(async (req, res, next) => {
    try {
        const newSchedule = new ScheduleModel(req.body);
        const savedSchedule = await newSchedule.save();
        if (savedSchedule == null) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllSchedules = asyncHandler(async (req, res, next) => {
    try {
        const schedules = await ScheduleModel.find().populate("idSubject")
            .populate("idTeacher")
            .populate("idClass")
            .populate("idRoom");
        res.status(200).json({
            success: true,
            data: schedules
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllScheduleByDevice = asyncHandler(async (req, res, next) => {

    let currentDate = new Date();

    let device = await DeviceModel.findOne({ idDevice: req.params.id }).exec();
    try {
        const schedules = await ScheduleModel.find({
            // startTime: {
            //     $gte: currentDate,
            //     // $lt: currentDate
            // },
            idRoom: device.room
        }).populate("idSubject")
            .populate("idTeacher")
            .populate("idClass")
            .populate("idRoom");
        data = [];
        let scheduleTemp = {};
        for (let i = 0; i < schedules.length; i++) {
            scheduleTemp["idSubject"] = schedules[i].idSubject.idSubject;
            scheduleTemp["nameSubject"] = schedules[i].idSubject.nameSubject;
            scheduleTemp["idTeacher"] = schedules[i].idTeacher.username;
            scheduleTemp["nameTeacher"] = schedules[i].idTeacher.fullname;
            scheduleTemp["idClass"] = schedules[i].idClass.classID;
            scheduleTemp["nameClass"] = schedules[i].idClass.nameClass;
            scheduleTemp["idRoom"] = schedules[i].idRoom.idRoom;
            scheduleTemp["nameRoom"] = schedules[i].idRoom.nameRoom;
            scheduleTemp["startTime"] = schedules[i].startTime;
            scheduleTemp["endTime"] = schedules[i].endTime;
            scheduleTemp["imgurl"] = schedules[i].idTeacher.faces;
            data.push(scheduleTemp);
            scheduleTemp = {};
        }
        // console.log(data);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});


exports.getScheduleById = asyncHandler(async (req, res, next) => {
    try {
        const schedule = await ScheduleModel.findById(req.params.id)
            .populate("idSubject")
            .populate("idTeacher")
            .populate("idClass")
            .populate("idRoom");
        res.status(200).json({
            success: true,
            data: schedule
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getScheduleByTeacher = asyncHandler(async (req, res, next) => {
    try {
        _idTeacher = req.params.id;
        if (_idTeacher.length == 8) {
            gv = await UserModel.findOne({ username: _idTeacher }).exec();
            _idTeacher = gv._id;
        }

        let currentDate = new Date();
        const schedules = await ScheduleModel.find(
            {
                // startTime: {
                //     $gte: currentDate,
                // },
                idTeacher: _idTeacher
            }).populate("idSubject")
            .populate("idClass")
            .populate("idRoom")
            .populate("idTeacher").exec();

        // console.log(schedules[0].idTeacher.userID);
        data = [];
        let scheduleTemp = {};
        for (let i = 0; i < schedules.length; i++) {
            scheduleTemp["idClass"] = schedules[i].idClass.classID;
            scheduleTemp["nameClass"] = schedules[i].idClass.nameClass;
            scheduleTemp["nameTeacher"] = schedules[i].idTeacher.fullname;
            scheduleTemp["startTime"] = schedules[i].startTime.toISOString().slice(11, 16);;
            scheduleTemp["endTime"] = schedules[i].endTime.toISOString().slice(11, 16);;
            scheduleTemp["status"] = "unactive";
            data.push(scheduleTemp);
            scheduleTemp = {};
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

function getDayOfWeek(dateStr) {
    const dateObj = new Date(dateStr);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekIndex = dateObj.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
}


exports.getScheduleByTeacherID = asyncHandler(async (req, res, next) => {
    try {
        _idTeacher = req.params.id;
        if (_idTeacher.length == 8) {
            gv = await UserModel.findOne({ username: _idTeacher }).exec();
            _idTeacher = gv._id;
        }

        let currentDate = new Date();
        const schedules = await ScheduleModel.find(
            {
                // startTime: {
                //     $gte: currentDate,
                // },
                idTeacher: _idTeacher
            }).populate("idSubject")
            .populate("idClass")
            .populate("idRoom")
            .populate("idTeacher").exec();

        // console.log(schedules[0].idTeacher.userID);
        data = [];
        let scheduleTemp = {};
        for (let i = 0; i < schedules.length; i++) {
            scheduleTemp["idClass"] = schedules[i].idClass.classID;
            scheduleTemp["nameClass"] = schedules[i].idClass.nameClass;
            scheduleTemp["nameTeacher"] = schedules[i].idTeacher.fullname;
            scheduleTemp["startTime"] = schedules[i].startTime.toISOString().slice(11, 16);
            scheduleTemp["endTime"] = schedules[i].endTime.toISOString().slice(11, 16);
            scheduleTemp["day"] = getDayOfWeek(schedules[i].startTime);
            data.push(scheduleTemp);
            scheduleTemp = {};
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});