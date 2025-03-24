"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CardImage from "./CardImage";

import "swiper/css";
import "swiper/css/navigation";

export default function CreditsList({ credits }) {
  if (!credits || credits.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-red-500/70">Known For</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={5}
        slidesPerView={5}
        navigation
        breakpoints={{
          1024: { slidesPerView: 5 },
          768: { slidesPerView: 4 },
          480: { slidesPerView: 2 },
          0: { slidesPerView: 2 },
        }}
        className="w-full"
      >
        {credits.map((credit, index) => (
          <SwiperSlide key={`${credit.id}-${credit.media_type}-${index}`}>
            <Link href={`/details/${credit.id}?type=${credit.media_type}`}>
              <div className="rounded-lg p-2 flex flex-col items-start">
                <CardImage
                  src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                  alt={credit.title || credit.name}
                  width={150}
                  height={225}
                  isSeries={credit.media_type === "tv"}
                />
                <h3 className="text-sm font-medium mt-1 text-red-500/70">
                  {credit.title || credit.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {credit.media_type === "movie" ? "Movie" : "TV"} •{" "}
                  {credit.release_date || credit.first_air_date || "N/A"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
