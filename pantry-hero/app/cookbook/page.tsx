//cookbook code is incomplete for now! Just a temporary template for what
//the code might look like.

"use client";
import { useState, useEffect } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Cookbook() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/recipes');
      const data = await res.json();
      //data.sort((a, b) => a.name.localeCompare(b.name)); //Sort recipes alphabetically
      setRecipes(data);
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
      {/* <Box sx={{ width: "100%", marginBottom: 4 }}>
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.name} secondary={recipe.description} />
            </ListItem>
          ))}
        </List>
      </Box> */}
    </Container>
  );
}