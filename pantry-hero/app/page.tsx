"use client";

import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, CircularProgress } from '@mui/material';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CATEGORIES = ['Vegan', 'Seafood', 'Dessert'];

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

const fetchRecipes = async (category: string): Promise<Recipe[]> => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Failed to fetch recipes for category ${category}:`, error);
    return [];
  }
};

const fetchRecipeDetails = async (idMeal: string): Promise<Recipe | null> => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data.meals) {
      const meal = data.meals[0];
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) ingredients.push(ingredient);
      }
      return { ...meal, ingredients };
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch recipe details for meal ID ${idMeal}:`, error);
    return null;
  }
};

const fetchPantryIngredients = async (): Promise<string[]> => {
  // Replace with your actual API call to fetch pantry ingredients
  return ['Chicken', 'Rice', 'Tomato', 'Onion'];
};

export default function RecipePage() {
  const [recipesByCategory, setRecipesByCategory] = useState<{ [key: string]: Recipe[] }>({});
  const [loading, setLoading] = useState(true);
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const pantry = await fetchPantryIngredients();
      setPantryIngredients(pantry);

      const recipes: { [key: string]: Recipe[] } = {};
      for (const category of CATEGORIES) {
        const categoryRecipes = await fetchRecipes(category);
        const detailedRecipes = await Promise.all(
          categoryRecipes.map(async (recipe) => {
            const details = await fetchRecipeDetails(recipe.idMeal);
            return details ? details : recipe;
          })
        );
        recipes[category] = detailedRecipes;
      }
      setRecipesByCategory(recipes);
      setLoading(false);
    };
    loadRecipes();
  }, []);

  if (loading) return <CircularProgress />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ padding: 3, paddingBottom: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
        Browsing Recipes
      </Typography>
      {CATEGORIES.map((category) => (
        <Box key={category} sx={{ marginBottom: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {category}
          </Typography>
          <Slider {...settings}>
            {recipesByCategory[category]?.map((recipe) => (
              <Box key={recipe.idMeal} sx={{ padding: 1 }}>
                <Link href={`/recipe/${recipe.idMeal}`} passHref>
                  <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{recipe.strMeal}</Typography>
                      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', height: 'auto' }} />
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {recipe.strInstructions ? recipe.strInstructions.slice(0, 100) : 'No instructions available'}...
                      </Typography>
                      <Chip label={category} color="primary" size="small" sx={{ marginTop: 1 }} />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                        {recipe.ingredients.filter(ingredient => pantryIngredients.includes(ingredient)).map((ingredient, index) => (
                          <Chip key={index} label={ingredient} color="secondary" size="small" sx={{ marginRight: 0.5, marginBottom: 0.5 }} />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            ))}
          </Slider>
        </Box>
      ))}
    </Box>
  );
}