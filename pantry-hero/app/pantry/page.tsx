"use client";
import { useState, useEffect } from 'react';
import Tableview from "@/components/tableview";
import VerticalTabs from "@/components/tabview";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Pantry() {
  const [Food, setFood]: any[] = useState([]);
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
    setFood(Food.filter((item: any) => item.id !== id));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, marginBottom: 4 }}>
        Pantry
      </Typography>
      <Box sx={{ width: "100%" }}>
        <VerticalTabs food={Food} />
      </Box>
    </Container>
  );
}