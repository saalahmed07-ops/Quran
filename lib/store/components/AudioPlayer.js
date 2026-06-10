"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    volume,
  } = usePlayerStore();

  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-4 flex items-center justify-between z-50">

      <audio ref={audioRef} src={currentTrack.url} onEnded={nextTrack} />

      {/* Info */}
      <div className="flex items-center gap-3 w-1/3">
        <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">
          {currentTrack.artist?.[0] || "Q"}
        </div>
        <div>
          <div className="text-white text-sm">{currentTrack.title}</div>
          <div className="text-gray-400 text-xs">{currentTrack.artist}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={prevTrack}>
          <SkipBack className="text-gray-400 hover:text-white" />
        </button>

        <button onClick={togglePlay} className="bg-white text-black p-2 rounded-full">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button onClick={nextTrack}>
          <SkipForward className="text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-1/3 justify-end">
        <Volume2 size={18} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue={volume}
          onChange={(e) => (audioRef.current.volume = e.target.value)}
        />
      </div>

    </div>
  );
}
