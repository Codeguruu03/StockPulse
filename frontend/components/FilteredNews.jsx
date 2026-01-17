import styles from '../styles/FilteredNews.module.css';

export default function FilteredNews({ headlines }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>📌 Relevant to Your Portfolio</h2>
      <ul className={styles.list}>
        {headlines.map((n, i) => (
          <li key={i} className={styles.item}>{n.title}</li>
        ))}
      </ul>
    </section>
  );
}
