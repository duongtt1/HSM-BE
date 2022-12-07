var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelStudent = new Schema({
    fullname: { 
        type: String, 
        required: true 
    },
    idStudent: { 
        type: String, 
        required: true 
    },
    parents: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "Parent" 
    }],
    class: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "Class" 
    }],
    transcripts: [{ 
            type: Schema.Types.ObjectId, 
            required: true, 
            ref: "ModelTranscript" 
        }],
    notifications: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "ModelNotification" 
    }],
});

module.exports = mongoose.model("ModelStudent", ModelStudent);