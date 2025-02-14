"use client";
import React, {useState} from 'react';
import prisma from '@/lib/prisma';
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const AddRecipePage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url}),
            });
            setMessage('Recipe URL added successfully');
            setUrl('');
        } catch (error) {
            setMessage('Error: ${error.message}');
        }
    };

    return (
        <Container
      maxWidth="sm"
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
        Add a Recipe to Your Cookbook
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter recipe URL"
          required
          fullWidth
          label="Recipe URL"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Recipe
        </Button>
      </Box>
      {message && (
        <Typography
          variant="body1"
          color={message.startsWith("Error") ? "error" : "success"}
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default AddRecipePage;