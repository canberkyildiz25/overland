import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCamperById } from '../services/api.js'

const AMENITY_LABELS = {
  AC: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  TV: 'TV',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
}

function getAmenityTags(vehicle) {
  return Object.keys(AMENITY_LABELS).filter((key) => vehicle[key])
}

const INITIAL_FORM = { name: '', email: '', date: '', comment: '' }

export default function VehicleDetails() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('features')

  // Rezervasyon formu
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchCamperById(id)
      .then((data) => setVehicle(data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false))
  }, [id])

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.date) return
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setTimeout(() => setSubmitted(false), 4000)
  }

  if (loading) {
    return (
      <section className="details-page">
        <p className="status-msg">Yükleniyor...</p>
      </section>
    )
  }

  if (error || !vehicle) {
    return (
      <section className="details-page">
        <div className="details-header">
          <h2>Aradığınız araç bulunamadı.</h2>
          <Link className="back-link" to="/catalog">
            Kataloğa Dön
          </Link>
        </div>
      </section>
    )
  }

  const tags = getAmenityTags(vehicle)
  const details = [
    { label: 'Form', value: vehicle.form },
    { label: 'Length', value: vehicle.length },
    { label: 'Width', value: vehicle.width },
    { label: 'Height', value: vehicle.height },
    { label: 'Tank', value: vehicle.tank },
    { label: 'Consumption', value: vehicle.consumption },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Engine', value: vehicle.engine },
  ].filter((item) => item.value)

  return (
    <section className="details-page">
      <div className="details-header">
        <div>
          <h2>{vehicle.name}</h2>
          <p className="details-meta">
            <span className="star-icon">★</span>
            {vehicle.rating}({vehicle.reviews?.length ?? 0} Reviews) · 📍 {vehicle.location}
          </p>
        </div>
        <span className="details-price">€{Number(vehicle.price).toFixed(2)}</span>
      </div>

      <div className="details-gallery">
        {vehicle.gallery?.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className="detail-image"
            style={{ backgroundImage: `url(${img.thumb})` }}
          />
        ))}
      </div>

      <p className="details-description">{vehicle.description}</p>

      <div className="details-tabs">
        <button
          className={`tab${tab === 'features' ? ' active' : ''}`}
          onClick={() => setTab('features')}
        >
          Features
        </button>
        <button
          className={`tab${tab === 'reviews' ? ' active' : ''}`}
          onClick={() => setTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {tab === 'features' ? (
        <div className="details-content">
          <div className="details-panel">
            <div className="feature-tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {AMENITY_LABELS[tag]}
                </span>
              ))}
            </div>

            <h4>Vehicle details</h4>
            <div className="details-list">
              {details.map((item) => (
                <div key={item.label} className="details-row">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <h4>Book your campervan now</h4>
            <p>Stay connected! We are always ready to help you.</p>

            {submitted && (
              <div className="booking-success">
                Rezervasyonunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            )}

            <input
              type="text"
              placeholder="Name *"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
            <input
              type="date"
              placeholder="Booking date *"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              required
            />
            <textarea
              placeholder="Comment"
              rows={4}
              value={form.comment}
              onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div className="reviews-panel">
          {!vehicle.reviews?.length ? (
            <p className="details-description">Henüz değerlendirme yok.</p>
          ) : (
            vehicle.reviews.map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-avatar">
                  {review.reviewer_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="review-header">
                    <strong>{review.reviewer_name}</strong>
                    <div className="review-stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={index < review.reviewer_rating ? 'star active' : 'star'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
