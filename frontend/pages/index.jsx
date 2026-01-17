import { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import PortfolioForm from '../components/PortfolioForm';
import FilteredNews from '../components/FilteredNews';
import AnalysisCard from '../components/AnalysisCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [allNews, setAllNews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setAllNews(data.headlines || []);
        setNewsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch news:', err);
        setNewsLoading(false);
      });
  }, []);

  const handlePortfolioSubmit = async (symbols) => {
    setPortfolio(symbols);
    setLoading(true);
    setAnalysis([]);
    setError(null);

    const filteredNews = allNews.filter(n =>
      symbols.some(sym => new RegExp(`\\b${sym}\\b`, 'i').test(n.title))
    );

    setFiltered(filteredNews);

    if (filteredNews.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filtered: filteredNews })
      });

      if (!res.ok) {
        throw new Error('AI analysis service temporarily unavailable');
      }

      const data = await res.json();
      setAnalysis(data.analysis || []);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('AI analysis is temporarily unavailable. Please check your API configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📈</span>
          <span className={styles.logoText}>StockPulse</span>
        </div>
        <span className={styles.tagline}>AI-Powered Stock Sentiment Analyzer</span>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Analyze Market News with AI</h1>
        <p className={styles.heroSubtitle}>
          Enter your stock symbols to get AI-powered sentiment analysis on relevant news
        </p>
        <div className={styles.inputWrapper}>
          <PortfolioForm onSubmit={handlePortfolioSubmit} loading={loading} />
        </div>
        <p className={styles.symbolHint}>
          Try: <code>RELIANCE</code>, <code>TCS</code>, <code>INFY</code>, <code>HDFC</code>
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className="spinner"></div>
          <p className={styles.loadingText}>Analyzing news with AI...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>{error}</p>
          <p className={styles.errorHint}>Please ensure your DeepSeek API key is valid in backend/.env</p>
        </div>
      )}

      {/* Analysis Results */}
      {!loading && !error && analysis.length > 0 && (
        <section className={styles.analysisSection}>
          <h2 className={styles.analysisTitle}>
            <span>🤖</span> AI Analysis Results
          </h2>
          {analysis.map((a, i) => (
            <AnalysisCard key={i} data={a} />
          ))}
        </section>
      )}

      {/* No Results Message */}
      {!loading && filtered.length === 0 && portfolio.length > 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>No matching news found for your portfolio symbols.</p>
        </div>
      )}

      {/* Content Grid: News Sections */}
      <div className={styles.contentGrid}>
        {/* Filtered News */}
        {filtered.length > 0 && (
          <div className={styles.newsSection}>
            <h3 className={styles.sectionTitle}>
              <span>📌</span> Portfolio News
            </h3>
            <FilteredNews headlines={filtered} />
          </div>
        )}

        {/* General News */}
        <div className={styles.newsSection} style={filtered.length === 0 ? { gridColumn: '1 / -1' } : {}}>
          <h3 className={styles.sectionTitle}>
            <span>📰</span> Market News
          </h3>
          {newsLoading ? (
            <div className={styles.loadingOverlay}>
              <div className="spinner"></div>
              <p className={styles.loadingText}>Loading news...</p>
            </div>
          ) : (
            <NewsList headlines={allNews} />
          )}
        </div>
      </div>
    </div>
  );
}
