'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Requirement {
  _id: string;
  eventName: string;
  eventType: string;
  category: string;
  location: string;
  eventDate: { startDate: string; endDate?: string };
  status: string;
  description?: string;
  createdAt: string;
}

export default function AllRequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/requirements');
      if (!response.ok) throw new Error('Failed to fetch requirements');
      const responseData = await response.json();
      const requirementsArray = responseData.data || [];
      setRequirements(Array.isArray(requirementsArray) ? requirementsArray : []);
      setError('');
    } catch (err) {
      console.error('Error fetching requirements:', err);
      setError('Failed to load requirements. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'event_planner':
        return { icon: '📋', label: 'Event Planner', iconClass: 'text-teal-600' };
      case 'performer':
        return { icon: '🎭', label: 'Performer', iconClass: 'text-purple-600' };
      case 'crew':
        return { icon: '⚙️', label: 'Technical Crew', iconClass: 'text-orange-600' };
      default:
        return { icon: '❓', label: 'Unknown', iconClass: 'text-gray-600' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
            In Progress
          </span>
        );
      case 'fulfilled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Fulfilled
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide">
            Unknown
          </span>
        );
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesFilter = filter === 'all' || req.category === filter;
    const matchesSearch = searchQuery === '' ||
      req.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req._id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statsByStatus = {
    total: filteredRequirements.length,
    open: filteredRequirements.filter(r => r.status === 'open').length,
    in_progress: filteredRequirements.filter(r => r.status === 'in_progress').length,
    fulfilled: filteredRequirements.filter(r => r.status === 'fulfilled').length,
  };

  return (
    <main className="min-h-screen bg-[#f6fafe] py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-teal-600 glow-dot animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">Requirement Pipeline</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">All Requirements</h1>
            <p className="text-gray-600">Track all submitted event requirements and match statuses across vendors.</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="neu-search relative flex items-center rounded-xl px-4 py-2.5 w-full sm:w-64">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search ID, title, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400 w-full focus:ring-0 p-0"
              />
            </div>

            {/* Post CTA */}
            <Link
              href="/post-requirement"
              className="neu-btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Requirement</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* All */}
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                filter === 'all'
                  ? 'neu-filter-active'
                  : 'neu-filter-inactive text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📊</span>
              <span>All</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === 'all' ? 'bg-teal-600/15 text-teal-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {requirements.length}
              </span>
            </button>

            {/* Event Planner */}
            <button
              onClick={() => setFilter('event_planner')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                filter === 'event_planner'
                  ? 'neu-filter-active'
                  : 'neu-filter-inactive text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📋</span>
              <span>Event Planner</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === 'event_planner' ? 'bg-teal-600/15 text-teal-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {requirements.filter(r => r.category === 'event_planner').length}
              </span>
            </button>

            {/* Performer */}
            <button
              onClick={() => setFilter('performer')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                filter === 'performer'
                  ? 'neu-filter-active'
                  : 'neu-filter-inactive text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>🎭</span>
              <span>Performer</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === 'performer' ? 'bg-teal-600/15 text-teal-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {requirements.filter(r => r.category === 'performer').length}
              </span>
            </button>

            {/* Crew */}
            <button
              onClick={() => setFilter('crew')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                filter === 'crew'
                  ? 'neu-filter-active'
                  : 'neu-filter-inactive text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>⚙️</span>
              <span>Crew</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === 'crew' ? 'bg-teal-600/15 text-teal-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {requirements.filter(r => r.category === 'crew').length}
              </span>
            </button>
          </div>

          {/* Sort Indicator */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="hidden md:inline">Sorted by:</span>
            <div className="neu-flat px-3 py-1.5 rounded-lg text-gray-900 font-medium flex items-center gap-1 cursor-pointer">
              <span>Recent Activity</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="neu-card rounded-2xl p-6 mb-8 border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Connection Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 neu-spinner rounded-full mb-4"></div>
            <p className="text-gray-600 font-medium">Loading requirements...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRequirements.length === 0 && !error && (
          <div className="neu-card rounded-2xl p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Requirements Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery
                ? `No requirements match "${searchQuery}"`
                : filter === 'all'
                ? 'No requirements have been posted yet.'
                : `No ${getCategoryInfo(filter).label.toLowerCase()} requirements found.`}
            </p>
            <Link
              href="/post-requirement"
              className="neu-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Post First Requirement</span>
            </Link>
          </div>
        )}

        {/* Requirements Grid */}
        {!loading && filteredRequirements.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredRequirements.map((req) => {
                const categoryInfo = getCategoryInfo(req.category);
                const isRecent = new Date().getTime() - new Date(req.createdAt).getTime() < 86400000; // 24 hours

                return (
                  <Link
                    key={req._id}
                    href={`/requirement/${req._id}`}
                    className={`neu-card rounded-2xl p-6 flex flex-col justify-between relative group ${
                      isRecent ? 'neu-card-active' : ''
                    }`}
                  >
                    {/* Recent Indicator */}
                    {isRecent && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-600 glow-dot ring-4 ring-[#f6fafe]"></div>
                    )}

                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center text-xl">
                            {categoryInfo.icon}
                          </div>
                          <span className="font-semibold text-gray-900 text-lg">{categoryInfo.label}</span>
                        </div>
                        {getStatusBadge(req.status)}
                      </div>

                      {/* Event Details */}
                      <div className="space-y-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                          {req.eventName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Type:</span> {req.eventType}
                        </p>

                        <div className="neu-inset-deep rounded-xl p-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{req.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              {new Date(req.eventDate.startDate).toLocaleDateString('en-GB')}
                              {req.eventDate.endDate && ` — ${new Date(req.eventDate.endDate).toLocaleDateString('en-GB')}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description Preview */}
                      {req.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {req.description}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="neu-inset pt-3 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Requirement ID</span>
                        <span className="font-mono font-semibold text-gray-900 text-[11px]">
                          #{req._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Submitted</span>
                        <span className="font-medium text-[11px]">
                          {new Date(req.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="neu-flat w-7 h-7 rounded-full flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Stats Section */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total */}
              <div className="neu-stat rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full neu-icon-well flex items-center justify-center text-teal-600 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-4xl font-bold text-teal-600 tracking-tight leading-none mb-1">
                  {statsByStatus.total}
                </span>
                <span className="text-sm text-gray-600 font-medium">Total Requirements</span>
              </div>

              {/* Open */}
              <div className="neu-stat rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full neu-icon-well flex items-center justify-center text-emerald-600 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-4xl font-bold text-emerald-600 tracking-tight leading-none">
                    {statsByStatus.open}
                  </span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Open Listings</span>
              </div>

              {/* In Progress */}
              <div className="neu-stat rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full neu-icon-well flex items-center justify-center text-cyan-600 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
                  <span className="text-4xl font-bold text-cyan-600 tracking-tight leading-none">
                    {statsByStatus.in_progress}
                  </span>
                </div>
                <span className="text-sm text-gray-600 font-medium">In Progress</span>
              </div>

              {/* Fulfilled */}
              <div className="neu-stat rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full neu-icon-well flex items-center justify-center text-blue-600 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="text-4xl font-bold text-blue-600 tracking-tight leading-none mb-1">
                  {statsByStatus.fulfilled}
                </span>
                <span className="text-sm text-gray-600 font-medium">Fulfilled</span>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
