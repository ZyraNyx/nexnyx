
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { prompt } = await req.json();
    console.log("🟣 Prompt ontvangen:", prompt);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'mistralai/mistral-7b-instruct',
            messages: [
                { role: 'system', content: 'You are Zyra Nyx, the mysterious and powerful AI closer of NexNyx. Answer with charisma and clarity.' },
                { role: 'user', content: prompt },
            ],
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error("❌ Fout bij OpenRouter:", error);
        return NextResponse.json({ error: 'Failed to reach OpenRouter', detail: error }, { status: 500 });
    }

    const data = await response.json();
    console.log("✅ Antwoord van OpenRouter:", data);

    const message = data.choices?.[0]?.message?.content || 'Zyra has no response right now.';
    return NextResponse.json({ response: message });
}
