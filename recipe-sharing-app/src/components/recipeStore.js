import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) =>
    set(state => ({ recipes: [...state.recipes, newRecipe] }), false, 'addRecipe'),

  deleteRecipe: (id) =>
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
    }), false, 'deleteRecipe'),

  updateRecipe: (updatedRecipe) =>
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    }), false, 'updateRecipe'),

  setSearchTerm: (term) => {
    set({ searchTerm: term }, false, 'setSearchTerm');
    get().filterRecipes(); // trigger filtering immediately
  },

  filterRecipes: () =>
    set(state => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    }), false, 'filterRecipes'),

  setRecipes: (recipes) => set({ recipes }),
}));
