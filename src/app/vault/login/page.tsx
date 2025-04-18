// 📁 src/app/vault/login/page.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VaultLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const alreadyDemo = searchParams.get("alreadyDemo") === "true";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Als de gebruiker al is ingelogd, redirect naar het dashboard
        const user = localStorage.getItem("vaultUser");
        if (user) router.push("/vault/dashboard");
    }, []);

    const handleLogin = () => {
        if (!name || !email) return;  // Zorg ervoor dat alle velden ingevuld zijn
        setLoading(true);

        // Sla de gebruikersinformatie op in localStorage
        const user = { name, email };
        localStorage.setItem("vaultUser", JSON.stringify(user));

        setTimeout(() => {
            router.push("/vault/dashboard");  // Redirect naar Vault dashboard
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                    Vault Login
                </h1>

                {/* Vertoon melding als gebruiker de demo al heeft gedaan */}
                {alreadyDemo && (
                    <p className="mb-6 text-sm text-yellow-400 bg-zinc-800 p-3 rounded-xl border border-yellow-500">
                        You’ve already claimed your Vault Points from the demo. Log in to continue.
                    </p>
                )}

                {/* Gebruiker invoervelden */}
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-3 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-zinc-500"
                />
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-6 p-3 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-zinc-500"
                />

                {/* Login knop */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded text-lg font-medium disabled:opacity-50"
                >
                    Enter the Vault
                </motion.button>

                {/* Disclaimer over gegevensgebruik */}
                <p className="mt-6 text-sm text-zinc-500">
                    Your data will only be used to personalize your Vault experience.
                </p>
            </motion.div>
        </div>
    );
}
