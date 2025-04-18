
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("PROMPT ontvangen:", prompt);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
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
      console.error("❌ Fout bij OpenRouter response:", error);
      return NextResponse.json({ error: 'Failed to reach OpenRouter', detail: error }, { status: 500 });
    }

    const data = await response.json();
    console.log("✅ Antwoord ontvangen:", data);
    const message = data.choices?.[0]?.message?.content || 'Zyra has no response right now.';

    return NextResponse.json({ response: message });
  } catch (err) {
    console.error("❌ Exception bij AI-call:", err);
    return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
  }
}
