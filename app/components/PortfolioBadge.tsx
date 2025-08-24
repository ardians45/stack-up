"use client";

import { motion } from 'framer-motion';

export default function PortfolioBadge() {
  return (
    <motion.a
      href="https://ardians.framer.website/" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm"
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      Portofolio Developer
    </motion.a>
  );
}