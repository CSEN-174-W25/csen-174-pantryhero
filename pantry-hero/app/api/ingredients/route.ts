export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server'

export async function GET() {
  const ingredients = await prisma.ingredients.findMany();
  ingredients.map(item =>{
    const {id} = item;
    item.id  = `${id}`;
    console.log(item);
    return item
  })

  return NextResponse.json({food:ingredients}, {status:200});
}

export async function POST(req:Request) {
  const { name, barcode, quantity } = await req.json();
  if (!name) return new Response("Name is required", { status: 400 });

  const newIngredient = await prisma.ingredients.create({
    data: {
      name,
      barcode,
      quantity
    },
  });

  return new Response({message:`saved ${name}x${quantity}`}, { status: 201 });
}
