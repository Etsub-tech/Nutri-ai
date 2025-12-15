import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/page.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    closeMenu();
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="navigationBar">
        <div className="left" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img
            className="saladImg"
            src="/pics/Screenshot 2025-11-16 004429.png"
            alt="NutriAI Logo"
          />
          <div style={{ color: "green", marginTop: "15px" }}>NutriAI</div>
        </div>

        <div className="right">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navigationButtons-home" : "navigationButtons"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/meal-planner"
            className={({ isActive }) =>
              isActive
                ? "navigationButtons-mealplanner"
                : "navigationButtons"
            }
          >
            Meal Planner
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "navigationButtons-chatWithAi"
                : "navigationButtons"
            }
          >
            Chat with AI
          </NavLink>

          <NavLink
            to="/saved-plans"
            className={({ isActive }) =>
              isActive
                ? "navigationButtons-savedPlans"
                : "navigationButtons"
            }
          >
            Saved Plans
          </NavLink>

          <NavLink to="/login" className="navigationButtons">
            Logout
          </NavLink>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="navigationBarPhone">
        <div className="mobile-logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img
            className="saladImg"
            src="/pics/Screenshot 2025-11-16 004429.png"
            alt="NutriAI Logo"
          />
          <div style={{ color: "green" }}>NutriAI</div>
        </div>

        <button 
          className={`humburgerButton ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img className="humburger" src="/pics/OIP.webp" alt="menu" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
      >
        <div 
          className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/meal-planner"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Meal Planner
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Chat with AI
          </NavLink>

          <NavLink
            to="/saved-plans"
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Saved Plans
          </NavLink>

          <NavLink 
            to="/login" 
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}
