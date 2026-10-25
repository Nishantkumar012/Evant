export default function StepIndicator({ currentStep, totalSteps, steps }: { currentStep: number; totalSteps: number; steps: any[] }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              i <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-1 mx-2 ${i < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-gray-600">Step {currentStep + 1}: {steps[currentStep].title}</p>
    </div>
  );
}
