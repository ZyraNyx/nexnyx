"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export default function ZyraPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "zyra", text: "Welcome back. What shall we unlock today?" },
    ]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [naelaInterrupt, setNaelaInterrupt] = useState(false);
    const chatEndRef = useRef(null);
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        scrollToBottom();
        resetInactivityTimer();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            setNaelaInterrupt(true);
        }, 30000); // 30 sec
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        setNaelaInterrupt(false);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/generate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "mistral",
                        prompt: input,
                        stream: false,
                    }),
                }
            );

            const data = await res.json();
            const reply = data.response?.trim() || "[Zyra was silent. Try again.]";

            setMessages((prev) => [...prev, { role: "zyra", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Zyra couldn't reply. Please try again.");
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

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
            <h1 className="text-purple-400 text-xl font-semibold mb-4">Zyra Nyx</h1>

            <div className="w-full max-w-2xl bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "zyra"
                            ? "bg-purple-800 text-purple-100 self-start"
                            : "bg-zinc-700 text-white self-end"}`}
                    >
                        {msg.text}
                    </div>
                ))}

                {naelaInterrupt && (
                    <div className="text-sm text-pink-400 italic">
                        Naela: "You’ve been quiet... is there something I can guide you with?"
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
                className="mt-4 w-full max-w-2xl flex"
            >
                <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                >
                    ↵
                </button>
            </form>
        </div>
    );
}
