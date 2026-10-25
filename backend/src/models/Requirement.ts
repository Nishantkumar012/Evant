import mongoose, { Schema, Document } from 'mongoose';
import {
  BaseRequirement,
  EventPlannerDetails,
  PerformerDetails,
  CrewDetails
} from '../types/requirement';

export interface RequirementDocument extends Omit<BaseRequirement, '_id'>, Document {
  plannerDetails?: EventPlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
}

const requirementSchema = new Schema<RequirementDocument>(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ['Wedding', 'Corporate', 'Concert', 'Festival', 'Private Party', 'Other'],
    },
    eventDate: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['event_planner', 'performer', 'crew'],
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      preference: {
        type: String,
        required: true,
        enum: ['phone', 'email', 'both'],
      },
    },
    description: {
      type: String,
      required: true,
    },
    responseDeadline: {
      type: Date,
    },
    additionalNotes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'fulfilled', 'cancelled'],
      default: 'open',
    },
    // Category-specific fields
    plannerDetails: {
      type: Schema.Types.Mixed,
      required: function (this: RequirementDocument) {
        return this.category === 'event_planner';
      },
    },
    performerDetails: {
      type: Schema.Types.Mixed,
      required: function (this: RequirementDocument) {
        return this.category === 'performer';
      },
    },
    crewDetails: {
      type: Schema.Types.Mixed,
      required: function (this: RequirementDocument) {
        return this.category === 'crew';
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
requirementSchema.index({ category: 1, status: 1 });
requirementSchema.index({ 'eventDate.startDate': 1 });
requirementSchema.index({ createdAt: -1 });

export default mongoose.model<RequirementDocument>('Requirement', requirementSchema);
