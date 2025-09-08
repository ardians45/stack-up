"use client";

import { motion } from 'framer-motion';
// Anda bisa ganti ini dengan ikon SVG atau komponen ikon lainnya
const GameIcon = () => (
  <div className="w-20 h-20 mb-6 flex flex-col justify-around items-center bg-gray-800 rounded-2xl p-3 shadow-lg">
    <div className="w-1/2 h-2 bg-purple-500 rounded-full"></div>
    <div className="w-3/4 h-2 bg-pink-500 rounded-full"></div>
    <div className="w-full h-2 bg-teal-400 rounded-full"></div>
  </div>
);

type WelcomeScreenProps = {
  onStartGame: () => void;
};

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <GameIcon />
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Stack Up
      </h1>
      <p className="mt-2 text-lg text-gray-400">by Ardian Setiawan</p>
      <motion.button
        onClick={onStartGame}
        className="mt-12 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(168, 85, 247, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}