"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlobeConfig } from "./globe";

// Dynamically import World to avoid SSR issues with Three.js
const World = dynamic(() => import("./globe").then((m) => m.World), {
    ssr: false,
});

export default function HeroGlobe() {
    const globeConfig: GlobeConfig = {
        pointSize: 1,
        globeColor: "#ffffff",
        showAtmosphere: true,
        atmosphereColor: "#059669",
        atmosphereAltitude: 0.1,
        emissive: "#ffffff",
        emissiveIntensity: 1.0,
        shininess: 0.9,
        polygonColor: "rgba(5, 150, 105, 0.6)", // Darker accent for countries
        ambientLight: "#ffffff",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 4000,
        arcLength: 1.0,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 51.5, lng: -0.1 },
        autoRotate: true,
        autoRotateSpeed: 0.8,
    };

    const colors = ["#059669", "#10B981"]; // Accent and Hover Accent colors
    const sampleArcs = [
        // UK/London Hub Connections
        {
            order: 1,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.1,
            color: colors[0],
        },
        {
            order: 1,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.3,
            color: colors[1],
        },
        {
            order: 2,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 1.3521,
            endLng: 103.8198,
            arcAlt: 0.2,
            color: colors[0],
        },
        {
            order: 2,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: -33.8688,
            endLng: 151.2093,
            arcAlt: 0.4,
            color: colors[1],
        },
        {
            order: 3,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.1,
            color: colors[0],
        },
        {
            order: 3,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.2,
            color: colors[1],
        },
        {
            order: 5,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 25.2048,
            endLng: 55.2708, // Dubai
            arcAlt: 0.05,
            color: colors[1],
        },
        {
            order: 5,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 48.8566,
            endLng: 2.3522, // Paris
            arcAlt: 0.03,
            color: colors[0],
        },
        {
            order: 6,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 37.7749,
            endLng: -122.4194, // San Francisco
            arcAlt: 0.25,
            color: colors[1],
        },
        {
            order: 6,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 19.076,
            endLng: 72.8777, // Mumbai
            arcAlt: 0.15,
            color: colors[0],
        },
        {
            order: 7,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: -33.9249,
            endLng: 18.4241, // Cape Town
            arcAlt: 0.35,
            color: colors[1],
        }
    ];

    return (
        <div className="flex items-center justify-center w-[110%] lg:w-[120%] max-w-[800px] aspect-square relative overflow-visible bg-transparent z-10 -ml-4 lg:-ml-16 lg:-mt-8">
            {/* Soft, premium glow behind the globe */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-[100px] opacity-70 transform scale-75" />

            <div className="w-full h-full relative z-10">
                <World data={sampleArcs} globeConfig={globeConfig} />
            </div>

            {/* Floating Info Cards */}
            {/* Top Left - Locations */}
            <motion.div
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -10, 0]
                }}
                transition={{
                    opacity: { duration: 0.8, delay: 1.2 },
                    x: { duration: 0.8, delay: 1.2 },
                    y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-4 left-4 md:top-8 md:left-8 z-20"
            >
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] flex items-center gap-4 min-w-[180px]">
                    <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(5,150,101,0.5)] animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-text-secondary/60 font-bold">Locations</span>
                        <span className="text-sm font-display text-text-primary px-1">United Kingdom</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Right - Global Reach */}
            <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, 10, 0]
                }}
                transition={{
                    opacity: { duration: 0.8, delay: 1.4 },
                    x: { duration: 0.8, delay: 1.4 },
                    y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20"
            >
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] flex items-center gap-4 min-w-[180px]">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-text-secondary/60 font-bold">Global Reach</span>
                        <span className="text-sm font-display text-text-primary px-1">25+ Projects Delivered</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
