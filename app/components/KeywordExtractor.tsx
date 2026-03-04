import { cn } from "~/utils";

interface KeywordItem {
  keyword: string;
  found: boolean;
  context?: string;
}

interface KeywordExtractorProps {
  keywords: KeywordItem[];
}

const KeywordExtractor = ({ keywords }: KeywordExtractorProps) => {
  const found = keywords.filter((k) => k.found).length;
  const total = keywords.length;

  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Keywords from Job Description
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {found} of {total} keywords matched
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-5">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-500",
            total > 0 && found / total > 0.7
              ? "bg-green-500"
              : total > 0 && found / total > 0.4
                ? "bg-yellow-500"
                : "bg-red-500"
          )}
          style={{ width: total > 0 ? `${(found / total) * 100}%` : "0%" }}
        />
      </div>

      {/* Keyword chips */}
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw, idx) => (
          <div
            key={idx}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-shadow hover:shadow-sm",
              kw.found
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            )}
            title={kw.context || undefined}
          >
            {kw.found ? (
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {kw.keyword}
          </div>
        ))}
      </div>

      {/* Legend */}
      {keywords.length > 0 && (
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Found
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" /> Missing
          </span>
        </div>
      )}
    </div>
  );
};

export default KeywordExtractor;
