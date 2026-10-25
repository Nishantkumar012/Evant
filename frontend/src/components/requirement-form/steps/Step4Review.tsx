'use client';

export default function Step4Review({ formData }: any) {
  const getCategoryLabel = (cat: string) => {
    const map: any = {
      event_planner: '📋 Event Planner',
      performer: '🎭 Performer',
      crew: '👷 Crew Members'
    };
    return map[cat] || cat;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">Event Name</p>
          <p className="font-semibold text-gray-900">{formData.eventName}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">Event Type</p>
          <p className="font-semibold text-gray-900">{formData.eventType}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">📍 Location</p>
          <p className="font-semibold text-gray-900">{formData.location}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">Category</p>
          <p className="font-semibold text-gray-900">{getCategoryLabel(formData.category)}</p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl shadow-neumorphic ring-1 ring-blue-200/50">
        <p className="text-xs text-gray-600 mb-2">Description</p>
        <p className="text-gray-800">{formData.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">📧 Email</p>
          <p className="font-semibold text-gray-900 text-sm">{formData.contactInfo?.email}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-1">📱 Phone</p>
          <p className="font-semibold text-gray-900">{formData.contactInfo?.phone || 'Not provided'}</p>
        </div>
      </div>

      {formData.additionalNotes && (
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-neumorphic ring-1 ring-slate-200/50">
          <p className="text-xs text-gray-600 mb-2">Additional Notes</p>
          <p className="text-gray-800">{formData.additionalNotes}</p>
        </div>
      )}

      <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl shadow-neumorphic ring-1 ring-yellow-200/50">
        <p className="text-yellow-800 text-sm font-semibold">
          ⚠️ Please review all information above before submitting.
        </p>
      </div>
    </div>
  );
}
