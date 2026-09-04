"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  Radio, 
  Layers 
} from "lucide-react";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoDemoModal({ isOpen, onClose }: VideoDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-emerald-500/40 bg-slate-950 shadow-2xl z-10 flex flex-col"
          >
            {/* Header Bar */}
            <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#10E599] flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">NATLE FieldOS™ &bull; Enterprise Agriculture AI</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Autonomous Edge Telemetry &amp; Yield Optimization</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Screen */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/agriculture-hero.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Center Play/Pause Overlay Indicator */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl pl-1">
                    <Play className="w-10 h-10 fill-current" />
                  </div>
                </div>
              )}

              {/* Bottom Custom Video Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12 flex flex-col gap-3">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-gradient-to-r from-[#00D2FF] to-[#10E599] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="hover:text-[#10E599] transition-colors cursor-pointer">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-[#10E599] transition-colors cursor-pointer">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      Live Field Calibration Feed (60 FPS)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#10E599] text-[10px] font-mono font-bold border border-emerald-500/30">
                      1080p Ultra-HD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Details Footer */}
            <div className="px-6 py-4 bg-slate-900 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6 text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FieldOS™ Autonomous Telemetry Certified</span>
                </span>
                <span className="hidden sm:inline">&bull;</span>
                <span className="hidden sm:inline">LoRaWAN Sub-GHz Mesh</span>
              </div>

              <a
                href="/contact"
                className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 hover:scale-105 transition-transform"
              >
                <span>Book Estate Pilot</span>
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
