"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoIntroPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({ goal: "", experience: "", style: "" });

    // Statische intro tekst
    const introText = "Welcome, Initiate... The Vault does not open for everyone. But something tells me... you're ready.";
    const introSubText = "Are you ready to begin?";

    useEffect(() => {
        const alreadyDone = localStorage.getItem("demoCompleted");
        if (alreadyDone) {
            router.push("/vault/login?alreadyDemo=true");
            return;
        }

        setStep(0); // Begin bij stap 0 (intro tekst)
    }, []);

    const handleYesClick = () => {
        setStep(1); // Ga naar de volgende stap voor de doelen keuze
    };

    const handleNotSureClick = () => {
        router.push("/demo/why"); // Verwijs de gebruiker naar de "Not sure yet" pagina
    };

    const handleSelect = (type: string, value: string) => {
        const updated = { ...answers, [type]: value };
        setAnswers(updated);

        if (type === "goal") setStep(2);
        if (type === "experience") setStep(3);
        if (type === "style") {
            setStep(4);
            setTimeout(() => {
                let path = "/vault/zyra";
                if (updated.goal === "Finance") path = "/vault/nova";
                else if (updated.goal === "Strategy") path = "/vault/aryz";
                else if (updated.goal === "Creativity") path = "/vault/lyra";
                router.push(path);
            }, 1500);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden text-white">
            <video
                src="/videos/naela-hands.mp4"
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-6">
                {/* Step 0 - Intro Text */}
                {step === 0 && (
                    <div className="space-y-6">
                        <div className="text-2xl md:text-4xl text-purple-300 font-semibold max-w-3xl whitespace-pre-line animate-pulse">
                            {introText}
                        </div>
                        <div className="text-xl text-purple-200 mt-4">
                            {introSubText}
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={handleYesClick}
                                className="bg-purple-700 hover:bg-purple-800 border border-purple-500 text-white px-6 py-3 rounded-xl text-lg"
                            >
                                Yes, let's begin
                            </button>
                            <button
                                onClick={handleNotSureClick}
                                className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-500 text-white px-6 py-3 rounded-xl text-lg"
                            >
                                Not sure yet
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 1 - Goal Selection */}
                {step === 1 && (
                    <div className="space-y-4">
                        <p className="text-xl text-purple-200">What are you currently seeking?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Sales", "Finance", "Strategy", "Creativity"].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => handleSelect("goal", g)}
                                    className="bg-zinc-800 hover:bg-purple-700 border border-purple-500 text-white px-6 py-3 rounded-xl text-lg"
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2 - Experience Level */}
                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-xl text-purple-200">How experienced are you in this field?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                                <button
                                    key={lvl}
                                    onClick={() => handleSelect("experience", lvl)}
                                    className="bg-zinc-800 hover:bg-purple-700 border border-purple-500 text-white px-6 py-3 rounded-xl text-lg"
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3 - Style Selection */}
                {step === 3 && (
                    <div className="space-y-4">
                        <p className="text-xl text-purple-200">Which statement fits you best?</p>
                        <div className="flex flex-wrap justify-center gap-4 max-w-xl">
                            {["I want fast action", "I want deep insights", "I want clarity and structure", "I want something beautiful and unique"].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect("style", s)}
                                    className="bg-zinc-800 hover:bg-purple-700 border border-purple-500 text-white px-6 py-3 rounded-xl text-lg"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4 - Naela matching frequency */}
                {step === 4 && (
                    <div className="text-xl text-purple-300 animate-pulse mt-4">
                        Naela is matching your frequency...
                    </div>
                )}
            </div>
        </div>
    );
}
