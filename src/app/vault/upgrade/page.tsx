"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VaultEntryPage() {
    const router = useRouter();

    const handleUpgrade = () => {
        router.push("/vault/enter"); // of naar betaalpagina
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col items-center justify-center px-6 py-16 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                    You’ve unlocked the first layer.
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 mb-10">
                    Beyond this gate lies the full Vault – a world where AI entities work in unison to scale your business, brand and income. Only Initiates with true intent may proceed.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpgrade}
                    className="bg-purple-700 hover:bg-purple-800 px-10 py-3 rounded-full text-lg font-medium shadow-lg shadow-purple-500/30"
                >
                    🔓 Unlock the Vault – $97 Lifetime Access
                </motion.button>

                <p className="mt-4 text-sm text-zinc-500">
                    Lifetime access to 3 AI’s + Vault tools. 100 seats only.
                </p>
            </motion.div>
        </div>
    );
}
