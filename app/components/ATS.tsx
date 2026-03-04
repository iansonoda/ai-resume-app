const ATS = ({ score, suggestions }: { score: number; suggestions: { type: "good" | "improve"; tip: string }[] }) => {
  const bgClass =
    score > 70
      ? "from-green-100"
      : score > 49
      ? "from-yellow-100"
      : "from-red-100";

  const iconSrc =
    score > 70
      ? "/icons/ats-good.svg"
      : score > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  return (
    <div className={`bg-linear-to-br ${bgClass} to-white p-6 rounded-2xl shadow-md w-full`}>
      <div className="flex items-center gap-4 mb-4">
        <img src={iconSrc} alt="ATS score" className="w-16 h-16" />
        <h2 className="text-3xl font-bold text-gray-900">ATS Score: {score} / 100</h2>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-xl font-bold text-gray-800">Feedback & Suggestions</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
            This score represents how well your resume matches the job description, and how likely it is to perform well in an ATS scan.
        </p>

        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/40 rounded-xl">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type}
                className="w-6 h-6 mt-0.5 shrink-0"
              />
              <span className="text-gray-800 font-medium">{suggestion.tip}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 font-semibold text-gray-800 text-center">
          Keep improving your resume! Small tweaks in formatting and word choice can make all the difference in landing that interview.
        </p>
      </div>
    </div>
  );
};

export default ATS;