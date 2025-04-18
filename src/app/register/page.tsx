"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Token ophalen uit URL
    useEffect(() => {
        const t = searchParams.get("token");
        if (t) setToken(t);
    }, [searchParams]);

    // ✅ Formulier submitten
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!token) {
            setError("Missing token in URL.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:5001/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, name, username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/vault");
        } catch (err: any) {
            setError(err.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg space-y-4"
            >
                <h1 className="text-2xl font-bold">Register to Enter the Vault</h1>

                {error && (
                    <div className="bg-red-700 text-sm text-white p-2 rounded">{error}</div>
                )}

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    required
                    autoComplete="off"
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    required
                    autoComplete="username"
                />

                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    required
                    autoComplete="new-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition"
                >
                    {loading ? "Registering..." : "Enter the Vault"}
                </button>
            </form>
        </div>
    );
}
