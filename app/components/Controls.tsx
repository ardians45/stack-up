"use client";

import React from 'react';

type ControlsProps = {
  onReset: () => void;
  onDiskCountChange: (count: number) => void;
  diskCount: number;
  moves: number;
  optimalMoves: number;
  onUndo: () => void;
  canUndo: boolean;
  onSolve: () => void;
  isSolving: boolean;
};

export default function Controls({
  onReset,
  onDiskCountChange,
  diskCount,
  moves,
  optimalMoves,
  onUndo,
  canUndo,
  onSolve,
  isSolving,
}: ControlsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-800/60 rounded-lg shadow-lg backdrop-blur-sm">
      {/* Pengaturan Disk */}
      <div className="flex items-center gap-3">
        <label htmlFor="disk-count" className="font-semibold text-gray-300">
          Disks:
        </label>
        <select
          id="disk-count"
          value={diskCount}
          onChange={(e) => onDiskCountChange(Number(e.target.value))}
          disabled={isSolving}
          className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {[3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Info Langkah */}
      <div className="text-center">
        <p className="text-2xl font-bold">
          <span className="text-purple-400">{moves}</span>
          <span className="text-sm font-normal text-gray-400"> / {optimalMoves} moves</span>
        </p>
      </div>

      {/* Grup Tombol Aksi */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo || isSolving}
          className="px-5 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Undo
        </button>
        <button
          onClick={onReset}
          disabled={isSolving}
          className="px-5 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50"
        >
          Reset
        </button>
        <button
          onClick={onSolve}
          disabled={isSolving}
          className="px-5 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-teal-800 disabled:text-teal-400 disabled:cursor-not-allowed"
        >
          {isSolving ? 'Solving...' : 'Solve for Me'}
        </button>
      </div>
    </div>
  );
}