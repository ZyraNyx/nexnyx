"use client";

import { useState } from "react";

export default function VaultUpgrade() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:5001/api/user/vault-points", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    points: -100,
                    reason: "Upgrade to Tier 2",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage("❌ Not enough Vault Points to upgrade.");
            } else {
                setMessage("✅ Upgrade successful! You’re now Tier 2.");
            }
        } catch (err) {
            setMessage("⚠️ Upgrade failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-800 p-4 rounded-xl border border-purple-700 text-center mt-6 space-y-4">
            <p className="text-purple-300 font-semibold">🚀 Upgrade with Vault Points</p>
            <button
                onClick={handleUpgrade}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Upgrading..." : "Upgrade to Tier 2 (–100 VP)"}
            </button>
            {message && <p className="text-sm text-zinc-300">{message}</p>}
        </div>
    );
}
