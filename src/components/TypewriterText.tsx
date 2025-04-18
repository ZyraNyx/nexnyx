"use client";

import { useEffect, useState } from "react";

type Props = {
    text: string;
    speed?: number;
    onDone?: () => void;
};

export default function TypewriterText({ text, speed = 40, onDone }: Props) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayed((prev) => prev + text[index]);
            index++;
            if (index >= text.length) {
                clearInterval(interval);
                if (onDone) onDone();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onDone]);

    return <p className="whitespace-pre-line">{displayed}</p>;
}
