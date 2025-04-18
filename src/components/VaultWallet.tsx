"use client";

import { useEffect, useState } from "react";

export default function VaultWallet() {
    const [points, setPoints] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchPoints = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setPoints(data.vaultPoints);
            } catch (err) {
                console.error("Failed to fetch Vault Points");
            }
        };

        fetchPoints();
    }, []);

    if (points === null) return null;

    return (
        <div className="fixed top-4 right-4 bg-purple-900 text-white px-4 py-2 rounded-xl shadow-lg border border-purple-600 z-50">
            💎 Vault Points: <strong>{points}</strong>
        </div>
    );
}
