"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewOnMapProps {
  locationName?: string;
  address?: string;
  mapImageUrl?: string;
  className?: string;
}

export const ViewOnMap: React.FC<ViewOnMapProps> = ({
  locationName = "NATLE & Hosma Headquarters",
  address = "World Trade Center, Colombo 01, Sri Lanka",
  mapImageUrl = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMapLoaded(false);
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  };

  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={cn("relative inline-block select-none", className)}>
      <AnimatePresence mode="popLayout">
        {!isOpen ? (
          /* --- PILL BUTTON (Luxury Emerald & Frosted Glass) --- */
          <motion.div
            key="button"
            layoutId="map-container"
            onClick={toggleOpen}
            className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:border-[#10E599]/60 hover:bg-white/15"
            transition={springConfig}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Background image overlay */}
            <motion.div
              layoutId="map-bg"
              className="absolute inset-0 opacity-20 brightness-110 grayscale transition-opacity group-hover:opacity-35"
              style={{
                backgroundImage: `url(${mapImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative z-10 flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#10E599] animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                View on Live Map
              </span>
            </div>

            <span className="relative z-10 ml-2 rounded-full border border-[#10E599]/30 bg-[#059669]/25 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#10E599]">
              Colombo WTC
            </span>
          </motion.div>
        ) : (
          /* --- EXPANDED INTERACTIVE MAP POPUP --- */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              key="map"
              layoutId="map-container"
              className="relative aspect-square w-[calc(100vw-32px)] max-w-[480px] overflow-hidden rounded-3xl border border-white/20 bg-[#071326] shadow-2xl"
              transition={springConfig}
            >
              {/* Header inside popup */}
              <div className="absolute top-4 left-4 z-40 flex items-center gap-2 rounded-full bg-[#071326]/90 border border-white/20 px-3.5 py-1.5 backdrop-blur-md text-white shadow-lg">
                <MapPin className="h-3.5 w-3.5 text-[#10E599]" />
                <span className="text-xs font-bold text-white">{locationName}</span>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={toggleOpen}
                className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#071326] shadow-xl transition-all hover:bg-slate-100 active:scale-90"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </motion.button>

              {/* Embedded Google Map */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="absolute inset-0 h-full w-full"
              >
                <iframe
                  title="NATLE Google Map Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={publicMapUrl}
                  allowFullScreen
                  onLoad={() => setIsMapLoaded(true)}
                  className={`transition-opacity duration-700 ${
                    isMapLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.div>

              {!isMapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#071326] text-white">
                  <Loader2 className="h-8 w-8 animate-spin text-[#10E599]" />
                  <span className="text-xs font-mono text-slate-400">Loading Satellite Map...</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewOnMap;
