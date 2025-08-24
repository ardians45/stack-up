"use client";

import { motion, AnimatePresence } from 'framer-motion';

type WinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  moves: number;
  optimalMoves: number;
};

export default function WinModal({ isOpen, onClose, moves, optimalMoves }: WinModalProps) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50vh", opacity: 0, scale: 0.8 },
    visible: {
      y: "0",
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 180, damping: 20 }, // Animasi Bounce
    },
    exit: { y: "50vh", opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-gray-800 rounded-xl p-8 text-center shadow-2xl border border-purple-500/50 w-full max-w-sm"
            variants={modalVariants}
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Selamat! 🎉
            </h2>
            <p className="mt-4 text-gray-300">
              Kamu berhasil menyelesaikan puzzle dengan
              <span className="font-bold text-white mx-1">{moves}</span> langkah.
            </p>
            {moves === optimalMoves && (
              <p className="mt-2 text-yellow-400 font-semibold">Sempurna! ✨</p>
            )}
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Main Lagi
            </button>
            {/* BRANDING BARU DI SINI */}
            <p className="mt-6 text-xs text-gray-500">
              Developed by Ardian Setiawan
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}