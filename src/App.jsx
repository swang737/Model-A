import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="app-shell">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <main>
        <Outlet /> {/* <- renders your pages (Home, Pricing, etc.) */}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Model-A. All rights reserved.</p>
      </footer>
    </div>
  );
}
