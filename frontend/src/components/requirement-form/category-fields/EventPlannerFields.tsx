'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { step2EventPlannerSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const EventPlannerFields: React.FC = () => {
  const { formData, updateFormData, setStep } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2EventPlannerSchema),
    defaultValues: {
      plannerDetails: formData.plannerDetails || {
        budgetRange: '',
        expectedAttendees: undefined,
        planningStage: '',
        servicesNeeded: [],
        specialRequirements: '',
      },
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Event Planner Requirements</h2>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Specific fields for Event Planner category need to be provided.
          Currently showing a placeholder field. Please specify the exact fields you'd like to collect.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
        <Textarea
          id="specialRequirements"
          {...register('plannerDetails.specialRequirements')}
          placeholder="Describe any special requirements for event planning"
          rows={4}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};
