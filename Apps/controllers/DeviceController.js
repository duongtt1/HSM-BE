const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const DeviceModel = require("../models/DeviceModel");

exports.createDevice = asyncHandler(async (req, res, next) => {
    try {
        const newDevice = new DeviceModel(req.body);
        const savedDevice = await newDevice.save();
        if (savedDevice == null ){
            res.status(400).json({ success: false, message: err.message });
        }else{
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllDevice = asyncHandler(async (req, res, next) => {
    try {
        const device = await DeviceModel.find();
        res.status(200).json({
            success: true,
            data: device
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteDevice = asyncHandler(async (req, res, next) => {
    try {
        await res.device.remove();
        res.json({ success: true, message: 'Deleted Device' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getDevice = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.device });
});

exports.updateDevice = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await DeviceModel.updateOne({ _id: res.device._id }, { $set: updateFields });
        const updatedDevice = await DeviceModel.findById(res.device._id);
        res.status(200).json({ success: true, data: updatedDevice });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single device by ID
exports.getDeviceMdw = asyncHandler(async (req, res, next) => {
    let device;
    try {
        device = await DeviceModel.findById(req.params.id);
        if (device == null) {
            return res.status(404).json({ success: false, message: 'Cannot find device' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find device' });
    }
    res.device = device;
    next();
});


