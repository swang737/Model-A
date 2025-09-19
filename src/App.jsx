import Navbar from './components/Navbar.jsx'
import './styles/globals.css'

export default function App({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} AlphaReg. All rights reserved.</p>
      </footer>
    </div>
  )
}
