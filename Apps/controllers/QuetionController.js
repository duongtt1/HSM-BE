const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs');
const path = require('path');
//! Models
const QuetionModel = require("../models/QuetionModel");


function readJSONFromFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

function writeJSONToFile(filePath, jsonData) {
    try {
        const jsonStr = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(filePath, jsonStr, 'utf8');
        console.log('Data written to JSON file successfully.');
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
}

exports.createQuetion = asyncHandler(async (req, res, next) => {
    try {
        const newQue = new QuetionModel(req.body);
        const savedQue = await newQue.save();
        if (savedQue == null) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllQuetions = asyncHandler(async (req, res, next) => {
    try {
        const quetions = await QuetionModel.find();
        res.status(200).json({
            success: true,
            data: quetions
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteQuetion = asyncHandler(async (req, res, next) => {
    try {
        await res.quetion.remove();
        res.json({ success: true, message: 'Deleted quetion' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getQuetion = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.quetion });
});

exports.updateQuetion = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await QuetionModel.updateOne({ _id: res.quetion._id }, { $set: updateFields });
        const updatedQue = await QuetionModel.findById(res.quetion._id);
        res.status(200).json({ success: true, data: updatedQue });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

exports.getQuetionCustomDA = asyncHandler(async (req, res, next) => {
    const relativePath = '../mocks/quetions.json';
    const filePath = path.join(__dirname, relativePath);
    data = readJSONFromFile(filePath);
    console.log(data);
    res.status(200).json(data.questions);
});

exports.addQuetionCustomDA = asyncHandler(async (req, res, next) => {
    const relativePath = '../mocks/quetions.json';
    const filePath = path.join(__dirname, relativePath);
    data = readJSONFromFile(filePath);
    let q = {};
    q.answer = req.body.correctAnswer;
    // q.inputTimer = req.body.inputTimer;
    q.options = req.body.options;
    q.content = req.body.tittle;
    data.questions.data.push(q);
    writeJSONToFile(filePath, data);
    res.status(200).json({
        "success" : true
    });
})

// Middleware function to get a single user by ID
exports.getQuetionMdw = asyncHandler(async (req, res, next) => {
    let quetion;
    try {
        quetion = await QuetionModel.findById(req.params.id);
        if (quetion == null) {
            return res.status(400).json({ success: false, message: 'Cannot find quetion' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find quetion' });
    }
    res.quetion = quetion;
    next();
});


