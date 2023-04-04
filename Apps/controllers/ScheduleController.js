const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ScheduleModel = require("../models/ScheduleModel");
const DeviceModel = require("../models/DeviceModel");

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

    let device = await DeviceModel.findById(req.params.id).exec();
    let idRoom = device.room;
    try {
        const schedules = await ScheduleModel.find({
            startTime: {
                $gte: currentDate,
                // $lt: currentDate
            },
            idRoom: idRoom
        }).populate("idSubject")
            .populate("idTeacher")
            .populate("idClass")
            .populate("idRoom");

        data = [];
        let scheduleTemp;
        for (let i = 0; i < schedules.length; i++) {
            scheduleTemp["idSubject"] = schedules[i].idSubject._id;
            scheduleTemp["nameSubject"] = schedules[i].idSubject.name;
            scheduleTemp["idTeacher"] = schedules[i].idTeacher._id;
            scheduleTemp["nameTeacher"] = schedules[i].idTeacher.name;
            scheduleTemp["idClass"] = schedules[i].idClass._id;
            scheduleTemp["nameClass"] = schedules[i].idClass.name;
            scheduleTemp["idRoom"] = schedules[i].idRoom._id;
            scheduleTemp["nameRoom"] = schedules[i].idRoom.name;
            scheduleTemp["startTime"] = schedules[i].startTime;
            scheduleTemp["endTime"] = schedules[i].endTime;
            scheduleTemp["imgurl"] = schedules[i].idTeacher.imgurl;
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