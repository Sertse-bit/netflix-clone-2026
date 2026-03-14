import { useState } from "react";

function Navbar({ searchMovie, onAuthClick }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchMovie(query);
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-black text-white">
      <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-800 text-white px-4 py-2 rounded w-64 focus:outline-none"
        />
        <button
          className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition"
          onClick={onAuthClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;

