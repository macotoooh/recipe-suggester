"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

// TODO: refactor
const defaultForm = {
  ingredients: "egg, rice, soy sauce, green onion",
  mood: "cozy",
  category: "Japanese",
  customCategory: "",
  motivation: "low",
  cleanup: "minimal",
};

export default function Home() {
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

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          mood,
          category:
            category === "other" && customCategory.trim()
              ? customCategory.trim()
              : category,
          motivation,
          cleanup,
        }),
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-zinc-900">
      <main className="w-full max-w-3xl px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Recipe Suggester
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Dinner, without the overthinking.
          </h1>
          <p className="max-w-xl text-base text-zinc-600 sm:text-lg">
            Tell the AI what is in your fridge, your mood, and how much energy
            you have. It suggests a few simple, everyday dinner ideas.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 grid gap-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="grid gap-2 text-sm font-medium text-zinc-600">
            Ingredients
            <textarea
              className="min-h-22.5 rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-zinc-600">
              Mood
              <input
                className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={mood}
                onChange={(event) => setMood(event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-600">
              Cuisine category
              <select
                className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Chinese">Chinese</option>
                <option value="Thai">Thai</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="other">Other (type below)</option>
              </select>
            </label>
          </div>

          {category === "other" ? (
            <label className="grid gap-2 text-sm font-medium text-zinc-600">
              Custom category
              <input
                className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={customCategory}
                onChange={(event) => setCustomCategory(event.target.value)}
                placeholder="e.g. Filipino, French, Middle Eastern"
              />
            </label>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-zinc-600">
              Motivation level
              <select
                className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={motivation}
                onChange={(event) => setMotivation(event.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-600">
              Cleanup preference
              <select
                className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={cleanup}
                onChange={(event) => setCleanup(event.target.value)}
              >
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="no preference">No preference</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {loading ? "Thinking..." : "Suggest recipes"}
          </button>
        </form>

        <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Results
          </p>
          <div className="mt-4 prose prose-zinc max-w-none">
            <ReactMarkdown>
              {result || "Submit the form to see suggestions here."}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  );
}
