"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Importing images
import Gojo from "@/assets/images/gojo.png";
import Sukuna from "@/assets/images/sukuna.png";
import Naruto from "@/assets/images/naruto.png";
import Levi from "@/assets/images/levi.png";
import Goku from "@/assets/images/goku.png";
import Zero2 from "@/assets/images/zero2.png";
import Saitama from "@/assets/images/saitama.png";
import Luffy from "@/assets/images/luffy.png";
import Nami from "@/assets/images/nami.png";

// List of characters
const characters = [
  { name: "Gojo", image: Gojo, color: "#00BFFF" },
  { name: "Sukuna", image: Sukuna, color: "#FF4500" },
  { name: "Naruto", image: Naruto, color: "#FFD700" },
  { name: "Levi", image: Levi, color: "#708090" },
  { name: "Goku", image: Goku, color: "#FF8C00" },
  { name: "02", image: Zero2, color: "#FF69B4" },
  { name: "Saitama", image: Saitama, color: "#FFFF00" },
  { name: "Luffy", image: Luffy, color: "#DC143C" },
  { name: "Nami", image: Nami, color: "#87CEFA" }
];

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center gap-8">
      {/* Title */}
      <motion.h1
        className="text-[70px] font-extrabold uppercase tracking-widest text-white w-full text-center relative"
        initial={{ opacity: 0, scale: 0.5, y : 0 }}
        animate={isClicked ? { y: 500,scale: 15,  opacity: 0 } : { opacity: 1, scale: 1 }}
        transition={isClicked ? {duration : 5.5, ease : "easeInOut"} : { duration: 1.5, ease: "easeInOut" }}
        style={{
          textShadow: `3px 3px 15px #DBDBDB, -3px -3px 15px #0000FF, 5px 5px 25px #C9B194`,
        }}
      >
        {"TURBO ANIME".split(" ").map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {word + " "}
          </motion.span>
        ))}
      </motion.h1>

      {/* Go to Home Button */}
      <motion.button
        className="relative px-8 py-4 text-xl font-extrabold uppercase tracking-wider 
                   text-white border-4 border-white 
                   rounded-md shadow-lg overflow-hidden 
                   transition-all duration-300 ease-in-out 
                   hover:scale-110 hover:shadow-[0_0_20px_#FF3CAC,0_0_40px_#F5AF19] 
                   active:scale-95 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isClicked ? { visibility: "hidden" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsClicked(true);

          // Navigate after effect completes
          setTimeout(() => {
            router.push("/anime");
          }, 4500);
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] opacity-25 blur-lg"></span>
        Go to Home
      </motion.button>

      {!isClicked && (<AnimatePresence>
        {
          characters.map((char, index) => (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center"
              initial={{ scale: 0, opacity: 0, x: "0%", y: "0%" }}
              animate={{
                scale: 1,
                opacity: 1,
                x: `${-40 + index * 10}%`,
                y: "0%",
              }}

              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              style={{
                left: `${10 + index * 8}%`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {/* Glowing Light Effect Behind Character */}
              <motion.div
                className="absolute w-[150px] h-[150px] rounded-full blur-3xl"
                style={{ backgroundColor: char.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Character Image */}
              <Image src={char.image} alt={char.name} width={300} height={300} priority />
            </motion.div>
          ))}
      </AnimatePresence>)}

    </div>
  );
}
