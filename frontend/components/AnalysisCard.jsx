import styles from '../styles/AnalysisCard.module.css';

export default function AnalysisCard({ data }) {
  const colorClass = {
    Positive: styles.positive,
    Negative: styles.negative,
    Neutral: styles.neutral
  }[data.rating] || styles.neutral;

  return (
    <div className={`${styles.card} ${colorClass}`}>
      <h4 className={styles.title}>{data.title}</h4>
      <p className={styles.impact}><strong>Impact:</strong> {data.rating} ({data.confidence}%)</p>
      <p className={styles.reason}><em>{data.reason}</em></p>
    </div>
  );
}
