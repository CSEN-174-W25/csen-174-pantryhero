import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request
export async function GET(req: Request) {
  try {
    const result = await prisma.ingredients.findMany();

    // Convert BigInt values to strings to prevent JSON serialization errors
    const serializedResult = result.map((ingredient) => ({
      ...ingredient,
      id: ingredient.id.toString(),  // Convert BigInt to string
      barcode: ingredient.barcode ? ingredient.barcode.toString() : null,  // Convert Decimal to string if needed
    }));

    return new Response(JSON.stringify(serializedResult), { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}

// Handle POST request
export async function POST(req: Request) {
  try {
    const { name, barcode } = await req.json();
    
    if (!name || !barcode) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const newIngredient = await prisma.ingredients.create({
      data: { name, barcode },
    });

    // Convert BigInt to string in the response
    const serializedNewIngredient = {
      ...newIngredient,
      id: newIngredient.id.toString(),
      barcode: newIngredient.barcode ? newIngredient.barcode.toString() : null,  // Convert Decimal to string if needed
    };

    return new Response(JSON.stringify(serializedNewIngredient), { status: 201 });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
