'use client';

import { useState } from 'react';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import Step1EventBasics from './steps/Step1EventBasics';
import Step2CategoryFields from './steps/Step2CategoryFields';
import Step3AdditionalDetails from './steps/Step3AdditionalDetails';
import Step4Review from './steps/Step4Review';
import Link from 'next/link';

export function FormWrapper() {
  const steps = [
    { title: 'Event Basics', subtitle: 'Step 1' },
    { title: 'Category Details', subtitle: 'Step 2' },
    { title: 'Dates & Venue', subtitle: 'Step 3' },
    { title: 'Review & Submit', subtitle: 'Step 4' },
  ];

  const { step, nextStep, prevStep, formData, setFormData } = useMultiStepForm(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.eventName?.trim()) newErrors.eventName = 'Event name is required';
      if (!formData.eventType) newErrors.eventType = 'Event type is required';
      if (!formData.eventDate?.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.location?.trim()) newErrors.location = 'Location is required';
      if (!formData.description?.trim() || formData.description.length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      }
    }

    if (currentStep === 1) {
      if (!formData.category) newErrors.category = 'Please select a category';
    }

    if (currentStep === 2) {
      if (!formData.contactInfo?.email?.trim()) newErrors.email = 'Email is required';
      if (!formData.contactInfo?.email?.includes('@')) newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      nextStep();
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const successUrl = new URLSearchParams({
          id: data.data?._id || data._id || 'requirement',
          category: formData.category,
          eventName: formData.eventName,
        });
        window.location.href = `/success?${successUrl.toString()}`;
      } else {
        setToast('Error: ' + (data.message || 'Failed to post requirement'));
        setErrors({ submit: data.message || 'Server error' });
      }
    } catch (error) {
      console.error('Error posting requirement:', error);
      setToast('Connection error');
      setErrors({ submit: 'Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  };

  const CurrentStep = [Step1EventBasics, Step2CategoryFields, Step3AdditionalDetails, Step4Review][step];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 header-glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 neu-btn-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm">EventPortal</span>
              <span className="text-teal-600 text-xs font-semibold">REQUIREMENT NETWORK</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 neu-inset-deep p-1 rounded-full">
            <Link href="/" className="px-4 py-2 rounded-full text-gray-700 font-medium text-sm hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link href="/requirements" className="px-4 py-2 rounded-full text-gray-700 font-medium text-sm hover:text-teal-600 transition-colors">
              Requirements
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="neu-flat w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="neu-flat w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold text-sm">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-[#f6fafe] min-h-screen">
        <div className="relative max-w-3xl mx-auto px-6 py-12">

          {/* Step Indicator */}
          <div className="mb-12">
            <div className="relative flex items-center justify-between">
              {/* Progress Track */}
              <div className="absolute left-6 right-6 top-5 h-2 neu-inset rounded-full -z-10">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 to-teal-500 rounded-full transition-all duration-500 shadow-[0_2px_8px_rgba(13,148,136,0.4)]"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              {steps.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      idx <= step
                        ? 'neu-btn-primary text-white scale-110'
                        : 'neu-flat text-gray-600'
                    }`}
                  >
                    {idx < step ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-semibold hidden sm:block ${idx <= step ? 'text-teal-600' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="neu-card rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600 glow-dot animate-pulse"></span>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                    Step {step + 1} of {steps.length} • {steps[step].title}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{steps[step].title}</h1>
                <p className="text-gray-600 text-sm mt-2">
                  {step === 0 && 'Define your core event parameters and basic operational details.'}
                  {step === 1 && 'Select the type of professional you need.'}
                  {step === 2 && 'Add contact information and additional details.'}
                  {step === 3 && 'Review your requirement before submitting.'}
                </p>
              </div>
              <div className="neu-inset px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1.5 ml-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Auto-saving
              </div>
            </div>

            {/* Error Alert */}
            {errors.submit && (
              <div className="mb-6 neu-inset-deep p-4 border-l-4 border-red-500 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-red-900 text-sm">Submission Error</p>
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Form Content */}
            <CurrentStep formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

            {/* Info Pill */}
            <div className="neu-inset-deep p-4 rounded-xl flex items-start gap-3 mt-8 mb-8">
              <div className="w-8 h-8 rounded-lg neu-icon-well flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">What happens next?</p>
                <p className="text-gray-600 text-xs mt-1">
                  {step < 3
                    ? 'In the next step you will select required vendor categories. All drafts remain securely cached in your session.'
                    : 'Your requirement will be posted live and visible to verified professionals.'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => showToast('Draft saved locally')}
                className="neu-flat px-6 py-3 rounded-xl text-gray-900 font-semibold hover:bg-gray-50 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save Draft
              </button>

              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="neu-flat px-6 py-3 rounded-xl text-gray-900 font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Previous
                  </button>
                )}

                {step < steps.length - 1 && (
                  <button
                    onClick={handleNextStep}
                    className="neu-btn-primary px-8 py-3 rounded-xl text-white font-semibold transition flex items-center gap-2"
                    disabled={loading}
                  >
                    Next Step
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}

                {step === steps.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="neu-btn-primary px-8 py-3 rounded-xl text-white font-semibold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Submit Requirement
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="neu-stat rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Zero Commission</p>
                <p className="text-xs text-gray-600">On Direct Matches</p>
              </div>
            </div>

            <div className="neu-stat rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">45 Mins Avg</p>
                <p className="text-xs text-gray-600">Vendor Match Time</p>
              </div>
            </div>

            <div className="neu-stat rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg neu-icon-well flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Need Help?</p>
                <a href="#" className="text-xs text-teal-600 hover:underline">Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 neu-card rounded-xl shadow-lg p-4 flex items-center gap-3 animate-in z-50">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">{toast}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="neu-inset bg-surface-container-low py-8 mt-12">
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
    </>
  );
}
