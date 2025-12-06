import {useEffect, useState} from "react";
import confetti from "canvas-confetti";

export default function AddToCardAnimation() {
    const [showDonut, setShowDonut] = useState(false);

    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 200,
            ticks: 200,
            gravity: 0.5,
            shapes: ["circle"],
            colors: ["#fbbf24", "#fcd34d", "#fde68a", "#fef3c7", "#fff7ed"],
            scalar: 2,
            origin: {
                x: 0.92,
                y: 0.8,
            },
        });

        const showTimer = setTimeout(() => setShowDonut(true), 0);
        const hideTimer = setTimeout(() => setShowDonut(false), 3000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <>
            {showDonut && (
                <div className="pointer-events-none fixed bottom-24 right-10 text-5xl animate-rise select-none">
                    🍩
                </div>
            )}
        </>
    );
}
