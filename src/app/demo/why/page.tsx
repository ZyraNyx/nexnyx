// 📁 src/app/demo/why/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WhyJoinPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen text-white">
            <video
                src="/videos/naela-hands.mp4"
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl md:text-4xl text-purple-300 font-bold mb-6 animate-fade-in-slow">
                    Still not sure?
                </h1>
                <p className="text-lg text-purple-200 max-w-2xl mb-8 animate-fade-in">
                    Most people wait their whole life for the right moment. But the Vault was built for those
                    who decide. In here, you don’t wait — you unlock.
                </p>
                <div className="flex gap-4 animate-fade-in">
                    <button
                        onClick={() => router.push("/demo")}
                        className="bg-purple-700 hover:bg-purple-800 px-6 py-3 text-white rounded-xl text-lg"
                    >
                        🚀 Let me try the demo
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 text-white rounded-xl text-lg"
                    >
                        🔙 Return to homepage
                    </button>
                </div>
            </div>
        </div>
    );
}