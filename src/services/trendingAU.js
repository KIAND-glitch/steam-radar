// services/trending.js
const BASE_URL = 'https://8nrjccs6kh.execute-api.ap-southeast-2.amazonaws.com/dev/trending-au';

export const getTrendingMoviesAU = async (auth) => {
    const token = auth.tokens.IdToken;

    if (!auth) throw new Error("Auth object is required");
    if (!token) throw new Error("User is not authenticated");

    const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Error fetching trending AU movies: ${res.status} ${errorText}`);
        throw new Error(`Failed to fetch trending movies: ${res.status} ${errorText}`);
    }

    return res.json();
};
