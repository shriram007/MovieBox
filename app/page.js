import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import {
  fetchNowPlaying,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchPopularPersons,
  fetchGenres,
} from "../lib/tmdb";
import PopularSection from "../components/PopularSection";
import PopularPersons from "../components/PopularPersons";

export default async function Home() {
  let nowPlaying = [],
    popularMovies = [],
    popularSeries = [],
    popularPersons = [],
    genres = {},
    error = null;
  try {
    [nowPlaying, popularMovies, popularSeries, popularPersons, genres] =
      await Promise.all([
        fetchNowPlaying(),
        fetchPopularMovies(),
        fetchPopularSeries(),
        fetchPopularPersons(),
        fetchGenres(),
      ]);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <span className="text-xl text-red-500"> Sorry, there’s an issue : </span>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar popularMovies={popularMovies} />
      <Carousel nowPlaying={nowPlaying} />
      <div className="flex flex-col items-center mt-4 gap-8">
        <PopularSection
          movies={popularMovies}
          series={popularSeries}
          genres={genres}
        />
        <PopularPersons persons={popularPersons} />
      </div>
    </div>
  );
}
