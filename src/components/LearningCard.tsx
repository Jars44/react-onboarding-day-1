type LearningCardProps = {
  topic: string;
};

function LearningCard({ topic }: LearningCardProps) {
  return (
    <li className="learning-card">
      <span className="learning-check">✓</span>
      <span>{topic}</span>
    </li>
  );
}

export default LearningCard;
