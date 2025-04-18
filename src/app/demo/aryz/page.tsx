// 📁 src/app/demo/aryz/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AryzDemoPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "aryz",
            text: "Welcome to the strategic chamber. What shall we architect today?",
        },
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
                    role: "aryz",
                    text: "We’ve just scratched the surface. Unlock Tier 2 for full strategic access — all 15 AIs for €97 lifetime.",
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
                    prompt: `${input}\nMy name is Aryz Nyx, your strategic architect.`,
                    stream: false,
                }),
            });

            const data = await res.json();
            const reply = data.response?.trim() || "[Aryz remains silent. Try again.]";
            setMessages((prev) => [...prev, { role: "aryz", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Aryz couldn't reply. Please try again.");
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
            <h1 className="text-xl font-semibold mb-2 text-green-300">Aryz Nyx</h1>
            <p className="text-sm text-zinc-400 mb-6 max-w-xl text-center">
                Aryz helps you build the unshakable foundations of your empire. Systems, scaling, and strategy are his domain.
            </p>

            <div className="flex items-start gap-6 w-full max-w-5xl">
                <Image
                    src="/images/aryz-nb.png"
                    alt="Aryz Nyx"
                    width={96}
                    height={96}
                    className="rounded-full border-2 border-green-400 shadow-md"
                />

                <div className="flex-1 bg-zinc-900 p-4 rounded-2xl shadow-lg h-[70vh] overflow-y-auto flex flex-col space-y-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "aryz"
                                    ? "bg-green-800 text-green-100 self-start"
                                    : msg.role === "system"
                                        ? "bg-zinc-600 text-green-200 text-center self-center"
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
                    className="mt-4 w-full max-w-2xl flex"
                >
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Aryz anything about structure, scale or systems."
                        className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                    >
                        ↵
                    </button>
                </form>
            )}

            {demoLocked && (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <button
                        onClick={() => router.push("/vault/pay?ai=aryz")}
                        className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded-xl text-white"
                    >
                        🔓 Unlock Aryz – €47/month
                    </button>
                    <button
                        onClick={() => router.push("/vault/pay?tier=2")}
                        className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-xl text-white"
                    >
                        ⚡ Get all 15 AI's – €97 Lifetime<br />Only a few spots remain
                    </button>
                </div>
            )}

            {naelaActive && !demoLocked && (
                <div className="mt-6 p-4 max-w-xl bg-zinc-800 border border-green-500 text-green-300 rounded-xl text-center">
                    <p className="text-sm mb-2">Naela Nyx appears...</p>
                    <p className="text-lg italic">Still planning? Aryz can clarify your foundation.</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            onClick={resetInactivity}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white"
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
    );
}
