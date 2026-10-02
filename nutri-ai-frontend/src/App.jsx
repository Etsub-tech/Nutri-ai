import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage.jsx";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import SavedPlans from "./pages/SavedPlans";
import ChatWithAI from "./pages/ChatWithAI";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="/chat" element={<ChatWithAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
