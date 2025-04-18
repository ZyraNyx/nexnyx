"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(WrappedComponent: any) {
    return function AuthProtected(props: any) {
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem("nexnyx_token");

            if (!token) {
                router.push("/login");
                return;
            }

            // Je zou hier optioneel nog kunnen valideren via /api/user/me
            setIsAuthorized(true);
        }, [router]);

        if (!isAuthorized) {
            return (
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    <p>Checking Vault Authorization...</p>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
}
