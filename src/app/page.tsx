"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, Suspense, useMemo } from "react";
import { countriesData, getCountryById } from "@/lib/schools-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  ArrowLeft,
  ExternalLink,
  MapPin,
  ChevronRight,
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
import { useState } from "react";

/* ─────────────── Animated background dots ─────────────── */
function BackgroundDots() {
  // Use a seeded pseudo-random to avoid hydration mismatch
  const dots = useMemo(() => {
    const items: { width: number; height: number; left: string; top: string; duration: number; delay: number }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 20; i++) {
      items.push({
        width: rand() * 6 + 2,
        height: rand() * 6 + 2,
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        duration: rand() * 4 + 3,
        delay: rand() * 2,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white" />
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-200/30"
          style={{
            width: dot.width,
            height: dot.height,
            left: dot.left,
            top: dot.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────── Navigation Header ─────────────── */
function Navbar({ onNavigateHome, currentView }: { onNavigateHome: () => void; currentView: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/logo.png"
              alt="FlightSchools4All Logo"
              className="h-9 w-auto rounded"
            />
            <span className="text-lg font-bold text-sky-900 tracking-tight">
              FlightSchools4All
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {currentView !== "home" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateHome}
                className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Home
              </Button>
            )}
            {countriesData.slice(0, 5).map((c) => (
              <Button
                key={c.id}
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.location.href = `/?country=${c.id}`;
                }}
                className={`text-sm ${
                  currentView === c.id
                    ? "bg-sky-100 text-sky-900 font-semibold"
                    : "text-sky-700 hover:text-sky-900 hover:bg-sky-50"
                }`}
              >
                <span className="mr-1">{c.flagEmoji}</span>
                {c.name}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-sky-700"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-sky-100 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-1">
              {currentView !== "home" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sky-700"
                  onClick={() => {
                    onNavigateHome();
                    setMobileMenuOpen(false);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              )}
              {countriesData.map((c) => (
                <Button
                  key={c.id}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    currentView === c.id
                      ? "bg-sky-100 text-sky-900 font-semibold"
                      : "text-sky-700"
                  }`}
                  onClick={() => {
                    window.location.href = `/?country=${c.id}`;
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-2">{c.flagEmoji}</span>
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

/* ─────────────── Hero Section ─────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Student pilots with training aircraft"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/85 via-sky-900/70 to-sky-800/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Plane className="w-8 h-8 text-sky-300" />
            <span className="text-sky-300 font-medium tracking-wide uppercase text-sm">
              Your Journey Starts Here
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
              FlightSchools4All!
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-sky-100 leading-relaxed mb-8">
            A website that collects flight schools across Europe and helps future pilots easily compare, search, and find the right training option in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-white text-sky-900 hover:bg-sky-50 font-semibold"
              onClick={() => {
                document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Schools
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-sky-300 text-sky-100 hover:bg-sky-800/50"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

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

/* ─────────────── About Section ─────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-6">
              Find Your Perfect Flight School
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              It can include school locations, course types, prices, entry requirements, and direct
              website links, making the search process faster and simpler for students who want to
              start flight training. This idea fits your aviation goal and your interest in helping
              others find the right path into flying.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sky-900">School Locations</h3>
                  <p className="text-sm text-gray-500">Find schools near you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sky-900">Course Types</h3>
                  <p className="text-sm text-gray-500">PPL to ATPL programs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sky-900">Direct Links</h3>
                  <p className="text-sm text-gray-500">Quick school access</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/images/planes.png"
              alt="Training aircraft lineup"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-900">5+</p>
                <p className="text-sm text-gray-500">Countries</p>
              </div>
            </div>
          </motion.div>
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
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-sky-100"
        onClick={() => onSelect(country.id)}
      >
        <div className={`grid md:grid-cols-2 ${!isEven ? "md:direction-rtl" : ""}`}>
          {/* Image side */}
          <div
            className={`relative h-64 md:h-80 overflow-hidden ${
              !isEven ? "md:order-2" : ""
            }`}
          >
            <img
              src={country.image}
              alt={`${country.name} aviation`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="text-4xl">{country.flagEmoji}</span>
              <span className="text-white font-bold text-xl drop-shadow-lg">
                {country.name}
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className={`p-6 sm:p-8 flex flex-col justify-center ${!isEven ? "md:order-1" : ""}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{country.flagEmoji}</span>
              <h3 className="text-2xl font-bold text-sky-900">{country.name}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{country.description}</p>
            {country.highlight && (
              <p className="text-sky-700 font-semibold text-lg mb-4">{country.highlight}</p>
            )}
            <div className="flex items-center gap-2 text-sky-600 group-hover:text-sky-800 font-medium transition-colors">
              <span>View {country.schools.length} Flight Schools</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
    <section id="countries" className="py-16 sm:py-24 bg-gradient-to-b from-white to-sky-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-4">
            Explore Flight Schools by Country
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Compare EASA-approved flight schools across Europe. Click on a country to discover
            training options, prices, and requirements.
          </p>
        </motion.div>

        <div className="space-y-8">
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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-sky-100 group h-full flex flex-col">
        {/* School header with gradient */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">{school.name}</h3>
              {school.shortName && school.shortName !== school.name && (
                <p className="text-sky-200 text-sm mt-1">{school.shortName}</p>
              )}
            </div>
            <Badge
              variant={school.hasVerifiedWebsite ? "default" : "secondary"}
              className={
                school.hasVerifiedWebsite
                  ? "bg-emerald-500/20 text-emerald-100 border-emerald-400/30 shrink-0"
                  : "bg-amber-500/20 text-amber-100 border-amber-400/30 shrink-0"
              }
            >
              {school.hasVerifiedWebsite ? (
                <CheckCircle2 className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {school.hasVerifiedWebsite ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 sm:p-6 flex-1 flex flex-col">
          <p className="text-gray-600 leading-relaxed mb-5 flex-1">{school.description}</p>
          <div>
            {school.website !== "#" ? (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors group/link"
              >
                <Globe className="w-4 h-4" />
                Visit Website
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-gray-400 font-medium">
                <Globe className="w-4 h-4" />
                Website coming soon
              </span>
            )}
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
  return (
    <div className="min-h-screen">
      {/* Country hero */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={country.image}
          alt={`${country.name} aviation`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-sky-900/50 to-sky-900/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to All Countries
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-5xl sm:text-6xl">{country.flagEmoji}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Flight Schools in {country.name}
                </h1>
                <p className="text-sky-200 mt-1">
                  {country.schools.length} EASA-approved training centers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country description */}
      <div className="bg-sky-50 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-700 text-lg leading-relaxed">{country.description}</p>
          {country.highlight && (
            <p className="text-sky-700 font-semibold text-xl mt-3">{country.highlight}</p>
          )}
        </div>
      </div>

      {/* Schools grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl font-bold text-sky-900 mb-8">
          Available Flight Schools
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {country.schools.map((school, i) => (
            <FlightSchoolCard key={school.name} school={school} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
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
                  <a
                    href={`/?country=${c.id}`}
                    className="text-sky-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <span>{c.flagEmoji}</span> {c.name}
                  </a>
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
      <BackgroundDots />
      <Navbar onNavigateHome={handleNavigateHome} currentView={selectedCountry?.id ?? "home"} />

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
              <CountriesSection onSelectCountry={handleSelectCountry} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
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
