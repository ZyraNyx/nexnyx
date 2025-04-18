// 📁 /src/app/vault/aryz/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AryzBlueprint from "@/components/blueprints/AryzBlueprint";

export default function AryzVaultPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const dialogues = [
        "🧠 Aryz: Structure creates freedom.",
        "You don’t need more effort. You need architecture.",
        "Let’s align your business with strategy, not stress.",
        "I’ve already started sketching your empire.",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < dialogues.length - 1 ? prev + 1 : prev));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 space-y-6">
            <div className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-xl text-center space-y-6">
                <Image
                    src="/images/aryz-nyx.jpg"
                    alt="Aryz Nyx"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full border border-blue-700"
                />
                <h1 className="text-2xl font-bold text-blue-400">Aryz Nyx</h1>

                <div className="space-y-3 text-lg">
                    {dialogues.slice(0, step + 1).map((line, index) => (
                        <p key={index} className="transition-opacity duration-500">
                            {line}
                        </p>
                    ))}
                </div>

                {step === dialogues.length - 1 && (
                    <button
                        onClick={() => router.push("/vault/enter")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mt-6"
                    >
                        🏗️ Enter Strategic Vault
                    </button>
                )}
            </div>

            {/* Blueprint */}
            <AryzBlueprint />
        </div>
    );
}
