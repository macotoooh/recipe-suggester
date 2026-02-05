"use client";

import { useState } from "react";

const defaultForm = {
  ingredients: "egg, rice, soy sauce, green onion",
  mood: "cozy",
  category: "Japanese",
  customCategory: "",
  motivation: "low",
  cleanup: "minimal",
};

type SuggestPayload = {
  ingredients: string[];
  mood: string;
  category: string;
  motivation: string;
  cleanup: string;
};

const normalizeIngredients = (input: string) =>
  input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const resolveCategory = (category: string, customCategory: string) =>
  category === "other" && customCategory.trim()
    ? customCategory.trim()
    : category;

export const useRecipeForm = () => {
  const [ingredients, setIngredients] = useState(defaultForm.ingredients);
  const [mood, setMood] = useState(defaultForm.mood);
  const [category, setCategory] = useState(defaultForm.category);
  const [customCategory, setCustomCategory] = useState(
    defaultForm.customCategory,
  );
  const [motivation, setMotivation] = useState(defaultForm.motivation);
  const [cleanup, setCleanup] = useState(defaultForm.cleanup);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("");

    const payload: SuggestPayload = {
      ingredients: normalizeIngredients(ingredients),
      mood,
      category: resolveCategory(category, customCategory),
      motivation,
      cleanup,
    };

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data.recipes ?? "No suggestions returned.");
    } catch (error) {
      console.error(error);
      setResult("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    ingredients,
    setIngredients,
    mood,
    setMood,
    category,
    setCategory,
    customCategory,
    setCustomCategory,
    motivation,
    setMotivation,
    cleanup,
    setCleanup,
    result,
    loading,
    onSubmit,
  };
};
