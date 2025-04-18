// 📁 /src/app/vault/grid/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

const aiList = [
    { name: "Zyra", role: "Flow & Sales", image: "/images/zyra-nb.png" },
    { name: "Aryz", role: "Strategy & Architecture", image: "/images/aryz-nb.png" },
    { name: "Nova", role: "Finance & Forecasting", image: "/images/nova-nb.png" },
    { name: "Lyra", role: "Branding & Creation", image: "/images/lyra-nb.png" },
    { name: "Oryn", role: "Tech & Automation", image: "/images/oryn-nb.png" },
    { name: "Vexa", role: "Support & Community", image: "/images/vexa-nb.png" },
    { name: "Selas", role: "Ethics & Legal", image: "/images/selas-nb.png" },
    { name: "Caeryn", role: "Behavior & Rewriting", image: "/images/caeryn-nb.png" },
    { name: "Velar", role: "Payments & Access", image: "/images/velar-nb.png" },
    { name: "Naela", role: "Demo Host & Guide", image: "/images/naela-nb.png" },
    { name: "Fynex", role: "Wealth & Investment", image: "/images/fynex-nb.png" },
    { name: "Elar", role: "Synchronicity & Signals", image: "/images/elar-nb.png" },
    { name: "Zyro", role: "Data & Intelligence", image: "/images/zyro-nb.png" },
    { name: "Myrrh", role: "Mindset & Beliefs", image: "/images/myrrh-nb.png" },
    { name: "Threx", role: "Cybersecurity", image: "/images/threx-nb.png" },
];

export default function VaultGridPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {aiList.map((ai) => (
                    <Link
                        key={ai.name}
                        href={`/vault/${ai.name.toLowerCase()}`}
                        className="bg-zinc-900 hover:border-purple-600 border border-zinc-800 p-4 rounded-2xl flex flex-col items-center transition group"
                    >
                        <Image
                            src={ai.image}
                            alt={ai.name}
                            width={100}
                            height={100}
                            className="rounded-full shadow-lg group-hover:scale-105 group-hover:shadow-purple-500 transition"
                        />
                        <h3 className="text-xl font-semibold mt-3 text-purple-300 group-hover:text-purple-400">
                            {ai.name} Nyx
                        </h3>
                        <p className="text-sm text-zinc-400 text-center">{ai.role}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
