import { Link } from "react-router-dom";
import "../styles/navbar.css";


export default function Navbar() {
return (
<div className="navigationBar">
<div className="left">
<img className="saladImg" src="/pics/logo.png" />
<div style={{ color: "green", marginTop: "15px" }}>NutriAI</div>
</div>


<div className="right">
<Link to="/" className="navigationButtons">Home</Link>
<Link to="/meal-planner" className="navigationButtons">Meal Planner</Link>
<Link to="/chat" className="navigationButtons">Chat with AI</Link>
<Link to="/saved" className="navigationButtons">Saved Plans</Link>
<Link to="/login" className="navigationButtons">Logout</Link>
</div>
</div>
);
}