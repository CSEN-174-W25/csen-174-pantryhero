import Tableview from "@/components/tableview";
import { PrismaClient } from "@prisma/client";
import {BarcodeScanner} from  "@/components/zxing";
const prisma = new PrismaClient();

export default async function Home() {
  try {
    const food = await prisma.ingredients.findMany();
    const formattedFood = food.map((item) => ({
      ...item,
      barcode: item.barcode ? item.barcode.toString() : null, 
    }));

    return (
      <div className="mx-auto container grid-cols-2"
      >
        <h1>Pantry Hero</h1>
        <BarcodeScanner/> 
        <Tableview food={formattedFood} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }
}