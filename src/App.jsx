import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import VehicleDetails from './pages/VehicleDetails.jsx'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* home hero is dark full-bleed → header starts transparent there;
     every other route needs the solid bar from the top */
  const solid = scrolled || pathname !== '/'

  return (
    <header className={`site-header${solid ? ' solid' : ''}`}>
      <NavLink to="/" className="logo">
        OVER<span className="logo-accent">LAND</span>
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={({ isActive }) => (isActive ? 'active' : '')}>
          Fleet
        </NavLink>
      </nav>
      <NavLink to="/catalog" className="header-cta">
        Book a Rig
      </NavLink>
    </header>
  )
}

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="app">
      <ScrollReset />
      <Header />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<VehicleDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
