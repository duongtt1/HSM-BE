var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ScheduleModel = new Schema({
    startTime: { type: Date },
    endTime: { type: Date },
    idSubject: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: "SubjectModel"
    },
    idTeacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    idClass: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ClassModel"
    },
    idRoom: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ClassRoomModel"
    },
}, { timestamps: true });

module.exports = mongoose.model("ScheduleModel", ScheduleModel);