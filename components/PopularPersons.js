"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import CardImage from "./CardImage";
import useIsMobile from "../lib/useIsMobile";

export default function PopularPersons({ persons = [] }) {
  const isMobile = useIsMobile(768);
  const [expanded, setExpanded] = useState(false);

  const initialItems = isMobile ? persons.slice(0, 4) : persons.slice(0, 5);
  const allItems = isMobile ? persons.slice(0, 12) : persons.slice(0, 15);

  if (persons.length === 0) {
    return (
      <p className="text-center text-gray-400">No popular persons available.</p>
    );
  }

  return (
    <section className="w-full max-w-4xl pl-7 mt-8 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-xl md:text-2xl font-semibold mb-4 text-center text-red-500/70"
      >
        Popular Persons
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
      >
        {(expanded ? allItems : initialItems).map((person) => (
          <Link
            href={`/details/${person.id}?type=person`}
            key={person.id}
            className="rounded-lg px-2 flex flex-col items-start transform transition-transform hover:scale-105"
          >
            <CardImage
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
              alt={person.name}
              width={150}
              height={225}
            />
            <h3 className="text-sm font-medium mt-1 text-red-500/70">
              {person.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {person.known_for_department || "N/A"}
            </p>
          </Link>
        ))}
      </motion.div>
      {persons.length > 5 && (
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
      )}
    </section>
  );
}
