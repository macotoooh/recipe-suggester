"use client";
import { Hero } from "../components/Hero";
import { RecipeForm } from "../components/RecipeForm";
import { Results } from "../components/Results";
import { useRecipeForm } from "./hooks/useRecipeForm";

export default function Home() {
  const {
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
  } = useRecipeForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-zinc-900">
      <main className="w-full max-w-3xl px-6 py-16">
        <Hero />
        <RecipeForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          mood={mood}
          setMood={setMood}
          category={category}
          setCategory={setCategory}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          motivation={motivation}
          setMotivation={setMotivation}
          cleanup={cleanup}
          setCleanup={setCleanup}
          loading={loading}
          onSubmit={onSubmit}
        />
        <Results result={result} />
      </main>
    </div>
  );
}
