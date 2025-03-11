"use client";
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from 'next/link';

export default function Recipe() {
  const [recipe, setRecipe] = useState<any>(null);
  const [newRecipeUrl, setNewRecipeUrl] = useState('');

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const res = await fetch('/api/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newRecipeUrl }),
    });

    if (res.ok) {
      const createdRecipe = await res.json();
      setRecipe(createdRecipe); // Display the most recently added recipe
      setNewRecipeUrl(''); // Clear input field
    } else {
      console.error('Failed to add recipe:', await res.text());
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch('/api/recipe', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setRecipe(null); // Remove the displayed recipe
    } else {
      console.error('Failed to delete recipe:', await res.text());
    }
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
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#4caf50'}}>
        Add a Recipe to Your Cookbook
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          marginBottom: 4,
        }}
        onSubmit={handleAdd}
      >
        <TextField
          type="url"
          placeholder="Enter recipe URL"
          value={newRecipeUrl}
          onChange={(e) => setNewRecipeUrl(e.target.value)}
          label="Recipe URL"
          variant="outlined"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Recipe
        </Button>
      </Box>
      {recipe && (
        <Box sx={{ width: "100%" }}>
          <Box key={recipe.id} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{recipe.name}</Typography>
            <Typography variant="body2">Total Prep & Cook Time: {recipe.totalTime}</Typography>
            {recipe.image && (
              <Box
                component="img"
                src={recipe.image}
                sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 2 }}
              />
            )}
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{recipe.description}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(recipe.id)}
              sx={{ marginRight: 2 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={`${recipe.url}`}
            >
              View Full Recipe
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}