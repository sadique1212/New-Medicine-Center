require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { apiLimiter } = require('./middleware/rateLimiter')
const enquiriesRouter = require('./routes/enquiries')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Connect to MongoDB ──────────────────────────────────────────────────────
connectDB()

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '10kb' })) // prevent large payload attacks
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiLimiter) // general rate limiting on all /api routes

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/enquiries', enquiriesRouter)

// ─── Health check (Render/Railway uses this to confirm app is running) ───────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    app: 'NEW MEDICINE CENTER API',
    time: new Date().toISOString(),
  })
})

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🏥 NEW MEDICINE CENTER API is running',
    endpoints: {
      submitEnquiry: 'POST /api/enquiries',
      listEnquiries: 'GET  /api/enquiries',
      updateStatus:  'PATCH /api/enquiries/:id/status',
      health:        'GET  /health',
    },
  })
})

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.message)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})