"use client";
import CardImage from "../components/CardImage";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import useIsMobile from "../lib/useIsMobile";

export default function PopularSection({
  movies = [],
  series = [],
  genres = {},
}) {
  const isMobile = useIsMobile(768);
  const [expanded, setExpanded] = useState(false);

  const combined = [
    ...movies.map((item) => ({ ...item, isSeries: false })),
    ...series.map((item) => ({ ...item, isSeries: true })),
  ]
    .sort((a, b) => b.vote_count - a.vote_count)
    .map((item) => ({
      ...item,
      title: item.title || item.name,
      genreNames: item.genre_ids.map((id) => genres[id]).filter(Boolean),
    }));

  const initialItems = isMobile ? combined.slice(0, 4) : combined.slice(0, 5);
  const allItems = isMobile ? combined.slice(0, 12) : combined.slice(0, 15);

  if (combined.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No popular movies or series available.
      </p>
    );
  }

  return (
    <section className="w-full max-w-4xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-xl md:text-2xl font-semibold mb-4 text-center text-red-500/70"
      >
        Popular Movies & Series
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
      >
        {(expanded ? allItems : initialItems).map((item) => (
          <Link
            href={`/details/${item.id}?type=${
              item.isSeries ? "series" : "movie"
            }`}
            key={item.id}
            className="rounded-lg px-4 flex flex-col items-start"
          >
            <CardImage
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.title}
              width={150}
              height={225}
              isSeries={item.isSeries}
            />
            <p className="text-xs text-gray-400 mt-1">
              {item.release_date || item.first_air_date}
            </p>
            <h3 className="text-sm font-medium text-red-500/70">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {item.genreNames.length > 0
                ? item.genreNames.join(", ")
                : "Genres not available"}
            </p>
          </Link>
        ))}
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-red-400 font-bold py-2 px-4 rounded mx-auto block flex items-center gap-2"
      >
        {expanded ? "See Less" : "See More"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-200 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.button>
    </section>
  );
}
