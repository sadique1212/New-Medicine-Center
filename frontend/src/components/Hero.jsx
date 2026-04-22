import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width, height, imageData, data
    const SCALE = 3

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      width = Math.floor(canvas.width / SCALE)
      height = Math.floor(canvas.height / SCALE)
      imageData = ctx.createImageData(width, height)
      data = imageData.data
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const startTime = Date.now()
    const SIN_TABLE = new Float32Array(1024)
    const COS_TABLE = new Float32Array(1024)
    for (let i = 0; i < 1024; i++) {
      const angle = (i / 1024) * Math.PI * 2
      SIN_TABLE[i] = Math.sin(angle)
      COS_TABLE[i] = Math.cos(angle)
    }
    const fastSin = (x) => SIN_TABLE[Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023]
    const fastCos = (x) => COS_TABLE[Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023]

    const render = () => {
      const time = (Date.now() - startTime) * 0.0006
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height
          const uy = (2 * y - height) / height
          let a = 0, d = 0
          for (let i = 0; i < 3; i++) {
            a += fastCos(i - d + time * 0.4 - a * ux)
            d += fastSin(i * uy + a)
          }
          const wave = (fastSin(a) + fastCos(d)) * 0.5
          const intensity = 0.25 + 0.3 * wave
          const baseG = 0.4 + 0.2 * fastCos(ux + uy + time * 0.2)
          const baseB = 0.2 + 0.15 * fastSin(a * 1.2 + time * 0.15)
          const idx = (y * width + x) * 4
          data[idx] = Math.max(0, Math.min(255, (0.02 + 0.05 * wave) * intensity * 255))
          data[idx + 1] = Math.max(0, Math.min(255, (baseG + 0.15 * wave) * intensity * 255))
          data[idx + 2] = Math.max(0, Math.min(255, (baseB + 0.2 * wave) * intensity * 255))
          data[idx + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
      animId = requestAnimationFrame(render)
    }
    render()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const handleCall = () => { window.location.href = 'tel:7991175787' }
  const handleWhatsApp = () => { window.open('https://wa.me/917991175787', '_blank') }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Bihar&apos;s Trusted Pharmacy
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-lg mb-4">
          NEW MEDICINE
          <span className="block text-emerald-300">CENTER</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 font-light max-w-xl mx-auto mb-2 drop-shadow">
          Wholesale &amp; Retail Medicines at Reasonable Rates
        </p>
        <p className="text-sm text-white/70 mb-10">
          📍 Block Chowk Laukahi, Madhubani — Bihar
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCall}
            className="group w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 animate-bounce group-hover:animate-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.56.57 1 1 0 011 1v3.44a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.27 1.1z" />
            </svg>
            Call Now: 7991175787
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur border border-white/40 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { label: 'Years of Trust', value: '10+' },
            { label: 'Medicines Available', value: '5000+' },
            { label: 'Happy Customers', value: '50k+' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-emerald-300">{s.value}</div>
              <div className="text-white/70 text-xs mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}