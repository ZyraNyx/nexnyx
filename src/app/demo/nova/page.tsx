// 📁 src/app/demo/nova/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DemoNovaPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "nova",
            text: "Welcome. Let’s bring clarity to your numbers.",
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
                { role: "nova", text: "You've reached the limit for the demo. Ready to unlock Nova or enter the full Vault?" },
                { role: "system", text: "[🔓] Choose your path below 👇" },
            ]);
            setDemoLocked(true);
            localStorage.setItem("demoCompleted", "true");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: `${input}\nIf user asks for your name, respond with: You can call me Nova Nyx.`,
                    stream: false,
                }),
            });

            const data = await res.json();
            const reply = data.response?.trim() || "[Nova is calculating. Try again.]";
            setMessages((prev) => [...prev, { role: "nova", text: reply }]);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Nova couldn't reply. Please try again.");
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
            <div className="flex items-center gap-4 mb-4">
                <Image
                    src="/images/nova-nyx.jpg"
                    alt="Nova Nyx"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-blue-400 shadow-md"
                />
                <h1 className="text-blue-300 text-2xl font-semibold">Nova Nyx</h1>
            </div>

            <p className="text-blue-200 mb-4 text-center max-w-xl">
                Nova is your financial AI. Ask her anything about cash flow, strategy, pricing or forecasts.
            </p>

            <div className="w-full max-w-2xl bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "nova"
                                ? "bg-blue-900 text-blue-100 self-start"
                                : msg.role === "system"
                                    ? "bg-zinc-600 text-blue-200 text-center self-center"
                                    : "bg-zinc-700 text-white self-end"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
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
                        placeholder="Ask Nova anything about finance..."
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
                        onClick={() => router.push("/vault/pay?ai=nova")}
                        className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-xl text-white"
                    >
                        🔓 Unlock Nova – €47/month
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
                <div className="mt-6 p-4 max-w-xl bg-zinc-800 border border-blue-500 text-blue-300 rounded-xl text-center">
                    <div className="flex justify-center mb-2">
                        <Image
                            src="/images/naela-nyx.jpg"
                            alt="Naela Nyx"
                            width={48}
                            height={48}
                            className="rounded-full border border-blue-400"
                        />
                    </div>
                    <p className="text-sm mb-2">Naela Nyx appears...</p>
                    <p className="text-lg italic">Need help forecasting? Nova is ready to assist.</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            onClick={resetInactivity}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white"
                        >
                            Continue with Nova
                        </button>
                        <button
                            onClick={() => router.push("/vault/pay")}
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
