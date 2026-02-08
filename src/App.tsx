import { useState } from "react";
import { FloatingHearts } from "./components/FloatingHearts";
import { AskPage } from "./components/AskPage";
import { CelebrationPage } from "./components/CelebrationPage";

export function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 overflow-x-hidden relative">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <FloatingHearts />

      <div className="relative z-10">
        {!accepted ? (
          <AskPage onAccept={() => setAccepted(true)} />
        ) : (
          <CelebrationPage />
        )}
      </div>
    </div>
  );
}
