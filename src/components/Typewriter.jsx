import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = () => {
  const texts = ["Grow", "Visualize", "Plan"]; // Insert your strings here
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (texts[textIndex]) {
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
    }
  }, [charIndex, textIndex]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.h1
        className="text-3xl font-mono text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
        <span className="animate-blink">|</span>
      </motion.h1>
    </div>
  );
};

export default Typewriter;