import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const recipes = await prisma.recipes.findMany();
  const serializedRecipes = recipes.map(item => ({
    ...item,
    id: item.id.toString(), // Convert BigInt to string
  }));

  return NextResponse.json({ recipes: serializedRecipes }, { status: 200 });
}

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) return new Response("URL is required", { status: 400 });

  const newRecipe = await prisma.recipes.create({
    data: {
      url,
      created_at: new Date(),
    },
  });

  const serializedRecipe = {
    ...newRecipe,
    id: newRecipe.id.toString(), // Convert BigInt to string
  };

  return new Response(JSON.stringify(serializedRecipe), { status: 201 });
}
