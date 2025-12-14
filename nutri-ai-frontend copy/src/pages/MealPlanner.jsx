import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/page.css";

function MealPlanner() {
  const [goalInput, setGoalInput] = useState("");
  const [preference, setPreference] = useState("");
  const [mealPlan, setMealPlan] = useState([]); // AI response here
  const [loading, setLoading] = useState(false);

  // Called when button is clicked
  const generateMealPlan = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/meal-plan", {
        goal: goalInput,
        preference,
        userId: "defaultUser",
      });

      // Expecting response.mealPlan (array)
      setMealPlan(response.data.mealPlan);
    } catch (error) {
      console.error("Failed to generate meal plan", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h1>AI Meal Planner</h1>
        <p>Create your personalized meal plan based on your goals</p>
      </div>

      {/* Preferences */}
      <div className="first">
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
                          src="pics/photo-1627308594190-a057cd4bfac8.jpg"
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
