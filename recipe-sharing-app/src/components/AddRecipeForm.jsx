// AddRecipeForm component
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

export default function AddRecipeForm () {
    const addRecipe = useRecipeStore(state => state.addRecipe)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        addRecipe({id: Date.now(), title, description})
        setTitle('')
        setDescription('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Title"
            />

            <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            />

            <button type="submit">Add Recipe</button>
        </form>
    )
}