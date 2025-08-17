"use client";
import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ✅ Extract validation into its own function
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else {
      const ingredientList = ingredients.split("\n").filter((i) => i.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please provide at least 2 ingredients.";
      }
    }

    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    } else {
      const stepsList = steps.split("\n").filter((s) => s.trim());
      if (stepsList.length < 2) {
        newErrors.steps = "Please provide at least 2 steps.";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(); // ✅ use validate()
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Normally, send data to backend or global store
      console.log({
        title,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
      });

      setSuccess(true);
      setTitle("");
      setIngredients("");
      setSteps("");
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">➕ Add a New Recipe</h1>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          ✅ Recipe submitted successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={"e.g.\n200g spaghetti\n2 eggs\n100g pancetta"}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label className="block font-medium mb-2">
            Preparation Steps (one per line)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={"e.g.\nBoil pasta in salted water\nCook pancetta until crispy"}
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
