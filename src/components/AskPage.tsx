import { useState, useCallback, useEffect } from "react";

interface AskPageProps {
  onAccept: () => void;
}

const NO_TEXTS = [
  "No 😢",
  "Are you sure? 🥺",
  "Really sure? 😭",
  "Think again! 💔",
  "Please? 🥹",
  "Don't do this! 😿",
  "I'll be sad... 😞",
  "You're breaking my heart! 💔",
  "Give me a chance! 😩",
  "Pretty please? 🙏",
  "I'll cry... 😭",
  "Last chance! 🥺",
];

const YES_TEXTS = [
  "Yes! 💕",
  "YES!! 😍",
  "Absolutely! 💖",
  "Of course! 🥰",
  "100% Yes! 💗",
];

const SUBTITLES = [
  "I've been waiting to ask you this... 💭",
  "Come on, you know the right answer! 😉",
  "The No button is getting scared of you! 😂",
  "Hint: the correct answer is the BIG button! 👆",
  "The No button can run, but it can't hide! 😄",
];

const THOUGHT_BUBBLES = [
  "Wait what? 😳",
  "Noooo! 😢",
  "Pwease?? 🥺",
  "I won't give up! 💪",
];

export function AskPage({ onAccept }: AskPageProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [showEntrance, setShowEntrance] = useState(false);
  const [bearMood, setBearMood] = useState<"happy" | "worried" | "sad">("happy");

  useEffect(() => {
    const t = setTimeout(() => setShowEntrance(true), 100);
    return () => clearTimeout(t);
  }, []);

  const moveNoButton = useCallback(() => {
    // Get viewport dimensions and compute safe random position
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnW = 160;
    const btnH = 50;
    const pad = 20;

    const maxX = vw - btnW - pad;
    const maxY = vh - btnH - pad;

    const newX = Math.random() * (maxX - pad) + pad;
    const newY = Math.random() * (maxY - pad) + pad;

    setNoPos({ x: newX, y: newY });
    setNoClickCount((prev) => {
      const next = prev + 1;
      if (next >= 4) setBearMood("sad");
      else if (next >= 2) setBearMood("worried");
      return next;
    });
  }, []);

  const yesScale = 1 + noClickCount * 0.12;
  const yesFontSize = Math.min(1.1 + noClickCount * 0.1, 2);
  const currentNoText = NO_TEXTS[Math.min(noClickCount, NO_TEXTS.length - 1)];
  const currentYesText = YES_TEXTS[Math.min(noClickCount, YES_TEXTS.length - 1)];
  const subtitle = SUBTITLES[Math.min(noClickCount, SUBTITLES.length - 1)];
  const thoughtBubble = THOUGHT_BUBBLES[Math.min(noClickCount - 1, THOUGHT_BUBBLES.length - 1)];

  const noOpacity = Math.max(1 - noClickCount * 0.07, 0.35);
  const noFontSize = Math.max(1 - noClickCount * 0.04, 0.65);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-12 m-5 relative">
      {/* Cute Emoji Character */}
      <div
        className={`transition-all duration-700 ease-out ${
          showEntrance
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-50"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="text-[80px] sm:text-[100px] md:text-[120px] select-none animate-bounce-slow leading-none">
            {bearMood === "happy" && "🥰"}
            {bearMood === "worried" && "🥺"}
            {bearMood === "sad" && "😭"}
          </div>

          {/* Thought bubble */}
          {noClickCount > 0 && (
            <div className="absolute -top-10 -right-8 sm:-top-12 sm:-right-20 md:-top-14 md:-right-28 bg-white rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border-2 border-pink-200 animate-fade-in z-20">
              <p className="text-xs sm:text-sm md:text-base text-pink-600 font-semibold whitespace-nowrap">
                {thoughtBubble}
              </p>
              <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-white border-b-2 border-r-2 border-pink-200 rotate-45" />
            </div>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-6 sm:h-8" />

      {/* Title */}
      <h1
        className={`text-center leading-tight transition-all duration-1000 delay-200 ${
          showEntrance
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-500">
          Will you be my
        </span>
        <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-red-500 mt-1">
          Valentine? 💝
        </span>
      </h1>

      {/* Spacer */}
      <div className="h-4 sm:h-5" />

      {/* Subtitle */}
      <p
        key={noClickCount}
        className={`text-pink-400 text-base sm:text-lg md:text-xl text-center max-w-md transition-all duration-1000 delay-400 ${
          showEntrance
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {subtitle}
      </p>

      {/* Spacer */}
      <div className="h-8 sm:h-10" />

      {/* Buttons */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 transition-all duration-1000 delay-500 ${
          showEntrance
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* YES Button */}
        <button
          onClick={onAccept}
          className="relative rounded-full font-bold text-white 
            bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 
            shadow-xl shadow-pink-400/40 
            hover:shadow-2xl hover:shadow-pink-500/50 
            active:scale-95 
            transition-all duration-300 ease-out
            hover:brightness-110
            cursor-pointer
            z-10"
          style={{
            transform: `scale(${yesScale})`,
            fontSize: `${yesFontSize}rem`,
            padding: `${0.9 + noClickCount * 0.05}rem ${2.2 + noClickCount * 0.15}rem`,
          }}
        >
          {currentYesText}
        </button>

        {/* NO Button — inline (before first hover) */}
        {noPos === null && (
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onClick={moveNoButton}
            className="px-8 py-3 rounded-full font-semibold text-gray-500 
              bg-white border-2 border-gray-200
              shadow-md cursor-pointer
              transition-all duration-300 ease-out
              hover:border-gray-300
              select-none z-10"
          >
            No 😢
          </button>
        )}
      </div>

      {/* NO Button — floating after first move */}
      {noPos !== null && (
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          onClick={moveNoButton}
          className="fixed rounded-full font-semibold text-gray-500 
            bg-white border-2 border-gray-200
            shadow-md cursor-pointer
            select-none z-50"
          style={{
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), font-size 0.3s, opacity 0.3s",
            fontSize: `${noFontSize}rem`,
            opacity: noOpacity,
            padding: "0.65rem 1.8rem",
          }}
        >
          {currentNoText}
        </button>
      )}

      {/* Fun counter */}
      {noClickCount > 0 && (
        <div className="mt-10 sm:mt-12 animate-fade-in text-center">
          <p className="text-pink-400/80 text-sm">
            Times you tried to say no:{" "}
            <span className="font-bold text-red-400">{noClickCount}</span>
          </p>
          <div className="flex justify-center mt-2 gap-1 flex-wrap">
            {Array.from({ length: Math.min(noClickCount, 12) }).map((_, i) => (
              <span
                key={i}
                className="text-sm animate-bounce-slow inline-block"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                💔
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decorative bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-30">
        {["🌹", "💕", "💗", "💕", "🌹"].map((e, i) => (
          <span
            key={i}
            className="text-xl sm:text-2xl animate-pulse"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
