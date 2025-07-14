import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-10 text-slate-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-green-600">About DealerScript</span>
        </h1>
        <p className="text-xl text-slate-700 mb-8 text-center">
          At DealerScript, we know that selling cars today means winning online first. Customers scroll past hundreds of listings — and generic, copy-paste descriptions just don’t cut it anymore. That’s why we built DealerScript: to help dealerships stand out with AI-powered, VIN-specific vehicle posts that engage, inform, and convert.
        </p>
        <p className="text-lg text-slate-700 mb-8">
          Built by auto industry veterans and powered by advanced AI, DealerScript pulls data from your inventory, manufacturer window stickers, and optional equipment — transforming it into compelling, human-sounding posts that reflect your dealership’s unique voice. We don’t believe in cookie-cutter solutions. We believe your inventory deserves a story.
        </p>
        <div className="my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-slate-700 text-center">
            Help dealerships save time, differentiate their inventory, and connect with buyers through smarter, better vehicle descriptions.
          </p>
        </div>
        <div className="my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Who We Serve</h2>
          <ul className="text-lg text-slate-700 space-y-2 list-disc list-inside mx-auto max-w-xl">
            <li>Franchise and independent dealerships</li>
            <li>Dealer groups and multi-rooftop operations</li>
            <li>BDCs and marketing managers</li>
            <li>Anyone who wants to elevate their inventory posts and boost customer engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 