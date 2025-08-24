// app/components/Tower.tsx
"use client";

import { motion } from 'framer-motion';
import Disk from './Disk';

type TowerProps = {
  id: string;
  disks: number[];
  totalDisks: number;
  onClick: (towerId: string) => void;
  isSelected: boolean;
};

export default function Tower({ id, disks, totalDisks, onClick, isSelected }: TowerProps) {
  
  const variants = {
    selected: { scale: 1.05, y: -10 },
    normal: { scale: 1, y: 0 },
  };
  
  return (
    <div className="flex flex-col items-center w-1/3">
      {/* Container untuk disk dan tiang */}
      <motion.div
        onClick={() => onClick(id)}
        className="w-full h-64 md:h-80 bg-gray-800/50 rounded-lg flex flex-col-reverse items-center justify-start p-2 cursor-pointer relative"
        variants={variants}
        animate={isSelected ? "selected" : "normal"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Tiang Vertikal */}
        <div className="absolute bottom-0 w-2 h-full bg-gray-700 rounded-t-full" />
        
        {/* Disks */}
        <div className="w-full flex flex-col-reverse items-center gap-1 z-10">
          {disks.map((diskSize) => (
            <Disk key={diskSize} size={diskSize} totalDisks={totalDisks} />
          ))}
        </div>
      </motion.div>
      {/* Label Tiang */}
      <p className="mt-4 text-xl font-bold text-gray-400">{id}</p>
    </div>
  );
}