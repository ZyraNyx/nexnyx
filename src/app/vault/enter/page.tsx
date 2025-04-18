"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VaultEnterPage() {
    const router = useRouter();
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowButton(true), 6000);
        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        router.push("/vault/dashboard");
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <video
                src="/videos/vault-opening.mp4"
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-3xl md:text-4xl text-white font-semibold tracking-widest drop-shadow"
                >
                    Entering the Vault...
                </motion.h1>

                {showButton && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        onClick={handleContinue}
                        className="mt-10 bg-purple-700 hover:bg-purple-800 px-8 py-3 rounded-full text-lg text-white shadow shadow-purple-500/30"
                    >
                        Continue
                    </motion.button>
                )}
            </div>
        </div>
    );
}
