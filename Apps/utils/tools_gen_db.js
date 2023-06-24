require("dotenv").config();
const mongoose = require('mongoose')
const UserModel = require("../models/UserModel");
const ClassModel = require("../models/ClassModel");
const AssignModel = require("../models/AssignModel");
const QuetionModel = require("../models/QuetionModel");
const DocsModel = require("../models/DocsModel");
const ClassRoomModel = require("../models/ClassRoomModel");
const SubjectModel = require("../models/SubjectModel");

const DBconnection = async () => {
    const conn = await mongoose
        .connect("mongodb+srv://admin:admin@hybridclass.iemw7ln.mongodb.net/HSM?retryWrites=true", {
            useNewUrlParser: true,
            useUnifiedTopology: true, // if using cloud => true
            useCreateIndex: true,
            useFindAndModify: false
        })
        .catch(err => {
            console.log(`Can't connect to the DB`.red, err)
        })
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

DBconnection();

const generateUsers = async () => {
    try {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new UserModel({
                username: `student${i}`,
                password: "password",
                fullname: `Student ${i}`,
                school: "UIT",
                role: "student",
                userID: `student${i}`,
                phoneNumber: "123456789",
                email: `student${i}@example.com`,
                dayOfBirth: new Date("2000-01-01"),
                status: "offline",
                topics: [],
                avatar: "https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
            });
            users.push(user);
        }
        const createdUsers = await UserModel.insertMany(users);
        const createdUserIds = createdUsers.map(user => user._id);
        console.log("createdUserIds", createdUserIds);
        // await addStudentToClass("KTMT0001", createdUserIds);
        console.log("Users created successfully.");
    } catch (error) {
        // console.error("Error creating users:", error);
    }
};



async function addStudentToClass(classID, studentID) {
    await ClassModel.findOneAndUpdate({
        classID: classID
    }, {
        $push: {
            members: studentID
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            console.log(err);
        }
    });
}

generateUsers();
