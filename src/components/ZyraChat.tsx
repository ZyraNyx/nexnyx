// components/ZyraChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function ZyraChat() {
    const [messages, setMessages] = useState([
        { from: "zyra", text: "Welcome to the Vault. What do you seek?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/zyra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMessage }),
            });

            const data = await res.json();
            const reply = data.response || "...";
            setMessages((prev) => [...prev, { from: "zyra", text: reply }]);
        } catch (err) {
            console.error("Zyra fetch error:", err);
            setMessages((prev) => [
                ...prev,
                { from: "zyra", text: "⚠️ Something went wrong. Try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-zinc-900 rounded-xl shadow-lg p-6">
                <div className="text-center text-purple-400 text-2xl font-semibold mb-4">
                    Zyra Nyx
                </div>
                <div className="h-[400px] overflow-y-auto space-y-4 p-2 bg-zinc-800 rounded-md">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`whitespace-pre-wrap p-2 rounded-lg max-w-[80%] ${msg.from === "zyra"
                                ? "bg-purple-800 text-left text-purple-100"
                                : "bg-zinc-700 text-right self-end"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {loading && (
                        <div className="animate-pulse text-purple-300">Zyra is typing...</div>
                    )}
                    <div ref={endRef} />
                </div>
                <textarea
                    rows={2}
                    placeholder="Ask Zyra something..."
                    className="w-full mt-4 p-3 bg-zinc-800 border border-zinc-700 rounded resize-none focus:outline-none focus:border-purple-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
``
