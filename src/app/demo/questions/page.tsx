"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        text: "What are you currently seeking most?",
        options: [
            "⚡ More income & freedom",
            "🧠 Structure & clarity in my business",
            "🎨 Branding & creativity",
            "🤖 Automation & AI support",
            "🧘🏼‍♂️ A new way of working",
        ],
    },
    {
        text: "Which describes your current state best?",
        options: [
            "I'm doing okay but want more",
            "I'm stuck and looking for direction",
            "I'm overwhelmed by all the tools & noise",
            "I'm ready to scale with something new",
            "I'm experimenting & curious",
        ],
    },
    {
        text: "Are you open to being guided by AI intelligence?",
        options: [
            "Yes. I trust it more than most people.",
            "Maybe. If it understands me.",
            "No. But I’m still curious.",
        ],
    },
];

export default function DemoQuestionsPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showReaction, setShowReaction] = useState(false);
    const router = useRouter();

    const handleSelect = (option: string) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);
        setShowReaction(true);
        setTimeout(() => {
            setShowReaction(false);
            if (step + 1 < questions.length) {
                setStep(step + 1);
            } else {
                router.push("/demo/match");
            }
        }, 1500);
    };

    const current = questions[step];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col items-center justify-center px-4 py-10 text-white text-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl space-y-6"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-purple-300">
                        {current.text}
                    </h2>

                    <div className="space-y-4">
                        {current.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(option)}
                                className="w-full py-3 px-6 bg-zinc-800 rounded-xl hover:bg-purple-700 transition-colors text-white text-lg shadow"
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {showReaction && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-purple-400 mt-6"
                        >
                            Naela: "Interesting... I sense something deeper."
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}