const rateLimit = require('express-rate-limit')

// Limit: max 5 enquiry submissions per IP per hour
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many submissions from this device. Please try again after 1 hour.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
})

module.exports = { enquiryLimiter, apiLimiter }