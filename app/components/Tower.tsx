"use client";

import { motion } from 'framer-motion';
import Disk from './Disk';

type TowerProps = {
  id: string;
  disks: number[];
  totalDisks: number;
  onClick: (towerId: string) => void;
  isSelected: boolean;
  isError: boolean; // Prop baru untuk feedback error
};

// FITUR BARU: Definisikan varian animasi untuk normal, selected, dan shake
const towerVariants = {
  normal: { scale: 1, y: 0 },
  selected: { scale: 1.05, y: -10 },
  shake: {
    // Animasi getaran dan bayangan merah sebagai feedback
    boxShadow: "0px 0px 20px rgba(239, 68, 68, 0.7)",
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export default function Tower({ id, disks, totalDisks, onClick, isSelected, isError }: TowerProps) {
  // Tentukan state animasi mana yang akan digunakan
  const getAnimateState = () => {
    if (isError) return "shake";
    if (isSelected) return "selected";
    return "normal";
  };

  return (
    <div className="flex flex-col items-center w-1/3">
      <motion.div
        onClick={() => onClick(id)}
        className="w-full h-64 md:h-80 bg-gray-800/50 rounded-lg flex flex-col-reverse items-center justify-start p-2 cursor-pointer relative"
        // Gunakan varian animasi yang sudah didefinisikan
        variants={towerVariants}
        animate={getAnimateState()}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute bottom-0 w-2 h-full bg-gray-700 rounded-t-full" />
        <div className="w-full flex flex-col-reverse items-center gap-1 z-10">
          {disks.map((diskSize) => (
            <Disk key={diskSize} size={diskSize} totalDisks={totalDisks} />
          ))}
        </div>
      </motion.div>
      <p className="mt-4 text-xl font-bold text-gray-400">{id}</p>
    </div>
  );
}