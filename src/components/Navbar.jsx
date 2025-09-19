import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar(){
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img className="logo" src={logo} alt="AlphaReg logo" />
        <span>AlphaReg</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/solutions">Solutions</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/cases">Case Studies</NavLink>
      </nav>
      <a className="button" href="#demo">Get started</a>
    </header>
  )
}
