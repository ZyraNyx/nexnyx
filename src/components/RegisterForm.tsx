"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState<string | null>(null);
    const [referrerId, setReferrerId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const t = searchParams.get("token");
        if (t) setToken(t);

        const ref = searchParams.get("ref");
        if (ref) {
            localStorage.setItem("referrerId", ref);
            setReferrerId(Number(ref));
        } else {
            const storedRef = localStorage.getItem("referrerId");
            if (storedRef) setReferrerId(Number(storedRef));
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5001/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, name, username, password, referrerId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                setLoading(false);
                return;
            }

            router.push("/vault");
        } catch (err: any) {
            setError("Server error");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
            <h1 className="text-2xl font-bold">Register to Enter the Vault</h1>

            {error && <div className="bg-red-800 text-white text-sm p-2 rounded">{error}</div>}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                required
            />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                required
            />

            <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
            >
                {loading ? "Registering..." : "Enter the Vault"}
            </button>
        </form>
    );
}
