import "../styles/home.css";


export default function Home() {
return (
<div className="home-wrapper">
<section className="hero-section">
<h1>Your Personal AI Nutrition Assistant</h1>
<h3>Transform your health journey with AI-powered meal plans</h3>
<div className="two-buttons">
<a href="/meal-planner" className="startPlanning">Start Planning Meals</a>
<a href="/chat" className="chatwithai">Chat with AI</a>
</div>
</section>


{/* FEATURES SECTION */}
<section className="features">
<h1>Everything You Need for a Healthier You</h1>
<div className="feature-grid">
<div><h2>Smart Meal Planning</h2><p>AI-powered custom meal plans.</p></div>
<div><h2>24/7 AI Coach</h2><p>Instant answers to nutrition questions.</p></div>
<div><h2>Meal History</h2><p>Track progress and past plans.</p></div>
<div><h2>Diverse Recipes</h2><p>Thousands of personalized recipes.</p></div>
</div>
</section>
</div>
);
}