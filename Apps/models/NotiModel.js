var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotiModel = new Schema({
    user: { 
		type: Schema.Types.ObjectId, 
		required: true, 
		ref: "UserModel",
        // unique: true
	},
    noti: [{
        type: Object,
    }],
	
}, { timestamps: true });

module.exports = mongoose.model("NotiModel", NotiModel);