import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

const fetchRecipeDetails = async (idMeal: string): Promise<Recipe | null> => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
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

export default function RecipeDetails() {
  const router = useRouter();
  const { idMeal } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idMeal) {
      const loadRecipeDetails = async () => {
        const details = await fetchRecipeDetails(idMeal as string);
        setRecipe(details);
        setLoading(false);
      };
      loadRecipeDetails();
    }
  }, [idMeal]);

  if (loading) return <CircularProgress />;

  if (!recipe) return <Typography variant="h6">Recipe not found</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        {recipe.strMeal}
      </Typography>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {recipe.strInstructions}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
        {recipe.ingredients.map((ingredient, index) => (
          <Chip key={index} label={ingredient} color="secondary" size="small" sx={{ marginRight: 0.5, marginBottom: 0.5 }} />
        ))}
      </Box>
    </Box>
  );
}