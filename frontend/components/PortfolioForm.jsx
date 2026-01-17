import styles from '../styles/PortfolioForm.module.css';
import { useState } from 'react';

export default function PortfolioForm({ onSubmit, loading }) {
  const [symbols, setSymbols] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbols.trim()) return;
    const symbolArray = symbols.toUpperCase().split(',').map(s => s.trim()).filter(Boolean);
    onSubmit(symbolArray);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={symbols}
        onChange={(e) => setSymbols(e.target.value)}
        placeholder="Enter stock symbols (e.g., RELIANCE, TCS, INFY)"
        disabled={loading}
      />
      <button className={styles.button} type="submit" disabled={loading || !symbols.trim()}>
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            Analyzing...
          </>
        ) : (
          '🔍 Analyze'
        )}
      </button>
    </form>
  );
}
