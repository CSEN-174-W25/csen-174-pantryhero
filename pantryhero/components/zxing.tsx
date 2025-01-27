"use client"

import { useState } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
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