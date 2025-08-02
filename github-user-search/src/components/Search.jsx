import { useState } from "react";
import fetchUserData from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError("");
    try {
      const results = await fetchUserData({ username, location, minRepos });
      setUsers(results);
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white text-black shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">GitHub User Search</h1>
      <div className="space-y-4">
        <form action="" onSubmit={handleSearch}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            <input
            type="number"
            placeholder="Minimum Repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
            {loading ? "Searching..." : "Search"}
            </button>
            {error && <p className="text-red-500">'Looks like we cant find the user</p>}
        </form>
      </div>

      <div className="mt-6">
        {users.length > 0 && (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="border p-4 rounded-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-medium">{user.login}</p>
                    <p>Location: {user.location || "N/A"}</p>
                    <p>Repos: {user.public_repos ?? "N/A"}</p>
                    <a
                      href={user.html_url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
