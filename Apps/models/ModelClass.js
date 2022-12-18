var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelClass = new Schema({
    listStudent: [{ 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "ModelStudent" 
    }],
    nameClass: { 
        type: String 
    },
    codeClass: { 
        type: String 
    },
    documents: [{ type: String }],
    assignments: [{ 
        type: Schema.Types.ObjectId, 
        ref: "AssignmentModel" }],
    subject: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "SubjectModel" 
    },
    teachers: [{ 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "TeacherModel" 
    }],
});

module.exports = mongoose.model("ModelClass", ModelClass);