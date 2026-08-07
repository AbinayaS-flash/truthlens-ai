function Pipeline({ currentStep }) {
  const steps = [
    "Searching Sources",
    "Ranking Sources",
    "Fact Verification",
    "Bias Detection",
    "Contradiction Analysis",
    "Confidence Calculation",
    "Generating Answer",
  ];

  return (
    <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        AI Verification Pipeline
      </h2>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <span>{step}</span>

            {currentStep > index ? (
              <span className="text-green-400">✓</span>
            ) : currentStep === index ? (
              <span className="text-yellow-400 animate-pulse">
                Processing...
              </span>
            ) : (
              <span className="text-gray-500">Waiting</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pipeline;