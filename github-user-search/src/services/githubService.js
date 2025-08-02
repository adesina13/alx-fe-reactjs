
import axios from "axios"

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY

const fetchUserData = async ({ username, location, minRepos }) => {
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch users");

  // fetch details for each user
  const detailedUsers = await Promise.all(
    data.items.map(async (user) => {
      const res = await fetch(user.url);
      const detail = await res.json();
      return detail;
    })
  );

  return detailedUsers;
};

export default fetchUserData;
