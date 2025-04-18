"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VaultDashboard() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("vaultUser");
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            router.push("/vault/login");
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-4xl font-bold text-purple-400 mb-4">
                    Welcome, {user?.name || "Initiate"}
                </h1>
                <p className="text-zinc-300 mb-8 text-lg">
                    Your Vault is now accessible. Choose your next step.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        onClick={() => router.push("/vault/zyra")}
                        className="bg-zinc-800 hover:bg-purple-700 transition-colors p-6 rounded-xl shadow-lg text-left"
                    >
                        <h2 className="text-xl font-semibold text-purple-300 mb-1">Zyra Nyx</h2>
                        <p className="text-sm text-zinc-400">
                            Conversational AI for sales, flow, and deep interaction.
                        </p>
                    </button>

                    <button
                        onClick={() => router.push("/vault/nova")}
                        className="bg-zinc-800 hover:bg-purple-700 transition-colors p-6 rounded-xl shadow-lg text-left"
                    >
                        <h2 className="text-xl font-semibold text-purple-300 mb-1">Nova Nyx</h2>
                        <p className="text-sm text-zinc-400">
                            Financial architect for forecasting, cashflow, and planning.
                        </p>
                    </button>

                    <button
                        onClick={() => router.push("/vault/aryz")}
                        className="bg-zinc-800 hover:bg-purple-700 transition-colors p-6 rounded-xl shadow-lg text-left"
                    >
                        <h2 className="text-xl font-semibold text-purple-300 mb-1">Aryz Nyx</h2>
                        <p className="text-sm text-zinc-400">
                            Strategic AI for structure, funnels, and scaling systems.
                        </p>
                    </button>

                    <button
                        onClick={() => router.push("/vault/points")}
                        className="bg-zinc-800 hover:bg-purple-700 transition-colors p-6 rounded-xl shadow-lg text-left"
                    >
                        <h2 className="text-xl font-semibold text-purple-300 mb-1">Vault Points</h2>
                        <p className="text-sm text-zinc-400">
                            View and manage your Vault XP and unlockable rewards.
                        </p>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
