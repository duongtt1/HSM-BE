var mongoose = require("mongoose");
const { default: validator } = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    fullname: {
        type: String,
        // required: true 
    },
    idStudent: {
        type: String,
        // required: true 
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    password: {
        type: String,
        // required: true,
        trim: true,
        unique: true,
        // minlength: [6, "Tài khoản phải hơn 6 ký tự"],
        // maxlength: [30, "Tài khoản phải nhỏ hơn 30 ký tự"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Famale"],
    },
    parents: [{
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "Parent"
    }],
    class: [{
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "Class"
    }],
    transcripts: [{
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "ModelTranscript"
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        // required: true, 
        ref: "ModelNotification"
    }],
});

StudentSchema.pre("save", async function (next) {
    // generate token cho nguoi dang ky
    const user = this;
    if (!user.isModified("token")) {
        console.log("token");
        user.token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    }
    next();
});

StudentSchema.index({ idStudent: "text" });

StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

StudentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ token: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("ModelStudent", StudentSchema);