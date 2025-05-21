const axios = require('axios');

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI2ZWE4ZjgwNGEwYjhkMDg5MTgzZjJjM2JiOGUzNSIsIm5iZiI6MS43NDYzMzUzNDMzMjA5OTk5ZSs5LCJzdWIiOiI2ODE2ZjY2ZmYzYjMwOTNkMDY1N2M3Y2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aoiiVNWReW9rPVC0MiUolt3V_Y2j-9dAacyoq37YZL4';
const BASE_URL = 'https://api.themoviedb.org/3';
const NETFLIX_PROVIDER_ID = 8;
const REGION = 'AU';

// Common axios config with Bearer Token
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  }
});

async function getTrendingMovies() {
  const allResults = [];

  for (let page = 1; page <= 5; page++) {
    const response = await axiosInstance.get(`/trending/movie/day?page=${page}`);
    allResults.push(...response.data.results);
  }

  return allResults;
}


async function isAvailableOnNetflixAU(movieId) {
  const response = await axiosInstance.get(`/movie/${movieId}/watch/providers`);
  const providers = response.data.results?.[REGION]?.flatrate || [];
  return providers.some(provider => provider.provider_id === NETFLIX_PROVIDER_ID);
}

async function getTrendingNetflixAUMovies() {
  try {
    const trendingMovies = await getTrendingMovies();
    const netflixMovies = [];

    for (const movie of trendingMovies) {
      const available = await isAvailableOnNetflixAU(movie.id);
      if (available) {
        netflixMovies.push(movie);
      }
    }

    console.log('Trending Movies on Netflix AU:');
    netflixMovies.forEach(movie => {
      console.log(`- ${movie.title} (ID: ${movie.id})`);
    });
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

getTrendingNetflixAUMovies();
