const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getDevice,
    getDeviceMdw,
    createDevice,
    deleteDevice,
    updateDevice,
    getAllDevice
} = require("../controllers/DeviceController");

router.route("/").post(createDevice).get(getAllDevice);
router.get('/:id', getDeviceMdw, getDevice)
router.delete('/:id', getDeviceMdw, deleteDevice)

router.put('/:id', getDeviceMdw, updateDevice);

module.exports = router;