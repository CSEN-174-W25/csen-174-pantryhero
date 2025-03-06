import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RecipeDetails = () => {
  const router = useRouter();
  const { idMeal } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (idMeal) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.meals ? data.meals[0] : null))
        .catch((error) => console.error('Failed to fetch recipe details:', error));
    }
  }, [idMeal]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;