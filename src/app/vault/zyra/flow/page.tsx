"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ZyraFlowPage() {
    const router = useRouter();

    const dialogues = [
        "Zyra: You're here. Good.",
        "I’ve already scanned your intent.",
        "Let’s begin your Flow Activation.",
        "I’ll ask a few questions to calibrate your Vault strategy.",
    ];

    const [step, setStep] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (step < dialogues.length) {
            let current = "";
            let i = 0;

            const type = () => {
                if (i < dialogues[step].length) {
                    current += dialogues[step][i];
                    setTypedText(current);
                    i++;
                    setTimeout(type, 40);
                } else {
                    if (step === dialogues.length - 1) {
                        setTimeout(() => setShowOptions(true), 1000);
                    } else {
                        setTimeout(() => setStep((prev) => prev + 1), 1500);
                    }
                }
            };

            type();
        }
    }, [step]);

    const handleAnswer = (choice: string) => {
        // Later koppelen aan gedrag
        console.log("Zyra flow answer:", choice);
        router.push("/vault/enter");
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-start">
            {/* 🔮 Zyra Avatar */}
            <div className="mb-6 text-center">
                <Image
                    src="/images/zyra-nyx.jpg"
                    alt="Zyra Nyx"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-purple-600 shadow-md"
                />
                <h2 className="mt-2 text-purple-400 text-xl font-bold">Zyra Nyx</h2>
            </div>

            {/* 💬 Typewriter tekst */}
            <div className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-xl space-y-4 text-center min-h-[120px]">
                <p className="text-lg">{typedText}</p>
            </div>

            {/* ✅ Opties als vragen klaar zijn */}
            {showOptions && (
                <div className="mt-6 space-y-3 w-full max-w-md">
                    <p className="text-center text-zinc-300">What describes your current sales situation?</p>
                    <button
                        onClick={() => handleAnswer("Too much time in DMs")}
                        className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded"
                    >
                        I spend too much time in DMs
                    </button>
                    <button
                        onClick={() => handleAnswer("I hate selling")}
                        className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded"
                    >
                        I hate selling, but I need clients
                    </button>
                    <button
                        onClick={() => handleAnswer("Need a better funnel")}
                        className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded"
                    >
                        I want a better funnel or activation strategy
                    </button>
                    <button
                        onClick={() => handleAnswer("Curious about AI sales")}
                        className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded"
                    >
                        I’m curious how AI can sell for me
                    </button>
                </div>
            )}
        </div>
    );
}
