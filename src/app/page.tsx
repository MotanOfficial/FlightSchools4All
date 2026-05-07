"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, Suspense, useMemo } from "react";
import { countriesData, getCountryById } from "@/lib/schools-data";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Plane,
  ArrowLeft,
  ExternalLink,
  MapPin,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Globe,
  Users,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

/* ─────────────── Animated background dots & grid ─────────────── */
function BackgroundElements() {
  const elements = useMemo(() => {
    const items: { width: number; height: number; left: string; top: string; duration: number; delay: number; type: "dot" | "plane" | "meteor" }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 25; i++) {
      items.push({
        width: rand() * 4 + 2,
        height: rand() * 4 + 2,
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        duration: rand() * 5 + 5,
        delay: rand() * 5,
        type: rand() > 0.85 ? "plane" : "dot",
      });
    }
    // Add 2 rare meteors
    for (let i = 0; i < 2; i++) {
      items.push({
        width: 2,
        height: 2,
        left: `${rand() * 100}%`,
        top: `${rand() * 20}%`,
        duration: rand() * 2 + 3,
        delay: rand() * 20 + 5,
        type: "meteor",
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white" />
      
      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, #0369a1 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {elements.map((el, i) => {
        if (el.type === "meteor") {
          return (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[100px] bg-gradient-to-b from-sky-400 to-transparent blur-[1px]"
              style={{
                left: el.left,
                top: el.top,
                rotate: "45deg",
              }}
              animate={{
                x: [0, 1000],
                y: [0, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                ease: "linear",
                delay: el.delay,
                repeatDelay: Math.random() * 10 + 10,
              }}
            />
          );
        }

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${el.type === "plane" ? "bg-sky-400/40" : "bg-sky-200/40"}`}
            style={{
              width: el.type === "plane" ? el.width * 2 : el.width,
              height: el.type === "plane" ? el.height / 2 : el.height,
              left: el.left,
              top: el.top,
            }}
            animate={el.type === "plane" ? {
              x: [0, 200, 0],
              y: [0, -50, 0],
              opacity: [0, 0.6, 0],
            } : {
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: el.type === "plane" ? el.duration * 2 : el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────── Navigation Header ─────────────── */
function Navbar({ onNavigateHome, currentView, onSelectCountry }: { onNavigateHome: () => void; currentView: string; onSelectCountry: (id: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-sky-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 hover:opacity-80 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="FlightSchools4All Logo"
                className="h-10 w-auto rounded-lg shadow-sm"
              />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl font-black text-sky-900 tracking-tight">
              FlightSchools<span className="text-sky-500">4All</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {currentView !== "home" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateHome}
                className="text-sky-700 hover:text-sky-900 hover:bg-sky-50 font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            )}
            <Separator orientation="vertical" className="h-6 mx-2 bg-sky-100" />
            {countriesData.slice(0, 5).map((c) => (
              <Button
                key={c.id}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSelectCountry(c.id);
                }}
                className={`text-sm px-4 rounded-full transition-all ${
                  currentView === c.id
                    ? "bg-sky-900 text-white font-bold shadow-lg shadow-sky-900/20"
                    : "text-sky-700 hover:text-sky-900 hover:bg-sky-50 font-bold"
                }`}
              >
                <span className="mr-2 opacity-80">{c.flagEmoji}</span>
                {c.name}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-sky-700 hover:bg-sky-50 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-sky-50 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {currentView !== "home" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sky-700 font-bold h-12 rounded-xl"
                  onClick={() => {
                    onNavigateHome();
                    setMobileMenuOpen(false);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-3" />
                  Home
                </Button>
              )}
              <div className="pt-2 pb-1 px-4 text-[10px] font-black uppercase tracking-widest text-sky-300">
                Explore Destinations
              </div>
              {countriesData.map((c) => (
                <Button
                  key={c.id}
                  variant="ghost"
                  className={`w-full justify-start h-12 rounded-xl transition-all ${
                    currentView === c.id
                      ? "bg-sky-900 text-white font-bold shadow-lg"
                      : "text-sky-700 font-bold"
                  }`}
                  onClick={() => {
                    onSelectCountry(c.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="text-xl mr-3">{c.flagEmoji}</span>
                  {c.name}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────── Parallax image wrapper ─────────────── */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-full object-cover will-change-transform"
      style={{ y }}
    />
  );
}

/* ─────────────── Bouncing scroll indicator ─────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={() =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <span className="text-sky-300 text-[10px] tracking-[0.3em] uppercase font-bold opacity-70 group-hover:opacity-100 transition-opacity">
        Explore
      </span>
      <motion.div
        className="w-6 h-10 border-2 border-sky-300/30 rounded-full flex justify-center p-1"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div 
          className="w-1 h-2 bg-sky-300 rounded-full"
          animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Hero Section ─────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Parallax background image with animated gradient overlay */}
      <div className="absolute inset-0">
        <ParallaxImage src="/images/hero.png" alt="Student pilots with training aircraft" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(12,74,110,0.92) 0%, rgba(12,74,110,0.75) 50%, rgba(7,89,133,0.6) 100%)",
              "linear-gradient(135deg, rgba(6,95,158,0.92) 0%, rgba(12,74,110,0.75) 50%, rgba(5,150,105,0.4) 100%)",
              "linear-gradient(135deg, rgba(12,74,110,0.92) 0%, rgba(12,74,110,0.75) 50%, rgba(7,89,133,0.6) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated Radar Effect */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-sky-400/10 rounded-full"
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-sky-400/10 rounded-full"
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plane className="w-4 h-4 text-sky-300" />
              </motion.div>
              <span className="text-sky-300 font-bold tracking-widest uppercase text-[10px]">
                Europe's Premier Flight Directory
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
            >
              Elevate Your <br />
              <span className="bg-gradient-to-r from-sky-300 via-emerald-300 to-sky-300 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Aviation Career
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl text-sky-100/80 leading-relaxed mb-10 max-w-xl"
            >
              Discover and compare top EASA-approved flight schools across Europe. Your journey from student pilot to captain starts here.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-400 text-white border-none h-14 px-8 text-base font-bold group relative overflow-hidden shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Schools
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </Button>
              <Button
              size="lg"
              variant="outline"
              className="bg-white/90 border-sky-200 text-sky-900 hover:bg-white hover:border-sky-400 backdrop-blur-sm h-14 px-8 text-base font-bold transition-all shadow-md"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
            </motion.div>
          </motion.div>

          {/* Right side - decorative elements or floating cards */}
          <div className="hidden lg:block relative h-[500px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-0 right-0 w-full h-full"
            >
              {/* Floating Feature Cards */}
              <motion.div 
                className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">EASA Verified</p>
                    <p className="text-sky-200 text-xs">Official Training Partners</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Pan-European</p>
                    <p className="text-sky-200 text-xs">5+ Countries Included</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bouncing scroll indicator */}
      <ScrollIndicator />

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60V20C360 60 720 0 1080 30C1260 45 1380 50 1440 40V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────── Flight Path Section ─────────────── */
function FlightPathSection() {
  const steps = [
    {
      title: "PPL (Private Pilot License)",
      desc: "The foundation of your journey. Learn to fly single-engine aircraft for personal use.",
      duration: "3-6 Months",
      icon: Plane,
    },
    {
      title: "CPL (Commercial Pilot License)",
      desc: "Master advanced maneuvers and night flying. Start your career as a professional pilot.",
      duration: "12-18 Months",
      icon: GraduationCap,
    },
    {
      title: "ATPL (Airline Transport Pilot License)",
      desc: "The highest level of aircraft pilot certification. Ready to command large commercial airliners.",
      duration: "24+ Months",
      icon: Globe,
    },
  ];

  return (
    <section className="py-24 bg-sky-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 mb-4 px-4 py-1">
            Career Roadmap
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Your Flight Training Path</h2>
          <p className="text-sky-200 text-lg max-w-2xl mx-auto">
            From your first discovery flight to the captain's seat, we guide you through every milestone.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/50 to-sky-500/0 -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{step.title}</h3>
                <p className="text-sky-200/70 text-sm leading-relaxed mb-6">{step.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                  Estimated: {step.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Testimonials Section ─────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Student Pilot, Spain",
      content: "FlightSchools4All made it so easy to compare prices between schools in Madrid and Barcelona. Found my perfect academy in days!",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    {
      name: "Maria Kowalski",
      role: "First Officer, Poland",
      content: "The EASA verification status gave me peace of mind. I knew I was looking at legitimate, high-quality training centers.",
      avatar: "https://i.pravatar.cc/150?u=maria",
    },
    {
      name: "David Smith",
      role: "PPL Holder, UK",
      content: "Brilliant resource. The search filters helped me find a school that specialized in the specific modules I needed.",
      avatar: "https://i.pravatar.cc/150?u=david",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-sky-900 mb-4">Trusted by Future Pilots</h2>
          <p className="text-gray-500 text-lg">Hear from students who started their journey with us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-sky-50/50 rounded-3xl border border-sky-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-sky-900 leading-none">{t.name}</h4>
                  <p className="text-xs text-sky-600 mt-1 font-medium">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed flex-1">"{t.content}"</p>
              <div className="flex gap-1 mt-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Newsletter Section ─────────────── */
function NewsletterSection() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-[3rem] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-sky-900/30">
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Take Off?</h2>
            <p className="text-sky-100 text-lg mb-10 max-w-xl mx-auto">
              Join 1,000+ aspiring pilots and get the latest news on school openings, discounts, and aviation guides.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-sky-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm transition-all"
              />
              <Button className="bg-white text-sky-900 hover:bg-sky-50 px-8 py-4 h-auto rounded-2xl font-black shadow-lg shadow-black/10">
                Subscribe
              </Button>
            </form>
            <p className="text-sky-300/60 text-[10px] mt-6 uppercase tracking-[0.2em] font-bold">
              No spam. Just aviation excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Stats Counter ─────────────── */
function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-sky-100 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-sky-600" />
      </div>
      <span className="text-3xl font-black text-sky-900 mb-1">{value}</span>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </motion.div>
  );
}

/* ─────────────── About Section ─────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-none mb-4 px-4 py-1">
              About FlightSchools4All
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-sky-900 mb-6 tracking-tight">
              Simplifying Your Path <br />
              <span className="text-sky-600">to the Cockpit</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Navigating the world of flight training can be overwhelming. We've built a comprehensive platform that brings together Europe's finest EASA-approved flight schools, allowing you to compare locations, courses, and requirements in one place.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Verified Schools", desc: "Every listing is manually verified for EASA compliance.", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
                { title: "Transparent Pricing", desc: "Get insights into training costs and hidden fees.", icon: AlertCircle, color: "text-sky-500", bg: "bg-sky-50" },
                { title: "Global Opportunities", desc: "Schools ranging from local clubs to international academies.", icon: Globe, color: "text-amber-500", bg: "bg-amber-50" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-sky-50/50 transition-colors group"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sky-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/10 border border-sky-100">
              <img
                src="/images/planes.png"
                alt="Training aircraft lineup"
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent" />
            </div>
            
            {/* Floating Achievement */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 sm:right-6 bg-white p-6 rounded-2xl shadow-xl border border-sky-50 z-20 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <p className="text-2xl font-black text-sky-900 leading-none">50+</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Schools Listed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <StatItem icon={Globe} value="5+" label="Countries" />
          <StatItem icon={GraduationCap} value="50+" label="Flight Schools" />
          <StatItem icon={Users} value="1000+" label="Student Reach" />
          <StatItem icon={CheckCircle2} value="100%" label="EASA Verified" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Country Card ─────────────── */
function CountryCard({
  country,
  index,
  onSelect,
}: {
  country: (typeof countriesData)[0];
  index: number;
  onSelect: (id: string) => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 border-sky-100 bg-white/50 backdrop-blur-sm"
        onClick={() => onSelect(country.id)}
      >
        <div className={`grid md:grid-cols-2 ${!isEven ? "md:direction-rtl" : ""}`}>
          {/* Image side */}
          <div
            className={`relative h-72 md:h-96 overflow-hidden ${
              !isEven ? "md:order-2" : ""
            }`}
          >
            <img
              src={country.image}
              alt={`${country.name} aviation`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <span className="text-5xl drop-shadow-lg">{country.flagEmoji}</span>
            </div>
          </div>

          {/* Text side */}
          <div className={`p-8 sm:p-10 flex flex-col justify-center ${!isEven ? "md:order-1 text-right" : ""}`}>
            <div className={`flex items-center gap-3 mb-4 ${!isEven ? "justify-end" : ""}`}>
              <h3 className="text-3xl font-black text-sky-900 tracking-tight">{country.name}</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">{country.description}</p>
            {country.highlight && (
              <div className={`flex items-center gap-2 mb-8 ${!isEven ? "justify-end" : ""}`}>
                <div className="w-1 h-6 bg-sky-500 rounded-full" />
                <p className="text-sky-700 font-bold text-xl">{country.highlight}</p>
              </div>
            )}
            <div className={`flex items-center gap-2 text-sky-600 group-hover:text-sky-400 font-bold transition-colors ${!isEven ? "justify-end" : ""}`}>
              <span>Explore {country.schools.length} Schools</span>
              <ChevronRight className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${!isEven ? "rotate-180 group-hover:-translate-x-2" : ""}`} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─────────────── Countries Section ─────────────── */
function CountriesSection({ onSelectCountry }: { onSelectCountry: (id: string) => void }) {
  return (
    <section id="countries" className="py-24 sm:py-32 bg-sky-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-none mb-4 px-4 py-1">
            Regional Hubs
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-sky-900 mb-6 tracking-tight">
            Top Aviation Destinations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a country to see detailed school listings, estimated training costs, and local aviation regulations.
          </p>
        </motion.div>

        <div className="space-y-12">
          {countriesData.map((country, index) => (
            <CountryCard
              key={country.id}
              country={country}
              index={index}
              onSelect={onSelectCountry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Flight School Card ─────────────── */
function FlightSchoolCard({ school, index }: { school: (typeof countriesData)[0]["schools"][0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-sky-100 group h-full flex flex-col bg-white/80 backdrop-blur-sm">
        {/* School header with gradient */}
        <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 p-6 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-black text-white leading-tight">{school.name}</h3>
              {school.shortName && school.shortName !== school.name && (
                <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mt-2 opacity-80">{school.shortName}</p>
              )}
            </div>
            <Badge
              variant="outline"
              className={
                school.hasVerifiedWebsite
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shrink-0 backdrop-blur-sm px-3 py-1"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30 shrink-0 backdrop-blur-sm px-3 py-1"
              }
            >
              {school.hasVerifiedWebsite ? (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {school.hasVerifiedWebsite ? "Verified" : "Pending"}
              </span>
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm">{school.description}</p>
          <Separator className="mb-6 bg-sky-50" />
          <div className="flex items-center justify-between mt-auto">
            {school.website !== "#" ? (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sky-600 hover:text-sky-400 font-bold transition-colors group/link text-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Academy</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 text-gray-400 font-bold text-sm">
                <Globe className="w-4 h-4" />
                Website coming soon
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────────── Country Detail Page ─────────────── */
function CountryDetailPage({
  country,
  onBack,
}: {
  country: (typeof countriesData)[0];
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSchools = useMemo(() => {
    return country.schools.filter(school => 
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (school.shortName && school.shortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      school.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [country.schools, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Country hero */}
      <div className="relative h-[400px] sm:h-[450px] overflow-hidden">
        <img
          src={country.image}
          alt={`${country.name} aviation`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/10 mb-6 -ml-2 font-bold backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Destinations
              </Button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <span className="text-7xl sm:text-8xl drop-shadow-2xl">{country.flagEmoji}</span>
                <div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                    {country.name}
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                    <Badge className="bg-sky-500 text-white border-none px-3 py-1 font-bold">
                      {country.schools.length} Training Centers
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white backdrop-blur-sm px-3 py-1 font-bold">
                      EASA Approved
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search & Info Bar */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-sky-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
              <input 
                type="text"
                placeholder="Search by school name or keyword..."
                className="w-full pl-10 pr-4 py-2 bg-sky-50/50 border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                All EASA Verified
              </span>
              <Separator orientation="vertical" className="h-4 bg-sky-100" />
              <span className="flex items-center gap-1.5 font-medium">
                <Globe className="w-4 h-4 text-sky-400" />
                Direct Links
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl font-black text-sky-900 mb-6">
                Available Flight Schools
                {searchQuery && <span className="text-sky-400 font-medium ml-2 text-lg">({filteredSchools.length} matches)</span>}
              </h2>
              
              {filteredSchools.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredSchools.map((school, i) => (
                    <FlightSchoolCard key={school.name} school={school} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-sky-50 rounded-3xl border-2 border-dashed border-sky-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Plane className="w-8 h-8 text-sky-300" />
                  </div>
                  <h3 className="text-xl font-bold text-sky-900">No schools found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-sky-600 font-bold"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="p-8 bg-sky-900 rounded-3xl text-white shadow-xl shadow-sky-900/20 relative overflow-hidden group">
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <h3 className="text-xl font-black mb-4 relative z-10">Why train in {country.name}?</h3>
              <p className="text-sky-100/80 text-sm leading-relaxed mb-6 relative z-10">
                {country.description}
              </p>
              {country.highlight && (
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm relative z-10">
                  <p className="text-sky-300 font-bold text-xs uppercase tracking-widest mb-1">Top Highlight</p>
                  <p className="text-white font-black text-lg">{country.highlight}</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-white rounded-3xl border border-sky-100 shadow-sm">
              <h3 className="text-lg font-black text-sky-900 mb-6">Requirements</h3>
              <div className="space-y-4">
                {[
                  { label: "Minimum Age", value: "17 for PPL, 18 for CPL" },
                  { label: "Medical", value: "EASA Class 1 or 2" },
                  { label: "Language", value: "ICAO Level 4 English" },
                  { label: "Education", value: "High School Diploma" }
                ].map((req, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-sky-50 last:border-0">
                    <span className="text-sm text-gray-500 font-medium">{req.label}</span>
                    <span className="text-sm text-sky-900 font-bold">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer({ onSelectCountry }: { onSelectCountry: (id: string) => void }) {
  return (
    <footer className="bg-sky-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="FlightSchools4All Logo"
                className="h-9 w-auto rounded"
              />
              <span className="font-bold text-lg">FlightSchools4All</span>
            </div>
            <p className="text-sky-300 text-sm leading-relaxed">
              Helping future pilots find the right flight school across Europe.
              Compare, search, and start your aviation journey today.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-200">Countries</h3>
            <ul className="space-y-2">
              {countriesData.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCountry(c.id)}
                    className="text-sky-300 hover:text-white transition-colors text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>{c.flagEmoji}</span> {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-200">Resources</h3>
            <ul className="space-y-2 text-sm text-sky-300">
              <li className="hover:text-white transition-colors cursor-pointer">EASA Licences Guide</li>
              <li className="hover:text-white transition-colors cursor-pointer">PPL Requirements</li>
              <li className="hover:text-white transition-colors cursor-pointer">ATPL Pathway</li>
              <li className="hover:text-white transition-colors cursor-pointer">Medical Requirements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-200">Contact</h3>
            <p className="text-sky-300 text-sm leading-relaxed">
              Have questions or want to list your school?<br />
              Get in touch with us.
            </p>
          </div>
        </div>
        <Separator className="my-8 bg-sky-800" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sky-400 text-sm">
            &copy; {new Date().getFullYear()} FlightSchools4All. All rights reserved.
          </p>
          <p className="text-sky-400 text-sm flex items-center gap-1">
            Made with <span className="text-red-400">❤</span> for aviation
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Main Page Component ─────────────── */
function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const countryParam = searchParams.get("country");
  const selectedCountry = countryParam ? getCountryById(countryParam) : null;

  const handleSelectCountry = useCallback(
    (id: string) => {
      router.push(`/?country=${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  const handleNavigateHome = useCallback(() => {
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackgroundElements />
      <Navbar onNavigateHome={handleNavigateHome} currentView={selectedCountry?.id ?? "home"} onSelectCountry={handleSelectCountry} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {selectedCountry ? (
            <motion.div
              key={selectedCountry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CountryDetailPage country={selectedCountry} onBack={handleNavigateHome} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection />
              <AboutSection />
              <FlightPathSection />
              <CountriesSection onSelectCountry={handleSelectCountry} />
              <TestimonialsSection />
              <NewsletterSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onSelectCountry={handleSelectCountry} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex items-center gap-3">
            <Plane className="w-8 h-8 text-sky-600" />
            <span className="text-xl text-sky-600 font-semibold">Loading...</span>
          </div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}
