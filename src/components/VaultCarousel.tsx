"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type VaultAI = {
    name: string;
    slug: string;
    tier: number;
    image: string;
};

const vaultAIs: VaultAI[] = [
    { name: "Zyra Nyx", slug: "zyra", tier: 1, image: "zyra-nb.png" },
    { name: "Nova Nyx", slug: "nova", tier: 1, image: "nova-nb.png" },
    { name: "Aryz Nyx", slug: "aryz", tier: 1, image: "aryz-nb.png" },
    { name: "Lyra Nyx", slug: "lyra", tier: 2, image: "lyra-nb.png" },
    { name: "Oryn Nyx", slug: "oryn", tier: 2, image: "oryn-nb.png" },
    { name: "Vexa Nyx", slug: "vexa", tier: 2, image: "vexa-nb.png" },
];

export default function VaultCarousel() {
    const router = useRouter();
    const [userTier, setUserTier] = useState(0);

    useEffect(() => {
        // Haal tier op uit localStorage of backend als gebruiker is ingelogd
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:5001/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const tier = data?.user?.vaultAccess?.replace("Tier ", "") ?? "0";
                setUserTier(parseInt(tier));
            });
    }, []);

    const handleClick = (slug: string, requiredTier: number) => {
        if (userTier >= requiredTier) {
            router.push(`/vault/${slug}`);
        } else {
            alert("🔒 This AI requires a higher Vault Tier to unlock.");
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {vaultAIs.map((ai) => (
                <div
                    key={ai.slug}
                    onClick={() => handleClick(ai.slug, ai.tier)}
                    className={`group relative bg-zinc-900 border border-zinc-700 rounded-2xl p-4 cursor-pointer hover:border-purple-500 hover:shadow-xl transition`}
                >
                    <Image
                        src={`/images/${ai.image}`}
                        alt={ai.name}
                        width={300}
                        height={300}
                        className="rounded-xl mx-auto group-hover:scale-105 transition"
                    />

                    {/* AI naam overlay */}
                    <div className="text-center mt-3 text-purple-400 font-semibold group-hover:text-purple-200 transition">
                        {ai.name}
                    </div>

                    {/* Lock Icon */}
                    {userTier < ai.tier && (
                        <div className="absolute top-2 right-2 text-sm bg-black/70 px-2 py-1 rounded text-red-500 font-bold">
                            Tier {ai.tier} 🔒
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
