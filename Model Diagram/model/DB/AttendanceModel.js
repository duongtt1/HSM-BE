var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AttendanceModel = new Schema({
	student: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
	class: { type: Schema.Types.ObjectId, required: true, ref: "ClassModel" },
	timeCheck: { type: Date },
	note: { type: String },
	isAttendance: { type: Boolean },
});
