'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EventPortal - Requirement Network</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f6fafe] font-body-md text-on-surface antialiased">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 header-glass">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 neu-btn-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">EventPortal</span>
                <span className="text-teal-600 text-xs font-semibold">REQUIREMENT NETWORK</span>
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-2 neu-inset-deep p-1 rounded-full">
              <Link href="/" className="px-4 py-2 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 text-teal-700 font-semibold text-sm shadow-[inset_2px_2px_6px_rgba(15,118,110,0.15)]">
                Home
              </Link>
              <Link href="/requirements" className="px-4 py-2 rounded-full text-gray-700 font-medium text-sm hover:text-teal-600 transition-colors">
                Requirements
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/post-requirement"
                className="hidden sm:flex neu-btn-primary px-5 py-2 rounded-full text-white text-sm font-semibold items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post a Requirement
              </Link>
              <button className="neu-flat w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="neu-flat w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold text-sm flex items-center justify-center">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full pt-20 bg-[#f6fafe] min-h-screen">
          <div className="relative max-w-7xl mx-auto px-6 py-16">

            {/* Hero Section */}
            <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-inset bg-teal-50 border border-teal-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-600 glow-dot animate-pulse"></span>
                <span className="text-teal-900 text-sm font-semibold">Next-Gen Event Collaboration</span>
                <span className="text-teal-700 text-xs font-bold">/ Live Dispatch</span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">Event Requirement Portal</h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Post your event requirements and connect seamlessly with certified event planners, world-class performers, and
                professional production crew.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
                <Link
                  href="/post-requirement"
                  className="flex items-center gap-2 neu-btn-primary px-8 py-3 rounded-xl text-white font-semibold"
                >
                  Post a Requirement
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/requirements"
                  className="flex items-center gap-2 neu-flat px-8 py-3 rounded-xl text-gray-900 font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Open Calls
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="neu-stat p-3 rounded-lg flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Zero Commission Match</span>
                </div>
                <div className="neu-stat p-3 rounded-lg flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">100% Vetted Crew</span>
                </div>
                <div className="neu-stat p-3 rounded-lg flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Match &lt; 2h</span>
                </div>
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Card 1: Event Planners */}
              <Link
                href="/requirements?category=event_planner"
                className="neu-card rounded-2xl p-7 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl neu-icon-well flex items-center justify-center mb-4 group-hover:bg-teal-100 transition">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
                  Event Planners
                  <span className="text-lg group-hover:translate-x-1 transition-transform">↗</span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find certified event directors, lead coordinators, and design curators for corporate galas, summits, luxury weddings, and festivals.
                </p>
                <div className="neu-inset-deep rounded-lg px-3 py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-900">340+ Verified Planners</span>
                  <span className="text-gray-600">4.9★</span>
                </div>
              </Link>

              {/* Card 2: Performers */}
              <Link
                href="/requirements?category=performer"
                className="neu-card rounded-2xl p-7 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl neu-icon-well flex items-center justify-center mb-4 group-hover:bg-purple-100 transition">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
                  Performers
                  <span className="text-lg group-hover:translate-x-1 transition-transform">↗</span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Hire charismatic stage performers, indie bands, electronic producers, keynote orators, acrobats, and bilingual MCs for memorable shows.
                </p>
                <div className="neu-inset-deep rounded-lg px-3 py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-900">820+ Artists & Bands</span>
                  <span className="text-gray-600">98% Rehire</span>
                </div>
              </Link>

              {/* Card 3: Crew Members */}
              <Link
                href="/requirements?category=crew"
                className="neu-card rounded-2xl p-7 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl neu-icon-well flex items-center justify-center mb-4 group-hover:bg-orange-100 transition">
                  <span className="text-2xl">👷</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
                  Crew Members
                  <span className="text-lg group-hover:translate-x-1 transition-transform">↗</span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contract seasoned stagehands, front-of-house audio engineers, DMX lighting masters, riggers, broadcast cameras, and logistics dispatchers.
                </p>
                <div className="neu-inset-deep rounded-lg px-3 py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-900">510+ Technical Crew</span>
                  <span className="text-gray-600">Insured</span>
                </div>
              </Link>
            </div>

            {/* Stats Panel */}
            <div className="neu-card rounded-2xl p-8 mb-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg neu-icon-well flex items-center justify-center text-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-lg">12,480+ Requirements Fulfilled</p>
                    <p className="text-sm text-gray-600">
                      Connecting organizers and verified event pros across 45+ regional hubs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 neu-stat rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    <div className="w-10 h-10 neu-stat rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <div className="w-10 h-10 neu-stat rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                      C
                    </div>
                    <div className="w-10 h-10 neu-btn-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      +4k
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">4.92 / 5.0</p>
                    <p className="text-xs text-gray-600">from 3,120 reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Dispatches Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {/* Recent Live Dispatches */}
              <div className="lg:col-span-4 neu-card rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">Recent Live Dispatches</h3>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Real-time Feed</span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      location: 'NYC',
                      title: 'Lead Audio Engineer needed for 3-Day Tech Expo',
                      details: 'Javits Center • May 14-16 • Budget $2,400',
                      proposals: '3 proposals',
                    },
                    {
                      location: 'SFO',
                      title: 'String Quartet for Sunset Vineyard Gala',
                      details: 'Napa Valley • June 02 • Budget $1,800',
                      proposals: 'Just posted',
                    },
                    {
                      location: 'CHI',
                      title: 'Master Event Coordinator for Corporate Retreat',
                      details: 'Downtown Chicago • July 20 • Budget $4,500',
                      proposals: '8 proposals',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="neu-inset-deep p-4 rounded-xl hover:bg-teal-50 transition flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg neu-btn-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {item.location}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.details}</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block neu-inset px-3 py-1 rounded-full text-teal-700 text-xs font-semibold whitespace-nowrap ml-2">
                        {item.proposals}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Form */}
              <div className="lg:col-span-3 neu-card rounded-2xl p-8">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Fast-Track Form</span>
                <h3 className="font-bold text-gray-900 text-lg mt-1 mb-2">Need a crew within 24 hours?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Use our rapid requisition dispatch to alert vetted talents in your immediate metro area.
                </p>
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Select Category</label>
                  <select className="w-full neu-inset px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600">
                    <option>Event Planners & Producers</option>
                    <option>Performers & Entertainment</option>
                    <option>AV, Lighting & Stage Crew</option>
                    <option>Full Event Package</option>
                  </select>
                </div>
                <Link
                  href="/post-requirement"
                  className="w-full neu-btn-primary py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  <span>Instant Dispatch Wizard</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="neu-inset bg-surface-container-low py-8 border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 neu-btn-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">EP</span>
              </div>
              <span className="font-bold text-gray-900">EventPortal</span>
              <span className="text-gray-600 text-sm">— Connected talent, seamless events</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Platform
              </Link>
              <Link href="/requirements" className="hover:text-teal-600 transition-colors">
                All Listings
              </Link>
              <Link href="/post-requirement" className="hover:text-teal-600 transition-colors">
                Publish Need
              </Link>
            </div>
            <p className="text-xs text-gray-600">© 2024 EventPortal Network. Tactile clarity for event professionals.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
