import { useEffect, useRef } from 'react'
import OwnwerImg from "/src/assets/owner.jpg"
import ShopImage from "/src/assets/shop.jpg"
const features = [
  {
    emoji: '⚡',
    title: 'Lightning-Fast Service',
    desc: 'Quick dispensing with minimal wait time. We value your time as much as your health.',
  },
  {
    emoji: '🎨',
    title: 'Vast Medicine Range',
    desc: 'Over 5000+ medicines stocked — from generics to branded, we have it all under one roof.',
  },
  {
    emoji: '🧩',
    title: 'Wholesale & Retail',
    desc: 'Whether you need one strip or a full carton, we cater to both individual and bulk buyers.',
  },
  {
    emoji: '📖',
    title: 'Expert Guidance',
    desc: 'Our trained staff helps you find the right medicine at the right price, every time.',
  },
  {
    emoji: '📦',
    title: 'Affordable Pricing',
    desc: 'Committed to offering the most competitive rates in Madhubani district.',
  },
  {
    emoji: '🧠',
    title: 'Community First',
    desc: 'Serving Laukahi and surrounding areas with dedication and a community-first approach.',
  },
]

export default function About() {
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
    <section id="about" className="py-24 bg-gray-50" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About Our <span className="text-emerald-600">Center</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A visual collection of our most recent works — each piece crafted with intention, care, and dedication to your health.
          </p>
        </div>

        {/* Owner + Shop layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Shop image placeholder */}
          <div className="fade-in opacity-0 translate-y-6 transition-all duration-700 delay-100 w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/src/assets/shop.jpg"
                alt="NEW MEDICINE CENTER — Shop"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="font-black text-xl">NEW MEDICINE CENTER</div>
                <div className="text-emerald-300 text-sm">Block Chowk Laukahi, Madhubani</div>
              </div>
            </div>
          </div>

          {/* Owner info */}
          <div className="fade-in opacity-0 translate-y-6 transition-all duration-700 delay-200 w-full lg:w-1/2 text-left">
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <img
                  src="/src/assets/owner.jpg"
                  alt="Akhtarul Hassan"
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-emerald-100"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Owner</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Akhtarul Hassan</h3>
                <p className="text-emerald-600 font-semibold"></p>
                <p className="text-gray-400 text-sm">Founder & Proprietor</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to <strong className="text-emerald-700">NEW MEDICINE CENTER</strong> — your trusted pharmacy at Block Chowk Laukahi, Madhubani, Bihar. Established with the vision of making quality healthcare accessible to all, we serve thousands of families across the region every year.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Under the leadership of <strong>Akhtarul Hassan </strong>, we have built a reputation for honesty, affordability, and genuine care for our community. Whether you need medicines for a single prescription or bulk wholesale orders, we are here for you.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Licensed Pharmacy', 'Govt. Registered', 'Community Trusted'].map((tag) => (
                <span key={tag} className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="fade-in opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-emerald-100 transition-all"
              style={{ transitionDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-xl mb-4">
                {f.emoji}
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{f.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}