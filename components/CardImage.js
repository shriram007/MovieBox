"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CardImage({
  src,
  alt,
  width = 200,
  height = 300,
  isSeries = false,
  className = "",
  priority = false,
  quality = 75,
  onClick,
}) {
  const fallbackImage = "/placeholders.png";
  const imageSrc =
    src && src !== null && typeof src === "string" && !src.includes("null")
      ? src
      : fallbackImage;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Image
          src={imageSrc}
          alt={alt || "Image"}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          className="rounded-md object-cover"
          onClick={onClick}
        />
        <div className="absolute inset-0 pointer-events-auto" />
        {isSeries && (
          <span className="absolute top-2 left-2 bg-red-500/70  text-xs font-semibold px-2 py-1 rounded">
            TV
          </span>
        )}
      </motion.div>
    </div>
  );
}
