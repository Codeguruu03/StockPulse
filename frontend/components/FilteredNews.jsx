import styles from '../styles/FilteredNews.module.css';

export default function FilteredNews({ headlines }) {
  if (!headlines || headlines.length === 0) {
    return null;
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
