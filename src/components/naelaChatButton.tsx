"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NaelaChatButton() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Controleer of de gebruiker ingelogd is
    useEffect(() => {
        const user = localStorage.getItem("vaultUser");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
        if (!isChatOpen) {
            // Optionally navigate to chat or open a dedicated chat page
            router.push("/vault/naela/chat");
        }
    };

    if (!isLoggedIn) return null;  // Verberg de chatknop als de gebruiker niet ingelogd is

    return (
        <div>
            {/* Floating Chat Button */}
            <motion.button
                onClick={toggleChat}
                className="fixed bottom-10 right-10 bg-purple-700 rounded-full p-4 shadow-lg hover:bg-purple-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Image
                    src="/images/naela-nyx.jpg"
                    alt="Naela Chat"
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                />
            </motion.button>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-16 right-10 bg-zinc-800 p-4 rounded-xl w-80 h-96 text-white shadow-xl">
                    <h2 className="text-lg font-bold mb-4 text-purple-400">Naela Nyx</h2>
                    <div className="flex flex-col h-full overflow-y-auto">
                        {/* Chat content */}
                        <div className="flex-grow space-y-2">
                            <div className="bg-purple-600 p-3 rounded-lg max-w-xs">
                                <p className="text-white">Hello! How can I assist you today?</p>
                            </div>
                            {/* Example user message */}
                            <div className="bg-zinc-700 p-3 rounded-lg max-w-xs self-end">
                                <p className="text-white">Can you help me with my Vault?</p>
                            </div>
                        </div>

                        {/* Chat input */}
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-grow bg-zinc-700 text-white rounded-l-xl px-4 py-2 focus:outline-none"
                            />
                            <button className="bg-purple-600 px-4 py-2 rounded-r-xl">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
