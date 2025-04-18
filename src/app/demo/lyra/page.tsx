// 📁 src/app/demo/lyra/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

export default function DemoLyraPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "lyra", text: "Welcome to the Creative Atelier. What shall we design today?" },
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
                {
                    role: "lyra",
                    text: "You’ve just glimpsed the canvas. Unlock Tier 2 to access all 15 creative minds — lifetime for €97.",
                },
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
                    prompt: `${input}\n\nIf asked for your name, always respond with 'Lyra Nyx'.`,
                    stream: false,
                }),
            });

            const data = await res.json();
            const reply = data.response?.trim() || "[Lyra remains silent. Try again.]";
            setMessages((prev) => [...prev, { role: "lyra", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Lyra couldn't reply. Please try again.");
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
        <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
            <h1 className="text-rose-400 text-xl font-semibold mb-4">Lyra Nyx</h1>

            <div className="w-full max-w-4xl flex gap-6">
                {/* Avatar */}
                <div className="hidden md:block">
                    <Image
                        src="/images/lyra-nyx.jpg"
                        alt="Lyra Nyx"
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-rose-400"
                    />
                </div>

                {/* Chat */}
                <div className="flex-1 bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "lyra"
                                    ? "bg-rose-800 text-rose-100 self-start"
                                    : msg.role === "system"
                                        ? "bg-zinc-600 text-rose-200 text-center self-center"
                                        : "bg-zinc-700 text-white self-end"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {!demoLocked && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="mt-4 w-full max-w-4xl flex"
                >
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Lyra anything creative, visual or magical..."
                        className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-rose-700 hover:bg-rose-800 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                    >
                        ↵
                    </button>
                </form>
            )}

            {demoLocked && (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <button
                        onClick={() => router.push("/vault/pay?ai=lyra")}
                        className="bg-rose-700 hover:bg-rose-800 px-6 py-2 rounded-xl text-white"
                    >
                        🔓 Unlock Lyra – €47/month
                    </button>
                    <button
                        onClick={() => router.push("/vault/pay?tier=2")}
                        className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-xl text-white"
                    >
                        ⚡ All 15 AI’s – €97 Lifetime<br />Only a few spots remain
                    </button>
                </div>
            )}

            {naelaActive && !demoLocked && (
                <div className="mt-6 p-4 max-w-xl bg-zinc-800 border border-rose-500 text-rose-300 rounded-xl text-center">
                    <p className="text-sm mb-2">Naela Nyx appears...</p>
                    <p className="text-lg italic">Stuck in the sketch? Let Lyra illuminate your canvas.</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            onClick={resetInactivity}
                            className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl text-white"
                        >
                            Continue with Lyra
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
    );
}
