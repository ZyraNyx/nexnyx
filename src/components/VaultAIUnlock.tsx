'use client'

import { useEffect, useState } from 'react'
import VaultUpgradeButton from './VaultUpgradeButton'

export default function VaultUpgrade({ vaultPoints }: { vaultPoints: number }) {
    const [unlocked, setUnlocked] = useState<string[]>([])
    const [token, setToken] = useState('')
    const [currentVP, setCurrentVP] = useState(vaultPoints)

    useEffect(() => {
        const t = localStorage.getItem('token')
        if (t) setToken(t)

        const fetchUnlocked = async () => {
            const res = await fetch('http://localhost:5001/api/user/unlocked-ais', {
                headers: { Authorization: `Bearer ${t}` },
            })
            const data = await res.json()
            setUnlocked(data.unlocked || [])
        }

        fetchUnlocked()
    }, [])

    const refresh = async () => {
        const res = await fetch('http://localhost:5001/api/user/vault-points', {
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setCurrentVP(data.vaultPoints || 0)

        const unlockedRes = await fetch('http://localhost:5001/api/user/unlocked-ais', {
            headers: { Authorization: `Bearer ${token}` },
        })
        const unlockedData = await unlockedRes.json()
        setUnlocked(unlockedData.unlocked || [])
    }

    const aiList = [
        { name: 'zyra', cost: 50 },
        { name: 'nova', cost: 50 },
        { name: 'aryz', cost: 50 },
        { name: 'lyra', cost: 50 },
        { name: 'oryn', cost: 50 },
        // Voeg je AI’s hier toe
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-300">🔓 Unlock AIs</h2>
            <p className="text-sm text-zinc-400">Spend your Vault Points to unlock powerful AI allies.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiList.map((ai) => (
                    <div key={ai.name} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 space-y-2">
                        <h3 className="text-lg font-bold capitalize text-white">{ai.name}</h3>
                        <VaultUpgradeButton
                            aiName={ai.name}
                            cost={ai.cost}
                            isUnlocked={unlocked.includes(ai.name)}
                            token={token}
                            onUnlock={refresh}
                        />
                    </div>
                ))}
            </div>

            <div className="text-sm text-zinc-400 mt-4">
                Current VP: <span className="text-white font-bold">{currentVP}</span>
            </div>
        </div>
    )
}
