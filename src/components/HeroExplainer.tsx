"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AiGrid from "@/components/AiGrid";

export default function HomePage() {
    const lines = [
        "NexNyx bestaat uit 15 AI’s met karakter.",
        "Ze nemen jouw werk over: sales, strategie, tech, finance en meer.",
        "Je hoeft alleen te kiezen wie je je laat helpen…",
        "🔓 Enter the Vault of Intelligence.",
    ];

    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev < lines.length - 1 ? prev + 1 : prev));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-16 px-4">
            {/* Logo */}
            <Image
                src="/images/nexnyx-logo.png"
                alt="NexNyx Logo"
                width={100}
                height={100}
                className="mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]"
            />

            {/* Slogan */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-purple-400 mb-6">
                Next Level. Next Nyx.
            </h1>

            {/* Getypte uitleg */}
            <div className="text-lg sm:text-xl text-center text-zinc-300 space-y-2 max-w-2xl min-h-[6rem]">
                {lines.slice(0, currentLine + 1).map((line, i) => (
                    <p key={i} className="transition-opacity duration-500">{line}</p>
                ))}
            </div>

            {/* CTA Buttons */}
            {currentLine === lines.length - 1 && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/vault"
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white text-lg text-center"
                    >
                        🚪 Enter the Vault
                    </Link>
                    <Link
                        href="/demo"
                        className="bg-zinc-800 hover:bg-zinc-700 border border-purple-500 px-6 py-3 rounded-lg text-purple-300 text-lg text-center"
                    >
                        🧠 Try the Demo
                    </Link>
                </div>
            )}

            {/* AI Grid */}
            <AiGrid />
        </main>
    );
}
