"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VaultPayPage() {
    const router = useRouter();

    const handleContinue = () => {
        router.push("/vault/thanks");
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
            >
                <img
                    src="/images/nexnyx-logo.png"
                    alt="NexNyx Logo"
                    className="w-24 mx-auto mb-6 opacity-90"
                />

                <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
                    Unlock the Vault for €97
                </h1>

                <p className="text-zinc-300 text-lg mb-6">
                    Lifetime access to 3 AI’s, Vault rituals, and exclusive tools. <br />
                    Limited to 100 Initiates.
                </p>

                <div className="flex flex-col items-center space-y-4">
                    <a
                        href="https://bunq.me/nexnyx/97/unlock-the-vault"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 px-10 py-3 rounded-full text-lg font-medium shadow shadow-green-500/30"
                    >
                        💳 Pay €97 via Bunq
                    </a>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleContinue}
                        className="bg-purple-700 hover:bg-purple-800 px-10 py-3 rounded-full text-lg font-medium shadow shadow-purple-500/30"
                    >
                        ✅ I Have Paid – Continue
                    </motion.button>
                </div>

                <div className="mt-8 text-sm text-zinc-400 space-y-2">
                    <p>
                        <strong>Step 1:</strong> Click the green button to open Bunq and complete your payment of <strong>€97</strong>.
                    </p>
                    <p>
                        <strong>Step 2:</strong> After payment, return here and click <span className="text-purple-400">“I Have Paid – Continue”</span> to enter the Vault.
                    </p>
                    <p>
                        Your Vault access will be unlocked manually within 24 hours.
                    </p>
                    <p className="text-zinc-500">
                        Questions? DM us on social or email support@nexnyx.com
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
