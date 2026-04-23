const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Enquiry = require('../models/Enquiry')
const { enquiryLimiter } = require('../middleware/rateLimiter')

// ─── Validation rules ───────────────────────────────────────────────────────
const validateEnquiry = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 60 }).withMessage('Name must be 2–60 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5, max: 1000 }).withMessage('Message must be 5–1000 characters'),
]

// ─── POST /api/enquiries — Submit a new enquiry ─────────────────────────────
router.post('/', enquiryLimiter, validateEnquiry, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { name, phone, message } = req.body

    // Save to MongoDB
    const enquiry = await Enquiry.create({
      name,
      phone,
      message,
      ipAddress: req.ip,
    })

    console.log(`📬 New enquiry from ${name} (${phone}) at ${new Date().toLocaleString('en-IN')}`)

    return res.status(201).json({
      success: true,
      message: `Thank you ${name}! We received your message and will contact you on ${phone} shortly.`,
      data: {
        id: enquiry._id,
        name: enquiry.name,
        createdAt: enquiry.createdAt,
      },
    })
  } catch (error) {
    console.error('❌ Error saving enquiry:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please call us directly at 7991175787.',
    })
  }
})

// ─── GET /api/enquiries — List all enquiries (admin use) ───────────────────
// In production you should protect this with an auth middleware
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = status ? { status } : {}

    const total = await Enquiry.countDocuments(filter)
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: enquiries,
    })
  } catch (error) {
    console.error('❌ Error fetching enquiries:', error.message)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// ─── PATCH /api/enquiries/:id/status — Update enquiry status ───────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' })
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' })
    }

    return res.status(200).json({ success: true, data: enquiry })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router