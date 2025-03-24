"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../lib/useIsMobile";

export default function Carousel({ nowPlaying }) {
  const isMobile = useIsMobile(768);
  const progressCircle = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
  };

  return (
    <div className="w-full">
      <Swiper
        pagination={{ clickable: true }}
        direction={isMobile ? "horizontal" : "vertical"}
        keyboard={{ enabled: true }}
        modules={[EffectFade, Autoplay, Pagination, Keyboard]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-[300px] sm: h-[450px] md:h-[500px] lg:h-[600px]"
      >
        {nowPlaying.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              <Image
                height={602}
                width={1920}
                priority
                src={`https://image.tmdb.org/t/p/w1920${
                  isMobile
                    ? movie.poster_path
                    : movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
                quality={90}
                className="object-contain min-w-full min-h-full"
              />
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-70% to-transparent z-10" />
              )}
              {isMobile && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent via-10% to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 via-50% to-transparent z-10" />
                </>
              )}
            </div>
            {isMobile && (
              <div className="absolute bottom-0 pl-3 pr-6 w-full text-white z-10 flex items-center pb-10 justify-start">
                <h2 className="text-xl font-bold px-2">{movie.title}</h2>
                <Link
                  href={`/details/${movie.id}?type=movie`}
                  className="bg-red-500 rounded-lg"
                >
                  <button className="pt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
            <div
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 px-6 w-full max-w-[404px] text-white z-10 ${
                isMobile ? "hidden" : "block"
              }`}
            >
              <h2 className="text-2xl text-red-400/90 font-bold mb-4">
                {movie.title}
              </h2>
              <p className="text-base sm:text-lg mb-6 line-clamp-4">
                {movie.overview}
              </p>
              <Link href={`/details/${movie.id}?type=movie`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500/70 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <svg fill="#000000" viewBox="0 0 60 60" className="w-6 h-6">
                    <g id="SVGRepo_iconCarrier">
                      <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" />
                      <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z" />
                    </g>
                  </svg>
                  See More
                </motion.button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress absolute bottom-4 right-4 z-20">
          <svg viewBox="0 0 70 20" ref={progressCircle} className="w-6 h-6">
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-current text-red-500/70"
            />
          </svg>
        </div>
      </Swiper>
    </div>
  );
}
