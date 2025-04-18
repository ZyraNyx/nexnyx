'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
    aiName: string // bijv. 'nova'
    cost: number // bijv. 50
    isUnlocked: boolean
    token: string
    onUnlock?: () => void // optionele callback na unlock
}

export default function VaultUpgradeButton({ aiName, cost, isUnlocked, token, onUnlock }: Props) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleUnlock = async () => {
        if (!token) {
            toast.error('You must be logged in')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('http://localhost:5001/api/user/unlock-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ aiName, cost }),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success(`${aiName} unlocked!`)
                if (onUnlock) onUnlock() // optioneel: VaultPoints herladen
                router.refresh() // vernieuw de pagina of component
            } else {
                toast.error(data.error || 'Something went wrong')
            }
        } catch (err) {
            toast.error('Failed to unlock. Try again later.')
        }

        setLoading(false)
    }

    if (isUnlocked) {
        return <span className="text-green-500 font-medium">✅ Unlocked</span>
    }

    return (
        <button
            onClick={handleUnlock}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm shadow-md hover:scale-105 transition-all"
        >
            {loading ? 'Unlocking...' : `Unlock ${aiName} for ${cost} VP`}
        </button>
    )
}
