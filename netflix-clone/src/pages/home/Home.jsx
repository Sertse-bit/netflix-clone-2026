import { useState } from "react";
import Navbar from "../../components/Navbar";
import ModernBanner from "../../components/ModernBanner";
import Row from "../../components/Row";
import Footer from "../../components/Footer";
import AuthModal from "../../components/AuthModal";

import requests from "../../services/requests";
import axios from "../../services/axios";

function Home() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);

  const searchMovie = async (query) => {
    if (!query) return setSearchMovies([]);
    try {
      const res = await axios.get("/search/movie", {
        params: { api_key: "YOUR_API_KEY", query },
      });
      setSearchMovies(res.data.results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar searchMovie={searchMovie} onAuthClick={() => setAuthOpen(true)} />

      {/* Banner */}
      <ModernBanner />

      {/* Movie rows */}
      <div className="flex-1">
        {searchMovies.length > 0 ? (
          <Row title="Search Results" moviesProp={searchMovies} />
        ) : (
          <>
            <Row title="Trending" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Sign In / Sign Up Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default Home;



