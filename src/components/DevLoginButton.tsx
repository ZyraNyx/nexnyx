"use client";

import { useRouter } from "next/navigation";

export default function DevLoginButton() {
    const router = useRouter();

    const handleDevLogin = async () => {
        const res = await fetch("http://localhost:5001/api/dev-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "dev@nexnyx.com",
                password: "letmein",
            }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("nexnyx_token", data.token);
            alert("✅ Logged in as Dev!");
            router.push("/vault/zyra"); // Of je startpagina
        } else {
            alert("❌ Dev login failed.");
        }
    };

    return (
        <button
            onClick={handleDevLogin}
            className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
            🚀 Dev Login
        </button>
    );
}
