import { useRecipeStore } from './recipeStore';

export default function FavoritesList() {
  const favorites = useRecipeStore(state =>
    state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    ).filter(Boolean)
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
