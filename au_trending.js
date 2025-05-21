const axios = require('axios');

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI2ZWE4ZjgwNGEwYjhkMDg5MTgzZjJjM2JiOGUzNSIsIm5iZiI6MS43NDYzMzUzNDMzMjA5OTk5ZSs5LCJzdWIiOiI2ODE2ZjY2ZmYzYjMwOTNkMDY1N2M3Y2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aoiiVNWReW9rPVC0MiUolt3V_Y2j-9dAacyoq37YZL4';
const BASE_URL = 'https://api.themoviedb.org/3';
const REGION = 'AU';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

async function getTrendingMovies() {
  const allResults = [];
  for (let page = 1; page <= 5; page++) {
    const response = await axiosInstance.get(`/trending/movie/day?page=${page}`);
    allResults.push(...response.data.results);
  }
  return allResults;
}

async function getProviders(movieId) {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/watch/providers`);
    const data = response.data.results?.[REGION];
    if (!data) return null;

    const allProviders = {
      flatrate: data.flatrate || [],
      rent: data.rent || [],
      buy: data.buy || [],
    };

    return allProviders;
  } catch (err) {
    console.error(`Error getting providers for movie ${movieId}:`, err.message);
    return null;
  }
}

async function listTrendingMoviesWithProviders() {
  try {
    const trendingMovies = await getTrendingMovies();

    for (const movie of trendingMovies) {
      const providers = await getProviders(movie.id);

      if (providers) {
        console.log(`🎬 ${movie.title} (ID: ${movie.id})`);
        ['flatrate', 'rent', 'buy'].forEach(type => {
          if (providers[type].length > 0) {
            console.log(`  ${type.toUpperCase()}:`);
            providers[type].forEach(p => {
              console.log(`    - ${p.provider_name}`);
            });
          }
        });
        console.log('---------------------------');
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

listTrendingMoviesWithProviders();
