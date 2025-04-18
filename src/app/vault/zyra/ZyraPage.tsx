"use client";

import { useState, useRef, useEffect } from "react";

export default function ZyraPage() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const responseRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse(""); // reset output

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_URL}/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: input,
                    stream: false,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.response) {
                throw new Error("No response from Ollama.");
            }

            setResponse(data.response);
        } catch (err) {
            console.error("Zyra error:", err);
            setResponse("⚠️ Zyra couldn't reply. Please try again.");
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

    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [response]);

    return (
        <div className="p-8 text-white bg-black min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-purple-400">Zyra Nyx</h1>

            <textarea
                className="w-full p-2 rounded bg-zinc-800 text-white"
                placeholder="Talk to Zyra..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
            />

            <button
                onClick={handleSend}
                disabled={loading}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Zyra is thinking..." : "Ask Zyra"}
            </button>

            {response && (
                <div
                    ref={responseRef}
                    className="mt-6 p-4 rounded bg-zinc-900 border border-zinc-700 whitespace-pre-wrap"
                >
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}
