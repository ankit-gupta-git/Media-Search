import axios from 'axios';

// API keys
const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
const pexelsKey = import.meta.env.VITE_PEXELS_KEY;
const giphyKey = import.meta.env.VITE_GIPHY_KEY;

// ---------- PHOTOS (Unsplash) ----------
export async function fetchPhotos(query, page = 1, per_page = 20) {
  try {
    const res = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        params: { query, page, per_page },
        headers: {
          Authorization: `Client-ID ${unsplashKey}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error('Unsplash error:', err);
    return null;
  }
}

// ---------- VIDEOS (Pexels) ----------
export async function fetchVideos(query, per_page = 15) {
  try {
    const res = await axios.get(
      'https://api.pexels.com/videos/search',
      {
        params: { query, per_page },
        headers: {
          Authorization: pexelsKey,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error('Pexels error:', err);
    return null;
  }
}

// ---------- GIFs (Giphy) ----------
export async function fetchGifs(query, limit = 20, offset = 0) {
  try {
    const res = await axios.get(
      'https://api.giphy.com/v1/gifs/search',
      {
        params: {
          api_key: giphyKey,
          q: query,
          limit,
          offset,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error('Giphy error:', err);
    return null;
  }
}
