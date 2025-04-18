"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NaelaPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "naela", text: "Welcome back, wanderer. What guidance do you seek?" },
    ]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const chatEndRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            (chatEndRef.current as HTMLDivElement).scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: `${input}\n\nIf asked for your name, respond as Naela Nyx, the gatekeeper and mentor of NexNyx.`,
                    stream: false,
                }),
            });

            const data = await res.json();
            const reply = data.response?.trim() || "[Naela is attuning to your energy...]";
            setMessages((prev) => [...prev, { role: "naela", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Naela couldn’t respond. Please try again.");
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
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
                {/* Avatar */}
                <div className="md:w-1/4 flex justify-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-pink-500 shadow-lg">
                        <Image
                            src="/images/naela-nyx.jpg"
                            alt="Naela Nyx"
                            width={160}
                            height={160}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Chat Content */}
                <div className="md:w-3/4">
                    <p className="text-pink-300 text-sm mb-2 text-center md:text-left">
                        Naela guides your path through the Vault. Ask her anything about your match, upgrades, or what's next.
                    </p>

                    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "naela"
                                    ? "bg-pink-800 text-pink-100 self-start"
                                    : "bg-zinc-700 text-white self-end"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-pink-300 animate-pulse">Naela is listening...</div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="mt-4 flex"
                    >
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Naela about your next step..."
                            className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                        >
                            ↵
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
