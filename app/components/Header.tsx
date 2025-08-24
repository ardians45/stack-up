// app/components/Header.tsx
"use client";

export default function Header() {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Tower of Hanoi
      </h1>
      <p className="text-gray-400 mt-2">
        Pindahkan semua cakram dari tiang A ke tiang C.
      </p>
    </header>
  );
}