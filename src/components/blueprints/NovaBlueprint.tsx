// 📁 /src/components/blueprints/NovaBlueprint.tsx
"use client";

import Image from "next/image";

export default function NovaBlueprint() {
    return (
        <div className="bg-zinc-950 text-white border border-emerald-800 rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Image
                    src="/images/nova-nyx.jpg"
                    alt="Nova Nyx"
                    width={80}
                    height={80}
                    className="rounded-full border border-emerald-700"
                />
                <div>
                    <h2 className="text-2xl font-bold text-emerald-400">Nova Nyx</h2>
                    <p className="text-sm text-emerald-500">The Financial Architect</p>
                </div>
            </div>

            {/* Section: Powers */}
            <div>
                <h3 className="text-lg font-semibold text-emerald-300">💰 Powers</h3>
                <ul className="list-disc list-inside text-zinc-300 space-y-1 mt-2">
                    <li>Visualizes your entire financial landscape at a glance</li>
                    <li>Predicts future cashflows and detects weak spots</li>
                    <li>Guides you to profitability with rituals and logic</li>
                </ul>
            </div>

            {/* Section: Ideal User */}
            <div>
                <h3 className="text-lg font-semibold text-emerald-300">🎯 Ideal For</h3>
                <p className="text-zinc-300 mt-2">
                    Founders, freelancers, and service providers who want clarity, control,
                    and cashflow – without drowning in spreadsheets or stress.
                </p>
            </div>

            {/* Section: Vault Ritual */}
            <div>
                <h3 className="text-lg font-semibold text-emerald-300">🔮 Vault Ritual</h3>
                <p className="text-zinc-300 mt-2">
                    Sync your revenue, expenses and goals with Nova each week. She creates
                    simplified forecasts, alerts you to leaks, and aligns your next moves
                    with sustainable profitability.
                </p>
            </div>

            {/* Section: Tier & Unlock */}
            <div className="text-sm text-emerald-500">
                <p>🔓 Required Tier: 1+</p>
                <p>🏷 Vault Points to Unlock: 50</p>
            </div>
        </div>
    );
}
