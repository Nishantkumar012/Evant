'use client';

export default function Step1EventBasics({ formData, setFormData, errors = {}, setErrors = () => {} }: any) {
  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [field]: value }
    });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const charCount = formData.description?.length || 0;

  return (
    <form className="space-y-6">
      {/* Event Name */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            Event Name <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-600">Required</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={formData.eventName || ''}
            onChange={(e) => handleChange('eventName', e.target.value)}
            placeholder="e.g., John's Wedding & Reception"
            className={`w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 transition-all focus:outline-none ${
              errors.eventName
                ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
                : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
            }`}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🎉</span>
        </div>
        {errors.eventName && <p className="text-red-500 text-xs mt-1">{errors.eventName}</p>}
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
          Event Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.eventType || ''}
            onChange={(e) => handleChange('eventType', e.target.value)}
            className={`w-full px-4 py-3 pl-11 pr-10 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 appearance-none transition-all focus:outline-none ${
              errors.eventType
                ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
                : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
            }`}
          >
            <option value="">Select event type</option>
            <option value="Wedding">Wedding & Matrimonial</option>
            <option value="Corporate">Corporate Gala & Summit</option>
            <option value="Concert">Live Music Concert / Gig</option>
            <option value="Birthday">Birthday & Milestone Celebration</option>
            <option value="Festival">Festival</option>
            <option value="Private Party">Private VIP Gathering</option>
          </select>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🎭</span>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
        </div>
        {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.eventDate?.startDate || ''}
              onChange={(e) => handleNestedChange('eventDate', 'startDate', e.target.value)}
              className={`w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 transition-all focus:outline-none ${
                errors.startDate
                  ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
                  : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
              }`}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📅</span>
          </div>
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-900 text-sm">End Date</label>
            <span className="text-xs text-gray-600">Optional</span>
          </div>
          <div className="relative">
            <input
              type="date"
              value={formData.eventDate?.endDate || ''}
              onChange={(e) => handleNestedChange('eventDate', 'endDate', e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 transition-all focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📅</span>
          </div>
        </div>
      </div>

      {/* Location & Venue */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, Country"
              className={`w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 transition-all focus:outline-none ${
                errors.location
                  ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
                  : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
              }`}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📍</span>
          </div>
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-900 text-sm">Venue</label>
            <span className="text-xs text-gray-600">Optional</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.venue || ''}
              onChange={(e) => handleChange('venue', e.target.value)}
              placeholder="e.g., Grand Crystal Ballroom"
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 transition-all focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🏢</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            Description <span className="text-red-500">*</span> <span className="font-normal text-xs text-gray-600">(min 10 characters)</span>
          </label>
          <span className={`text-xs font-mono ${charCount >= 10 ? 'text-teal-600 font-semibold' : 'text-gray-600'}`}>
            {charCount}/10 min
          </span>
        </div>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your event requirements, target vibe, audience size, and any special vendor services needed..."
          rows={4}
          className={`w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 resize-none transition-all focus:outline-none ${
            errors.description
              ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
              : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        <p className="text-teal-600 text-xs flex items-center gap-1">
          ✓ Clear details receive 3x faster responses from certified vendors
        </p>
      </div>
    </form>
  );
}
