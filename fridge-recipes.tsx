import { suggestRecipes } from "./suggest-recipes";

(async () => {
  const result = await suggestRecipes({
    ingredients: ["eggs", "cabbage", "bacon"],
    mood: "light",
    category: "Asian",
    motivation: "no motivation",
    cleanup: "one pan only",
  });

  console.log(result);
})();
