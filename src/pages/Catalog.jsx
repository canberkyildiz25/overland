import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCampers, setFilters, showMore } from '../store/campersSlice.js'
import { toggleFavorite } from '../store/favoritesSlice.js'

const AMENITY_LABELS = {
  AC: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  TV: 'TV',
  radio: 'Radio',
}

const VEHICLE_TYPES = [
  { value: 'van', label: 'Van' },
  { value: 'fullyIntegrated', label: 'Fully Integrated' },
  { value: 'alcove', label: 'Alcove' },
]

function getAmenityTags(vehicle) {
  return Object.keys(AMENITY_LABELS).filter((key) => vehicle[key])
}

export default function Catalog() {
  const dispatch = useDispatch()
  const { items, visibleCount, loading, error, filters } = useSelector((s) => s.campers)
  const favoriteIds = useSelector((s) => s.favorites.ids)

  // Geçici filtre state'i - Search'e basılınca Redux'a gönderilir
  const [localFilters, setLocalFilters] = useState(filters)

  // Sayfa ilk açıldığında filtreler ile yükle
  useEffect(() => {
    dispatch(loadCampers(filters))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch() {
    dispatch(setFilters(localFilters))
    dispatch(loadCampers(localFilters))
  }

  function toggleEquipment(key) {
    setLocalFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleTypeSelect(value) {
    setLocalFilters((prev) => ({
      ...prev,
      form: prev.form === value ? '' : value,
    }))
  }

  const visible = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <section id="catalog" className="catalog-page">
      <aside className="filters">
        <div className="filter-block">
          <label className="filter-label">Location</label>
          <input
            className="filter-input"
            type="text"
            placeholder="Try ‘Utah’ or ‘Oregon’"
            value={localFilters.location}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>

        <div className="filter-block">
          <label className="filter-label">Filters</label>
          <p className="filter-subtitle">Vehicle equipment</p>
          <div className="filter-grid">
            {Object.keys(AMENITY_LABELS).map((key) => (
              <button
                key={key}
                className={`filter-chip${localFilters[key] ? ' active' : ''}`}
                onClick={() => toggleEquipment(key)}
              >
                {AMENITY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <p className="filter-subtitle">Vehicle type</p>
          <div className="filter-grid">
            {VEHICLE_TYPES.map((t) => (
              <button
                key={t.value}
                className={`filter-chip${localFilters.form === t.value ? ' active' : ''}`}
                onClick={() => handleTypeSelect(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </aside>

      <div className="catalog-list">
        {loading && <p className="status-msg">Loading the fleet…</p>}
        {error && <p className="status-msg error">Something went wrong: {error}</p>}

        {!loading && !error && visible.length === 0 && (
          <p className="status-msg">No rigs match your filters. Try widening your search.</p>
        )}

        {!loading &&
          !error &&
          visible.map((vehicle) => {
            const tags = getAmenityTags(vehicle)
            const reviewCount = vehicle.reviews?.length ?? 0
            const isFav = favoriteIds.includes(vehicle.id)
            return (
              <article key={vehicle.id} className="vehicle-card">
                <div
                  className="vehicle-image"
                  style={{
                    backgroundImage: vehicle.gallery?.[0]?.thumb
                      ? `url(${vehicle.gallery[0].thumb})`
                      : undefined,
                  }}
                />
                <div className="vehicle-info">
                  <div className="vehicle-header">
                    <div>
                      <h3>{vehicle.name}</h3>
                      <p className="vehicle-meta">
                      <span className="star-icon">★</span>
                      {vehicle.rating} ({reviewCount} reviews) · {vehicle.location}
                    </p>
                    </div>
                    <div className="vehicle-price">
                      <span>${vehicle.price}<i>/night</i></span>
                      <button
                        className={`fav-btn${isFav ? ' active' : ''}`}
                        onClick={() => dispatch(toggleFavorite(vehicle.id))}
                        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                      >
                        {isFav ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                  <p className="vehicle-desc">{vehicle.description}</p>
                  <div className="vehicle-tags">
                    {tags.map((tag) => (
                      <span key={tag} className="tag">
                        {AMENITY_LABELS[tag]}
                      </span>
                    ))}
                  </div>
                  {/* Show More yeni sekmede açılır */}
                  <a
                    className="show-more"
                    href={`/catalog/${vehicle.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Show more
                  </a>
                </div>
              </article>
            )
          })}

        {!loading && !error && hasMore && (
          <div className="load-more-wrap">
            <button className="load-more-btn" onClick={() => dispatch(showMore())}>
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
