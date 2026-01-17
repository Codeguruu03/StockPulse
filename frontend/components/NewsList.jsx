import styles from '../styles/NewsList.module.css';

export default function NewsList({ headlines }) {
  if (!headlines || headlines.length === 0) {
    return <p style={{ color: 'var(--text-secondary)' }}>No news available</p>;
  }

  return (
    <ul className={styles.list}>
      {headlines.map((n, i) => (
        <li key={i} className={styles.item}>
          {n.title}
        </li>
      ))}
    </ul>
  );
}
