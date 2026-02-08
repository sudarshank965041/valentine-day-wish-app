import { useState } from "react";

interface LetterPageProps {
  onClose: () => void;
}

const LOVE_LETTER = `🌹 You're My Best Friend...

You're the first person I want to tell my good news to. You're the one I turn to when the world feels heavy. You laugh at my terrible jokes (even when they're really bad 😄). You know my flaws, my weird habits, my fears — and yet, you choose to stay. Every. Single. Day.

That's not just love — that's magic.

We've shared so many beautiful chapters together — late-night talks, silly fights, spontaneous adventures, comfortable silences, and a million little moments that mean everything to me.

But today, on this Valentine's Day, I want to ask you something I've been carrying in my heart for a while...

Will you be mine — not just today, not just on Valentine's Day — but forever? Will you let me be the one who loves you endlessly, the one who holds your hand through every storm, and the one who makes you smile every single morning?

Will you marry me? 💍❤️
You've already made my life the most beautiful story. Now, I just want to make sure it never ends.
`;

export function LetterPage({ onClose }: LetterPageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrolled(target.scrollLeft > 0 || target.scrollTop > 0);
  };

  const createFloatingHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    
    setHearts(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-none pointer-events-none"
      }`}
      onClick={handleClose}
    >
      {/* Letter Envelope/Card */}
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border-2 border-pink-200/50 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={createFloatingHeart}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 text-4xl opacity-30 pointer-events-none">✨</div>
        <div className="absolute bottom-0 right-0 w-20 h-20 text-4xl opacity-30 pointer-events-none">✨</div>

        {/* Decorative header with gradient and animation */}
        <div className="relative h-24 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 flex items-center justify-between px-6 sm:px-8 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white relative z-10 flex items-center gap-2">
            <span className="text-3xl sm:text-4xl animate-bounce">💌</span>
            <span>Love Letter</span>
            <span className="text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>💕</span>
          </h2>
          <button
            onClick={handleClose}
            className="relative z-10 text-white hover:text-rose-100 transition-all duration-200 text-2xl leading-none hover:scale-125 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Letter Content with special styling */}
        <div
          className="h-96 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 relative"
          onScroll={handleScroll}
        >
          {/* Floating hearts on scroll */}
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="fixed pointer-events-none animate-float-up text-2xl"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                zIndex: 40,
              }}
            >
              ❤️
            </div>
          ))}

          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-serif text-base sm:text-lg space-y-4">
            {LOVE_LETTER}
          </div>
        </div>

        {/* Scroll hint with animation */}
        {!scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-pink-100 via-pink-100/50 to-transparent flex items-end justify-center pb-3">
            <span className="text-sm text-pink-500 font-semibold animate-bounce flex items-center gap-1">
              <span>💝</span>
              <span>Scroll to read more</span>
              <span>💝</span>
            </span>
          </div>
        )}

        {/* Decorative footer */}
        <div className="relative bg-gradient-to-r from-pink-100 to-rose-100 px-6 sm:px-8 py-4 sm:py-5 border-t-2 border-pink-200/50 flex justify-between items-center">
          <span className="text-2xl animate-bounce">💕</span>
          <button
            onClick={handleClose}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 font-bold text-sm sm:text-base shadow-lg hover:from-rose-600 hover:to-pink-600"
          >
            Close ❤️
          </button>
          <span className="text-2xl animate-bounce" style={{ animationDelay: "0.2s" }}>💕</span>
        </div>
      </div>
    </div>
  );
}
