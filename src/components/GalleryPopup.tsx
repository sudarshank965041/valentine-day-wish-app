import { cn } from "@/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";

// Main Gallery Popup - heavily enhanced
export function GalleryPopup({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<CuteImage | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
      setTimeout(() => setCardsVisible(true), 300);
    });
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setCardsVisible(false);
    setTimeout(() => setIsVisible(false), 100);
    setTimeout(onClose, 600);
  }, [onClose]);

  const confettiColors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#fb923c", "#f87171"];
  const floatingEmojis = ["💖", "🌸", "✨", "🎀", "💕", "🦋", "🌺", "⭐", "🐾", "🌈"];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
        isVisible
          ? "bg-black/50 backdrop-blur-xl"
          : "bg-black/0 backdrop-blur-0"
      )}
      onClick={handleClose}
    >
      {/* Confetti explosion */}
      {showConfetti &&
        Array.from({ length: 40 }).map((_, i) => (
          <ConfettiParticle
            key={i}
            delay={Math.random() * 1.5}
            color={confettiColors[i % confettiColors.length]}
            left={Math.random() * 100}
          />
        ))}

      {/* Main popup */}
      <div
        className={cn(
          "relative mx-4 w-full max-w-4xl",
          isVisible ? "animate-slide-up-bounce" : "translate-y-full scale-50 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Outer rotating gradient ring */}
        <div className="animate-rotate-slow absolute -inset-3 rounded-[2rem] bg-gradient-conic from-pink-400 via-purple-500 via-blue-400 via-cyan-400 via-green-400 via-yellow-400 via-orange-400 to-pink-400 opacity-40 blur-xl" />

        {/* Gradient border frame */}
        <div className="animate-gradient-shift absolute -inset-[3px] rounded-[2rem] bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-cyan-500 to-pink-500 bg-[length:300%_300%]" />

        {/* Main container */}
        <div className="relative overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
          {/* Floating particles */}
          {floatingEmojis.map((emoji, i) => (
            <FloatingParticle key={i} emoji={emoji} index={i} />
          ))}

          {/* Twinkle stars */}
          {Array.from({ length: 12 }).map((_, i) => (
            <TwinkleStar
              key={i}
              left={Math.random() * 100}
              top={Math.random() * 100}
              delay={Math.random() * 3}
            />
          ))}

          {/* Decorative gradient orbs inside popup */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 animate-pulse rounded-full bg-pink-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 animate-pulse rounded-full bg-purple-500/20 blur-3xl" style={{ animationDelay: "1s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" style={{ animationDelay: "2s" }} />

          {/* Header */}
          <div className="relative border-b border-white/10 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Animated logo */}
                <div className="animate-heartbeat flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-2xl shadow-lg shadow-pink-500/30">
                  🎨
                </div>
                <div>
                  <h2 className="animate-shimmer bg-gradient-to-r from-pink-300 via-purple-300 via-cyan-300 to-pink-300 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                    Cute Gallery
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-purple-300/70">
                    <span className="animate-wave inline-block">👋</span>
                    Tap any image to explore!
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/20 hover:text-pink-300 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Gallery grid */}
          <div className="cute-scrollbar max-h-[55vh] overflow-y-auto p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {(cuteImages).map((image, index) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  index={index}
                  isVisible={cardsVisible}
                  onClick={() => setLightboxImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <LightboxModal
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}

interface CuteImage {
  id: number;
  url: string;
  alt: string;
  emoji: string;
  color: string;
}

const cuteImages: CuteImage[] = [
  { id: 1, url: "/src/assets/images/1.jpeg", alt: "Our First Sunset Together ✨", emoji: "💕", color: "from-pink-400 to-rose-500" },
  { id: 2, url: "/src/assets/images/2.jpeg", alt: "You Make Me Smile 😊", emoji: "💖", color: "from-red-400 to-pink-500" },
  { id: 3, url: "/src/assets/images/3.jpeg", alt: "Beautiful Moments with You 🌹", emoji: "🌹", color: "from-orange-400 to-red-500" },
  { id: 4, url: "/src/assets/images/4.jpeg", alt: "Forever in Your Eyes ✨", emoji: "✨", color: "from-yellow-400 to-orange-500" },
  { id: 5, url: "/src/assets/images/5.jpeg", alt: "My Heart Belongs to You 💝", emoji: "💝", color: "from-pink-400 to-fuchsia-500" },
  { id: 6, url: "/src/assets/images/6.jpeg", alt: "Dancing Through Life Together 🎀", emoji: "🎀", color: "from-purple-400 to-pink-500" },
  { id: 7, url: "/src/assets/images/7.jpeg", alt: "Hand in Hand, Always 💗", emoji: "💗", color: "from-red-400 to-rose-500" },
  { id: 8, url: "/src/assets/images/8.jpeg", alt: "Perfectly Imperfect Together 🌸", emoji: "🌸", color: "from-pink-400 to-rose-400" },
  { id: 9, url: "/src/assets/images/9.jpeg", alt: "You Complete My Heart 💞", emoji: "💞", color: "from-pink-500 to-red-500" },
  { id: 10, url: "/src/assets/images/10.jpeg", alt: "Butterfly Kisses & Love 🦋", emoji: "🦋", color: "from-purple-400 to-violet-500" },
  { id: 11, url: "/src/assets/images/11.jpeg", alt: "You're My Shining Star ⭐", emoji: "⭐", color: "from-blue-400 to-cyan-500" },
  { id: 12, url: "/src/assets/images/12.jpeg", alt: "Blooming Love 🌺", emoji: "🌺", color: "from-pink-400 to-purple-500" },
  { id: 13, url: "/src/assets/images/13.jpeg", alt: "You're My Wish Come True 💫", emoji: "💫", color: "from-indigo-400 to-blue-500" },
  { id: 14, url: "/src/assets/images/14.jpeg", alt: "Happily Ever After with You 🎉", emoji: "🎉", color: "from-yellow-400 to-orange-500" },
];

// Confetti particle component
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: number }) {
  return (
    <div
      className="animate-confetti-fall pointer-events-none absolute top-0 z-50"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
      }}
    >
      <div
        className="h-3 w-2 rounded-sm"
        style={{
          backgroundColor: color,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    </div>
  );
}

