import { NavLink } from "react-router-dom";
import "../style/page.css";

export default function Navbar() {
  return (
    <>
      <div className="navigationBar">
        <div className="left">
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

      {/* Mobile Navbar (no logic yet, just UI) */}
      <div className="navigationBarPhone">
        <div>
          <img
            className="saladImg"
            src="/pics/Screenshot 2025-11-16 004429.png"
            alt="NutriAI Logo"
          />
          <div style={{ color: "green" }}>NutriAI</div>
        </div>

        <button className="humburgerButton">
          <img className="humburger" src="/pics/OIP.webp" alt="menu" />
        </button>
      </div>
    </>
  );
}
