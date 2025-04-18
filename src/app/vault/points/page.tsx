"use client";

import Link from "next/link";

export default function VaultPointsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl max-w-2xl w-full space-y-6 border border-purple-800">
                <h1 className="text-3xl font-bold text-purple-400">🪙 Vault Points</h1>
                <p className="text-zinc-300">
                    Vault Points (VP) are the internal currency of NexNyx. You earn them by taking action,
                    helping others, or unlocking deeper layers of your AI universe.
                </p>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-purple-300">💡 How to Earn</h2>
                    <ul className="list-disc list-inside text-zinc-300 space-y-1">
                        <li>+100 VP: Complete the Demo</li>
                        <li>+50 VP: Refer a new Vault Member</li>
                        <li>+25–100 VP: Upgrade to a new Tier</li>
                        <li>+10 VP: Share NexNyx on socials</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-purple-300">🎁 How to Use</h2>
                    <ul className="list-disc list-inside text-zinc-300 space-y-1">
                        <li>🔓 Unlock AI characters like Caeryn, Fynex, Selas</li>
                        <li>🚀 Boost your Tier Access</li>
                        <li>🎟 Access Vault Drops, Rituals & Upgrades</li>
                        <li>🌍 Priority access to global launches</li>
                    </ul>
                </div>

                <div className="text-sm text-purple-500 text-center pt-4">
                    <p>Want to earn more? <Link href="/demo" className="underline hover:text-purple-300">Start the Demo</Link> or <Link href="/vault" className="underline hover:text-purple-300">enter the Vault</Link>.</p>
                </div>
            </div>
        </div>
    );
}
