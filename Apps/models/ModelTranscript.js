var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelTranscript = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "ModelStudent"
    },
    subject: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'SubjectModel'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'TeacherModel'
    }
});

module.exports = mongoose.model("ModelTranscript", ModelTranscript);
