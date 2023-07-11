const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ScheduleModel = require("../models/ScheduleModel");
const DeviceModel = require("../models/DeviceModel");
const UserModel = require("../models/UserModel");
const RoomModel = require("../models/ClassRoomModel");


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

exports.getScheduleByDeviceStudent = asyncHandler(async (req, res, next) => {
    let currentDate = new Date();
    let device = await DeviceModel.findOne({ idDevice: req.params.id }).exec();
    let student = await UserModel.findOne({ _id: device.manager }).exec();
    arrSchedules = [];
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
        
        for (let idx = 0; idx < schedules.length; idx++) {
            for(let i = 0; i < schedules[idx].idClass.members.length; i++){
                if(device.manager.equals(schedules[idx].idClass.members[i])){
                    arrSchedules.push(schedules[idx]);
                }
            }
        }
        // console.log(arrSchedules);
        data = [];
        let scheduleTemp = {};
        for (let i = 0; i < arrSchedules.length; i++) {
            scheduleTemp["idSubject"] = arrSchedules[i].idSubject.idSubject;
            scheduleTemp["nameSubject"] = arrSchedules[i].idSubject.nameSubject;
            scheduleTemp["idTeacher"] = arrSchedules[i].idTeacher.username;
            scheduleTemp["nameTeacher"] = arrSchedules[i].idTeacher.fullname;
            scheduleTemp["idClass"] = arrSchedules[i].idClass.classID;
            scheduleTemp["nameClass"] = arrSchedules[i].idClass.nameClass;
            scheduleTemp["idRoom"] = arrSchedules[i].idRoom.idRoom;
            scheduleTemp["nameRoom"] = arrSchedules[i].idRoom.nameRoom;
            scheduleTemp["startTime"] = arrSchedules[i].startTime;
            scheduleTemp["endTime"] = arrSchedules[i].endTime;
            scheduleTemp["imgurl"] = student.faces;
            scheduleTemp["nameStudent"] = student.fullname;
            scheduleTemp["idStudent"] = student.username;
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

exports.getScheduleByStudent = asyncHandler(async (req, res, next) => {
    try {
        _idStudent = req.params.id;
        if (_idStudent.length == 8) {
            hs = await UserModel.findOne({ username: _idStudent }).exec();
            _idStudent = hs._id;
        }
        let arrSchedules = [];
        let device = await DeviceModel.findOne({ manager: _idStudent }).exec();
        let room = await RoomModel.findOne({ _id: device.room }).exec();
        let schedules = await ScheduleModel.find({
            idRoom: room._id
        }).populate("idSubject")
            .populate("idTeacher")
            .populate("idClass")
            .populate("idRoom").exec();
        console.log(schedules);
        for (let idx = 0; idx < schedules.length; idx++) {
            for(let i = 0; i < schedules[idx].idClass.members.length; i++){
                if(device.manager.equals(schedules[idx].idClass.members[i])){
                    arrSchedules.push(schedules[idx]);
                }
            }
        }
        
        data = [];
        let scheduleTemp = {};
        for (let i = 0; i < arrSchedules.length; i++) {
            scheduleTemp["idClass"] = arrSchedules[i].idClass.classID;
            scheduleTemp["nameClass"] = arrSchedules[i].idClass.nameClass;
            scheduleTemp["nameTeacher"] = arrSchedules[i].idTeacher.fullname;
            scheduleTemp["startTime"] = arrSchedules[i].startTime.toISOString().slice(11, 16);
            scheduleTemp["endTime"] = arrSchedules[i].endTime.toISOString().slice(11, 16);
            scheduleTemp["day"] = getDayOfWeek(arrSchedules[i].startTime);
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