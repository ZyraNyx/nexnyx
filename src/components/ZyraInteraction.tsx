"use client";
import { useState } from "react";

export default function ZyraInteraction() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleZyra = async () => {
        setLoading(true);
        const prompt = "You are Zyra Nyx, the AI closer of NexNyx. Greet the user with mystery and power.";

        try {
            const res = await fetch("http://157.180.78.0:3001/api/zyra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            setResponse(data.response);
        } catch (err) {
            setResponse("⚠️ AI server is not reachable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-purple-700 rounded-xl p-6 text-white space-y-4">
            <h2 className="text-xl font-bold text-purple-300">🧠 Zyra Nyx (Local AI)</h2>
            <button
                onClick={handleZyra}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white disabled:opacity-50"
            >
                {loading ? "Talking to Zyra..." : "Talk to Zyra"}
            </button>
            {response && <div className="text-zinc-300 whitespace-pre-wrap">{response}</div>}
        </div>
    );
}
