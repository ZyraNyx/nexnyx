"use client";

import { motion } from "framer-motion";

export default function VaultThanksPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
                    Thank you, Initiate.
                </h1>

                <p className="text-zinc-300 text-lg mb-6">
                    Your Vault access is being processed.<br />
                    Within 24 hours, you’ll receive entry instructions via your selected channel.
                </p>

                <p className="text-sm text-zinc-500">
                    If you haven’t heard from us after 24 hours, please contact support via DM or email.
                </p>

                <img
                    src="/images/vault-symbol.png"
                    alt="Vault Symbol"
                    className="w-20 mt-10 opacity-80"
                />
            </motion.div>
        </div>
    );
}
