import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/page.css";

function SavedPlans() {
    const [mealPlans, setMealPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = "defaultUser";

    useEffect(() => {
        loadMealPlans();
    }, []);

    const loadMealPlans = () => {
        axios
            .get(`/api/meal-plan/all?userId=${userId}`)
            .then(res => {
                setMealPlans(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error(err);
                setMealPlans([]);
            });
    };

    const handleDelete = async (planId, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this meal plan?")) {
            return;
        }

        try {
            await axios.delete(`/api/meal-plan/${planId}`);
            setMealPlans(mealPlans.filter(plan => plan._id !== planId));
            if (selectedPlan && selectedPlan._id === planId) {
                setSelectedPlan(null);
            }
        } catch (error) {
            console.error("Error deleting meal plan:", error);
            alert("Failed to delete meal plan. Please try again.");
        }
    };

    const handlePlanClick = async (plan) => {
        if (selectedPlan && selectedPlan._id === plan._id) {
            setSelectedPlan(null);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get(`/api/meal-plan/${plan._id}`);
            setSelectedPlan(res.data);
        } catch (error) {
            console.error("Error loading meal plan:", error);
            alert("Failed to load meal plan details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ marginTop: "120px", textAlign: "center", padding: "0 20px" }}>
                <h1 className="fade-in">Saved Meal Plans</h1>
                <p style={{ marginTop: "10px" }} className="fade-in-delay">
                    Access your previously created meal plans
                </p>
            </div>

            <div className="list">
                {mealPlans.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px" }} className="fade-in">
                        <p>No saved meal plans yet. Create your first meal plan!</p>
                    </div>
                ) : (
                    mealPlans.map((plan, index) => (
                        <div 
                            className={`eachList ${selectedPlan && selectedPlan._id === plan._id ? "selected" : ""}`}
                            key={plan._id || index}
                            onClick={() => handlePlanClick(plan)}
                            style={{ 
                                animation: `slideInUp 0.5s ease ${index * 0.1}s both`,
                                cursor: "pointer"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2>{plan.title || plan.goal || "Meal Plan"}</h2>
                                <img
                                    src="/pics/Screenshot 2025-11-24 231651.png"
                                    style={{ 
                                        borderRadius: "10px", 
                                        width: "35px", 
                                        height: "35px",
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease"
                                    }}
                                    alt="delete"
                                    onClick={(e) => handleDelete(plan._id, e)}
                                    onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                />
                            </div>

                            <div>
                                <p
                                    style={{
                                        backgroundColor: "#d2d2e7",
                                        display: "inline-block",
                                        padding: "5px 15px",
                                        borderRadius: "30px",
                                        margin: "1px",
                                    }}
                                >
                                    {plan.goal}
                                </p>
                                <p>{plan.date || (plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "")}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedPlan && (
                <div className="meal-plan-details fade-in">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 style={{ color: "rgb(50, 107, 50)" }}>7-Day Meal Plan</h2>
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            style={{
                                background: "rgb(200, 200, 200)",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "20px",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "rgb(180, 180, 180)";
                                e.target.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "rgb(200, 200, 200)";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            Close
                        </button>
                    </div>

                    {loading ? (
                        <p>Loading meal plan...</p>
                    ) : selectedPlan.mealPlan && selectedPlan.mealPlan.length > 0 ? (
                        <div className="mealplans">
                            {selectedPlan.mealPlan.map((dayPlan, index) => (
                                <div className="each-meal-plan" key={index} style={{ animation: `slideInUp 0.5s ease ${index * 0.1}s both` }}>
                                    <h3>{dayPlan.day}</h3>
                                    <div className="foods">
                                        {Object.entries(dayPlan.meals).map(([mealType, mealText]) => (
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
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No meal plan details available.</p>
                    )}
                </div>
            )}

            <Footer />
        </>
    );
}

export default SavedPlans;
