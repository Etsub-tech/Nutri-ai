import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/page.css";

function SavedPlans() {
    const [mealPlans, setMealPlans] = useState([]);
    const userId = "defaultuser"; // replace later with auth user

    useEffect(() => {
        axios
            .get(`/api/meal-plan/latest/${userId}`)
            .then(res => {
                setMealPlans(res.data);
            })
            .catch(err => {
                console.error(err);
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
                {mealPlans.map((plan, index) => (
                    <div className="eachList" key={index}>
                        <h2>{plan.title || "Meal Plan"}</h2>

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
                            <p>{plan.date}</p>
                        </div>

                        <img
                            src="pics/Screenshot 2025-11-24 231651.png"
                            style={{ borderRadius: "10px", width: "45px", height: "45px" }}
                            alt="view"
                        />
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default SavedPlans;
