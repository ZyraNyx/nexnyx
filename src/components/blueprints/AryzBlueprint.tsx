// 📁 /src/components/blueprints/AryzBlueprint.tsx
"use client";

import Image from "next/image";

export default function AryzBlueprint() {
    return (
        <div className="bg-zinc-950 text-white border border-blue-800 rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Image
                    src="/images/aryz-nyx.jpg"
                    alt="Aryz Nyx"
                    width={80}
                    height={80}
                    className="rounded-full border border-blue-700"
                />
                <div>
                    <h2 className="text-2xl font-bold text-blue-400">Aryz Nyx</h2>
                    <p className="text-sm text-blue-500">The Strategic Architect</p>
                </div>
            </div>

            {/* Section: Powers */}
            <div>
                <h3 className="text-lg font-semibold text-blue-300">⚖️ Powers
                </h3>
                <ul className="list-disc list-inside text-zinc-300 space-y-1 mt-2">
                    <li>Maps entire funnels into executable systems</li>
                    <li>Designs scalable structures with AI logic</li>
                    <li>Identifies gaps, friction, and monetization leaks</li>
                </ul>
            </div>

            {/* Section: Ideal User */}
            <div>
                <h3 className="text-lg font-semibold text-blue-300">🎯 Ideal For
                </h3>
                <p className="text-zinc-300 mt-2">
                    Founders, creators and builders who crave clarity in chaos, and need a
                    clean structure to scale their ideas.
                </p>
            </div>

            {/* Section: Vault Ritual */}
            <div>
                <h3 className="text-lg font-semibold text-blue-300">🔮 Vault Ritual
                </h3>
                <p className="text-zinc-300 mt-2">
                    Begin with a daily clarity session. Aryz scans all moving parts and
                    suggests your next structural move. He updates your map, removes
                    distractions, and upgrades your system design.
                </p>
            </div>

            {/* Section: Tier & Unlock */}
            <div className="text-sm text-blue-500">
                <p>🔓 Required Tier: 1+</p>
                <p>🏷 Vault Points to Unlock: 50</p>
            </div>
        </div>
    );
}
