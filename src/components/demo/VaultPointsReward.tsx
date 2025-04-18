"use client";

import { useEffect, useState } from "react";

export default function VaultPointsReward({ points = 25 }: { points?: number }) {
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        // Simuleer dat gebruiker is ingelogd — later koppel je dit aan echte auth
        const isLoggedIn = true;

        if (isLoggedIn) {
            setTimeout(() => setShow(true), 1000);
        }
    }, []);

    if (!show) return null;

    return (
        <div className="bg-zinc-900 text-white border border-purple-700 rounded-xl p-4 mt-6 space-y-3 shadow-lg">
            <p className="text-lg font-semibold text-green-400">
                🎉 You just earned <span className="text-white">{points} Vault Points</span>!
            </p>

            <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-sm text-purple-400 hover:text-purple-300 underline"
            >
                What can I do with Vault Points?
            </button>

            {showInfo && (
                <div className="text-sm text-zinc-300 space-y-2 mt-3">
                    <p>🔓 Unlock new AI entities like Nova, Aryz and Lyra</p>
                    <p>💎 Get exclusive Vault Drops, hidden tools & bonus rituals</p>
                    <p>🏆 Rise on the leaderboard and gain early access to upgrades</p>
                    <p>💰 Use them to reduce or eliminate your subscription cost</p>
                    <p className="text-red-400 mt-2">⚠️ If you leave now, these points will expire in 24h.</p>
                </div>
            )}
        </div>
    );
}
