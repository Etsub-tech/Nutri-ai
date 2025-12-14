import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ChatWithAI from "./pages/ChatWithAI";
import MealPlanner from "./pages/MealPlanner";
import SavedPlans from "./pages/SavedPlans";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatWithAI />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
