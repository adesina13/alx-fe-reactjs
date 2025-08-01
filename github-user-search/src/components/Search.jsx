import { useState } from "react";
import fetchUserData from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  
  const handleFetch = async () => {
    setIsLoading(true)
    try {
      setError("");  // Clear previous error
      const data = await fetchUserData(username);
      setDetail(data);      // Set GitHub user data
    } catch (err) {
      setDetail(null);
      setError("User not found");
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />

      <button onClick={handleFetch}>Search</button>

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
    </div>
  );
}
