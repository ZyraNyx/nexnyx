// 📁 src/app/demo/layout.tsx

import React from "react";
import Image from "next/image";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* 🎥 Background video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
            >
                <source src="/videos/naela-hands.mp4" type="video/mp4" />
            </video>

            {/* 🌑 Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

            {/* 💬 Foreground content */}
            <div className="relative z-20 flex items-center justify-center px-4 py-10 min-h-screen">
                <div className="bg-zinc-900 rounded-2xl shadow-2xl p-6 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* ✅ Naela avatar */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-600 shadow-md">
                        <Image
                            src="/images/naela-nyx.jpg"
                            alt="Naela Nyx"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* ✅ Demo flow content */}
                    <div className="flex-1 w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}
