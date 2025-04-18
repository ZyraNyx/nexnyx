"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoStartPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rewardShown, setRewardShown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsAuthenticated(true);
    }, []);

    const handleAnswer = async (key: string, value: string) => {
        const updatedAnswers = { ...answers, [key]: value };
        setAnswers(updatedAnswers);

        // 🎉 Bij eerste vraag: geef meteen feedback
        if (step === 1 && !rewardShown) {
            alert("🎉 You’ve just claimed your first 100 Vault Points!");
            setRewardShown(true);
        }

        // ✅ Laatste stap → punten toevoegen
        if (step === 2) {
            if (!isAuthenticated) {
                router.push("/login?redirect=/demo/start?step=3");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                await fetch("http://localhost:5001/api/user/vault-points", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ points: 100, reason: "Demo completed" }),
                });
            } catch (err) {
                console.error("Vault Points failed:", err);
            } finally {
                router.push("/vault/zyra");
            }
        } else {
            setStep(step + 1);
        }
    };

    const renderStep = () => {
        if (step === 1) {
            return (
                <div className="space-y-4">
                    <p className="text-xl">👁 Naela: What kind of work do you do?</p>
                    <div className="space-y-2">
                        {["Agency", "Coaching", "SaaS", "Creator"].map((niche) => (
                            <button
                                key={niche}
                                onClick={() => handleAnswer("niche", niche)}
                                className="bg-purple-700 w-full p-2 rounded"
                            >
                                {`I’m in ${niche}`}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (step === 2) {
            return (
                <div className="space-y-4">
                    <p className="text-xl">💡 What’s your biggest goal this year?</p>
                    <div className="space-y-2">
                        {[
                            "Earn more with less stress",
                            "Automate my business",
                            "Scale to 6 or 7 figures",
                            "Launch something new",
                        ].map((goal) => (
                            <button
                                key={goal}
                                onClick={() => handleAnswer("goal", goal)}
                                className="bg-purple-700 w-full p-2 rounded"
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-xl">
                {renderStep()}
            </div>
        </div>
    );
}
