import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

export default function DeleteRecipeButton({ recipeId }) {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
}



