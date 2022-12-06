const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = {
    ...err // lấy tất cả err
  }

  error.message = err.message
  console.log(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose trùng key
  if (err.code === 11000) {
    const message = 'Giá trị bạn nhập vào đã bị trùng'
    console.log(err)
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = []
    Object.values(err.errors).forEach(errr => {
      message.push({
        field: errr.properties.path,
        message: errr.message
      })
    })
    error = new ErrorResponse(null, 400, message)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.messageWithField || error.message || 'Server Error'
  })
}

module.exports = errorHandler
