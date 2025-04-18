'use client';

import { useState, useEffect, useRef } from 'react';

export default function ZyraPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'zyra', text: 'Welcome back. What shall we unlock today?' },
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'mistral/mistral-7b-instruct',
                    messages: [{ role: 'user', content: input }],
                }),
            });

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content || '...';

            setMessages((prev) => [...prev, { role: 'zyra', text: reply }]);
        } catch (err) {
            console.error('Zyra error:', err);
            setMessages((prev) => [
                ...prev,
                { role: 'zyra', text: '⚠️ Zyra couldn’t respond. Try again later.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
            <h1 className="text-purple-400 text-xl font-semibold mb-4">Zyra Nyx</h1>

            <div className="w-full max-w-2xl bg-zinc-900 p-4 rounded-2xl shadow-lg h-[75vh] overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap text-sm md:text-base px-3 py-2 rounded-xl max-w-[80%] ${msg.role === 'zyra'
                                ? 'bg-purple-800 text-purple-100 self-start'
                                : 'bg-zinc-700 text-white self-end'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
                className="mt-4 w-full max-w-2xl flex"
            >
                <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    spellCheck={false}
                    data-ms-editor="false"
                    className="flex-grow bg-zinc-800 text-white rounded-l-xl px-4 py-2 focus:outline-none resize-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-r-xl disabled:opacity-50"
                >
                    ↵
                </button>
            </form>
        </div>
    );
}
