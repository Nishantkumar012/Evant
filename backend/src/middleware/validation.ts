import { z } from 'zod';

const eventDateSchema = z.object({
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
});

const contactInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preference: z.enum(['phone', 'email', 'both']),
});

const baseRequirementSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventType: z.enum(['Wedding', 'Corporate', 'Concert', 'Festival', 'Private Party', 'Other']),
  eventDate: eventDateSchema,
  location: z.string().min(1, 'Location is required'),
  venue: z.string().optional(),
  contactInfo: contactInfoSchema,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responseDeadline: z.string().or(z.date()).optional(),
  additionalNotes: z.string().optional(),
  status: z.enum(['open', 'in_progress', 'fulfilled', 'cancelled']).optional(),
});

const plannerDetailsSchema = z.object({
  budgetRange: z.string().optional(),
  expectedAttendees: z.number().optional(),
  planningStage: z.string().optional(),
  servicesNeeded: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
});

const performerDetailsSchema = z.object({
  performanceType: z.string().min(1, 'Performance type is required'),
  durationNeeded: z.string().min(1, 'Duration is required'),
  equipmentRequirements: z.string().optional(),
});

const crewDetailsSchema = z.object({
  crewRole: z.string().min(1, 'Crew role is required'),
  numberOfMembers: z.number().min(1, 'Number of members must be at least 1'),
  shiftTiming: z.string().min(1, 'Shift timing is required'),
});

export const requirementSchema = z.discriminatedUnion('category', [
  z.object({
    ...baseRequirementSchema.shape,
    category: z.literal('event_planner'),
    plannerDetails: plannerDetailsSchema,
  }),
  z.object({
    ...baseRequirementSchema.shape,
    category: z.literal('performer'),
    performerDetails: performerDetailsSchema,
  }),
  z.object({
    ...baseRequirementSchema.shape,
    category: z.literal('crew'),
    crewDetails: crewDetailsSchema,
  }),
]);

export type RequirementInput = z.infer<typeof requirementSchema>;
