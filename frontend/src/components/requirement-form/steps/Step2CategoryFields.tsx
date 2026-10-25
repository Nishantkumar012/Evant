'use client';

export default function Step2CategoryFields({ formData, setFormData, errors = {}, setErrors = () => {} }: any) {
  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
    if (errors.category) {
      const newErrors = { ...errors };
      delete newErrors.category;
      setErrors(newErrors);
    }
  };

  const handleDetailChange = (detailType: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [detailType]: { ...formData[detailType], [field]: value }
    });
  };

  const categoryColors = {
    event_planner: { bg: 'from-teal-50 to-teal-100/50', shadow: 'shadow-teal-200/40', ring: 'ring-teal-200/50' },
    performer: { bg: 'from-purple-50 to-purple-100/50', shadow: 'shadow-purple-200/40', ring: 'ring-purple-200/50' },
    crew: { bg: 'from-orange-50 to-orange-100/50', shadow: 'shadow-orange-200/40', ring: 'ring-orange-200/50' }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-4">What type of professional do you need?</h3>

        {errors.category && <p className="text-red-500 text-sm mb-4">{errors.category}</p>}

        <div className="grid grid-cols-3 gap-4">
          {[
            { key: 'event_planner', icon: '📋', label: 'Event Planner' },
            { key: 'performer', icon: '🎭', label: 'Performer' },
            { key: 'crew', icon: '👷', label: 'Crew Members' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`p-6 rounded-2xl transition-all text-center ${
                formData.category === cat.key
                  ? `bg-gradient-to-br ${categoryColors[cat.key as keyof typeof categoryColors].bg} shadow-md ${categoryColors[cat.key as keyof typeof categoryColors].shadow} ring-2 ${categoryColors[cat.key as keyof typeof categoryColors].ring}`
                  : 'bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover ring-1 ring-slate-200/50'
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{cat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {formData.category === 'event_planner' && (
        <div className="space-y-4 p-6 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl shadow-neumorphic ring-1 ring-teal-200/50">
          <h4 className="font-semibold text-gray-900">Event Planner Details (Optional)</h4>
          <input
            type="text"
            placeholder="Budget Range (e.g., $5000-$10000)"
            value={formData.plannerDetails?.budgetRange || ''}
            onChange={(e) => handleDetailChange('plannerDetails', 'budgetRange', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Expected Attendees"
            value={formData.plannerDetails?.expectedAttendees || ''}
            onChange={(e) => handleDetailChange('plannerDetails', 'expectedAttendees', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Planning Stage"
            value={formData.plannerDetails?.planningStage || ''}
            onChange={(e) => handleDetailChange('plannerDetails', 'planningStage', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
        </div>
      )}

      {formData.category === 'performer' && (
        <div className="space-y-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl shadow-neumorphic ring-1 ring-purple-200/50">
          <h4 className="font-semibold text-gray-900">Performer Details (Optional)</h4>
          <input
            type="text"
            placeholder="Performance Type (e.g., DJ, Singer, Comedian)"
            value={formData.performerDetails?.performanceType || ''}
            onChange={(e) => handleDetailChange('performerDetails', 'performanceType', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Duration Needed (e.g., 2 hours)"
            value={formData.performerDetails?.durationNeeded || ''}
            onChange={(e) => handleDetailChange('performerDetails', 'durationNeeded', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Equipment Requirements (Optional)"
            value={formData.performerDetails?.equipmentRequirements || ''}
            onChange={(e) => handleDetailChange('performerDetails', 'equipmentRequirements', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
        </div>
      )}

      {formData.category === 'crew' && (
        <div className="space-y-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl shadow-neumorphic ring-1 ring-orange-200/50">
          <h4 className="font-semibold text-gray-900">Crew Details (Optional)</h4>
          <input
            type="text"
            placeholder="Crew Role (e.g., Sound Tech, Stage Manager)"
            value={formData.crewDetails?.crewRole || ''}
            onChange={(e) => handleDetailChange('crewDetails', 'crewRole', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Number of Members"
            value={formData.crewDetails?.numberOfMembers || ''}
            onChange={(e) => handleDetailChange('crewDetails', 'numberOfMembers', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Shift Timing (e.g., 9 AM - 5 PM)"
            value={formData.crewDetails?.shiftTiming || ''}
            onChange={(e) => handleDetailChange('crewDetails', 'shiftTiming', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 focus:outline-none transition-all"
          />
        </div>
      )}
    </div>
  );
}
