import axios from "axios";

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const fetchUserData = async ({ username, location, minRepos }) => {
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `token ${GITHUB_API_KEY}`,
      },
    });

    const detailedUsers = await Promise.all(
      data.items.map(async (user) => {
        const { data: detail } = await axios.get(user.url, {
          headers: {
            Authorization: `token ${GITHUB_API_KEY}`,
          },
        });
        return detail;
      })
    );

    return detailedUsers;
  } catch (error) {
    console.error("GitHub API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export default fetchUserData;
