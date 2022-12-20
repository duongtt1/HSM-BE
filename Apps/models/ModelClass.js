var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SchemaClass = new Schema({
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
        ref: "ModelAssignment"
    }],
    subject: {
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "ModelSubject"
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "ModelTeacher"
    }],
});

module.exports = mongoose.model("ModelClass", SchemaClass);