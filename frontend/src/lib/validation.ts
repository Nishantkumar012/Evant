import { z } from 'zod';

const eventDateSchema = z.object({
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date().optional(),
});

const contactInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preference: z.enum(['phone', 'email', 'both'], {
    required_error: 'Please select a contact preference',
  }),
});

export const step1Schema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventType: z.enum(['Wedding', 'Corporate', 'Concert', 'Festival', 'Private Party', 'Other'], {
    required_error: 'Please select an event type',
  }),
  eventDate: eventDateSchema,
  location: z.string().min(1, 'Location is required'),
  venue: z.string().optional(),
  category: z.enum(['event_planner', 'performer', 'crew'], {
    required_error: 'Please select a category',
  }),
});

export const step2EventPlannerSchema = z.object({
  plannerDetails: z.object({
    budgetRange: z.string().optional(),
    expectedAttendees: z.number().optional(),
    planningStage: z.string().optional(),
    servicesNeeded: z.array(z.string()).optional(),
    specialRequirements: z.string().optional(),
  }),
});

export const step2PerformerSchema = z.object({
  performerDetails: z.object({
    performanceType: z.string().min(1, 'Performance type is required'),
    durationNeeded: z.string().min(1, 'Duration is required'),
    equipmentRequirements: z.string().optional(),
  }),
});

export const step2CrewSchema = z.object({
  crewDetails: z.object({
    crewRole: z.string().min(1, 'Crew role is required'),
    numberOfMembers: z.number().min(1, 'At least 1 member is required'),
    shiftTiming: z.string().min(1, 'Shift timing is required'),
  }),
});

export const step3Schema = z.object({
  contactInfo: contactInfoSchema,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responseDeadline: z.date().optional(),
  additionalNotes: z.string().optional(),
});
