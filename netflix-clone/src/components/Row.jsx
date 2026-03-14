import { useState, useEffect, useRef } from "react";
import axios from "../services/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, moviesProp }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [trailerUrl, setTrailerUrl] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    if (moviesProp) {
      setMovies(moviesProp);
      return;
    }
    const fetchMovies = async () => {
      const res = await axios.get(`${fetchUrl}&page=${page}`);
      setMovies((prev) => [...prev, ...res.data.results]);
    };
    fetchMovies();
  }, [fetchUrl, page, moviesProp]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
      setPage((prev) => prev + 1);
    }
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      return;
    }
    movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  const opts = { height: "390", width: "100%", playerVars: { autoplay: 1 } };

  return (
    <div className="px-10 mt-10 text-white">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll gap-4 scrollbar-hide snap-x snap-mandatory"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group flex-shrink-0 w-[200px] snap-start cursor-pointer"
            onClick={() => handleClick(movie)}
          >
            <img
              className="w-full h-auto hover:scale-110 transition duration-300 rounded"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition">
              {movie.title || movie.name}
            </div>
          </div>
        ))}
      </div>

      {trailerUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setTrailerUrl("")}
          >
            ✕
          </button>
          <div className="w-[80%] h-[60%]">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;


