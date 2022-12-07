var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelParent = new Schema({
    fullname: { 
        type: String, 
        required: true 
    },
    children: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "Student" 
    }],
});

module.exports = mongoose.model("ModelParent", ModelParent);