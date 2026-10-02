import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is missing in .env");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export const generateMealPlan = async (goal, preferences) => {
  try {
    const prompt = `
You are a nutrition expert.
Generate a healthy 7-day meal plan.

Goal: ${goal}
Preferences: ${preferences}

Return ONLY valid JSON in this format:
{
  "Monday": ["Breakfast: ...", "Lunch: ...", "Dinner: ..."],
  "Tuesday": [...]
}
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content.trim();

    let mealPlan;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      mealPlan = JSON.parse(match ? match[0] : text);
    } catch {
      mealPlan = { planText: text };
    }

    return mealPlan;
  } catch (error) {
    console.error("Error generating meal plan:", error.message);
    throw new Error("AI meal plan generation failed.");
  }
};



export const chatWithAI = async (message) => {
  try {
    const prompt = `
You are a helpful nutrition assistant.
Answer this user's question briefly and clearly:
"${message}"
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error chatting with AI:", error.message);
    throw new Error("AI chat failed.");
  }
};

