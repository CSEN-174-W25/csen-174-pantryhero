"use client";

import { useState } from "react";
import { useZxing } from "react-zxing";

const requestOptions = {
  method: "GET",
};

async function barcodeLookup(barcode: string): Promise<any> {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Return the parsed JSON object
    } catch (error) {
      console.error("Error in barcodeLookup:", error);
      return null; // Return null in case of an error
    }
  }
  
export const BarcodeScanner = () => {
  const [result, setResult] = useState<{
    keywords?: string[];
    name?: string;
    type?: string;
    brand?: string;
    allergens?: string;
    status?: string;
  } | null>(null); // Initialize state as null

  const { ref } = useZxing({
    onDecodeResult(decodedResult) {
      const barcode = decodedResult.getText(); // Get the scanned barcode
      barcodeLookup(barcode).then((res) => {
        if (!res || !res.product) {
          console.warn("No product data found for the scanned barcode.");
          setResult(null); // Clear the result if no product data is found
          return;
        }

        // Destructure the product data safely
        const {
          _keywords = [],
          product_name = "Unknown Product",
          product_type = "Unknown Type",
          brands = "Unknown Brand",
          allergens = "No Allergens",
          status_verbose = "No Status",
        } = res.product;

        // Update the state with the extracted data
        setResult({
          keywords: _keywords,
          name: product_name,
          type: product_type,
          brand: brands,
          allergens: allergens,
          status: status_verbose,
        });
      });
    },
  });

  return (
    <div className="container center inline-block py-4 px-4 bg-gray-500 rounded">
      <video
        ref={ref}
        className="size-1/2"
        style={{ width: "100%", height: "300px", border: "1px solid black" }}
      />
      {result ? (
        <div>
          <h2>Product Details</h2>
          <p>
            <strong>Name:</strong> {result.name}
          </p>
          <p>
            <strong>Type:</strong> {result.type}
          </p>
          <p>
            <strong>Brand:</strong> {result.brand}
          </p>
          <p>
            <strong>Allergens:</strong> {result.allergens}
          </p>
          <p>
            <strong>Status:</strong> {result.status}
          </p>
          <p>
            <strong>Keywords:</strong> {result.keywords?.join(", ")}
          </p>
        </div>
      ) : (
        <p>No product data available. Scan a barcode to get started.</p>
      )}
    </div>
  );
};