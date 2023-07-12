var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ParentModel = new Schema({
	student: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "UserModel",
        // unique: true
    },
    phoneNumber: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("ParentModel", ParentModel);