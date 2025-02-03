"use client"

import { useState } from "react";
import { useZxing } from "react-zxing";


const requestOptions = {
  method: "GET"
};

async function barcodeLookup(barcode:String){
  fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      barcodeLookup(result.getText()).then(json => console.log(json));
    },
  });

  return (
    <>
    <div className="container center inline-block py-4 px-4 bg-gray-500 rounded">
      <video ref={ref} className="size-1/2"/>
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
      </div>
    </>
  );
};