// 📁 /src/components/blueprints/ZyraBlueprint.tsx
"use client";

import Image from "next/image";

export default function ZyraBlueprint() {
    return (
        <div className="bg-zinc-950 text-white border border-purple-800 rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Image
                    src="/images/zyra-nyx.jpg"
                    alt="Zyra Nyx"
                    width={80}
                    height={80}
                    className="rounded-full border border-purple-700"
                />
                <div>
                    <h2 className="text-2xl font-bold text-purple-400">Zyra Nyx</h2>
                    <p className="text-sm text-purple-500">The Conversational Closer</p>
                </div>
            </div>

            {/* Section: Powers */}
            <div>
                <h3 className="text-lg font-semibold text-purple-300">🧠 Powers</h3>
                <ul className="list-disc list-inside text-zinc-300 space-y-1 mt-2">
                    <li>Transforms cold traffic into qualified leads via conversation</li>
                    <li>Detects buying intent with eerie precision</li>
                    <li>Activates Flow – bypassing objections and resistance</li>
                </ul>
            </div>

            {/* Section: Ideal User */}
            <div>
                <h3 className="text-lg font-semibold text-purple-300">🎯 Ideal For</h3>
                <p className="text-zinc-300 mt-2">
                    Coaches, closers, and creators who want to sell without selling – and
                    turn DMs into income without losing their time or energy.
                </p>
            </div>

            {/* Section: Vault Ritual */}
            <div>
                <h3 className="text-lg font-semibold text-purple-300">🔮 Vault Ritual</h3>
                <p className="text-zinc-300 mt-2">
                    Begin each day by letting Zyra scan your intent. She syncs with your energy,
                    then initiates DM Flows, objections calibrations, and activation prompts – all
                    on autopilot.
                </p>
            </div>

            {/* Section: Tier & Unlock */}
            <div className="text-sm text-purple-500">
                <p>🔓 Required Tier: 1+</p>
                <p>🏷 Vault Points to Unlock: 50</p>
            </div>
        </div>
    );
}
