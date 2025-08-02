import { useState } from "react";
import fetchUserData from "../services/githubService";
import { fetchSearchBy } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [searchBy, setSearchBy] = useState("")
  const [detail, setDetail] = useState(null);
  const [searchDetail, setSearchDetail] = useState(null)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  
  const handleFetch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      setError("");  // Clear previous error
      const data = await fetchUserData(username);
      setDetail(data);      // Set GitHub user data
      const dataSearch = await fetchSearchBy(searchBy)
      setSearchDetail(dataSearch)
    } catch (err) {
      setDetail(null);
      setError("User not found");
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <div>
        <form action="" onSubmit={handleFetch}>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
            />
            <br/><br/>
            <input 
                type="text" 
                value={searchBy}
                onChange={(e)=>{setSearchBy(e.target.value)}}
                placeholder="Search by"
            />
            <br/><br/>
            <button >Search</button>
        </form>

      {error && <p style={{ color: "red" }}>Looks like we cant find the user</p>}

      {isLoading && <p style={{ color: "green" }}>Loading...</p>}

      {detail && (
        <div>
          <p><strong>Name:</strong> {detail.name || "N/A"}</p>
          <p><strong>Username:</strong> {detail.login}</p>
          <p><strong>Bio:</strong> {detail.bio || "No bio available"}</p>
          <p><strong>Location:</strong> {detail.location || "Not specified"}</p>
          <img src={detail.avatar_url} alt="avatar" width="100" />
        </div>
      )}

      {searchDetail?.items && searchDetail.items.length > 0 && (
        <div>
            <h3>Search Results:</h3>
            <ul>
            {searchDetail.items.map((user) => (
                <li key={user.id}>
                <img src={user.avatar_url} alt={user.login} width="50" />
                <a href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a>
                </li>
            ))}
            </ul>
        </div>
        )}

    </div>
  );
}
