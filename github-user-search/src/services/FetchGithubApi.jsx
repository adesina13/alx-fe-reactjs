
import axios from "axios"

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY

export default async function (username){
    try{
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers:{
                Authorization: `Bearer ${GITHUB_API_KEY}`
            }
        })
    }catch(error){
        console.error(error)
    }
}