import { NextResponse } from "next/server";
import { suggestRecipes } from "../../../../suggest-recipes";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await suggestRecipes({
      ingredients: body.ingredients ?? [],
      mood: body.mood ?? "",
      category: body.category ?? "",
      motivation: body.motivation ?? "",
      cleanup: body.cleanup ?? "",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/suggest failed:", error);
    return NextResponse.json(
      { recipes: "Sorry, something went wrong." },
      { status: 500 },
    );
  }
}
