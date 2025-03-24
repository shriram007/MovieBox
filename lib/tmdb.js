const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch popular movies: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(
      "Network error: Unable to fetch popular movies. Please check your connection or VPN."
    );
  }
}

export async function fetchNowPlaying() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch now playing movies: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(
      "Network error: Unable to fetch now playing movies. Please check your connection or VPN."
    );
  }
}

export async function fetchPopularSeries() {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch popular series: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(
      "Network error: Unable to fetch popular series. Please check your connection or VPN."
    );
  }
}

export async function fetchPopularPersons() {
  try {
    const res = await fetch(
      `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch popular persons: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(
      "Network error: Unable to fetch popular persons. Please check your connection or VPN."
    );
  }
}

export async function fetchMovieDetails(id) {
  const [details, videos] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`).then(
      (res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      }
    ),
    fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
  ]);
  return { ...details, videos: videos.results || [] };
}

export async function fetchSeriesDetails(id) {
  const [details, videos] = await Promise.all([
    fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`).then(
      (res) => {
        if (!res.ok) throw new Error("Series not found");
        return res.json();
      }
    ),
    fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  ]);
  return { ...details, videos: videos.results || [] };
}

export async function fetchPersonDetails(id) {
  const [details, credits] = await Promise.all([
    fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`).then(
      (res) => {
        if (!res.ok) throw new Error(`Person fetch failed: ${res.status}`);
        return res.json();
      }
    ),
    fetch(
      `${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
  ]);
  return { ...details, credits: credits.cast || [] };
}

export async function fetchGenres() {
  try {
    const movieGenres = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch movie genres: ${res.status}`);
      return res.json();
    });
    const tvGenres = await fetch(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch TV genres: ${res.status}`);
      return res.json();
    });
    const allGenres = [...movieGenres.genres, ...tvGenres.genres].reduce(
      (acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {}
    );
    return allGenres;
  } catch (error) {
    throw new Error(
      "Network error: Unable to fetch genres. Please check your connection or VPN."
    );
  }
}
