"use client";
import {useState,useEffect} from 'react';
import Tableview from "@/components/tableview";
import Gallery  from "@/components/galleryview";
import VerticalTabs from "@/components/tabview";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

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
      <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Pantry
      </Typography>
      <Box sx={{ width: "100%", marginBottom: 4 }}>
        <VerticalTabs food={Food}/>
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          type="text"
          placeholder="Food name"
          value={newFood.name}
          onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
          label="Food Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          type="text"
          placeholder="Barcode"
          value={newFood.barcode}
          onChange={(e) => setNewFood({ ...newFood, barcode: e.target.value })}
          label="Barcode"
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Food
        </Button>
      </Box>
    </Container>
    );
}