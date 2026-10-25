import { useState } from 'react';

export function useMultiStepForm(initialStep: number = 0) {
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    eventDate: { startDate: '', endDate: '' },
    location: '',
    venue: '',
    category: '',
    contactInfo: { email: '', phone: '', preference: 'email' },
    description: '',
    responseDeadline: '',
    additionalNotes: '',
    plannerDetails: {},
    performerDetails: {},
    crewDetails: {},
    status: 'open',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return {
    step,
    nextStep,
    prevStep,
    formData,
    setFormData,
  };
}
