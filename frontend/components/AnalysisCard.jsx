import styles from '../styles/AnalysisCard.module.css';

export default function AnalysisCard({ data }) {
  const sentimentClass = {
    Positive: styles.positive,
    Negative: styles.negative,
    Neutral: styles.neutral
  }[data.rating] || styles.neutral;

  const sentimentIcon = {
    Positive: '📈',
    Negative: '📉',
    Neutral: '➖'
  }[data.rating] || '➖';

  return (
    <div className={`${styles.card} ${sentimentClass}`}>
      <h4 className={styles.title}>{data.title}</h4>

      <div className={styles.metaRow}>
        <span className={styles.badge}>
          <span>{sentimentIcon}</span>
          {data.rating}
        </span>

        <div className={styles.confidenceWrapper}>
          <div className={styles.confidenceLabel}>
            Confidence: {data.confidence}%
          </div>
          <div className={styles.confidenceBar}>
            <div
              className={styles.confidenceFill}
              style={{ width: `${data.confidence}%` }}
            />
          </div>
        </div>
      </div>

      <p className={styles.reason}>{data.reason}</p>
    </div>
  );
}
