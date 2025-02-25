import { Typography, Button } from "@mui/material"
import Link from "next/link"
import { Box, Card, CardContent, Grid, Rating, Chip } from "@mui/material";

interface Recipe {
  id: number;
  title: string;
  description: string;
  timeEstimate: string; // e.g., "30 mins"
  ingredients: string[]; // List of ingredients for the recipe
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish.",
    timeEstimate: "30 mins",
    ingredients: ["Pasta", "Tomato Sauce", "Ground Beef"],
  },
  {
    id: 2,
    title: "Chicken Curry",
    description: "A flavorful and spicy curry.",
    timeEstimate: "45 mins",
    ingredients: ["Chicken", "Curry Powder", "Coconut Milk"],
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    description: "A quick and healthy stir fry.",
    timeEstimate: "20 mins",
    ingredients: ["Broccoli", "Carrots", "Soy Sauce"],
  },
  {
    id: 4,
    title: "Beef Tacos",
    description: "Delicious tacos with seasoned beef.",
    timeEstimate: "25 mins",
    ingredients: ["Tortillas", "Ground Beef", "Cheese"],
  },
  {
    id: 5,
    title: "Caesar Salad",
    description: "A fresh and crunchy salad.",
    timeEstimate: "15 mins",
    ingredients: ["Lettuce", "Croutons", "Caesar Dressing"],
  },
];

export default function Home() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#3f51b5", // Primary color for the header
          color: "#ffffff", // White text
          padding: 2,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Recommended Recipes:
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
              padding: 2,
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              {/* Recipe Title and Description */}
              <Typography variant="h6" component="div">
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>

              {/* Ingredients Section */}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  Based on ingredients you have:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <Chip key={index} label={ingredient} color="primary" size="small" />
                  ))}
                </Box>
              </Box>
            </CardContent>

            {/* Time Estimate and Rating */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {recipe.timeEstimate}
              </Typography>
              <Rating
                name={`rating-${recipe.id}`}
                value={Math.floor(Math.random() * 5) + 1} // Generate a random rating between 1 and 5
                readOnly
                size="small"
              />
            </Grid>
          </Card>
        ))}
      </Box>
    </div>
  )
}

