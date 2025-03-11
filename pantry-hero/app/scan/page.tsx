"use client";
import { BarcodeScanner } from "@/components/scanner";
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Scan() {
  const [openForm, setOpenForm] = useState(false);
  const [Food, setFood]: any[] = useState([]);
  const [newFood, setNewFood] = useState({ name: '' });

  const handleAdd = async () => {
    const res = await fetch('/api/ingredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFood),
    });
    const createdFood = await res.json();
    setFood([...Food, createdFood]);
    setNewFood({ name: '' }); // Clear input fields
    setOpenForm(false);
  };

  const handleOpen = () => setOpenForm(true);

  return (
    <div className="mx-auto container h-dvh grid-cols-2">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', marginTop: 4, marginBottom: 4 }}
      >
        Add an Item to Your Pantry
      </Typography>
      <BarcodeScanner />
      {openForm ? (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            marginBottom: 4,
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
          <Button
            onClick={handleAdd}
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Food
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleOpen}
          variant="outlined"
          color="primary"
          fullWidth
        >
          No Barcode?
        </Button>
      )}
    </div>
  );
}