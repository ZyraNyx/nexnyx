// 📁 /src/app/vault/nova/flow/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function NovaFlowPage() {
    const [step, setStep] = useState(0);

    const introLines = [
        "💰 Nova: Welcome, strategist.",
        "You're not here to count coins. You're here to control them.",
        "I’ve seen your patterns. I know your numbers whisper secrets.",
        "Let’s uncover what’s hidden beneath the surface.",
    ];

    const questions = [
        {
            text: "What do you want more of in your finances?",
            options: [
                "Cashflow clarity",
                "Predictable income",
                "Less stress about taxes",
                "Profit-first structure",
            ],
        },
        {
            text: "What do your current numbers say about you?",
            options: [
                "I avoid them",
                "I track some things",
                "I’m financially organized",
                "I’m ready for next-level profit",
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => {
                if (prev < introLines.length - 1) return prev + 1;
                setShowQuestions(true);
                clearInterval(timer);
                return prev;
            });
        }, 2800);
        return () => clearInterval(timer);
    }, []);

    const handleAnswer = (answer: string) => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // ⚡️ Naar Vault of Blueprint
            window.location.href = "/vault/nova";
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            {/* Nova Avatar */}
            <div className="mb-6">
                <Image
                    src="/images/nova-nyx.jpg"
                    alt="Nova Nyx"
                    width={160}
                    height={160}
                    className="rounded-full border border-yellow-500"
                />
                <h2 className="text-xl mt-2 text-yellow-400 font-semibold text-center">Nova Nyx</h2>
            </div>

            {/* Typewriter Introductie */}
            {!showQuestions && (
                <div className="w-full max-w-xl space-y-3 text-lg text-center">
                    {introLines.slice(0, step + 1).map((line, index) => (
                        <p key={index} className="transition-opacity duration-300">{line}</p>
                    ))}
                </div>
            )}

            {/* Vragenblok */}
            {showQuestions && (
                <div className="w-full max-w-xl bg-zinc-800 p-6 mt-6 rounded-xl shadow-md space-y-4">
                    <p className="text-lg font-medium text-yellow-400">
                        {questions[currentQuestion].text}
                    </p>
                    <div className="space-y-2">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
