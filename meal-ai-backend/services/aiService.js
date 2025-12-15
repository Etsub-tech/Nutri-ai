import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error("WARNING: OPENAI_API_KEY is not set in environment variables!");
}

const openai = new OpenAI({ //creates a new OpenAI client instance using your secret API key. "Hey OpenAI, I want to talk to you using my credentials."
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
                // Try to extract JSON from markdown code blocks if present
                let jsonText = text;
                const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
                if (jsonMatch) {
                    jsonText = jsonMatch[1];
                } else {
                    // Try to find JSON object in the text
                    const braceMatch = text.match(/\{[\s\S]*\}/);
                    if (braceMatch) {
                        jsonText = braceMatch[0];
                    }
                }
                mealPlan = JSON.parse(jsonText);
            } catch (err) {
                console.error("Failed to parse JSON from AI response:", err.message);
                console.error("AI Response text:", text.substring(0, 500));
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
