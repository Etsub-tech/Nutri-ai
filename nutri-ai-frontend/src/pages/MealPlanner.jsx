import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/page.css";

function MealPlanner() {
  const [goalInput, setGoalInput] = useState("");
  const [preference, setPreference] = useState("");
  const [mealPlan, setMealPlan] = useState([]); // AI response here
  const [loading, setLoading] = useState(false);

  // Called when button is clicked
  const generateMealPlan = async () => {
    if (!goalInput.trim() || !preference.trim()) {
      alert("Please fill in both goal and dietary preferences.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/meal-plan", {
        goal: goalInput.trim(),
        preference: preference.trim(),
        userId: "defaultUser",
      });

      // Expecting response.data.mealPlan (array)
      if (response.data.mealPlan && Array.isArray(response.data.mealPlan) && response.data.mealPlan.length > 0) {
        setMealPlan(response.data.mealPlan);
      } else {
        console.error("Unexpected response format:", response.data);
        const errorMsg = response.data?.details || response.data?.error || "Failed to generate meal plan. Please try again.";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Failed to generate meal plan", error);
      const errorMsg = error.response?.data?.details || error.response?.data?.error || error.message || "Failed to generate meal plan. Please check your backend connection and try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div style={{ textAlign: "center", marginTop: "120px" }} className="fade-in">
        <h1>AI Meal Planner</h1>
        <p>Create your personalized meal plan based on your goals</p>
      </div>

      {/* Preferences */}
      <div className="first fade-in-delay">
        <h2>Your Preferences</h2>

        <div className="inputs">
          <div>
            <p>Health Goal</p>
            <input
              className="each-input"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="e.g., Weight Loss"
            />
          </div>

          <div>
            <p>Dietary Preferences</p>
            <input
              className="each-input"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="e.g., Vegan, Ethiopian Foods"
            />
          </div>
        </div>

        <button className="generate-button" onClick={generateMealPlan}>
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </div>

      {/* Meal Plan Display */}
      {mealPlan.length > 0 && (
        <>
          <h1 style={{ marginLeft: "20px" }}>Your 7-Day Meal Plan</h1>

          <div className="mealplans">
            {mealPlan.map((dayPlan, index) => (
              <div className="each-meal-plan" key={index}>
                <h3>{dayPlan.day}</h3>

                <div className="foods">
                  {Object.entries(dayPlan.meals).map(
                    ([mealType, mealText]) => (
                      <div className="each-foods" key={mealType}>
                        <img
                          className="days-image"
                          src="/pics/photo-1627308594190-a057cd4bfac8.jpg"
                          alt={mealType}
                        />
                        <p>
                          <strong>{mealType}:</strong> {mealText}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default MealPlanner;
