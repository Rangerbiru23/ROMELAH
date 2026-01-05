'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [countersAnimated, setCountersAnimated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Counter animation
      const statsSection = document.querySelector('.stats')
      if (statsSection && !countersAnimated) {
        const statsSectionTop = statsSection.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        
        if (statsSectionTop < windowHeight - 100) {
          setCountersAnimated(true)
          const counters = document.querySelectorAll('.counter')
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0')
            const duration = 2000
            const increment = target / (duration / 16)
            let current = 0

            const updateCounter = () => {
              current += increment
              if (current < target) {
                counter.textContent = Math.floor(current)
                requestAnimationFrame(updateCounter)
              } else {
                counter.textContent = target
              }
            }

            updateCounter()
          })
        }
      }

      // Reveal animation
      const revealElements = document.querySelectorAll('.reveal')
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        const revealPoint = 100

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('load', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [countersAnimated])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      setIsMobileMenuOpen(false)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const button = (e.target as HTMLFormElement).querySelector('button[type="submit"]')
    if (button) {
      const originalText = button.innerHTML
      button.innerHTML = 'Mengirim...'
      button.setAttribute('disabled', 'true')

      setTimeout(() => {
        alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.')
        ;(e.target as HTMLFormElement).reset()
        button.innerHTML = originalText
        button.removeAttribute('disabled')
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <style jsx global>{`
        :root {
          --white: #ffffff;
          --light-gray: #f8f9fa;
          --medium-gray: #e9ecef;
          --dark-gray: #6c757d;
          --black: #1a1a1a;
          --accent: #ff6b4a;
          --accent-hover: #e55a3a;
          --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: var(--white);
          color: var(--black);
          line-height: 1.7;
          overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; }
        h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
        h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); }

        p {
          color: var(--dark-gray);
          font-weight: 400;
        }

        a {
          text-decoration: none;
          color: inherit;
          transition: var(--transition);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .container-wide {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: var(--transition);
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
          padding: 16px 0;
        }

        .navbar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .logo span {
          color: var(--accent);
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--dark-gray);
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: var(--transition);
        }

        .nav-links a:hover {
          color: var(--black);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          padding: 10px 24px;
          background: var(--black);
          color: var(--white);
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 100px;
          transition: var(--transition);
        }

        .nav-cta:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 10px;
        }

        .mobile-toggle span {
          width: 24px;
          height: 2px;
          background: var(--black);
          transition: var(--transition);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }

        .hero .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 24px;
        }

        .hero-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--accent);
        }

        .hero h1 {
          margin-bottom: 24px;
        }

        .hero h1 span {
          display: block;
        }

        .hero-text {
          font-size: 1.125rem;
          max-width: 480px;
          margin-bottom: 40px;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: var(--black);
          color: var(--white);
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 100px;
          transition: var(--transition);
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 74, 0.3);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: transparent;
          color: var(--black);
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--medium-gray);
          border-radius: 100px;
          transition: var(--transition);
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: var(--black);
          transform: translateY(-2px);
        }

        .hero-image {
          position: relative;
          height: 600px;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .hero-image::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 1px solid var(--medium-gray);
          border-radius: 8px;
          z-index: -1;
        }

        .about {
          padding: 120px 0;
          background: var(--light-gray);
        }

        .about .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .about-image {
          position: relative;
        }

        .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 8px;
        }

        .about-badge {
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 160px;
          height: 160px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .about-badge span:first-child {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .about-badge span:last-child {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .about-content {
          padding: 20px 0;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .section-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--accent);
        }

        .about-content h2 {
          margin-bottom: 24px;
        }

        .about-content p {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 40px;
        }

        .about-feature {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .about-feature svg {
          width: 20px;
          height: 20px;
          color: var(--accent);
          flex-shrink: 0;
        }

        .about-feature span {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--black);
        }

        .stats {
          padding: 80px 0;
          background: var(--white);
          border-top: 1px solid var(--medium-gray);
          border-bottom: 1px solid var(--medium-gray);
        }

        .stats .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--black);
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-number span {
          color: var(--accent);
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--dark-gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .services {
          padding: 120px 0;
          background: var(--white);
        }

        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 60px;
        }

        .section-header h2 {
          margin-bottom: 16px;
        }

        .section-header p {
          font-size: 1rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .service-card {
          padding: 40px;
          background: var(--light-gray);
          border-radius: 8px;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--transition);
        }

        .service-card:hover {
          background: var(--white);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          transform: translateY(-8px);
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          border-radius: 12px;
          margin-bottom: 24px;
          transition: var(--transition);
        }

        .service-card:hover .service-icon {
          background: var(--accent);
        }

        .service-icon svg {
          width: 24px;
          height: 24px;
          color: var(--accent);
          transition: var(--transition);
        }

        .service-card:hover .service-icon svg {
          color: var(--white);
        }

        .service-card h3 {
          margin-bottom: 12px;
          color: var(--black);
        }

        .service-card p {
          font-size: 0.875rem;
          line-height: 1.7;
        }

        .contact {
          padding: 120px 0;
          background: var(--black);
          color: var(--white);
        }

        .contact .container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
        }

        .contact-content h2 {
          color: var(--white);
          margin-bottom: 24px;
        }

        .contact-content > p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px;
          font-size: 1rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          flex-shrink: 0;
        }

        .contact-icon svg {
          width: 18px;
          height: 18px;
          color: var(--accent);
        }

        .contact-item h4 {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .contact-item p,
        .contact-item a {
          font-size: 0.875rem;
          color: var(--white);
          line-height: 1.6;
        }

        .contact-item a:hover {
          color: var(--accent);
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 8px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--white);
          font-family: inherit;
          font-size: 0.875rem;
          transition: var(--transition);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }

        .form-group select option {
          background: var(--black);
          color: var(--white);
        }

        .contact-form .btn-primary {
          width: 100%;
          justify-content: center;
          padding: 18px 32px;
          background: var(--accent);
        }

        .contact-form .btn-primary:hover {
          background: var(--accent-hover);
        }

        .footer {
          padding: 60px 0 30px;
          background: var(--black);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand .logo {
          color: var(--white);
          margin-bottom: 20px;
          display: inline-block;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .footer-social a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: var(--transition);
        }

        .footer-social a:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .footer-social svg {
          width: 18px;
          height: 18px;
          color: var(--white);
        }

        .footer-column h4 {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--white);
          margin-bottom: 20px;
        }

        .footer-column ul {
          list-style: none;
        }

        .footer-column li {
          margin-bottom: 12px;
        }

        .footer-column a {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-column a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom p {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-legal a {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-legal a:hover {
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .hero .container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-image {
            height: 400px;
          }

          .about .container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .stats .container {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .contact .container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .nav-links.active {
            display: flex;
          }

          .nav-cta {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .hero {
            padding: 100px 0 60px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: flex-start;
          }

          .about-badge {
            width: 120px;
            height: 120px;
            bottom: -20px;
            right: -10px;
          }

          .about-badge span:first-child {
            font-size: 2rem;
          }

          .about-features {
            grid-template-columns: 1fr;
          }

          .stats .container {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo">ROMELAH<span>.</span></a>
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>Tentang</a></li>
            <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Layanan</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Kontak</a></li>
          </ul>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="nav-cta">Hubungi Kami</a>
          <div className="mobile-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-label reveal">Perdagangan Besar Gas Elpiji</div>
            <h1 className="reveal reveal-delay-1">
              <span>Supplier Gas</span>
              <span>Terpercaya</span>
            </h1>
            <p className="hero-text reveal reveal-delay-2">
              ROMELAH adalah supplier gas elpiji terkemuka di Jember. Kami menyediakan gas elpiji berkualitas dengan harga kompetitif dan pengiriman tepat waktu untuk kebutuhan rumah tangga dan industri.
            </p>
            <div className="hero-buttons reveal reveal-delay-3">
              <a href="#contact" className="btn-primary">
                Pesan Sekarang
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#services" className="btn-secondary">Lihat Layanan</a>
            </div>
          </div>
          <div className="hero-image reveal reveal-delay-2">
            <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200" alt="Gas Elpiji"/>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-image reveal">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" alt="Gas Storage"/>
            <div className="about-badge">
              <span>10+</span>
              <span>Tahun Pengalaman</span>
            </div>
          </div>
          <div className="about-content">
            <div className="section-label reveal">Tentang Kami</div>
            <h2 className="reveal reveal-delay-1">Supplier Gas Elpiji Profesional</h2>
            <p className="reveal reveal-delay-2">
              ROMELAH adalah perusahaan perdagangan besar gas elpiji yang berlokasi di Kepanjen, Gumukmas, Jember. Kami telah melayani kebutuhan gas elpiji untuk rumah tangga, usaha kecil, dan industri selama lebih dari 10 tahun.
            </p>
            <p className="reveal reveal-delay-2">
              Dengan komitmen pada kualitas dan pelayanan terbaik, kami menjadi mitra terpercaya untuk supply gas elpiji di wilayah Jember dan sekitarnya.
            </p>
            <div className="about-features reveal reveal-delay-3">
              <div className="about-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Produk Berkualitas</span>
              </div>
              <div className="about-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Harga Kompetitif</span>
              </div>
              <div className="about-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Pengiriman Tepat Waktu</span>
              </div>
              <div className="about-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Pelayanan 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stat-item reveal">
            <div className="stat-number"><span className="counter" data-target="1000">0</span><span>+</span></div>
            <div className="stat-label">Pelanggan Setia</div>
          </div>
          <div className="stat-item reveal reveal-delay-1">
            <div className="stat-number"><span className="counter" data-target="50000">0</span><span>+</span></div>
            <div className="stat-label">Tabung Gas Terjual</div>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <div className="stat-number"><span className="counter" data-target="15">0</span></div>
            <div className="stat-label">Tim Pengiriman</div>
          </div>
          <div className="stat-item reveal reveal-delay-3">
            <div className="stat-number"><span className="counter" data-target="99">0</span><span>%</span></div>
            <div className="stat-label">Kepuasan Pelanggan</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <div className="section-label reveal">Layanan Kami</div>
            <h2 className="reveal reveal-delay-1">Solusi Gas Lengkap</h2>
            <p className="reveal reveal-delay-2">Berbagai layanan gas elpiji untuk memenuhi kebutuhan Anda.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Gas 3 Kg</h3>
              <p>Gas elpiji 3 kg untuk kebutuhan rumah tangga dengan harga subsidi dan kualitas terjamin.</p>
            </div>
            <div className="service-card reveal reveal-delay-1">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Gas 5.5 Kg</h3>
              <p>Gas elpiji 5.5 kg ideal untuk usaha kecil dan menengah dengan kapasitas yang lebih besar.</p>
            </div>
            <div className="service-card reveal reveal-delay-2">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Gas 12 Kg</h3>
              <p>Gas elpiji 12 kg untuk kebutuhan komersial dan industri dengan daya tahan panjang.</p>
            </div>
            <div className="service-card reveal reveal-delay-1">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Antar Langsung</h3>
              <p>Layanan pengiriman langsung ke lokasi Anda dengan tim yang berpengalaman dan tepat waktu.</p>
            </div>
            <div className="service-card reveal reveal-delay-2">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Kualitas Terjamin</h3>
              <p>Produk gas elpiji bersertifikat dan melalui quality control yang ketat untuk keamanan Anda.</p>
            </div>
            <div className="service-card reveal reveal-delay-3">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3>Layanan Darurat</h3>
              <p>Siaga 24 jam untuk kebutuhan darurat dan penggantian tabung gas sewaktu-waktu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-content">
            <div className="section-label reveal" style={{color: 'var(--accent)'}}>Hubungi Kami</div>
            <h2 className="reveal reveal-delay-1">Pesan Gas Elpiji Sekarang</h2>
            <p className="reveal reveal-delay-2">Butuh gas elpiji? Hubungi kami untuk pemesanan dan informasi lebih lanjut.</p>
            <div className="contact-info reveal reveal-delay-3">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Alamat</h4>
                  <p>DUSUN KRAJAN RT 002 RW 002,<br/>Desa/Kelurahan Kepanjen,<br/>Kec. Gumukmas, Kab. Jember,<br/>Provinsi Jawa Timur</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Telepon</h4>
                  <a href="tel:+6282382466214">0823 8246 6214</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@romelah-gas.com</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama Anda" required/>
              </div>
              <div className="form-group">
                <label>Nomor Telepon</label>
                <input type="tel" placeholder="08xx xxxx xxxx" required/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Jenis Gas</label>
                <select required>
                  <option value="">Pilih jenis gas</option>
                  <option value="3kg">Gas 3 Kg</option>
                  <option value="5kg">Gas 5.5 Kg</option>
                  <option value="12kg">Gas 12 Kg</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div className="form-group">
                <label>Jumlah Pesanan</label>
                <input type="number" placeholder="Jumlah tabung" min="1" required/>
              </div>
            </div>
            <div className="form-group">
              <label>Alamat Pengiriman</label>
              <textarea placeholder="Masukkan alamat lengkap pengiriman..." required/>
            </div>
            <button type="submit" className="btn-primary">
              Kirim Pesanan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">ROMELAH<span>.</span></a>
              <p>Perusahaan perdagangan besar gas elpiji terpercaya di Jember, menyediakan kebutuhan gas untuk rumah tangga dan industri dengan kualitas terjamin.</p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4>Layanan</h4>
              <ul>
                <li><a href="#services">Gas 3 Kg</a></li>
                <li><a href="#services">Gas 5.5 Kg</a></li>
                <li><a href="#services">Gas 12 Kg</a></li>
                <li><a href="#services">Pengiriman</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Perusahaan</h4>
              <ul>
                <li><a href="#about">Tentang Kami</a></li>
                <li><a href="#contact">Kontak</a></li>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Syarat & Ketentuan</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Kontak</h4>
              <ul>
                <li><a href="tel:+6282382466214">0823 8246 6214</a></li>
                <li><a href="#">Kepanjen, Gumukmas</a></li>
                <li><a href="#">Jember, Jawa Timur</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ROMELAH. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}