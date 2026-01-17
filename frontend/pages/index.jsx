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

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched news:", data);
        setAllNews(data.headlines);
      });
  }, []);

  const handlePortfolioSubmit = async (symbols) => {
    setPortfolio(symbols);
    const filteredNews = allNews.filter(n =>
  symbols.some(sym => new RegExp(`\\b${sym}\\b`, 'i').test(n.title))
);

    setFiltered(filteredNews);

    console.log("Filtered news:", filteredNews);
    if (filteredNews.length === 0) {
  alert("No matching news found for the entered symbols.");
  return;
}
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filtered: filteredNews })
    });
    const { analysis } = await res.json();
    setAnalysis(analysis);
  };

  return (
  <div>
    {/* Background section just for input */}
    <section className={styles.background}>
      <div className={styles.centerBox}>
        <PortfolioForm onSubmit={handlePortfolioSubmit} />
      </div>
    </section>

    {/* Scrollable content below */}
    <section className={styles.generalNews}>
      <NewsList headlines={allNews} />
    </section>

    {filtered.length > 0 && <FilteredNews headlines={filtered} />}
    {analysis.length > 0 && analysis.map((a, i) => <AnalysisCard key={i} data={a} />)}
  </div>
);

}
