import { useState, useEffect } from "react";
import { LetterPage } from "./LetterPage";

const SWEET_MESSAGES = [
  "You just made me the happiest person in the world! 🌍💖",
  "I promise to love you more than pizza... and that's saying a lot! 🍕❤️",
  "You + Me = Forever ∞ 💕",
  "My heart does a little dance every time I think of you! 💃🕺",
  "You're not just my Valentine, you're my everything! 🌟",
  "If kisses were snowflakes, I'd send you a blizzard! ❄️💋",
  "You stole my heart, but I'll let you keep it! 🥰",
  "Together is my favorite place to be! 🏡💗",
];

interface Confetti {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  type: string;
}

const CONFETTI_EMOJIS = ["💖", "💕", "💗", "💝", "💘", "🌹", "✨", "🦋", "🎀", "💐", "🍫", "🧸"];

export function CelebrationPage() {
  const [showContent, setShowContent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [loveCount, setLoveCount] = useState(0);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 200);
    const t2 = setTimeout(() => setShowMessage(true), 800);
    const t3 = setTimeout(() => setShowExtras(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % SWEET_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generated: Confetti[] = [];
    for (let i = 0; i < 40; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 5,
        size: Math.random() * 16 + 14,
        type: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
      });
    }
    setConfetti(generated);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoveCount((prev) => {
        if (prev >= 9999) return 9999;
        return prev + Math.floor(Math.random() * 50) + 10;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-5 sm:px-6 py-10 sm:py-14">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${c.x}%`,
              top: "-60px",
              fontSize: `${c.size}px`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          >
            {c.type}
          </div>
        ))}
      </div>

      {/* Celebration Emoji */}
      <div
        className={`transition-all duration-700 ease-out ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        <div className="text-6xl sm:text-7xl md:text-8xl animate-celebrate select-none leading-none">
          🎉
        </div>
      </div>

      {/* Spacer */}
      <div className="h-4 sm:h-6" />

      {/* YAY Title */}
      <div
        className={`text-center transition-all duration-700 delay-200 ease-out ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 animate-gradient-text">
            YAAAAY!
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mt-2">
          You said YES! 😍💖
        </p>
      </div>

      {/* Spacer */}
      <div className="h-6 sm:h-8" />

      {/* Main Card */}
      <div
        className={`w-full max-w-sm sm:max-w-md transition-all duration-700 delay-300 ease-out ${
          showMessage ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"
        }`}
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pink-300/25 border border-pink-200/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Heart icon */}
            <div className="flex justify-center mb-5">
              <span className="text-5xl sm:text-6xl animate-heartbeat inline-block leading-none">💕</span>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-pink-600 mb-5">
              I knew you'd say yes! 🥰
            </h2>

            {/* Love message */}
            <div className="bg-pink-50/80 border border-pink-200/50 rounded-2xl p-4 sm:p-5 mb-5">
              <p className="text-pink-700 text-center text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Every love story is beautiful, but ours is going to be my favorite!
                Thank you for making my heart skip a beat.
                This Valentine's Day just became the best one ever! 💫
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
              <span className="text-pink-400 animate-pulse text-sm">♥</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            </div>

            {/* Rotating messages */}
            <div
              className={`transition-all duration-700 ${
                showExtras ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 sm:p-5 mb-5 min-h-[60px] sm:min-h-[70px] flex items-center justify-center border border-pink-200/40">
                <p
                  key={currentMessage}
                  className="text-pink-600 text-center text-sm sm:text-base font-medium animate-fade-in"
                >
                  {SWEET_MESSAGES[currentMessage]}
                </p>
              </div>
            </div>

            {/* Love counter */}
            <div className="text-center mb-5">
              <p className="text-pink-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-1">
                Love Counter
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 leading-none">
                  {loveCount >= 9999 ? "∞" : loveCount.toLocaleString()}
                </span>
                <span className="text-lg sm:text-xl animate-heartbeat inline-block">❤️</span>
              </div>
              <p className="text-pink-400/60 text-[10px] sm:text-xs mt-1">
                {loveCount >= 9999
                  ? "Love overflow! Can't count anymore! 💥"
                  : "Counting the ways I love you..."}
              </p>
            </div>

            {/* Promise cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
              {[
                { emoji: "🍫", text: "Chocolates" },
                { emoji: "🌹", text: "Flowers" },
                { emoji: "🤗", text: "Hugs" },
                { emoji: "💋", text: "Kisses" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/80 rounded-xl p-3 text-center border border-pink-100 shadow-sm
                    hover:shadow-md hover:scale-105 hover:border-pink-300 transition-all duration-300 cursor-default"
                >
                  <span className="text-2xl block mb-1 leading-none">{item.emoji}</span>
                  <span className="text-pink-500 text-xs sm:text-sm font-medium">
                    Unlimited {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Read Letter Button */}
            <button
              onClick={() => setShowLetter(true)}
              className="w-full mb-5 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 
                text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <span>💌</span>
              <span>Read My Love Letter</span>
              <span>💌</span>
            </button>

            {/* Coupon */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-4 sm:p-5 text-white text-center relative overflow-hidden">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-1 opacity-80 font-medium">
                Valentine's Coupon
              </p>
              <p className="text-lg sm:text-xl font-bold mb-0.5">♾️ Lifetime Supply</p>
              <p className="text-xs sm:text-sm opacity-90">of Love, Cuddles & Happiness</p>
              <div className="flex justify-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xs">⭐</span>
                ))}
              </div>
              {/* Coupon notches */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-pink-100 rounded-r-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-pink-100 rounded-l-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-6 sm:h-8" />

      {/* Bottom decorations */}
      <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "2s" }}>
        {["🧸", "🌹", "💝", "🌹", "🧸"].map((flower, i) => (
          <span
            key={i}
            className="text-2xl sm:text-3xl animate-bounce-slow inline-block"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {flower}
          </span>
        ))}
      </div>

      <p className="mt-4 text-pink-400/50 text-xs sm:text-sm text-center">
        Happy Valentine's Day! Made with ❤️
      </p>

      {/* Bottom padding */}
      <div className="h-8" />

      {/* Love Letter Modal */}
      {showLetter && <LetterPage onClose={() => setShowLetter(false)} />}
    </div>
  );
}
