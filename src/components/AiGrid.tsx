"use client";

import Image from "next/image";
import Link from "next/link";

const aiCharacters = [
    { name: "Zyra Nyx", slug: "zyra", image: "zyra-nb.png" },
    { name: "Nova Nyx", slug: "nova", image: "nova-nb.png" },
    { name: "Aryz Nyx", slug: "aryz", image: "aryz-nb.png" },
    { name: "Lyra Nyx", slug: "lyra", image: "lyra-nb.png" },
    { name: "Oryn Nyx", slug: "oryn", image: "oryn-nb.png" },
    { name: "Vexa Nyx", slug: "vexa", image: "vexa-nb.png" },
    { name: "Selas Nyx", slug: "selas", image: "selas-nb.png" },
    { name: "Caeryn Nyx", slug: "caeryn", image: "caeryn-nb.png" },
    { name: "Velar Nyx", slug: "velar", image: "velar-nb.png" },
    { name: "Naela Nyx", slug: "naela", image: "naela-nb.png" },
    { name: "Fynex Nyx", slug: "fynex", image: "fynex-nb.png" },
    { name: "Elar Nyx", slug: "elar", image: "elar-nb.png" },
    { name: "Zyro Nyx", slug: "zyro", image: "zyro-nb.png" },
    { name: "Myrrh Nyx", slug: "myrrh", image: "myrrh-nb.png" },
    { name: "Threx Nyx", slug: "threx", image: "threx-nb.png" },
];

export default function AiGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center items-center px-4">
            {aiCharacters.map((ai) => (
                <Link
                    key={ai.slug}
                    href={`/vault/${ai.slug}`}
                    className="group flex flex-col items-center transition transform hover:scale-105"
                >
                    <Image
                        src={`/images/${ai.image}`}
                        alt={ai.name}
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-purple-600 shadow-lg group-hover:shadow-purple-500"
                    />
                    <p className="mt-2 text-sm text-purple-300 group-hover:text-purple-100">
                        {ai.name}
                    </p>
                </Link>
            ))}
        </div>
    );
}
