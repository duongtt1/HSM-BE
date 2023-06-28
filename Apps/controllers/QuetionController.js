const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const QuetionModel = require("../models/QuetionModel");

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
    data = {
        "success": true,
        "inputTimer": "10",
        "data": [
            {
                "content": "Javascript là ngôn ngữ thông dịch hay biên dịch",
                "options": [
                    {
                        "description": "A. Thông dịch",
                    },
                    {
                        "description": "B. Biên dịch",
                    },
                    {
                        "description": "C. Cả hai dạng",
                    },
                    {
                        "description": "D. Không có dạng nào ở trên",
                    },
                ],
                "answer": 3,
            },
            {
                "content": "Javascript là ngôn ngữ kịch bản có dấu được mã nguồn không?",
                "options": [
                    {
                        "description": "A. Không dấu được vì các kịch bản chạy ở client.",
                    },
                    {
                        "description":
                            "B. Dấu được vì chương trình hoạt động độc lập với trình duyệt",
                    },
                    {
                        "description": "C. Hai phát biểu đều sai.",
                    },
                    {
                        "description": "D. Hai phát biểu đều đúng",
                    },
                ],
                "answer": 1,
            },

            {
                "content": "JavaScript được bắt đầu bằng?",
                "options": [
                    {
                        "description": "A. <scritp> …</script>",
                    },
                    {
                        "description": "B. <Javascript> …<Javascript>",
                    },
                    {
                        "description": "C. <java>  </java>",
                    },
                    {
                        "description": "D. Tất cả các dạng trên.",
                    },
                ],
                "answer": 4,
            },
            {
                "content": "Lệnh prompt trong Javascript để làm gì?",
                "options": [
                    {
                        "description": "A. Hiện một thông báo nhập thông tin",
                    },
                    {
                        "description": "B. Hiện một thông báo dạng yes, No",
                    },
                    {
                        "description": "C. Cả hai dạng trên",
                    },
                    {
                        "description": "D. Không có lệnh nào đúng",
                    },
                ],
                "answer": 1,
            },
            {
                "content": "Lệnh lặp for có dạng như thế nào?",
                "options": [
                    {
                        "description": "A. For ( biến = Giá trị đầu, Điều kiện, Giá trị tăng)",
                    },
                    {
                        "description": "B. For ( biến = Giá trị đầu, Giá trị tăng, điều kiện)",
                    },
                    {
                        "description": "C. For ( biến = Điều kiện, Giá trị tăng Giá trị cuối)",
                    },
                    {
                        "description": "D. Tất cả các dạng trên.",
                    },
                ],
                "answer": 1,
            }
        ]
    }
    res.status(200).json(data);
});

exports.addQuetionCustomDA = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true });
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


