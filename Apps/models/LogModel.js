var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogModel = new Schema({
	logs: [
        {
            type: String,
        }
    ],
    user: {
		type: Schema.Types.ObjectId,
		// required: true, 
		ref: "UserModel",
		unique: true
	},
}, { timestamps: true });

module.exports = mongoose.model("LogModel", LogModel);
