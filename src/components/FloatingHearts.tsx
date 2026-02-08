import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💕", "💗", "💖", "💝", "💘", "🌸", "✨"];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = [];
    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 12,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.3 + 0.1,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      });
    }
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up select-none"
          style={{
            left: `${heart.x}%`,
            bottom: "-40px",
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
