interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const { label, badgeClass, textClass } = getScoreStyle(score);

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
      <p className={textClass}>{label}</p>
    </div>
  );
}

function getScoreStyle(score: number) {
  if (score > 70) {
    return {
      label: "Strong",
      badgeClass: "bg-badge-green",
      textClass: "text-green-600",
    };
  }

  if (score > 49) {
    return {
      label: "Good Start",
      badgeClass: "bg-badge-yellow",
      textClass: "text-yellow-600",
    };
  }

  return {
    label: "Needs Work",
    badgeClass: "bg-badge-red",
    textClass: "text-red-600",
  };
}
