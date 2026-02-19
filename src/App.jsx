import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import VehicleDetails from './pages/VehicleDetails.jsx'

function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <NavLink to="/" className="logo">
          <span className="logo-travel">Travel</span>
          <span className="logo-trucks">Trucks</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
        </nav>
      </header>

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
