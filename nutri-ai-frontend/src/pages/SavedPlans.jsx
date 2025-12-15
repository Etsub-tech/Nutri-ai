import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/page.css";

function SavedPlans() {
    const [mealPlans, setMealPlans] = useState([]);
    const userId = "defaultUser"; // replace later with auth user

    useEffect(() => {
        axios
            .get(`/api/meal-plan/all?userId=${userId}`)
            .then(res => {
                // Response should be an array of plans
                setMealPlans(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error(err);
                setMealPlans([]);
            });
    }, []);

    return (
        <>
            <Navbar />

            <div style={{ marginTop: "120px", textAlign: "center", padding: "0 20px" }}>
                <h1>Saved Meal Plans</h1>
                <p style={{ marginTop: "10px" }}>
                    Access your previously created meal plans
                </p>
            </div>

            <div className="list">
                {mealPlans.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>No saved meal plans yet. Create your first meal plan!</p>
                    </div>
                ) : (
                    mealPlans.map((plan, index) => (
                        <div className="eachList" key={index}>
                            <h2>{plan.title || plan.goal || "Meal Plan"}</h2>

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

                            <img
                                src="/pics/Screenshot 2025-11-24 231651.png"
                                style={{ borderRadius: "10px", width: "45px", height: "45px" }}
                                alt="view"
                            />
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </>
    );
}

export default SavedPlans;
