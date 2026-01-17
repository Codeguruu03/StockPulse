import styles from '../styles/PortfolioForm.module.css';
import { useState } from 'react';

export default function PortfolioForm({ onSubmit }) {
  const [symbols, setSymbols] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const symbolArray = symbols.toUpperCase().split(',').map(s => s.trim());
    onSubmit(symbolArray);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={symbols}
        onChange={(e) => setSymbols(e.target.value)}
        placeholder="Enter stock symbols..."
      />
      <button className={styles.button} type="submit">Analyze</button>
    </form>
  );
}
