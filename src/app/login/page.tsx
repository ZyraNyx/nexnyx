"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DevLoginButton from "@/components/DevLoginButton";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            router.push("/vault");
        } catch (err) {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-purple-300">
                    Login to the Vault
                </h1>

                {error && (
                    <div className="bg-red-800 text-white text-sm p-2 rounded">
                        {error}
                    </div>
                )}

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
                    placeholder="Password"
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
                    {loading ? "Logging in..." : "Enter the Vault"}
                </button>

                <p className="text-sm text-purple-400 text-center mt-6">
                    Don’t have access yet?{" "}
                    <Link href="/demo" className="underline hover:text-purple-300">
                        Join the demo to earn Vault Points
                    </Link>
                </p>

                {/* Dev login knop */}
                <div className="pt-4 mt-6 border-t border-zinc-800 text-center">
                    <p className="text-xs text-zinc-400 mb-2">⚙️ Developer Access</p>
                    <DevLoginButton />
                </div>
            </form>
        </div>
    );
}
