'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { step2CrewSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CrewFields: React.FC = () => {
  const { formData, updateFormData, setStep } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(step2CrewSchema),
    defaultValues: {
      crewDetails: formData.crewDetails || {
        crewRole: '',
        numberOfMembers: 1,
        shiftTiming: '',
      },
    },
  });

  const crewRole = watch('crewDetails.crewRole');
  const shiftTiming = watch('crewDetails.shiftTiming');

  const onSubmit = (data: any) => {
    updateFormData(data);
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Crew Requirements</h2>

      <div className="space-y-2">
        <Label htmlFor="crewRole">Crew Role/Type *</Label>
        <Select value={crewRole} onValueChange={(value) => setValue('crewDetails.crewRole', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select crew role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Audio/Visual Technician">Audio/Visual Technician</SelectItem>
            <SelectItem value="Lighting Technician">Lighting Technician</SelectItem>
            <SelectItem value="Stage Setup">Stage Setup</SelectItem>
            <SelectItem value="Security">Security</SelectItem>
            <SelectItem value="Catering Staff">Catering Staff</SelectItem>
            <SelectItem value="Photography/Video">Photography/Video</SelectItem>
            <SelectItem value="Event Management">Event Management</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.crewDetails?.crewRole && (
          <p className="text-sm text-red-500">{errors.crewDetails.crewRole.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="numberOfMembers">Number of Crew Members Needed *</Label>
        <Input
          id="numberOfMembers"
          type="number"
          min="1"
          {...register('crewDetails.numberOfMembers', { valueAsNumber: true })}
          placeholder="Enter number of crew members"
        />
        {errors.crewDetails?.numberOfMembers && (
          <p className="text-sm text-red-500">{errors.crewDetails.numberOfMembers.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shiftTiming">Shift Timing *</Label>
        <Select
          value={shiftTiming}
          onValueChange={(value) => setValue('crewDetails.shiftTiming', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select shift timing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning (6 AM - 12 PM)">Morning (6 AM - 12 PM)</SelectItem>
            <SelectItem value="Afternoon (12 PM - 6 PM)">Afternoon (12 PM - 6 PM)</SelectItem>
            <SelectItem value="Evening (6 PM - 12 AM)">Evening (6 PM - 12 AM)</SelectItem>
            <SelectItem value="Full Day (8+ hours)">Full Day (8+ hours)</SelectItem>
            <SelectItem value="Multi-day">Multi-day</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        {errors.crewDetails?.shiftTiming && (
          <p className="text-sm text-red-500">{errors.crewDetails.shiftTiming.message}</p>
        )}
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
