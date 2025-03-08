import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { idMeal } = useParams<{ idMeal: string }>();

  return (
    <iframe
      src={`https://www.themealdb.com/meal/${idMeal}`}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Recipe Details"
    />
  );
}