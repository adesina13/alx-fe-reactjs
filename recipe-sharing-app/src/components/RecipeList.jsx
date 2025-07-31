import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export default function RecipeList() {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h1>All Recipes</h1>
      <Link to="/add">Add New Recipe</Link>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
