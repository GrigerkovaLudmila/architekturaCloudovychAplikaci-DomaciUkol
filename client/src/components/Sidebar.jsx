import { NavLink } from "react-router-dom";
import fridgeSpyLogo from '../FridgeSpyLogo.png'

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="logo-button" to="/dashboard" aria-label="Go to dashboard">
        <span className="logo-text">FRIDGE</span>
        <span className="logo-text logo-text--large">SPY</span>
        <span className="logo-icon">
            <img className="sidebar-logo-image" src={fridgeSpyLogo} alt="FridgeSpy logo"></img>
        </span>
      </NavLink>

      <nav className="sidebar-nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/categories"
        >
          Categories
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
