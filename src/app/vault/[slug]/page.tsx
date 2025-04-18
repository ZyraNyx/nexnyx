import withAuth from "@/components/withAuth";
import ZyraPage from "./zyra/ZyraPage";
import NovaPage from "./nova/NovaPage";
import AryzPage from "./aryz/AryzPage";

// Voeg hier meer AI-pagina's toe indien nodig
// import LyraPage from "./lyra/LyraPage"; enz.

export default function DynamicVaultPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Routing per AI
    switch (slug) {
        case "zyra":
            return withAuth(ZyraPage)();
        case "nova":
            return withAuth(NovaPage)();
        case "aryz":
            return withAuth(AryzPage)();
        // Voeg meer AI’s toe als ze af zijn
        // case "lyra": return withAuth(LyraPage)();
        default:
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
                    <div className="bg-zinc-900 p-6 rounded-xl shadow-xl max-w-lg text-center">
                        <h1 className="text-2xl font-bold mb-2">🛑 AI Not Found</h1>
                        <p>The requested AI page <code className="text-purple-400">{slug}</code> doesn't exist yet.</p>
                    </div>
                </div>
            );
    }
}
