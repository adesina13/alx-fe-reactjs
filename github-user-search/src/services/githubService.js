
import axios from "axios"

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY

export default async function fetchUserData (username){
    try{
        const response = await axios.get(`https://api.github.com/users/${username}`)
        return (response.data)
    }catch(error){
        console.error(error)
        return(error || "Error")
    }
}


export async function fetchSearchBy(query){
    try{
        const response = await axios(`https://api.github.com/search/users?q=${query}`)
        return (response.data)
    }catch(error){
        return(error || "Error")
    }
}