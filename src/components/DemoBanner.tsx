"use client";

import { useSearchParams } from "next/navigation";

export default function DemoBanner() {
    const searchParams = useSearchParams();
    const isDemo = searchParams.get("demo") === "true";

    if (!isDemo) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-purple-900 text-white text-sm text-center py-2 shadow-md">
            ⚠️ You’re experiencing a <strong>demo preview</strong> of this AI. Some features are simulated.
        </div>
    );
}
