"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import VaultTierUpgrade from "@/components/VaultTierUpgrade"
import VaultAIUnlock from "@/components/VaultAIUnlock"

export default function VaultDashboard() {
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
            return
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await res.json()
                if (!res.ok) {
                    router.push("/login")
                } else {
                    setUser(data.user)
                }
            } catch (err) {
                router.push("/login")
            }
        }

        fetchUser()

        // ✅ Referral bonus notificatie
        const wasReferred = localStorage.getItem("referralBonus")
        if (wasReferred === "true") {
            alert("🎉 You've earned +50 Vault Points for referring a new Vault Member!")
            localStorage.removeItem("referralBonus")
        }
    }, [router])

    if (!user) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading your Vault...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* 🔐 HEADER */}
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl flex items-center gap-4">
                    <Image
                        src="/images/nexnyx-logo.png"
                        alt="Vault Logo"
                        width={60}
                        height={60}
                        className="rounded"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
                        <p className="text-purple-400 text-sm">Tier: {user.vaultAccess}</p>
                    </div>
                </div>

                {/* 🪙 VAULT POINTS */}
                <div className="bg-zinc-800 p-4 rounded-xl border border-purple-700 text-center">
                    <p className="text-lg font-semibold text-purple-300">🪙 Vault Points</p>
                    <p className="text-3xl font-bold text-white mt-1">{user.vaultPoints ?? 0} VP</p>
                    <p className="text-sm text-zinc-400 mt-2">
                        Earn points by joining the demo, inviting others, or upgrading your tier.
                    </p>
                </div>

                {/* 🚀 UPGRADE NAAR TIER 2 */}
                <VaultTierUpgrade />

                {/* 🔓 UNLOCK INDIVIDUELE AI’S */}
                <VaultAIUnlock />

                {/* 🔁 CTA ONDERAAN */}
                <div className="text-sm text-purple-500 text-center mt-6">
                    <p>
                        Don’t have full access yet?{" "}
                        <a
                            href="/demo"
                            className="underline text-purple-400 hover:text-purple-300 transition"
                        >
                            Join the demo to earn points
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
