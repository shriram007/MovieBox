"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import toast, { Toaster } from "react-hot-toast";
import useIsMobile from "../lib/useIsMobile";

export default function Navbar({ popularMovies = [], error }) {
  const isMobile = useIsMobile(768);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 10000,
      });
    }
  }, [error]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black/20 h-[40px] backdrop-blur-xs p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#EF4444"
          className="size-8 p-1 rounded mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
        <span className="hover:text-white transition-colors text-red-500/75 duration-200">
          MovieBox
        </span>
      </Link>
      <button onClick={toggleMenu} className="text-red-500 focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <motion.div
        className={`absolute top-12 left-0 w-full bg-neutral-800/90 text-white flex flex-col items-start rounded-xl ${
          isOpen ? "visible" : "hidden"
        } max-h-[90vh] overflow-y-scroll overflow-x-hidden`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col mt-6 px-4 mx-6 space-y-4 w-full">
          {popularMovies.map((movie) => (
            <Link
              key={movie.id}
              href={`/details/${movie.id}?type=movie`}
              className="hover:text-red-400 md:text-4xl sm: text-xl z-50"
              onClick={toggleMenu}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {movie.title}
            </Link>
          ))}
        </div>
      </motion.div>
      {!isMobile && hoveredMovie && (
        <motion.div
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
          className="fixed top-26 rounded-xl right-22 pr-[40px] w-[400px] h-[550px] bg-cover z-40"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${hoveredMovie.poster_path})`,
          }}
        />
      )}
      <Toaster />
    </div>
  );
}