// Floating hearts/stars in popup
function FloatingParticle({ emoji, index }: { emoji: string; index: number }) {
  const duration = 4 + Math.random() * 6;
  const delay = index * 0.5;
  return (
    <span
      className="animate-float-up pointer-events-none absolute select-none"
      style={{
        left: `${Math.random() * 90 + 5}%`,
        fontSize: `${14 + Math.random() * 16}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationIterationCount: "infinite",
      }}
    >
      {emoji}
    </span>
  );
}

// Twinkling star
function TwinkleStar({ left, top, delay }: { left: number; top: number; delay: number }) {
  return (
    <div
      className="animate-twinkle pointer-events-none absolute text-yellow-300"
      style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
    >
      ✦
    </div>
  );
}

// Enhanced Image Card with 3D effects
function ImageCard({
  image,
  index,
  isVisible,
  onClick,
}: {
  image: CuteImage;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="perspective-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        animationDelay: `${index * 100 + 200}ms`,
      }}
    >
      <div
        ref={cardRef}
        className={cn(
          "group relative cursor-pointer",
          isVisible ? "animate-card-enter" : "opacity-0"
        )}
        style={{
          animationDelay: `${index * 100 + 200}ms`,
          animationFillMode: "both",
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px) scale(1.05)`
            : "rotateX(0) rotateY(0) translateZ(0) scale(1)",
          transition: "transform 0.2s ease-out",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated gradient glow behind card */}
        <div
          className={cn(
            "absolute -inset-1.5 rounded-2xl bg-gradient-to-r opacity-0 blur-lg transition-all duration-500",
            image.color,
            isHovered && "opacity-80"
          )}
        />

        {/* Rainbow border on hover */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-[3px] border-transparent bg-white shadow-lg transition-all duration-300",
            isHovered && "animate-rainbow-border shadow-2xl"
          )}
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={image.url}
              alt={image.alt}
              className={cn(
                "h-full w-full object-cover transition-all duration-700",
                isHovered && "scale-110 brightness-110 saturate-110"
              )}
              loading="lazy"
            />

            {/* Gradient overlay on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t via-transparent transition-all duration-500",
                image.color.replace("from-", "from-").replace("to-", "to-"),
                isHovered ? "opacity-40" : "opacity-0"
              )}
              style={{ mixBlendMode: "overlay" }}
            />

            {/* Shine effect across image */}
            <div
              className={cn(
                "absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700",
                isHovered && "translate-x-full"
              )}
            />
          </div>

          {/* Info bar at bottom */}
          <div className={cn(
            "absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 pt-8 transition-transform duration-300",
            isHovered && "translate-y-0"
          )}>
            <p className="text-center text-sm font-semibold text-white drop-shadow-lg">
              {image.alt}
            </p>
          </div>

          {/* Emoji badge */}
          <div
            className={cn(
              "absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-lg shadow-lg backdrop-blur-sm transition-all duration-300",
              isHovered && "animate-heartbeat scale-110 bg-white"
            )}
          >
            {image.emoji}
          </div>

          {/* Heart pop on hover */}
          {isHovered && (
            <div className="animate-sparkle-pop pointer-events-none absolute left-2 bottom-2 text-2xl">
              💖
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Lightbox
function LightboxModal({
  image,
  onClose,
}: {
  image: CuteImage;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 400);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-400",
        show ? "bg-black/80 backdrop-blur-xl" : "bg-black/0 backdrop-blur-0"
      )}
      onClick={handleClose}
    >
      {/* Spinning gradient behind */}
      <div
        className={cn(
          "animate-rotate-slow absolute h-[500px] w-[500px] rounded-full bg-gradient-conic from-pink-500 via-purple-500 via-blue-500 via-green-400 via-yellow-400 via-red-500 to-pink-500 opacity-0 blur-3xl transition-opacity duration-500",
          show && "opacity-30"
        )}
      />

      <div
        className={cn(
          "relative max-h-[85vh] max-w-2xl transition-all duration-600",
          show
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-45 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
        style={{ transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Animated pulsing glow */}
        <div className={cn(
          "absolute -inset-4 rounded-3xl bg-gradient-to-r opacity-60 blur-2xl animate-heartbeat",
          image.color
        )} />

        {/* Main image container */}
        <div className="relative overflow-hidden rounded-3xl border-4 border-white/40 shadow-2xl">
          <img
            src={image.url}
            alt={image.alt}
            className="max-h-[75vh] w-full object-contain"
          />

          {/* Bottom gradient info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{image.emoji}</span>
              <p className="text-xl font-bold text-white drop-shadow-lg">
                {image.alt}
              </p>
              <span className="text-3xl">{image.emoji}</span>
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {["💖", "✨", "🌟", "💫", "💖"].map((e, i) => (
                <span key={i} className="animate-twinkle text-sm" style={{ animationDelay: `${i * 0.3}s` }}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-180 hover:shadow-pink-500/50"
        >
          ✕
        </button>

        {/* Like button */}
        <button
          className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-lg transition-all duration-300 hover:scale-125 active:scale-90"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          💝
        </button>
      </div>
    </div>
  );
}