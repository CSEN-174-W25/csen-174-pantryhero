import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipePage from "./page";
import RecipeDetails from "./RecipeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipePage />} />
        <Route path="/recipe/:idMeal" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;