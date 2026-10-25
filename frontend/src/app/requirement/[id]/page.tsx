'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Requirement {
  _id: string;
  eventName: string;
  eventType: string;
  category: string;
  location: string;
  venue?: string;
  eventDate: { startDate: string; endDate?: string };
  description: string;
  contactInfo: { email: string; phone?: string; preference: string };
  responseDeadline?: string;
  additionalNotes?: string;
  status: string;
  plannerDetails?: any;
  performerDetails?: any;
  crewDetails?: any;
  createdAt: string;
}

export default function RequirementDetailPage() {
  const params = useParams();
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const requirementId = params.id as string;

  useEffect(() => {
    if (requirementId) {
      fetchRequirement();
    }
  }, [requirementId]);

  const fetchRequirement = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/requirements/${requirementId}`);
      if (!response.ok) throw new Error('Requirement not found');
      const responseData = await response.json();
      const requirementData = responseData.data || responseData;
      setRequirement(requirementData);
      setError('');
    } catch (err) {
      console.error('Error fetching requirement:', err);
      setError('Failed to load requirement details');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'event_planner':
        return { icon: '📋', label: 'Event Planner Specialized Need', tagLine: 'Event Planner' };
      case 'performer':
        return { icon: '🎭', label: 'Performer Specialized Need', tagLine: 'Performer' };
      case 'crew':
        return { icon: '⚙️', label: 'Technical Crew Specialized Need', tagLine: 'Technical Crew' };
      default:
        return { icon: '❓', label: 'Unknown', tagLine: 'Unknown' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold uppercase tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 glow-dot"></span>
              OPEN
            </div>
            <span className="text-xs text-gray-600 font-medium">Verified Organizer</span>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold uppercase tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
              In Progress
            </div>
            <span className="text-xs text-gray-600 font-medium">Under Review</span>
          </div>
        );
      case 'fulfilled':
        return (
          <div className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold uppercase tracking-wide shadow-sm">
            Fulfilled
          </div>
        );
      case 'cancelled':
        return (
          <div className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold uppercase tracking-wide shadow-sm">
            Cancelled
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6fafe] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="inline-block w-12 h-12 neu-spinner rounded-full mb-4"></div>
          <p className="text-gray-600 font-medium">Loading requirement details...</p>
        </div>
      </main>
    );
  }

  if (error || !requirement) {
    return (
      <main className="min-h-screen bg-[#f6fafe] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="neu-card rounded-2xl p-16 text-center border-l-4 border-red-500">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Requirement Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/requirements"
              className="neu-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Requirements
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const categoryInfo = getCategoryInfo(requirement.category);
  const isLiveRequirement = requirement.status === 'open';

  return (
    <main className="min-h-screen bg-[#f6fafe] py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/requirements"
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-6 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Requirements
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Card */}
            <div className="neu-card rounded-2xl p-8 relative overflow-hidden">
              {/* Live Indicator Badge */}
              {isLiveRequirement && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 glow-dot animate-pulse"></span>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Live Requirement</span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-6 mr-40">
                <div className="w-16 h-16 rounded-xl neu-icon-well flex items-center justify-center text-3xl flex-shrink-0">
                  {categoryInfo.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{requirement.eventName}</h1>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                      {requirement.eventType === 'Private Party' ? 'Private Registry' : requirement.eventType}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-700 font-medium">{categoryInfo.label}</span>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Event Type</p>
                  <p className="text-sm font-semibold text-gray-900">{requirement.eventType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Location</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {requirement.location.split(',')[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Requirement ID</p>
                  <p className="text-sm font-mono font-bold text-gray-900">
                    {requirement._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Created Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(requirement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Dates Card */}
            <div className="neu-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Event Dates</h2>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mt-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {requirement.eventDate.endDate ? 'Multi-Day Event' : '1 Day Event'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="neu-inset-deep rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Date
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(requirement.eventDate.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {requirement.eventDate.endDate && (
                  <div className="neu-inset-deep rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      End Date
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(requirement.eventDate.endDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 rounded-lg p-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Full Day Access</span>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="neu-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Contact Info</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pref: {requirement.contactInfo.preference}
                </span>
              </div>

              <div className="space-y-3">
                <div className="neu-inset-deep rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5">Direct Email</p>
                    <p className="text-base font-bold text-teal-600 break-all">{requirement.contactInfo.email}</p>
                  </div>
                  <button className="neu-flat w-9 h-9 rounded-lg flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-600 transition-all flex-shrink-0 ml-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                {requirement.contactInfo.phone && (
                  <div className="neu-inset-deep rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5">Phone / WhatsApp</p>
                      <p className="text-base font-bold text-gray-900">{requirement.contactInfo.phone}</p>
                    </div>
                    <button className="neu-flat w-9 h-9 rounded-lg flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-600 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Identity validated via phone OTP</span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="neu-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Requirement Description</h2>
              </div>

              <div className="neu-inset-deep rounded-xl p-5">
                <blockquote className="border-l-4 border-teal-600 pl-4 italic text-gray-600 mb-4 text-sm">
                  "{requirement.description.substring(0, 60)}..."
                </blockquote>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {requirement.description}
                </p>
              </div>
            </div>

            {/* Category-Specific Details - Event Planner */}
            {requirement.category === 'event_planner' && requirement.plannerDetails && Object.keys(requirement.plannerDetails).length > 0 && (
              <div className="neu-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Event Planner Scope & Metrics</h2>
                    <span className="text-xs text-gray-600 font-semibold">Standardized planning parameters</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {requirement.plannerDetails.budgetRange && (
                    <div className="neu-inset-deep rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Budget Range</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{requirement.plannerDetails.budgetRange}</p>
                      <p className="text-xs text-gray-500 mt-1">K INR (Estimated)</p>
                    </div>
                  )}

                  {requirement.plannerDetails.expectedAttendees && (
                    <div className="neu-inset-deep rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Expected Guests</p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{requirement.plannerDetails.expectedAttendees}</p>
                      <p className="text-xs text-gray-500 mt-1">Intimate Gathering</p>
                    </div>
                  )}

                  {requirement.plannerDetails.planningStage && (
                    <div className="neu-inset-deep rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Planning Stage</p>
                      </div>
                      <p className="text-base font-bold text-gray-900">{requirement.plannerDetails.planningStage}</p>
                      <p className="text-xs text-gray-500 mt-1">In Active Progress</p>
                    </div>
                  )}

                  {requirement.plannerDetails.servicesNeeded && requirement.plannerDetails.servicesNeeded.length > 0 && (
                    <div className="neu-inset-deep rounded-xl p-4 col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Services Needed</p>
                      <div className="flex flex-wrap gap-2">
                        {requirement.plannerDetails.servicesNeeded.map((service: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {requirement.additionalNotes && (
              <div className="neu-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Additional Notes</h2>
                </div>
                <div className="neu-inset-deep rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{requirement.additionalNotes}</p>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar (1/3) */}
          <div className="space-y-6">

            {/* Status & CTA Card */}
            <div className="neu-card rounded-2xl p-6">
              {getStatusBadge(requirement.status)}

              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Proposal Submission</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect directly with the Host to share your service brochure, rate card, and schedule a discovery meeting.
                </p>

                <button className="neu-btn-primary w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Submit Proposal
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button className="neu-flat py-2.5 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 hover:text-teal-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  <button className="neu-flat py-2.5 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 hover:text-teal-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Summary
                  </button>
                </div>
              </div>

              {/* Slots Left Badge */}
              {isLiveRequirement && (
                <div className="mt-4 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <span className="text-sm font-semibold text-teal-700">4 Slots Left</span>
                </div>
              )}
            </div>

            {/* Organizer Card */}
            <div className="neu-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full neu-icon-well flex items-center justify-center overflow-hidden">
                  <img
                    src="https://ui-avatars.com/api/?name=Paradox+Host&background=0d9488&color=fff&bold=true"
                    alt="Paradox Host"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Paradox Host</h3>
                  <p className="text-xs text-gray-600">Member since Sept 2026</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">4.9 / 5 Organizer Score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Location Card */}
            <div className="neu-card rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Event Destination</h3>
              <p className="text-lg font-bold text-gray-900 mb-4">{requirement.location}</p>

              {/* Map Placeholder */}
              <div className="neu-inset-deep rounded-xl h-48 overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-teal-600 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 right-3 neu-flat rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{requirement.location.split(',')[0]}, India</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center mx-auto mb-1">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Escrow Ready</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center mx-auto mb-1">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">&lt; 2hr Response</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center mx-auto mb-1">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Verified Need</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
