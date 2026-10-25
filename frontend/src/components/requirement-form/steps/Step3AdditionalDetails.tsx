'use client';

export default function Step3AdditionalDetails({ formData, setFormData, errors = {}, setErrors = () => {} }: any) {
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

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.contactInfo?.email || ''}
              onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 transition-all focus:outline-none ${
                errors.email
                  ? 'shadow-md shadow-red-300/30 ring-2 ring-red-400'
                  : 'shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50'
              }`}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📧</span>
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 text-sm">Phone</label>
          <div className="relative">
            <input
              type="tel"
              value={formData.contactInfo?.phone || ''}
              onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 transition-all focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📱</span>
          </div>
        </div>
      </div>

      {/* Contact Preference */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-900 text-sm">Preferred Contact Method</label>
        <select
          value={formData.contactInfo?.preference || 'email'}
          onChange={(e) => handleNestedChange('contactInfo', 'preference', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 appearance-none transition-all focus:outline-none"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="both">Both</option>
        </select>
      </div>

      {/* Response Deadline */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-900 text-sm">Response Deadline</label>
        <div className="relative">
          <input
            type="date"
            value={formData.responseDeadline || ''}
            onChange={(e) => handleChange('responseDeadline', e.target.value)}
            className="w-full px-4 py-3 pl-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 transition-all focus:outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">⏰</span>
        </div>
        <p className="text-gray-600 text-xs">When do you need responses by?</p>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-900 text-sm">Additional Notes (Optional)</label>
        <textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          rows={3}
          placeholder="Any additional information or special requests..."
          className="w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-neumorphic hover:shadow-neumorphic-hover focus:shadow-neumorphic-focus ring-1 ring-slate-200/50 resize-none transition-all focus:outline-none"
        />
        <p className="text-gray-600 text-xs">{formData.additionalNotes?.length || 0} characters</p>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl shadow-neumorphic ring-1 ring-blue-200/50">
        <p className="text-blue-800 text-sm">
          ℹ️ We'll use this contact information to connect you with suitable professionals.
        </p>
      </div>
    </form>
  );
}
