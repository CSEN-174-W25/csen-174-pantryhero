"use client";
import {useState,useEffect} from 'react';
import Tableview from "@/components/tableview";
import Gallery  from "@/components/galleryview";
export default function Pantry() {
  const [Food, setFood]:any[] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', barcode: '' });

    useEffect(() => {
      async function fetchFood() {
        const res = await fetch('/api/ingredients');
        const data = await res.json();
        setFood(data);
      }
      fetchFood();
    }, []);
    const handleAdd = async () => {
      const res = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood),
      });
  
      const createdFood = await res.json();
      setFood([...Food, createdFood]);
      setNewFood({ name: '', barcode: '' }); // Clear input fields
    };
    const handleDelete = async (id: string) => {
      await fetch(`/api/ingredients/${id}`, { method: 'DELETE' });
      setFood(Food.filter((item:any) => item.id !== id));
    };

    return (
      <div className="mx-auto container h-full grid-cols-2"
      >
        <h1>Pantry</h1>
        <Gallery food={Food}/>
        <input
        type="text"
        placeholder="Food name"
        value={newFood.name}
        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Barcode"
        value={newFood.barcode}
        onChange={(e) => setNewFood({ ...newFood, barcode: e.target.value })}
      />
      <button onClick={handleAdd}>Add Food</button>
      </div>
    );
}