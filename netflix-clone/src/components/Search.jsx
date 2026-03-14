import { useState } from "react";
import axios from "../services/axios";

function Search({ setMovies }) {

 const [query,setQuery] = useState("");

 const searchMovie = async(e) => {

  if(e.key === "Enter"){

   const res = await axios.get(
    `/search/movie?api_key=YOUR_API_KEY&query=${query}`
   )

   setMovies(res.data.results)
  }

 }

 return (

 <input
 className="bg-gray-800 text-white p-2 rounded"
 placeholder="Search movies"
 value={query}
 onChange={(e)=>setQuery(e.target.value)}
 onKeyDown={searchMovie}
 />

 )
}

export default Search