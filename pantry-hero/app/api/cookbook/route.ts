export const dynamic = 'force-static';
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  //Fetch the user's pantry ingredients
  const pantryItems = await prisma.ingredients.findMany();
  const pantryIngredients = pantryItems.map(item => item.name.toLowerCase());
  console.log('Pantry ingredients:', pantryIngredients);

  const allRecipes = await prisma.recipes.findMany();

  //Calculate the number of matching ingredients for each recipe
  const recipesWithMatchCount = allRecipes.map(recipe => {
    const recipeIngredients = recipe.ingredients.split(', ').map(ingredient => ingredient.toLowerCase());
    const matchCount = recipeIngredients.filter(recipeIngredient =>
      pantryIngredients.some(pantryIngredient => recipeIngredient.includes(pantryIngredient))
    ).length;
    return { ...recipe, matchCount };
  });

  // Sort recipes by the number of matching ingredients in descending order
  const sortedRecipes = recipesWithMatchCount.sort((a, b) => b.matchCount - a.matchCount);

  // Log matching recipe ingredients to the console
  sortedRecipes.forEach(recipe => {
    console.log(`__________ Recipe: ${recipe.name}, Match Count: ${recipe.matchCount}, Ingredients: ${recipe.ingredients}`);
  });

  const serializedRecipes = sortedRecipes.map(item => ({
    ...item,
    id: item.id.toString(),
  }));

  return NextResponse.json({ recipes: serializedRecipes }, { status: 200 });
}