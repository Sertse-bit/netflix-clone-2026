const API_KEY = "acbbd917cd7d07b2e6e298a7d35a562d";

const requests = {
 fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
 fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
 fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
 fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
};

export default requests;