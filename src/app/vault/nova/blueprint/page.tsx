"use client";

import Image from "next/image";
import Link from "next/link";

export default function NovaBlueprintPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
            {/* Nova VaultCard */}
            <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl p-6 shadow-xl border border-blue-700 mb-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src="/images/nova-nyx.jpg"
                        alt="Nova Nyx"
                        width={200}
                        height={200}
                        className="rounded-2xl border border-blue-500"
                    />
                    <div className="flex-1 space-y-2">
                        <h1 className="text-3xl font-bold text-blue-400">Nova Nyx</h1>
                        <p className="text-zinc-300">
                            Finance Architect. Predictive Cashflow. Silent Profit Strategist.
                            She doesn’t manage money. She multiplies it.
                        </p>
                        <p className="text-sm text-blue-500">Tier Access Required: 1+</p>
                    </div>
                </div>
            </div>

            {/* Blueprint Message */}
            <div className="w-full max-w-xl bg-zinc-800 p-6 rounded-xl shadow-md space-y-4">
                <p className="text-xl">💡 Nova: This is just a glimpse of what your future numbers could look like.</p>
                <p>
                    Once you’re inside, I’ll generate a full real-time cashflow forecast based on your behavior and inputs.
                </p>
                <Link
                    href="/vault/enter"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
                >
                    🔓 Enter the Full Vault
                </Link>
            </div>
        </div>
    );
}
