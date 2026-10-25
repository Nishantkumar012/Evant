'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { step2PerformerSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const PerformerFields: React.FC = () => {
  const { formData, updateFormData, setStep } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(step2PerformerSchema),
    defaultValues: {
      performerDetails: formData.performerDetails || {
        performanceType: '',
        durationNeeded: '',
        equipmentRequirements: '',
      },
    },
  });

  const performanceType = watch('performerDetails.performanceType');
  const durationNeeded = watch('performerDetails.durationNeeded');

  const onSubmit = (data: any) => {
    updateFormData(data);
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Performer Requirements</h2>

      <div className="space-y-2">
        <Label htmlFor="performanceType">Performance Type *</Label>
        <Select
          value={performanceType}
          onValueChange={(value) => setValue('performerDetails.performanceType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select performance type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Music">Music</SelectItem>
            <SelectItem value="Dance">Dance</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Magic">Magic</SelectItem>
            <SelectItem value="Theater">Theater</SelectItem>
            <SelectItem value="DJ">DJ</SelectItem>
            <SelectItem value="Band">Band</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.performerDetails?.performanceType && (
          <p className="text-sm text-red-500">{errors.performerDetails.performanceType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="durationNeeded">Duration Needed *</Label>
        <Select
          value={durationNeeded}
          onValueChange={(value) => setValue('performerDetails.durationNeeded', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15 minutes">15 minutes</SelectItem>
            <SelectItem value="30 minutes">30 minutes</SelectItem>
            <SelectItem value="1 hour">1 hour</SelectItem>
            <SelectItem value="2 hours">2 hours</SelectItem>
            <SelectItem value="3 hours">3 hours</SelectItem>
            <SelectItem value="4+ hours">4+ hours</SelectItem>
            <SelectItem value="Full event">Full event</SelectItem>
          </SelectContent>
        </Select>
        {errors.performerDetails?.durationNeeded && (
          <p className="text-sm text-red-500">{errors.performerDetails.durationNeeded.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipmentRequirements">Equipment Requirements (Optional)</Label>
        <Textarea
          id="equipmentRequirements"
          {...register('performerDetails.equipmentRequirements')}
          placeholder="Describe any equipment needs (e.g., PA system, stage lighting, instruments)"
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
