import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ //creates a new OpenAI client instance using your secret API key. “Hey OpenAI, I want to talk to you using my credentials.”
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateMealPlan = async (goal, preferences) => {
    try{
        const prompt = `
            You are a nutrition expert. Generate a healthy 7-day meal plan.
            Goal: ${goal}
            Preferences: ${preferences}
            Return the plan as valid JSON in this structure:
            {
                "Monday": ["Breakfast: ...", "Lunch: ...", "Dinner: ..."],
                "Tuesday": [...],
                ...
            }`;
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7, //controls randomness; 0.7 allows some creativity.
            });

            const text = response.choices[0].message.content.trim();
            let mealPlan;
            try {
            mealPlan = JSON.parse(text);
            } catch (err) {
            mealPlan = { planText: text };
            }

            return mealPlan;
    } catch (error){
        console.error("Error generating meal plan:", error.message);
        throw new Error("AI meal plan generation failed.");
    }
};


export const chatWithAI = async(message) =>{
    try{
        const prompt =`
            You are a helpful nutrition assistant.
            Answer this user's question briefly and clearly:
            "${message}"
                `;
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6,
        });

        return response.choices[0].message.content.trim();
    } catch(error){
        console.error("Error chatting with AI:", error.message);
        throw new Error("AI chat failed.");
  }
};
