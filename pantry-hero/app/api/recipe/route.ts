export const dynamic = 'force-static';
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
//import fetch from 'node-fetch';

export async function GET() {
  const recipes = await prisma.recipes.findMany();
  const serializedRecipes = recipes.map(item => ({
    ...item,
    id: item.id.toString(), 
  }));

  return NextResponse.json({ recipes: serializedRecipes }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return new Response("URL is required", { status: 400 });

    // Fetch recipe data from the new API
    const apiUrl = `https://cookr-recipe-parser.p.rapidapi.com/getRecipe?source=${encodeURIComponent(url)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2cc0762e85mshe48272f4c35713ap1fd601jsnb0d229c71d5a',
        'x-rapidapi-host': 'cookr-recipe-parser.p.rapidapi.com'
      }
    };

    const response = await fetch(apiUrl, options);
    const result = await response.json();

    if (!result || !result.recipe) {
      throw new Error("Failed to fetch recipe from API");
    }

    const recipeData = result.recipe;

    console.log('Fetched recipe data:', recipeData);

    if (!recipeData.name || !recipeData.recipeIngredients || !recipeData.recipeInstructions) {
        throw new Error("Incomplete recipe data received from API");
    }

    //Extract and format the instructions
    let formattedInstructions;
    if (typeof recipeData.recipeInstructions[0] === 'object') {
      formattedInstructions = recipeData.recipeInstructions
        .map((instruction: { type: string; text: string }) => instruction.text)
        .join('\n');
    } else {
      formattedInstructions = recipeData.recipeInstructions.join('\n');
    }

    const newRecipe = await prisma.recipes.create({
      data: {
        url: result.url,
        name: recipeData.name,
        ingredients: recipeData.recipeIngredients.join(', '),
        instructions: formattedInstructions,
        description: recipeData.description,
        image: recipeData.image[0],
        cookTime: recipeData.cookTime,
        totalTime: recipeData.totalTime,
        yield: recipeData.recipeYield,
        diet: recipeData.recipeDiet.join(', '),
        cuisine: recipeData.recipeCuisine.join(', '),
        category: recipeData.recipeCategory.join(', '),
        occasion: recipeData.recipeOccasion.join(', '),
        utensils: recipeData.recipeUtensils.join(', '),
        keywords: recipeData.keywords,
        nutritionCalories: recipeData.nutritionCalories,
        created_at: new Date(),
      },
    });

    // Convert BigInt to string before returning the response
    const serializedRecipe = {
      ...newRecipe,
      id: newRecipe.id.toString(),
    };

    return NextResponse.json(serializedRecipe, { status: 201 });
  } catch (error) {
    console.error('Error saving recipe to database:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    if (!id) return new Response("ID is required", { status: 400 });
  
    try {
      await prisma.recipes.delete({
        where: { id: BigInt(id) },
      });
      return new Response("Recipe deleted", { status: 200 });
    } catch (error) {
      console.error('Error deleting recipe from database:', error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }