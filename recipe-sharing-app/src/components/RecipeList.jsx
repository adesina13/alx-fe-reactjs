import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';
import FavoriteButton from './FavoriteButton';

export default function RecipeList() {
  const recipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      <h1>All Recipes</h1>
      <SearchBar />
      <Link to="/add">Add New Recipe</Link>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <FavoriteButton recipeId={recipe.id} />
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
}
