"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // ⏳ Simuleer korte vertraging voor effect
            setTimeout(() => {
                // ✅ Flag zetten als referrer bonus actief moet worden
                localStorage.setItem("referralBonus", "true");

                // 🚪 Redirect naar Vault
                router.push("/vault");
            }, 2000);
        } else {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-purple-400">✅ Payment Confirmed</h1>
                <p className="text-zinc-300">You now have access to the Vault.</p>
                <p className="text-sm text-purple-500">Redirecting...</p>
            </div>
        </div>
    );
}
