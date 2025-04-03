"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Anime = {
  mal_id: number;
  title: string;
  image: string;
  synopsis: string;
  genres: string; // Array of genre objects
  score: number; // Rating score
};

const TrendingAnimeCarousel = ({
  animeList,
  autoplay = false,
  className,
}: {
  animeList: Anime[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % animeList.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 7000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);


  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="text-3xl text-center p-4 m-8">TOP ANIME</div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Image Section */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {animeList.map((anime, index) => (
                <motion.div
                  key={anime.mal_id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    zIndex: isActive(index) ? 999 : -100,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    priority
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex justify-between  flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-foreground">{animeList[active].title}</h3>

            {/* Display Genres */}
            <p className="text-sm text-muted-foreground mt-2">
              {animeList[active].genres}
            </p>



            {/* Display Rating Score */}
            <p className="text-sm text-muted-foreground mt-2">
              Rating Score: {animeList[active].score.toFixed(1)} / 10
            </p>

            {/* Synopsis */}
            <motion.p className="text-sm text-muted-foreground mt-8 ">
              {animeList[active].synopsis.split(" ").splice(0,50).map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: index * 0.02,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

         
        </div>
      </div>
       {/* Navigation Buttons */}
       <div className="flex gap-4 pt-12 m-6 md:pt-0 justify-center">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-25 w-25 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-25 w-25 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
    </div>
  );
};


export default TrendingAnimeCarousel;