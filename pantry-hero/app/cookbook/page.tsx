"use client";
import { useState, useEffect } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Link from 'next/link';

export default function Cookbook() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/cookbook');
      const data = await res.json();
      setRecipes(data.recipes);
    }
    fetchRecipes();
  }, []);

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
        Cookbook
      </Typography>
      <Typography variant="h6" component="h3" sx={{ fontStyle: 'italic' }}>
        Your recipes below are ranked by what you already have
      </Typography>      
      <Box sx={{ width: "100%", marginBottom: 4 }}>
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id} sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={recipe.name}
                secondary={recipe.description}
              />
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href={`/cookbook/${recipe.id}`}
              >
                View Full Recipe
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}