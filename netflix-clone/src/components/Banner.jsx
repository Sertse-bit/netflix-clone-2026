import { useState, useEffect, useRef } from "react";
import axios from "../services/axios";
import requests from "../services/requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function ModernBanner() {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovies(request.data.results);
    }
    fetchData();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      if (slideRef.current) {
        slideRef.current.scrollTo({
          left: ((currentIndex + 1) % movies.length) * window.innerWidth,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, currentIndex]);

  const handleTrailer = (movie) => {
    movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  if (!movies.length) return null;

  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden">
      {/* Horizontal slider */}
      <div
        ref={slideRef}
        className="flex w-full h-full overflow-x-hidden scroll-smooth"
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative flex-shrink-0 w-screen h-full bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Movie info */}
            <div className="absolute bottom-20 left-10 max-w-xl text-white">
              <h2 className="text-5xl font-bold mb-4">{movie.title || movie.name}</h2>
              <p className="text-sm max-w-lg mb-6">{movie.overview}</p>
              <div className="flex gap-4">
                <button
                  className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
                  onClick={() => handleTrailer(movie)}
                >
                  ▶ Play
                </button>
                <button className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600">
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer */}
      {trailerUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setTrailerUrl("")}
          >
            ✕
          </button>
          <div className="w-[80%] h-[60%]">
            <YouTube videoId={trailerUrl} opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }} />
          </div>
        </div>
      )}
    </section>
  );
}

export default ModernBanner;
