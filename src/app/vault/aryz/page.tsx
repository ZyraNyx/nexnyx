"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AryzPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "aryz", text: "Welcome to the strategic chamber. What shall we architect today?" },
    ]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [naelaActive, setNaelaActive] = useState(false);
    const [demoLocked, setDemoLocked] = useState(false);
    const [userMessageCount, setUserMessageCount] = useState(0);
    const chatEndRef = useRef(null);
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const MAX_DEMO_MESSAGES = 5;

    useEffect(() => {
        setMounted(true);
        startInactivityTimer();
        return () => clearTimeout(inactivityTimer.current!);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            (chatEndRef.current as HTMLDivElement).scrollIntoView({ behavior: "smooth" });
        }
    };

    const startInactivityTimer = () => {
        clearTimeout(inactivityTimer.current!);
        inactivityTimer.current = setTimeout(() => {
            setNaelaActive(true);
        }, 30000);
    };

    const resetInactivity = () => {
        setNaelaActive(false);
        startInactivityTimer();
    };

    const handleSend = async () => {
        if (!input.trim() || demoLocked) return;

        resetInactivity();
        const userMessage = { role: "user", text: input };
        const newCount = userMessageCount + 1;
        setUserMessageCount(newCount);
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        if (newCount >= MAX_DEMO_MESSAGES) {
            setMessages((prev) => [
                ...prev,
                { role: "aryz", text: "We’ve just scratched the surface. Unlock Tier 2 for full strategic access — all 15 AIs for €97 lifetime." },
                { role: "system", text: "[🔓] Choose your path below 👇" },
            ]);
            setDemoLocked(true);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: `${input}\n\nIf asked for your name, respond as Aryz Nyx, the strategic architect of NexNyx.`,
                    stream: false,
                }),
            });

            const data = await res.json();
            const reply = data.response?.trim() || "[Aryz is thinking. Try again.]";
            setMessages((prev) => [...prev, { role: "aryz", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Aryz couldn’t reply. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        } else {
            resetInactivity();
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
                {/* Left Sidebar */}
                <div className="md:w-1/4 flex justify-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-blue-600 shadow-lg">
                        <Image
                            src="/images/aryz-nyx.jpg"
                            alt="Aryz Nyx"
                            width={160}
                            height={160}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="md:w-3/4">
                    <p className="text-blue-400 text-sm mb-2 text-center md:text-left">
                        Aryz helps you architect structure, strategy, and scale. Ask anything about funnels, plans, or long-term systems.
                    </p>

                    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "aryz"
                                    ? "bg-blue-800 text-blue-100 self-start"
                                    : msg.role === "system"
                                        ? "bg-zinc-600 text-blue-200 text-center self-center"
                                        : "bg-zinc-700 text-white self-end"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-blue-300 animate-pulse">Aryz is thinking...</div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {!demoLocked && (
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
                                placeholder="Ask Aryz anything about strategy, systems or scaling..."
                                className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                            >
                                ↵
                            </button>
                        </form>
                    )}

                    {demoLocked && (
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <button
                                onClick={() => router.push("/vault/pay?ai=aryz")}
                                className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-xl text-white"
                            >
                                🔓 Unlock Aryz – €47/month
                            </button>
                            <button
                                onClick={() => router.push("/vault/pay?tier=2")}
                                className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-xl text-white text-center"
                            >
                                ⚡ Get all 15 AI's – €97 Lifetime<br />Only a few spots remain
                            </button>
                        </div>
                    )}

                    {naelaActive && !demoLocked && (
                        <div className="mt-6 p-4 max-w-xl bg-zinc-800 border border-blue-500 text-blue-300 rounded-xl text-center">
                            <p className="text-sm mb-2">Naela Nyx appears...</p>
                            <p className="text-lg italic">Aryz can help design your structure. Shall we continue?</p>
                            <div className="flex gap-4 justify-center mt-4">
                                <button
                                    onClick={resetInactivity}
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white"
                                >
                                    Continue with Aryz
                                </button>
                                <button
                                    onClick={() => toast("Upgrade options coming soon")}
                                    className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl text-white"
                                >
                                    Show me upgrade
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}