import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/page.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="firstPage">
        <div>
          <h1
            className="fade-in"
            style={{
              color: "rgb(50, 107, 50)",
              paddingTop: "50px",
              display: "grid",
              textAlign: "center",
            }}
          >
            Your Personal AI Nutrition Assistant
          </h1>

          <h3 className="fade-in-delay" style={{ marginTop: "20px" }}>
            Transform your health journey with personalized meal plans, smart
            grocery lists, and 24/7 AI-powered nutrition guidance.
          </h3>

          <div className="two-buttons fade-in-delay" style={{ marginTop: "60px" }}>
            <Link to="/meal-planner" className="startPlannign">
              Start Planning Meals
            </Link>
            <Link to="/chat" className="chatwithai">
              Chat with AI
            </Link>
          </div>
        </div>

        <div>
          <img
            className="firstImage"
            src="/pics/photo-1670164747721-d3500ef757a6.jpg"
            alt="Healthy food"
          />
        </div>
      </div>

      <div className="everything fade-in">
        <h1>Everything You Need for a Healthier You</h1>
        <h3 style={{ marginTop: "15px" }}>
          Powerful AI-driven features to help you reach your nutrition goals
        </h3>
      </div>

      <div className="row-boxes">
        <div className="each-row-boxes">
          <img src="/pics/Screenshot 2025-11-15 172706.png" style={{width: "50px"}} />
          <h2>Smart Meal Planning</h2>
          <p>
            AI-powered meal plans tailored to your goals, preferences, and
            dietary needs.
          </p>
        </div>

        <div className="each-row-boxes">
          <img src="/pics/Screenshot 2025-11-15 173328.png" style={{width: "50px"}} />
          <h2>24/7 AI Nutrition Coach</h2>
          <p>
            Get instant answers to your nutrition questions anytime, anywhere.
          </p>
        </div>

        <div className="each-row-boxes">
          <img src="/pics/Screenshot 2025-11-15 173359.png" style={{width: "50px"}} />
          <h2>Meal Plan History</h2>
          <p>
            Show a timeline of past plans to help users track progress or repeat
            favorites.
          </p>
        </div>

        <div className="each-row-boxes">
          <img src="/pics/Screenshot 2025-11-15 173423.png" style={{width: "50px"}} />
          <h2>Diverse Recipes</h2>
          <p>
            Access thousands of healthy recipes that match your taste and goals.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "rgb(245, 245, 245)" }}>
        <div className="how-it-works">
          <h1>How It Works</h1>
          <p>Get started in just three simple steps</p>
        </div>

        <div className="guide">
          <div className="guide-each">
            <h4>1</h4>
            <h2>Set Your Goals</h2>
            <p>Tell us about your health goals and dietary preferences</p>
          </div>

          <div className="guide-each">
            <h4>2</h4>
            <h2>Get Your Plan</h2>
            <p>Our AI creates a personalized meal plan tailored just for you</p>
          </div>

          <div className="guide-each">
            <h4>3</h4>
            <h2>Start Living Healthy</h2>
            <p>
              Follow your plan, track progress, and chat with AI for support
            </p>
          </div>
        </div>

        <div className="ready fade-in">
          <h1>Ready to Transform Your Health?</h1>
          <p>
            Take the first step toward a healthier, happier you with simple,
            personalized guidance.
          </p>

          <Link
            to="/meal-planner"
            className="chatwithai"
            style={{ border: "none" }}
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
