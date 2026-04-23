import { useState } from 'react'

// ── Change this to your Render/Railway URL after deploying ──────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters'
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone))
      e.phone = 'Enter a valid 10-digit Indian mobile number'
    if (!form.message.trim() || form.message.trim().length < 5)
      e.message = 'Message must be at least 5 characters'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    setServerMessage('')

    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setServerMessage(data.message)
      } else {
        // Handle validation errors from server
        if (data.errors) {
          const serverErrs = {}
          data.errors.forEach((err) => { serverErrs[err.field] = err.message })
          setErrors(serverErrs)
          setStatus('idle')
        } else {
          setStatus('error')
          setServerMessage(data.message || 'Something went wrong. Please try again.')
        }
      }
    } catch {
      setStatus('error')
      setServerMessage('Could not reach server. Please call us directly at 7991175787.')
    }
  }

  const handleReset = () => {
    setForm({ name: '', phone: '', message: '' })
    setErrors({})
    setStatus('idle')
    setServerMessage('')
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Contact <span className="text-emerald-600">Us</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We are available for questions, feedback, or collaboration. Let us know how we can help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info + Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Phone</p>
                    <a href="tel:7991175787" className="text-gray-800 font-bold text-lg hover:text-emerald-600 transition-colors">
                      7991175787
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Address</p>
                    <p className="text-gray-800 font-medium">Block Chowk Laukahi,<br />Madhubani — 847108, Bihar, India</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/917991175787" target="_blank" rel="noreferrer"
                      className="text-gray-800 font-medium hover:text-green-600 transition-colors">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-56">
              <iframe
                title="NEW MEDICINE CENTER Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.4762!2d86.0873!3d26.3540!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee782b6aaaaaa3%3A0x4e6d4c9a6e7a10c!2sLaukahi%2C%20Bihar%20847108!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0 }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">{serverMessage}</p>
                <button onClick={handleReset}
                  className="text-emerald-600 font-semibold text-sm hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

                {/* Server error banner */}
                {status === 'error' && (
                  <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {serverMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="10-digit mobile number" maxLength={10}
                      className={`w-full border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Ask about medicine availability, pricing, bulk orders..."
                      className={`w-full border ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}