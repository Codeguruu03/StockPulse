import styles from '../styles/NewsList.module.css';

export default function NewsList({ headlines }) {
  return (
    <section>
      <h2 className={styles.heading}>📢General News</h2>
      <ul className={styles.list}>
        {headlines.map((n, i) => (
          <li key={i} className={styles.item}>{n.title}</li>
        ))}
      </ul>
    </section>
  );
}
