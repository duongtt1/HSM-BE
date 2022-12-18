var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelNotification = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    student: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "ModelStudent" 
    },
    teacher: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "TeacherModel" 
    },
    parent: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        ref: "ModelParent" 
    },
});


module.exports = mongoose.model("ModelNotification", ModelNotification);