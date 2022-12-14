var mongoose = require("mongoose");
const { default: validator } = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var SchemaAdministrator = new Schema({
    fullname: { type: String, required: true },
    idAdmin: {
        type: String
    },
    token: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        trim: true,
        unique: true,
        // minlength: [6, "Tài khoản phải hơn 6 ký tự"],
        // maxlength: [30, "Tài khoản phải nhỏ hơn 30 ký tự"],
    },
});

SchemaAdministrator.pre("save", async function (next) {
    // generate token cho nguoi dang ky
    const user = this;
    if (!user.isModified("token")) {
        user.token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    }
    next();
});

SchemaAdministrator.index({ idTeacher: "text" });

SchemaAdministrator.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

SchemaAdministrator.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

SchemaAdministrator.methods.getSignedJwtToken = function () {
    return jwt.sign({ token: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("ModelAdministrator", SchemaAdministrator);