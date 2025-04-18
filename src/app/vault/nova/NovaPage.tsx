// 📁 /src/app/vault/nova/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import DemoBanner from "@/components/DemoBanner";

export default function NovaPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
            <DemoBanner />

            {/* VaultCard + Avatar */}
            <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl p-6 shadow-xl border border-green-700 mb-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src="/images/nova-nyx.jpg"
                        alt="Nova Nyx"
                        width={200}
                        height={200}
                        className="rounded-2xl border border-green-600"
                    />

                    <div className="flex-1 space-y-2">
                        <h1 className="text-3xl font-bold text-green-400">Nova Nyx</h1>
                        <p className="text-zinc-300">
                            Finance & Forecasting AI. Nova doesn’t manage money. She multiplies it.
                        </p>
                        <p className="text-sm text-green-500">Tier Access Required: 1+</p>
                    </div>
                </div>
            </div>

            {/* Intro interactie */}
            <div className="w-full max-w-xl bg-zinc-800 p-6 rounded-xl shadow-md space-y-4">
                <p className="text-xl">💰 Nova: I see your numbers. They’re speaking to me.</p>
                <p>
                    Let’s decode your cashflow and reshape your financial future. I’ll forecast your path.
                </p>
                <Link
                    href="/vault/nova/forecast"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
                >
                    📈 Start Financial Forecast
                </Link>
            </div>
        </div>
    );
}
