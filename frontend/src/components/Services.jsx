import { useEffect, useRef } from 'react'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Wholesale Medicines',
    desc: 'Bulk supply of medicines at competitive wholesale prices for clinics, hospitals, and resellers across Bihar.',
    highlights: ['Bulk Discounts', 'Fast Delivery', 'All Major Brands'],
    color: 'emerald',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: 'Retail Medicines',
    desc: 'Single-prescription retail service for individuals and families with personalised attention and guidance.',
    highlights: ['Walk-in Welcome', 'Prescription Accepted', 'Generic Options'],
    color: 'blue',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Affordable Pricing',
    desc: 'We guarantee the most reasonable prices in Madhubani, making healthcare affordable for every household.',
    highlights: ['No Hidden Charges', 'Price Match', 'GST Included'],
    color: 'amber',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Prescription Services',
    desc: 'Bringing your doctor\'s prescription to life. We carefully verify and dispense as per medical advice.',
    highlights: ['Verified Dispensing', 'Patient Counseling', 'Follow-up Support'],
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Healthcare Products',
    desc: 'Beyond medicines — surgical items, health supplements, baby care, and personal hygiene products.',
    highlights: ['Surgical Items', 'Supplements', 'Baby Care'],
    color: 'rose',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Phone Enquiry',
    desc: 'Call us anytime for availability, pricing, or guidance. Our team is always ready to assist you.',
    highlights: ['Quick Response', 'Medicine Availability', 'Price Quote'],
    color: 'teal',
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'bg-emerald-100 text-emerald-600',
    tag: 'bg-emerald-50 text-emerald-600', hover: 'hover:border-emerald-200 hover:bg-emerald-50/50',
  },
  blue: {
    bg: 'bg-blue-50', border: 'border-blue-100', icon: 'bg-blue-100 text-blue-600',
    tag: 'bg-blue-50 text-blue-600', hover: 'hover:border-blue-200 hover:bg-blue-50/50',
  },
  amber: {
    bg: 'bg-amber-50', border: 'border-amber-100', icon: 'bg-amber-100 text-amber-600',
    tag: 'bg-amber-50 text-amber-600', hover: 'hover:border-amber-200 hover:bg-amber-50/50',
  },
  purple: {
    bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-100 text-purple-600',
    tag: 'bg-purple-50 text-purple-600', hover: 'hover:border-purple-200 hover:bg-purple-50/50',
  },
  rose: {
    bg: 'bg-rose-50', border: 'border-rose-100', icon: 'bg-rose-100 text-rose-600',
    tag: 'bg-rose-50 text-rose-600', hover: 'hover:border-rose-200 hover:bg-rose-50/50',
  },
  teal: {
    bg: 'bg-teal-50', border: 'border-teal-100', icon: 'bg-teal-100 text-teal-600',
    tag: 'bg-teal-50 text-teal-600', hover: 'hover:border-teal-200 hover:bg-teal-50/50',
  },
}

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('opacity-100', 'translate-y-0'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Our <span className="text-emerald-600">Services</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Comprehensive pharmacy services tailored to meet every need — from individual prescriptions to bulk wholesale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const c = colorMap[s.color]
            return (
              <div
                key={s.title}
                className={`fade-in opacity-0 translate-y-6 transition-all duration-700 group bg-white border ${c.border} rounded-2xl p-7 shadow-sm ${c.hover} hover:shadow-md hover:-translate-y-1`}
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <div className={`w-14 h-14 ${c.icon} rounded-2xl flex items-center justify-center mb-5`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.highlights.map((h) => (
                    <span key={h} className={`${c.tag} text-[11px] font-semibold px-2.5 py-1 rounded-full border ${c.border}`}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA banner */}
        <div className="fade-in opacity-0 translate-y-6 transition-all duration-700 mt-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-black mb-3">Need Medicines Now?</h3>
          <p className="text-emerald-100 mb-6 max-w-md mx-auto">Call us directly and our team will assist you with availability, pricing, and delivery options.</p>
          <a
            href="tel:7991175787"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-2xl text-lg hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.56.57 1 1 0 011 1v3.44a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.27 1.1z" />
            </svg>
            7991175787
          </a>
        </div>
      </div>
    </section>
  )
}