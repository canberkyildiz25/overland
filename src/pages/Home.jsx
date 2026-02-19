import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main id="home" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Explore the open road</p>
        <h1>TravelTrucks ile maceranı planla.</h1>
        <p className="subtext">
          Konforlu karavanlar ve kampervanlar için en iyi seçenekler burada.
        </p>
        <button className="view-btn" onClick={() => navigate('/catalog')}>
          View Now
        </button>
      </div>
    </main>
  )
}
