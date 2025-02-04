import {BarcodeScanner} from  "@/components/zxing";

export default function Scan() {

    // var food = await prisma.ingredients.findMany().then(val => console.log(val));

    return (
      <div className="mx-auto container h-dvh grid-cols-2"
      >
        
        <h1>Pantry Hero</h1>
        <BarcodeScanner/> 
      </div>
    );
}