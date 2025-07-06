"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import {
  Github,
  Mail,
  Phone,
  Twitter,
  Code,
  Server,
  Smartphone,
  ChevronDown,
  Menu,
  X,
  Zap,
  Cpu,
  Database,
  ExternalLink,
  Download,
  Star,
  ArrowRight,
  Terminal,
  User,
  Briefcase,
  MessageCircle,
  Home,
  Award,
  Layers,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Head from "next/head"
import dynamic from "next/dynamic"

// Dynamically import WebGL component for better performance
const WebGLBackground = dynamic(() => import("@/components/webgl-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-black" />,
})

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [webglEnabled, setWebglEnabled] = useState(true)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const skills = [
    { name: "JavaScript", icon: Code, level: 95, category: "Frontend", description: "ES6+, Modern JS frameworks" },
    { name: "TypeScript", icon: Terminal, level: 90, category: "Frontend", description: "Type-safe development" },
    { name: "React", icon: Layers, level: 95, category: "Frontend", description: "Hooks, Context, Redux" },
    { name: "Vue", icon: Monitor, level: 85, category: "Frontend", description: "Vue 3, Composition API" },
    { name: "Node.js", icon: Server, level: 90, category: "Backend", description: "Express, APIs, Microservices" },
    { name: "Express", icon: Database, level: 88, category: "Backend", description: "RESTful APIs, Middleware" },
    { name: "Python", icon: Zap, level: 85, category: "Backend", description: "Django, Flask, FastAPI" },
    { name: "Laravel", icon: Cpu, level: 80, category: "Backend", description: "MVC, Eloquent ORM" },
  ]

  const images = [
    { src: "/images/avatar-1.png", alt: "JinXie Avatar 1" },
    { src: "/images/avatar-2.png", alt: "JinXie Avatar 2" },
    { src: "/images/avatar-3.png", alt: "JinXie Avatar 3" },
    { src: "/images/avatar-4.png", alt: "JinXie Avatar 4" },
    { src: "/images/avatar-5.png", alt: "JinXie Avatar 5" },
    { src: "/images/avatar-6.png", alt: "JinXie Avatar 6" },
    { src: "/images/avatar-7.png", alt: "JinXie Avatar 7" },
    { src: "/images/avatar-8.png", alt: "JinXie Avatar 8" },
  ]

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Award },
    { name: "Contact", href: "#contact", icon: MessageCircle },
  ]

  const achievements = [
    { number: "50+", label: "Projects Completed", icon: Briefcase },
    { number: "3+", label: "Years Experience", icon: Award },
    { number: "8+", label: "Technologies Mastered", icon: Cpu },
    { number: "100%", label: "Client Satisfaction", icon: Star },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Disable WebGL on mobile for better performance
      setWebglEnabled(window.innerWidth >= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      const newScrollY = window.scrollY
      // Throttle scroll updates for better performance
      if (Math.abs(newScrollY - scrollY) > 5) {
        setScrollY(newScrollY)
      }

      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const getParallaxTransform = (speed: number) => {
    return isMobile ? "translateY(0px)" : `translateY(${scrollY * speed}px)`
  }

  const handleDownloadCV = () => {
    const cvContent = `
JinXie 7empest - Semi Fullstack Developer

Contact Information:
Email: jinxieprotocol@gmail.com
Phone: +62 889 7667 9490
GitHub: https://github.com/JinXieDevelopments
X (Twitter): https://x.com/Jinxieprotocol

About:
The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby

Technical Skills:
- JavaScript (ES6+, Modern frameworks)
- TypeScript (Type-safe development)
- React (Hooks, Context, Redux)
- Vue.js (Vue 3, Composition API)
- Node.js (Express, APIs, Microservices)
- Express (RESTful APIs, Middleware)
- Python (Django, Flask, FastAPI)
- Laravel (MVC, Eloquent ORM)

Experience:
Semi Fullstack Developer with 3+ years of experience
50+ projects completed with 100% client satisfaction
Expertise in modern web development technologies
    `

    const blob = new Blob([cvContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "JinXie_7empest_CV.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Head>
        <title>JinXie 7empest - Semi Fullstack Developer</title>
        <meta
          name="description"
          content="The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby"
        />
        <meta
          name="keywords"
          content="fullstack developer, web development, React, Node.js, JavaScript, TypeScript, programming, JinXie 7empest"
        />
        <meta name="author" content="JinXie 7empest" />
        <meta property="og:title" content="JinXie 7empest - Semi Fullstack Developer" />
        <meta
          property="og:description"
          content="The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jinxie7empest.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JinXie 7empest - Semi Fullstack Developer" />
        <meta
          name="twitter:description"
          content="The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby"
        />
        <meta name="twitter:creator" content="@Jinxieprotocol" />
        <link rel="canonical" href="https://jinxie7empest.vercel.app" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
        {/* WebGL Background */}
        {webglEnabled && (
          <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
            <WebGLBackground />
          </Suspense>
        )}

        {/* Fallback Background for Mobile */}
        {!webglEnabled && (
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  <div className="w-2 h-2 bg-red-500/20 rounded-full" />
                </div>
              ))}
            </div>
            <div
              className="absolute inset-0 opacity-15"
              style={{
                background: `radial-gradient(circle at 50% 50%, #dc2626 0%, transparent 50%)`,
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            />
          </div>
        )}

        {/* Enhanced Navigation with Icons */}
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/90 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-xl">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Brand Name */}
                <div className="flex items-center space-x-1 mr-8">
                  <Terminal className="h-5 w-5 text-red-400" />
                  <span className="text-lg font-extralight tracking-[0.1em] text-white">JinXie</span>
                  <span className="text-lg font-thin tracking-[0.1em] text-red-400">7empest</span>
                </div>

                {/* Desktop Navigation with Icons */}
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className={`relative px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg flex items-center space-x-2 ${
                        activeSection === item.href.substring(1)
                          ? "bg-red-500/20 text-red-400"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="h-3 w-3" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                  <div className="w-px h-6 bg-gray-700 mx-2" />
                  <Button
                    onClick={handleDownloadCV}
                    className="bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 px-4 py-2 text-sm font-light rounded-lg transition-all duration-300 h-auto flex items-center space-x-2"
                  >
                    <Download className="h-3 w-3" />
                    <span>CV</span>
                  </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center space-x-2">
                  <Button
                    onClick={handleDownloadCV}
                    className="bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 px-3 py-2 text-xs font-light rounded-lg h-auto"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white hover:bg-red-500/10 rounded-lg h-8 w-8 p-0"
                  >
                    {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dropdown with Icons */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 bg-black/95 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-xl">
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href.substring(1))}
                    className={`block w-full text-left px-4 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                      activeSection === item.href.substring(1)
                        ? "bg-red-500/20 text-red-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      <ArrowRight className="h-3 w-3 opacity-50" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20">
          <div
            ref={parallaxRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10 flex-1 flex items-center"
            style={{ transform: getParallaxTransform(0.05) }}
          >
            <div className="w-full">
              {/* Main Content */}
              <div className="text-center space-y-8 sm:space-y-12 mb-16 sm:mb-20">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-light tracking-[0.3em] text-red-400 uppercase">
                      <Terminal className="h-4 w-4" />
                      <span>Semi Fullstack Developer</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none">
                      <span className="text-white block">JinXie</span>
                      <span className="text-red-400 block">7empest</span>
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 leading-relaxed max-w-3xl mx-auto">
                    The Semi Fullstack Developer that keeps moving on programming languages. His journey is not only for
                    his hobby, but a passion for crafting digital experiences through innovative code and cutting-edge
                    technology solutions.
                  </p>
                </div>

                {/* CTA Buttons with Icons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm font-light tracking-[0.1em] transition-all duration-300 h-auto group shadow-lg shadow-red-600/25 flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>GET IN TOUCH</span>
                  </Button>
                  <Button
                    onClick={() => scrollToSection("about")}
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40 px-8 py-4 text-sm font-light tracking-[0.1em] transition-all duration-300 h-auto group flex items-center space-x-2"
                  >
                    <span>EXPLORE WORK</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex space-x-6 sm:space-x-8 justify-center items-center pt-4 sm:pt-8">
                  <a
                    href="https://github.com/JinXieDevelopments"
                    className="text-gray-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-500/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                  <a
                    href="https://x.com/Jinxieprotocol"
                    className="text-gray-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-500/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter) Profile"
                  >
                    <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                  <a
                    href="mailto:jinxieprotocol@gmail.com"
                    className="text-gray-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-500/10"
                    aria-label="Email Contact"
                  >
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                  <a
                    href="tel:+6288976679490"
                    className="text-gray-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-500/10"
                    aria-label="Phone Contact"
                  >
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </div>
              </div>

              {/* Achievement Stats with Contextual Icons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
                {achievements.map((achievement, index) => (
                  <Card
                    key={achievement.label}
                    className="bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-red-500/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8 text-red-400/60 mx-auto mb-2 sm:mb-3 group-hover:text-red-400 transition-colors duration-300" />
                      <div className="text-xl sm:text-2xl lg:text-3xl font-extralight text-white mb-1">
                        {achievement.number}
                      </div>
                      <div className="text-xs sm:text-sm font-light text-gray-400 tracking-wide">
                        {achievement.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative w-full py-8 sm:py-12 bg-gradient-to-r from-transparent via-red-500/5 to-transparent">
            <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
              <div className="flex animate-slide-smooth">
                {images.concat(images).map((image, index) => (
                  <div
                    key={`image-${index}`}
                    className="flex-shrink-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 mx-2 sm:mx-4 group"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-red-500/20 bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-500/20">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
            onClick={() => scrollToSection("about")}
          >
            <div className="flex flex-col items-center space-y-2 p-4 rounded-full hover:bg-red-500/10 transition-all duration-300">
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-400/60 group-hover:text-red-400 transition-colors duration-300" />
              <div className="text-xs text-gray-500 font-light tracking-wider">SCROLL</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ transform: getParallaxTransform(0.02) }}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-light tracking-[0.3em] text-red-400 uppercase mb-4">
                <User className="h-4 w-4" />
                <span>About</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-6 sm:mb-8">
                Digital Architect
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 max-w-4xl mx-auto leading-relaxed">
                A passionate Semi Fullstack Developer who keeps moving forward in the world of programming languages.
                This journey transcends mere hobby - it's about transforming ideas into elegant digital solutions
                through clean code, innovative thinking, and creating exceptional user experiences that drive business
                success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Monitor,
                  title: "Frontend",
                  description: "Crafting intuitive interfaces with React, Vue, and modern CSS architectures",
                  badges: ["React", "Vue.js", "CSS3"],
                },
                {
                  icon: Server,
                  title: "Backend",
                  description: "Building scalable systems with Node.js, Python, and robust database solutions",
                  badges: ["Node.js", "Python", "Laravel"],
                },
                {
                  icon: Smartphone,
                  title: "Mobile",
                  description: "Creating seamless mobile experiences with React Native and cross-platform solutions",
                  badges: ["React Native", "Flutter", "PWA"],
                },
              ].map((item, index) => (
                <Card
                  key={item.title}
                  className="bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-500 group hover:shadow-lg hover:shadow-red-500/10"
                >
                  <CardHeader className="text-center pb-6 sm:pb-8 pt-6 sm:pt-8">
                    <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-red-400/60 mx-auto mb-4 sm:mb-6 group-hover:text-red-400 transition-colors duration-300" />
                    <CardTitle className="text-white font-light text-lg sm:text-xl tracking-wide">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-6 sm:pb-8">
                    <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className="bg-red-500/10 text-red-400/80 border-red-500/20 text-xs hover:bg-red-500/20 transition-colors duration-300"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ transform: getParallaxTransform(-0.02) }}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-light tracking-[0.3em] text-red-400 uppercase mb-4">
                <Award className="h-4 w-4" />
                <span>Expertise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-6 sm:mb-8">
                Technical Mastery
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Comprehensive expertise across the full technology stack with years of hands-on experience
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-500 group hover:shadow-lg hover:shadow-red-500/10"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="text-center pb-4 sm:pb-6 pt-4 sm:pt-6">
                    <skill.icon className="h-8 w-8 sm:h-10 sm:w-10 text-red-400/60 mx-auto mb-3 sm:mb-4 group-hover:text-red-400 transition-colors duration-300" />
                    <CardTitle className="text-white font-light text-base sm:text-lg tracking-wide">
                      {skill.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-red-500/10 text-red-400/80 border-red-500/20 font-light text-xs"
                    >
                      {skill.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-4 sm:pb-6">
                    <p className="text-gray-500 text-xs sm:text-sm font-light text-center mb-3">{skill.description}</p>
                    <div className="w-full bg-gray-800/30 rounded-full h-1 mb-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500/60 to-red-400 h-1 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-center text-red-400/80 text-xs sm:text-sm font-light">{skill.level}%</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ transform: getParallaxTransform(0.01) }}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-light tracking-[0.3em] text-red-400 uppercase mb-4">
                <MessageCircle className="h-4 w-4" />
                <span>Connect</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-6 sm:mb-8">
                Let's Collaborate
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Ready to bring your vision to life through innovative technology and exceptional development expertise
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "jinxieprotocol@gmail.com",
                  href: "mailto:jinxieprotocol@gmail.com",
                  external: false,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+62 889 7667 9490",
                  href: "tel:+6288976679490",
                  external: false,
                  subtitle: "Indonesia",
                },
                {
                  icon: Github,
                  title: "GitHub",
                  content: "JinXieDevelopments",
                  href: "https://github.com/JinXieDevelopments",
                  external: true,
                },
                {
                  icon: Twitter,
                  title: "X",
                  content: "@Jinxieprotocol",
                  href: "https://x.com/Jinxieprotocol",
                  external: true,
                },
              ].map((contact, index) => (
                <Card
                  key={contact.title}
                  className="bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-red-500/10"
                >
                  <CardHeader className="pb-6 sm:pb-8 pt-6 sm:pt-8">
                    <contact.icon className="h-10 w-10 sm:h-12 sm:w-12 text-red-400/60 mx-auto mb-4 sm:mb-6 group-hover:text-red-400 transition-colors duration-300" />
                    <CardTitle className="text-white font-light text-base sm:text-lg tracking-wide">
                      {contact.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 sm:pb-8">
                    <a
                      href={contact.href}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 font-light text-xs sm:text-sm break-all group-hover:underline"
                      target={contact.external ? "_blank" : undefined}
                      rel={contact.external ? "noopener noreferrer" : undefined}
                    >
                      {contact.content}
                    </a>
                    {contact.subtitle && <div className="mt-2 text-xs text-gray-600">{contact.subtitle}</div>}
                    {contact.external && (
                      <div className="mt-2">
                        <ExternalLink className="h-3 w-3 text-gray-600 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16 sm:mt-20">
              <Button
                onClick={() => window.open("mailto:jinxieprotocol@gmail.com", "_blank")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm font-light tracking-[0.1em] transition-all duration-300 h-auto group shadow-lg shadow-red-600/25 flex items-center space-x-2"
              >
                <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>START A PROJECT</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-red-500/10 py-8 sm:py-12 relative bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Github, href: "https://github.com/JinXieDevelopments", label: "GitHub" },
                  { icon: Twitter, href: "https://x.com/Jinxieprotocol", label: "X (Twitter)" },
                  { icon: Mail, href: "mailto:jinxieprotocol@gmail.com", label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-500 hover:text-red-400 transition-colors duration-300 p-2 rounded-full hover:bg-red-500/10"
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="text-gray-500 font-light text-xs sm:text-sm tracking-wide">
                © 2024 JinXie 7empest — Crafted with precision, passion, and cutting-edge technology
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
