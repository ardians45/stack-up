// app/components/Disk.tsx
"use client";

import { motion } from 'framer-motion';

type DiskProps = {
  size: number;
  totalDisks: number;
};

// Skema warna yang menarik
const colors = [
  "from-red-500 to-red-400",
  "from-orange-500 to-orange-400",
  "from-amber-500 to-amber-400",
  "from-yellow-500 to-yellow-400",
  "from-lime-500 to-lime-400",
  "from-green-500 to-green-400",
  "from-emerald-500 to-emerald-400",
  "from-teal-500 to-teal-400",
];

export default function Disk({ size, totalDisks }: DiskProps) {
  const widthPercentage = (size / (totalDisks + 1)) * 100;
  
  return (
    <motion.div
      layout // Kunci animasi otomatis
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`h-6 md:h-8 rounded-md shadow-lg bg-gradient-to-r ${colors[size - 1]}`}
      style={{ width: `${widthPercentage}%` }}
      // Initial & animate props untuk efek muncul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    />
  );
}