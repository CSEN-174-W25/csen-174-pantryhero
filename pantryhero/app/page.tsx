import Tableview from "@/components/tableview";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  try {
    const food = await prisma.ingredients.findMany();
    const formattedFood = food.map((item) => ({
      ...item,
      barcode: item.barcode ? item.barcode.toString() : null, 
    }));

    return (
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1>Pantry Hero</h1>
        <Tableview food={formattedFood} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }
}
