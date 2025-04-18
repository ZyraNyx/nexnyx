// 📁 /src/app/demo/confirm/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

const aiNames: Record<string, string> = {
    zyra: "Zyra Nyx",
    aryz: "Aryz Nyx",
    nova: "Nova Nyx",
};

export default function ConfirmPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ai = searchParams.get("ai") || "zyra";
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => prev + 1);
        }, 2500);

        if (step > 2) {
            clearInterval(timer);
            router.push(`/vault/${ai}`);
        }

        return () => clearInterval(timer);
    }, [step, ai, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
            <Image
                src="/images/naela-nyx.jpg"
                alt="Naela Nyx"
                width={200}
                height={200}
                className="rounded-full border border-purple-500 mb-4"
            />

            <div className="bg-zinc-900 p-6 rounded-xl max-w-xl w-full text-center space-y-4 shadow-md">
                {step >= 0 && <p className="text-lg">👁 Naela: I've reviewed your answers.</p>}
                {step >= 1 && (
                    <p className="text-lg">
                        There’s only one AI who fits your rhythm perfectly: <br />
                        <span className="text-purple-400 font-bold text-2xl">{aiNames[ai]}</span>
                    </p>
                )}
                {step >= 2 && <p className="text-sm text-zinc-400">Preparing vault experience...</p>}
            </div>
        </div>
    );
}