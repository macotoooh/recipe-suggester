"use client";

import type {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
} from "react";

type RecipeFormProps = {
  ingredients: string;
  setIngredients: Dispatch<SetStateAction<string>>;
  mood: string;
  setMood: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  customCategory: string;
  setCustomCategory: Dispatch<SetStateAction<string>>;
  motivation: string;
  setMotivation: Dispatch<SetStateAction<string>>;
  cleanup: string;
  setCleanup: Dispatch<SetStateAction<string>>;
  loading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const RecipeForm = ({
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
  loading,
  onSubmit,
}: RecipeFormProps) => {
  const onChangeIngredients: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => setIngredients(event.target.value);
  const onChangeMood: ChangeEventHandler<HTMLInputElement> = (event) =>
    setMood(event.target.value);
  const onChangeCategory: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setCategory(event.target.value);
  const onChangeCustomCategory: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => setCustomCategory(event.target.value);
  const onChangeMotivation: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setMotivation(event.target.value);
  const onChangeCleanup: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setCleanup(event.target.value);

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 grid gap-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <label className="grid gap-2 text-sm font-medium text-zinc-600">
        Ingredients
        <textarea
          className="min-h-22.5 rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          value={ingredients}
          onChange={onChangeIngredients}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-600">
          Mood
          <input
            className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={mood}
            onChange={onChangeMood}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-600">
          Cuisine category
          <select
            className="rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={category}
            onChange={onChangeCategory}
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
            onChange={onChangeCustomCategory}
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
            onChange={onChangeMotivation}
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
            onChange={onChangeCleanup}
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
  );
};
