import prisma from "@/lib/prisma"
export const dynamic = 'auto'

import type { NextApiRequest, NextApiResponse } from 'next'
 


export async function PUT(req: Request) {
  try {
    const { id, name, barcode } = await req.json();

    if (!name || !barcode) {
      return new Response("Name and barcode are required", { status: 400 });
    }

    const updatedIngredient = await prisma.ingredients.update({
      where: { id: id }, 
      data: { name, barcode },
    });

    return new Response(JSON.stringify(updatedIngredient), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update ingredient", { status: 500 });
  }
}
