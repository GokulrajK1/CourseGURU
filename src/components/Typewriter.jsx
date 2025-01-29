import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@tailwindcss/typography";

const Typewriter = () => {
  const texts = ["Plan", "Build", "Visualize", "Optimize"];
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < texts[textIndex].length) {
      setTimeout(() => {
        setCurrentText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setCharIndex(0);
        setCurrentText("");
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 1500);
    }
  }, [charIndex, textIndex]);

  return (
    <div className="flex items-center justify-center h-screen w-full -mt-56">
      <motion.h1
        className="text-5xl font-extrabold text-white font-mono"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-5xl font-bold text-red-600">{currentText}</span>
        <span className="text-5xl font-normal text-white"> with </span>
        <span className="text-5xl font-semibold text-white">CourseGU</span>
        <span className="text-5xl font-semibold text-red-500">RU</span>
      </motion.h1>
    </div>
  );
};

export default Typewriter;
