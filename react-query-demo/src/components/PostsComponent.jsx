import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default function PostsComponent() {
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],       // unique key for caching
    queryFn: fetchPosts,
    staleTime: 5000,           // cache is "fresh" for 5s
    cacheTime: 1000 * 60 * 5,  // keep cache in memory for 5 mins
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Posts</h2>

      <button
        onClick={() => refetch()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isFetching}
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul className="space-y-2">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="border p-2 rounded shadow-sm">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
