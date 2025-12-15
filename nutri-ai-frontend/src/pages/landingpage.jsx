import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/page.css";

export default function LandingPage() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setAnimate(true);

    // wait for animation to finish
    setTimeout(() => {
      navigate("/home");
    }, 800); // must match CSS animation duration
  };

  return (
    <div
      className={`landing-page ${animate ? "animate" : ""}`}
      onClick={handleClick}
    >
      <img
        className="landing-logo"
        src="/pics/Screenshot 2025-11-16 004429.png"
        alt="NutriAI Logo"
      />
      <h1 className="landing-title">NutriAI</h1>
    </div>
  );
}
