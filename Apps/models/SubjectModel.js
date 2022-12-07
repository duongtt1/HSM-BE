var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubjectModel = new Schema({
    nameSubject: { 
        type: String, 
        required: true 
    },
    idSubject: { 
        type: String, 
        required: true 
    },
    class: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "ModelClass" 
    }],
});

module.exports = mongoose.model("SubjectModel", SubjectModel);