var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AssignmentModel = new Schema({
    class: [{ 
        type: Schema.Types.ObjectId, 
        ref: "ModelClass" 
    }],
    name: { 
        type: String 
    },
    idAssign: { 
        type: String 
    },
    quiz: [{}],
});

module.exports = mongoose.model("AssignmentModel", AssignmentModel);