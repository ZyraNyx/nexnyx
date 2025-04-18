"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AiGrid from "@/components/AiGrid";

const heroLines = [
  "NexNyx is made up of 15 AI entities with character.",
  "They take over your sales, strategy, tech, finance — and more.",
  "You only have to choose who to let guide you...",
  "🔓 Enter the Vault and unlock what’s next. or Join the Demo",
];

export default function Home() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (currentLine < heroLines.length) {
      let index = 0;
      const line = heroLines[currentLine];

      const interval = setInterval(() => {
        setCurrentText(line.slice(0, index + 1));
        index++;

        if (index === line.length) {
          clearInterval(interval);
          setTimeout(() => {
            setTypedLines((prev) => [...prev, line]);
            setCurrentText("");
            setCurrentLine((prev) => prev + 1);
          }, 1000);
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => setShowCTA(true), 800);
    }
  }, [currentLine]);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-start space-y-12">
      {/* Logo + Slogan */}
      <div className="flex flex-col items-center mt-12 space-y-4">
        <Image
          src="/images/nexnyx-logo.png"
          alt="NexNyx Logo"
          width={180}
          height={180}
          className="drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
          Next Level. Next Nyx.
        </h1>
      </div>

      {/* Typewriter Intro */}
      <div className="text-center text-xl md:text-2xl text-white font-mono space-y-2 min-h-[200px]">
        {typedLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        {currentText && <p>{currentText}</p>}
      </div>

      {/* CTA Buttons */}
      {showCTA && (
        <div className="flex flex-col items-center space-y-3 text-center">
          <Link
            href="/vault"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg transition"
          >
            🔓 Enter the Vault
          </Link>
          <Link
            href="/demo"
            className="bg-zinc-800 border border-purple-500 hover:bg-purple-600 hover:border-purple-600 text-white px-6 py-3 rounded-xl text-lg transition"
          >
            🚀 Join the Demo
          </Link>
        </div>
      )}

      {/* AI Grid */}
      <div className="w-full max-w-6xl mt-12">
        <AiGrid />
      </div>
    </div>
  );
}
