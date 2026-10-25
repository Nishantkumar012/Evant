'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const requirementId = searchParams.get('id');
  const category = searchParams.get('category');
  const eventName = searchParams.get('eventName');

  const getCategoryInfo = () => {
    switch (category) {
      case 'event_planner':
        return { icon: '📋', title: 'Event Planner', color: 'blue' };
      case 'performer':
        return { icon: '🎭', title: 'Performer', color: 'purple' };
      case 'crew':
        return { icon: '👷', title: 'Crew', color: 'orange' };
      default:
        return { icon: '✓', title: 'Requirement', color: 'green' };
    }
  };

  const info = getCategoryInfo();
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    green: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Animation */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-2">Success!</h1>
          <p className="text-gray-600 text-lg mb-8">Your requirement has been posted successfully</p>

          {/* Requirement Summary Card */}
          <div className={`border-2 rounded-lg p-6 mb-8 ${colorMap[info.color as keyof typeof colorMap]}`}>
            <div className="text-5xl mb-4">{info.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
            {eventName && (
              <p className="text-lg font-semibold mb-4">Event: {eventName}</p>
            )}
            {requirementId && (
              <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Requirement ID</p>
                <p className="font-mono font-bold text-gray-800">{requirementId}</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-800 mb-4">What happens next?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">1.</span>
                <span>Your requirement is now live and visible to professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">2.</span>
                <span>Relevant {info.title.toLowerCase()}s will start reviewing your request</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">3.</span>
                <span>You'll receive contact from interested candidates via your preferred method</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">4.</span>
                <span>Review profiles and choose the best fit for your event</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
            >
              ← Back to Home
            </Link>
            <Link
              href="/post-requirement"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition"
            >
              Post Another Requirement
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Keep your ID handy to track your requirement status
            </p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="font-semibold text-gray-800">Track Progress</p>
            <p className="text-sm text-gray-600">Monitor responses and interactions</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-semibold text-gray-800">Direct Contact</p>
            <p className="text-sm text-gray-600">Connect directly with professionals</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="font-semibold text-gray-800">Safe & Secure</p>
            <p className="text-sm text-gray-600">Your information is protected</p>
          </div>
        </div>
      </div>
    </main>
  );
}
