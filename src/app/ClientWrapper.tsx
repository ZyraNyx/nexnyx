"use client";

import { useEffect } from "react";

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");

        if (ref) {
            localStorage.setItem("referrerId", ref);
        }
    }, []);

    return <>{children}</>;
}
