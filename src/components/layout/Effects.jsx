import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun } from 'lucide-react';

// --- Sunflower Cursor --- (Slightly smaller, softer color)
// Exported individually as before
export const SunflowerCursor = ({ cursorPos }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!cursorPos || !ref.current) return;
        const node = ref.current;
        const targetX = cursorPos.x - 12;
        const targetY = cursorPos.y - 12;
        node.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) rotate(${cursorPos.x / 20}deg) scale(0.9)`;
    }, [cursorPos]);

    if (!cursorPos) return null;

    return (
        <motion.div
            ref={ref}
            className="fixed pointer-events-none z-[9999]"
            style={{ left: '0px', top: '0px', willChange: 'transform' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.9, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
        >
            <Sun size={24} className="text-yellow-500/80 drop-shadow-sm" />
        </motion.div>
    );
};

// --- Subtle Particle Effect (Internally SubtleSparkle, but exported as PetalRain for compatibility) ---
// Exported individually with the original name PetalRain
export const PetalRain = () => { // Renamed back to PetalRain for export compatibility
    const [sparkles, setSparkles] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        const createSparkleBurst = () => {
            const burst = Array.from({ length: Math.floor(Math.random() * 4) + 2 }).map((_, i) => ({
                id: Date.now() + Math.random() + i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 1.5 + 1,
                delay: Math.random() * 0.5
            }));
            setSparkles(prev => [...prev, ...burst]);

            burst.forEach(s => {
                setTimeout(() => {
                    setSparkles(prev => prev.filter(sp => sp.id !== s.id));
                }, (s.duration + s.delay) * 1000 + 100);
            });
        };

        const startInterval = () => {
            createSparkleBurst();
            intervalRef.current = setInterval(() => {
                createSparkleBurst();
            }, Math.random() * 5000 + 5000);
        };

        startInterval();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setSparkles([]);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden w-full h-full">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="absolute rounded-full"
                        style={{
                            left: sparkle.left,
                            top: sparkle.top,
                            width: `${sparkle.size}px`,
                            height: `${sparkle.size}px`,
                            background: `radial-gradient(circle, hsla(50, 100%, 90%, 0.7), transparent 70%)`,
                            boxShadow: `0 0 ${sparkle.size * 1.5}px hsla(50, 100%, 85%, 0.5)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 0.8, 0], opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: sparkle.duration,
                            ease: 'easeOut',
                            delay: sparkle.delay
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// --- Gentle Floating Dust Motes (Internally FloatingMote, but exported as FloatingPetal for compatibility) ---
// Exported individually with the original name FloatingPetal
export const FloatingPetal = ({ count = 5 }) => { // Renamed back to FloatingPetal for export compatibility
    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden w-full h-full">
            {Array.from({ length: count }).map((_, i) => {
                const size = Math.random() * 2.5 + 1;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const xMove = (Math.random() - 0.5) * 15;
                const yMove = (Math.random() - 0.5) * 15;
                const duration = Math.random() * 15 + 10;

                return (
                    <motion.div
                        key={`mote-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            top: `${top}%`,
                            backgroundColor: `hsla(50, 80%, 95%, 0.3)`,
                            filter: 'blur(1px)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            x: [0, xMove, -xMove / 2, 0],
                            y: [0, yMove, -yMove / 2, 0],
                            opacity: [0, 0.6, 0.6, 0],
                            scale: [0.8, 1, 1, 0.8]
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'linear',
                            delay: Math.random() * duration
                        }}
                    />
                );
            })}
        </div>
    );
};

// Removed the default export for GardenEffects to avoid HMR issues
// If you were using <GardenEffects />, you now need to import and use
// <SunflowerCursor />, <PetalRain />, and <FloatingPetal /> individually.
