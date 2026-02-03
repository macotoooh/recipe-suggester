import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type SuggestRecipesInput = {
  ingredients: string[];
  mood: string;
  category: string;
  motivation: string;
  cleanup: string;
};

export async function suggestRecipes(input: SuggestRecipesInput) {
  const prompt = `
You are a helpful home cooking assistant.

Based on the following inputs, suggest 1–3 simple home-cooked meal ideas.

Inputs:
- Ingredients: ${input.ingredients.join(", ")}
- Mood: ${input.mood}
- Cuisine category: ${input.category}
- Motivation level: ${input.motivation}
- Cleanup preference: ${input.cleanup}

Constraints:
- Everyday home cooking
- No fancy techniques
- No rare ingredients
- Return dish names with a short description (1 sentence each)
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return {
    recipes: response.choices[0]?.message?.content ?? "",
  };
}
