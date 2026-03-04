import { cn } from "~/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";

// ── Helper: ScoreBadge ──────────────────────────────────────────────────────
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const isGreen = score > 69;
  const isYellow = score > 39;

  const bgColor = isGreen
    ? "bg-green-100"
    : isYellow
      ? "bg-yellow-100"
      : "bg-red-100";

  const textColor = isGreen
    ? "text-green-600"
    : isYellow
      ? "text-yellow-600"
      : "text-red-600";

  const icon = isGreen ? (
    <svg
      className="w-4 h-4 text-green-600"
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
  ) : isYellow ? (
    <svg
      className="w-4 h-4 text-yellow-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M12 3l9.09 16.91H2.91L12 3z"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 text-red-600"
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
  );

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold",
        bgColor,
        textColor
      )}
    >
      {icon}
      {score}/100
    </span>
  );
};

// ── Helper: CategoryHeader ──────────────────────────────────────────────────
interface CategoryHeaderProps {
  title: string;
  score: number;
}

const CategoryHeader = ({ title, score }: CategoryHeaderProps) => (
  <div className="flex items-center justify-between w-full">
    <span className="text-base font-semibold text-gray-800">{title}</span>
    <ScoreBadge score={score} />
  </div>
);

// ── Helper: CategoryContent ─────────────────────────────────────────────────
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryContentProps {
  tips: Tip[];
}

const TipsSummary = ({ tips }: CategoryContentProps) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-4 mb-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {tips.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.type === "good" ? (
            <svg
              className="w-4 h-4 shrink-0 text-green-500"
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
              className="w-4 h-4 shrink-0 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          )}
          <span className="text-sm text-gray-700">{item.tip}</span>
        </div>
      ))}
    </div>
  </div>
);

const CategoryContent = ({ tips }: CategoryContentProps) => (
  <div>
    <TipsSummary tips={tips} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {tips.map((item, idx) => {
      const isGood = item.type === "good";

      const icon = isGood ? (
        <svg
          className="w-5 h-5 shrink-0 text-green-500"
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
          className="w-5 h-5 shrink-0 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      );

      return (
        <div
          key={idx}
          className={cn(
            "rounded-xl border p-4 transition-shadow hover:shadow-sm",
            isGood
              ? "border-green-200 bg-green-50/60"
              : "border-amber-200 bg-amber-50/60"
          )}
        >
          {/* Tip row */}
          <div className="flex items-start gap-2">
            {icon}
            <p className="text-sm font-medium text-gray-900">
              {item.tip}
            </p>
          </div>

          {/* Explanation */}
          <p className="mt-2 text-sm leading-relaxed pl-7 text-gray-600">
            {item.explanation}
          </p>
        </div>
      );
    })}
    </div>
  </div>
);

// ── Main component ──────────────────────────────────────────────────────────
const sections = [
  { id: "tone-and-style", title: "Tone & Style", key: "toneAndStyle" },
  { id: "content", title: "Content", key: "content" },
  { id: "structure", title: "Structure", key: "structure" },
  { id: "skills", title: "Skills", key: "skills" },
  { id: "keyword-match", title: "Keyword Match", key: "keywordMatch" },
] as const;

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Detailed Feedback
      </h2>

      <Accordion allowMultiple defaultOpen="tone-and-style">
        {sections.map(({ id, title, key }) => {
          const category = feedback[key];
          return (
            <AccordionItem key={id} id={id}>
              <AccordionHeader itemId={id}>
                <CategoryHeader title={title} score={category.score} />
              </AccordionHeader>

              <AccordionContent itemId={id}>
                <CategoryContent tips={category.tips} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Details;