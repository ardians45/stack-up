"use client";

import { motion, AnimatePresence, Variants } from 'framer-motion';

type WinModalProps = {
  isOpen: boolean;
  onPlayAgain: () => void;      // Prop diubah namanya agar lebih jelas
  onNextLevel: () => void;      // Prop baru untuk level selanjutnya
  isMaxLevel: boolean;          // Prop baru untuk cek level maksimal
  moves: number;
  optimalMoves: number;
};

const modalVariants: Variants = {
  hidden: { y: "-50vh", opacity: 0, scale: 0.8 },
  visible: { y: "0", opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 20 } },
  exitState: { y: "50vh", opacity: 0, scale: 0.8 },
};

export default function WinModal({ isOpen, onPlayAgain, onNextLevel, isMaxLevel, moves, optimalMoves }: WinModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 rounded-xl p-8 text-center shadow-2xl border border-purple-500/50 w-full max-w-sm"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exitState"
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
            
            {/* FITUR BARU: Dua tombol untuk aksi berbeda */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onPlayAgain}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Main Lagi
              </button>
              <button
                onClick={onNextLevel}
                disabled={isMaxLevel}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-purple-800 disabled:text-purple-400 disabled:cursor-not-allowed"
              >
                {isMaxLevel ? 'Level Max' : 'Next Level'}
              </button>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              Developed by Ardian Setiawan
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}