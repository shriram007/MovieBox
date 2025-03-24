import Image from "next/image";
import CreditsList from "../../../components/CreditList";
import {
  fetchMovieDetails,
  fetchSeriesDetails,
  fetchPersonDetails,
} from "../../../lib/tmdb";
import CardImage from "../../../components/CardImage";

export default async function DetailPage({ params, searchParams }) {
  const { id } = await params;
  const { type } = await searchParams;

  let item;
  try {
    if (type === "movie") {
      item = await fetchMovieDetails(id);
    } else if (type === "series") {
      item = await fetchSeriesDetails(id);
    } else if (type === "person") {
      item = await fetchPersonDetails(id);
    } else {
      throw new Error("Invalid or missing type parameter");
    }
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>
          Could not find details for this item. ID: {id}, Type:{" "}
          {type || "not specified"}
        </p>
      </div>
    );
  }

  if (type === "movie" || type === "series") {
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const backdropPath = item.backdrop_path || item.poster_path;
    const video = item.videos.find(
      (v) =>
        v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );

    return (
      <div className="container mx-auto px-2 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 mt-2 px-2">
            <CardImage
              src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
              alt={title}
              width={500}
              height={750}
              isSeries={type === "series"}
              className="mt-4"
            />
          </div>
          <div className="w-full md:w-2/3 p-5">
            <div
              className=" rounded-lg "
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdropPath})`,
              }}
            >
              <div className="bg-neutral-800/90 rounded-lg p-4">
                <h1 className="text-3xl font-bold mb-2 text-red-500/70 ">
                  {title}
                </h1>
                <p className="text-gray-400 mb-4">
                  {releaseDate} • {item.genres.map((g) => g.name).join(", ")}
                </p>
                <p className="text-lg mb-4">{item.overview}</p>
                <div className="grid grid-cols-2 gap-4 rounded-lg p-4 bg-transparent backdrop-blur-lg">
                  <div>
                    <span className="font-semibold text-red-500/70">
                      Rating:
                    </span>{" "}
                    {item.vote_average}/10 ({item.vote_count} votes)
                  </div>
                  <div>
                    <span className="font-semibold text-red-500/70">
                      Runtime:
                    </span>{" "}
                    {item.runtime || item.episode_run_time?.[0] || "N/A"} min
                  </div>
                  {type === "series" && (
                    <div>
                      <span className="font-semibold text-red-500/70">
                        Seasons:
                      </span>{" "}
                      {item.number_of_seasons}
                    </div>
                  )}
                  {type === "series" && (
                    <div>
                      <span className="font-semibold text-red-500/70">
                        Episodes:
                      </span>{" "}
                      {item.number_of_episodes}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {video && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {video.type}: {video.name}
                </h2>
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {backdropPath && (
          <div className="mt-8">
            <Image
              src={`https://image.tmdb.org/t/p/original${backdropPath}`}
              alt={`${title} backdrop`}
              width={1280}
              height={720}
              className="rounded-lg w-full"
            />
          </div>
        )}
      </div>
    );
  }

  if (type === "person") {
    const { name, profile_path, biography, birthday, place_of_birth, credits } =
      item;

    return (
      <div className="container mx-auto  py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 mt-5 px-7">
            <CardImage
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
              width={500}
              height={750}
            />
          </div>
          <div className="w-full md:w-2/3 mt-3 px-4">
            <h1 className="text-3xl font-bold mb-2 text-red-500/70">{name}</h1>
            <p className="text-gray-400 mb-4">
              {birthday && `Born: ${birthday}`}
              {place_of_birth && ` in ${place_of_birth}`}
            </p>
            <p className="text-lg mb-4">
              {biography || "No biography available."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-red-500/70">
                  Known For:
                </span>{" "}
                {item.known_for_department || "N/A"}
              </div>
              <div>
                <span className="font-semibold text-red-500/70">
                  Popularity:
                </span>{" "}
                {item.popularity.toFixed(1)}
              </div>
            </div>
            <CreditsList credits={credits} />
          </div>
        </div>
      </div>
    );
  }
}
