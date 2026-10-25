export interface BaseRequirement {
  eventName: string;
  eventType: string;
  eventDate: {
    startDate: Date | string;
    endDate?: Date | string;
  };
  location: string;
  venue?: string;
  category: 'event_planner' | 'performer' | 'crew';
  contactInfo: {
    email: string;
    phone?: string;
    preference: 'phone' | 'email' | 'both';
  };
  description: string;
  responseDeadline?: Date | string;
  additionalNotes?: string;
}

export interface EventPlannerDetails {
  budgetRange?: string;
  expectedAttendees?: number;
  planningStage?: string;
  servicesNeeded?: string[];
  specialRequirements?: string;
}

export interface PerformerDetails {
  performanceType: string;
  durationNeeded: string;
  equipmentRequirements?: string;
}

export interface CrewDetails {
  crewRole: string;
  numberOfMembers: number;
  shiftTiming: string;
}

export interface EventPlannerRequirement extends BaseRequirement {
  category: 'event_planner';
  plannerDetails: EventPlannerDetails;
}

export interface PerformerRequirement extends BaseRequirement {
  category: 'performer';
  performerDetails: PerformerDetails;
}

export interface CrewRequirement extends BaseRequirement {
  category: 'crew';
  crewDetails: CrewDetails;
}

export type Requirement = EventPlannerRequirement | PerformerRequirement | CrewRequirement;

export type FormData = Partial<Requirement>;
