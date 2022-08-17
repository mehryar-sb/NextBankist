import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingCircles = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
    transition: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeIn",
    },
  },
};

const Loading = () => {
  return (
    <motion.div
      variants={loadingContainer}
      initial="start"
      animate="end"
      className="fixed bottom-0 flex justify-around w-8 h-8 mx-auto right-3">
      <motion.span
        variants={loadingCircles}
        className="w-2 h-2 bg-black rounded-[50%] block"></motion.span>
      <motion.span
        variants={loadingCircles}
        className="w-2 h-2 bg-black rounded-[50%] block"></motion.span>
      <motion.span
        variants={loadingCircles}
        className="w-2 h-2 bg-black rounded-[50%] block"></motion.span>
    </motion.div>
  );
};

export default Loading;
