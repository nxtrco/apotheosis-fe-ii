import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">Dealerscript</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Features
          </Link>
          <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Pricing
          </Link>
          <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            About
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/signin">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-tight">
              <span className="block">AI-Powered</span>
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                Vehicle Descriptions
            </span>
          </h1>
            <div className="flex items-center justify-center mt-4">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
                That Sell
              </span>
              <div className="ml-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We help dealerships transform VIN data and manufacturer window stickers into customized, 
            engaging vehicle posts for your website, Facebook Marketplace, and third-party platforms — all in seconds. 
            Stand out. Sell faster. Save time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Request demo
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Example Section */}
      <section className="relative z-10 py-20 px-6 overflow-visible">
        {/* Background Accent */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
          <div className="w-[700px] h-[300px] bg-gradient-to-r from-blue-100 via-cyan-100 to-green-100 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-16">
            See the Transformation
          </h2>
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Before */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 flex-1 min-w-[280px] max-w-md shadow-md transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 animate-bounce">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-red-800 tracking-tight">Before <span className='text-base font-bold'>(Generic)</span></h3>
              </div>
              <p className="text-red-700 leading-relaxed text-lg">
                2023 GMC Sierra 1500 Denali, 4WD, leather seats, sunroof, adaptive cruise.
              </p>
            </div>
            
            {/* Animated Arrow */}
            <div className="hidden md:flex flex-col items-center mx-2">
              <div className="relative">
                <svg className="w-20 h-20 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <defs>
                    <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <path d="M8 24h32M32 16l8 8-8 8" stroke="url(#arrow-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute left-1/2 top-full -translate-x-1/2 mt-2 text-xs text-blue-500 font-semibold tracking-wide">AI Magic</span>
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 flex-1 min-w-[280px] max-w-md shadow-2xl ring-4 ring-green-200/40 transition-transform duration-300 hover:scale-105 relative animate-fade-in">
              {/* Magic Badge */}
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white z-10">DealerScript Magic</span>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 animate-pulse">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-green-800 tracking-tight">After <span className='text-base font-bold'>(DealerScript)</span></h3>
              </div>
              <p className="text-green-700 leading-relaxed text-lg">
                Elevate every drive in this <span className="font-bold text-green-900">2023 GMC Sierra 1500 Denali 4WD</span> — where <span className="font-bold text-blue-700">luxury</span> meets <span className="font-bold text-emerald-700">rugged power</span>. Enjoy <span className="font-bold text-yellow-700">premium leather</span>, a <span className="font-bold text-cyan-700">panoramic sunroof</span>, and hands-free <span className="font-bold text-blue-700">Super Cruise™</span> on highways. With a <span className="font-bold text-emerald-700">6.2L V8</span> under the hood, it’s built for hauling, cruising, and everything in between.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg text-lg animate-fade-in">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Transform in Seconds
            </div>
          </div>
        </div>
      </section>

      {/* Why DealerScript Section */}
      <section className="relative z-10 py-24 px-6 overflow-visible">
        {/* Animated Background Accent */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
          <div className="w-[900px] h-[350px] bg-gradient-to-r from-blue-200 via-cyan-100 to-green-100 rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">Why DealerScript?</h2>
          <p className="text-xl md:text-2xl font-semibold text-slate-700 text-center mb-16 max-w-3xl mx-auto">
            Ditch the generic. DealerScript is built to make your inventory stand out, sell faster, and save you hours every week.
          </p>
          <div className="relative grid md:grid-cols-5 gap-8">
            {/* Maximum Accuracy */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center md:translate-y-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Maximum Accuracy</h3>
              <p className="text-slate-600 text-base">Uses VIN + window sticker for maximum accuracy</p>
            </div>
            {/* Your Dealership’s Voice */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center md:-translate-y-6">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0m8 0V5a4 4 0 00-8 0v2m8 0a4 4 0 01-8 0m8 0v2a4 4 0 01-8 0V7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your Dealership’s Voice</h3>
              <p className="text-slate-600 text-base">Writes in your dealership’s tone (family-owned charm? high-end luxury? performance-focused?)</p>
            </div>
            {/* Platform-Optimized */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center md:translate-y-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Platform-Optimized</h3>
              <p className="text-slate-600 text-base">Optimized for each platform: website, Facebook, Marketplace, Autotrader, etc.</p>
            </div>
            {/* Lightning Fast */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center md:-translate-y-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600 text-base">Reduces time spent writing posts from hours to seconds</p>
            </div>
            {/* Built by Dealers, for Dealers */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col items-center text-center md:translate-y-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7m0 4v4m0 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Built by Dealers, for Dealers</h3>
              <p className="text-slate-600 text-base">Designed by a dealership pro, for dealerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">DealerScript FAQ</h2>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 font-semibold text-sm">Q</span>
                    <span className="text-xl font-bold text-slate-900">How does DealerScript work?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="ml-12">
                    <p className="text-slate-600 leading-relaxed">
                      We connect to your inventory feed or let you upload VIN + window sticker data. Our AI analyzes the equipment, features, and key highlights, then generates platform-ready posts customized to your dealership's style.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-4 text-cyan-600 font-semibold text-sm">Q</span>
                    <span className="text-xl font-bold text-slate-900">What makes DealerScript different from other inventory tools?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="ml-12">
                    <p className="text-slate-600 leading-relaxed">
                      We focus on writing — not just specs. Our AI crafts human-sounding descriptions, highlighting what matters to buyers, and tailoring posts for each platform: website, Facebook, Autotrader, and more.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-4 text-slate-600 font-semibold text-sm">Q</span>
                    <span className="text-xl font-bold text-slate-900">Can I customize the tone or style?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="ml-12">
                    <p className="text-slate-600 leading-relaxed">
                      Yes! Whether you're luxury-focused, family-friendly, or off-road performance-centered, we match the voice you want.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 font-semibold text-sm">Q</span>
                    <span className="text-xl font-bold text-slate-900">How long does it take?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="ml-12">
                    <p className="text-slate-600 leading-relaxed">
                      Seconds. Upload VIN data, click generate, and get your posts instantly.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-4 text-cyan-600 font-semibold text-sm">Q</span>
                    <span className="text-xl font-bold text-slate-900">Can I see a demo?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="ml-12">
                    <p className="text-slate-600 leading-relaxed">
                      Absolutely — request a demo on our homepage or generate a free sample post.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-6">
        {/* Background Accent */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
          <div className="w-[600px] h-[250px] bg-gradient-to-r from-blue-200 via-cyan-100 to-green-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-20 right-0 w-80 h-80 bg-green-100 rounded-full blur-2xl opacity-40"></div>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">About DealerScript</h2>
          <p className="text-xl text-slate-700 mb-8 text-center">
            At DealerScript, we know that selling cars today means winning online first. Customers scroll past hundreds of listings — and generic, copy-paste descriptions just don’t cut it anymore. That’s why we built DealerScript: to help dealerships stand out with AI-powered, VIN-specific vehicle posts that engage, inform, and convert.
          </p>
          <p className="text-lg text-slate-700 mb-8">
            Built by auto industry veterans and powered by advanced AI, DealerScript pulls data from your inventory, manufacturer window stickers, and optional equipment — transforming it into compelling, human-sounding posts that reflect your dealership’s unique voice. We don’t believe in cookie-cutter solutions. We believe your inventory deserves a story.
          </p>
          <div className="my-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Our Mission</h3>
            <p className="text-lg text-slate-700 text-center">
              Help dealerships save time, differentiate their inventory, and connect with buyers through smarter, better vehicle descriptions.
            </p>
          </div>
          <div className="my-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Who We Serve</h3>
            <ul className="text-lg text-slate-700 space-y-2 list-disc list-inside mx-auto max-w-xl">
              <li>Franchise and independent dealerships</li>
              <li>Dealer groups and multi-rooftop operations</li>
              <li>BDCs and marketing managers</li>
              <li>Anyone who wants to elevate their inventory posts and boost customer engagement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        {/* Background Accent */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
          <div className="w-[500px] h-[200px] bg-gradient-to-r from-blue-200 via-cyan-100 to-green-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 left-0 w-60 h-60 bg-pink-100 rounded-full blur-2xl opacity-40"></div>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-white/90 rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center">
            {/* Rocket Icon */}
            <div className="mb-6 animate-bounce-slow">
              <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M24 4l6 12 13 2-9.5 9.3 2.2 13-11.7-6.2-11.7 6.2 2.2-13L5 18l13-2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
              Ready to get started? <span role="img" aria-label="rocket">🚀</span> Request your demo today!
          </h2>
            <p className="text-lg text-slate-600 mb-8 text-center">
              Let’s make your inventory stand out!
          </p>
          <Link href="/signup">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-on-hover">
              Start Your Free Trial
            </Button>
          </Link>
            <p className="text-base text-slate-500 mt-6">Join thousands of professionals who trust Dealerscript for their vehicle data needs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Dealerscript</span>
            </div>
            <div className="flex space-x-6 text-slate-600">
              <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-500">
            <p>&copy; 2024 Dealerscript. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}