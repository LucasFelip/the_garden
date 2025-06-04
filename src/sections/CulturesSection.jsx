import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Calendar, Music, Gift, PartyPopper, Heart, PlayCircle, ExternalLink, Flower} from 'lucide-react'; // Added PlayCircle, ExternalLink
import SpotifyCard from "@/components/layout/SpotifyCard.jsx";

// Helper function to calculate time remaining
const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

// Helper function to format time units
const formatTimeUnit = (unit) => String(unit).padStart(2, '0');

// --- Subtle Confetti/Heart Effect Component ---
const CelebrationEffect = ({ onComplete }) => {
    const numParticles = 35;

    useEffect(() => {
        const timeout = setTimeout(onComplete, 2500);
        return () => clearTimeout(timeout);
    }, [onComplete]);

    const particles = Array.from({ length: numParticles }).map((_, i) => {
        const isHeart = Math.random() > 0.6;
        const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#FFC0CB', '#FF69B4', '#FFD700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 0.6;
        const duration = 1.8 + Math.random() * 1.2;
        const initialX = Math.random() * 80 - 40;
        const initialY = Math.random() * 40 - 20;
        const finalY = -180 - Math.random() * 120;
        const finalX = initialX + (Math.random() * 120 - 60);
        const rotation = Math.random() * 360;

        return (
            <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                    left: `calc(50% + ${initialX}px)`,
                    top: `calc(50% + ${initialY}px)`,
                    originX: '50%',
                    originY: '50%',
                }}
                initial={{ opacity: 1, y: 0, x: 0, scale: isHeart ? 0.4 : 0.7, rotate: 0 }}
                animate={{
                    opacity: 0,
                    y: finalY,
                    x: finalX,
                    scale: isHeart ? 1.1 : 1,
                    rotate: isHeart ? (Math.random() * 40 - 20) : rotation,
                }}
                transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            >
                {isHeart ? (
                    <Heart size={16 + Math.random() * 8} fill={color} color={color} />
                ) : (
                    <div style={{
                        width: `${5 + Math.random() * 3}px`,
                        height: `${7 + Math.random() * 5}px`,
                        backgroundColor: color,
                        transform: `rotate(${Math.random() * 90}deg)`,
                        borderRadius: '2px'
                    }}></div>
                )}
            </motion.div>
        );
    });

    return <>{particles}</>;
};

// --- Song Card Component for Fallback ---
const SongCard = ({ title, artist }) => (
    <div className="flex items-center p-2 bg-[hsl(var(--muted)/0.5)] rounded-md mb-2 shadow-sm border border-[hsl(var(--border)/0.2)]">
        <PlayCircle size={18} className="mr-2 text-[hsl(var(--primary))] shrink-0" />
        <div>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{title}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{artist}</p>
        </div>
    </div>
);

const CulturesSection = () => {
    // --- Dates ---
    const anniversaryDate = `2025-09-28T00:00:00`;
    const birthdayDate = `2025-07-11T00:00:00`;
    const playlistUrl = 'https://open.spotify.com/playlist/6q4b8DUMph5diDEW7xckYs?si=2313e347cc944d02';

    // Key songs for fallback
    const keySongs = [
        { title: "Provider", artist: "Sleep Token" },
        { title: "Give", artist: "Sleep Token" },
        { title: "Alkaline", artist: "Sleep Token" },
        { title: "The Only Exception", artist: "Paramore" }
    ];

    // --- State ---
    const [anniversaryTimeLeft, setAnniversaryTimeLeft] = useState(calculateTimeLeft(anniversaryDate));
    const [birthdayTimeLeft, setBirthdayTimeLeft] = useState(calculateTimeLeft(birthdayDate));
    const [showBirthdayEffect, setShowBirthdayEffect] = useState(false);
    const [playlistError, setPlaylistError] = useState(false);
    const birthdayCounterRef = useRef(null);

    // --- Effect for Counters ---
    useEffect(() => {
        const timer = setInterval(() => {
            setAnniversaryTimeLeft(calculateTimeLeft(anniversaryDate));
            setBirthdayTimeLeft(calculateTimeLeft(birthdayDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [anniversaryDate, birthdayDate]);

    const handleBirthdayClick = (event) => {
        event.stopPropagation();
        if (!showBirthdayEffect) {
            setShowBirthdayEffect(true);
            setTimeout(() => setShowBirthdayEffect(false), 2500);
        }
    };

    const renderCounter = (timeLeft, title, years, icon, isBirthday = false) => {
        const IconComponent = icon;
        const content = !Object.keys(timeLeft).length ? (
            <span className="text-lg font-semibold text-[hsl(var(--primary))] py-4">Chegou o grande dia! 🎉</span>
        ) : (
            <div className="flex justify-center space-x-2 md:space-x-3 text-sm md:text-base font-mono bg-[hsl(var(--secondary)/0.1)] p-3 rounded-lg shadow-inner border border-[hsl(var(--border)/0.5)]">
                <div className="flex flex-col items-center px-2 py-1.5 rounded bg-[hsl(var(--background))] min-w-[45px] shadow-sm">
                    <span className="font-bold text-xl md:text-2xl text-[hsl(var(--primary))] tracking-wider">{formatTimeUnit(timeLeft.days)}</span>
                    <span className="text-[10px] uppercase font-medium text-[hsl(var(--muted-foreground))]">Dias</span>
                </div>
                <div className="flex flex-col items-center px-2 py-1.5 rounded bg-[hsl(var(--background))] min-w-[45px] shadow-sm">
                    <span className="font-bold text-xl md:text-2xl text-[hsl(var(--primary))] tracking-wider">{formatTimeUnit(timeLeft.hours)}</span>
                    <span className="text-[10px] uppercase font-medium text-[hsl(var(--muted-foreground))]">Horas</span>
                </div>
                <div className="flex flex-col items-center px-2 py-1.5 rounded bg-[hsl(var(--background))] min-w-[45px] shadow-sm">
                    <span className="font-bold text-xl md:text-2xl text-[hsl(var(--primary))] tracking-wider">{formatTimeUnit(timeLeft.minutes)}</span>
                    <span className="text-[10px] uppercase font-medium text-[hsl(var(--muted-foreground))]">Min</span>
                </div>
                <div className="flex flex-col items-center px-2 py-1.5 rounded bg-[hsl(var(--background))] min-w-[45px] shadow-sm">
                    <span className="font-bold text-xl md:text-2xl text-[hsl(var(--primary))] tracking-wider">{formatTimeUnit(timeLeft.seconds)}</span>
                    <span className="text-[10px] uppercase font-medium text-[hsl(var(--muted-foreground))]">Seg</span>
                </div>
            </div>
        );

        return (
            <div ref={isBirthday ? birthdayCounterRef : null}
                 className={`relative p-4 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm ${isBirthday ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}`}
                 onClick={isBirthday ? handleBirthdayClick : undefined}
                 title={isBirthday ? "Clique para uma surpresa!" : undefined}
            >
                <h4 className="text-xl font-bold text-[hsl(var(--card-foreground))] mb-3 flex items-center justify-center text-center">
                    <IconComponent className="mr-2 shrink-0 text-[hsl(var(--primary))]" size={22} />
                    {title} <span className="ml-1 font-semibold text-[hsl(var(--primary))] text-lg">({years} anos!)</span>
                </h4>
                {content}
                {isBirthday && (
                    <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-3 flex items-center justify-center">
                        <PartyPopper size={12} className="mr-1 text-yellow-500"/> Clique para celebrar!
                    </p>
                )}
                <AnimatePresence>
                    {isBirthday && showBirthdayEffect && (
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10">
                            <CelebrationEffect onComplete={() => { /* Effect handles its own completion */ }} />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div
            id="cultures"
            className="py-16 px-4 relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary-foreground))] mb-10 md:mb-16 text-center font-caveat drop-shadow-md"
            >
                Nossas Vibrações: Datas e Sons
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
                {/* --- Left Column: Counters --- */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 90 }}
                    className="bg-transparent space-y-6"
                >
                    <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4 text-center">
                        Contagem Regressiva Especial
                    </h3>
                    {renderCounter(anniversaryTimeLeft, 'Nosso Aniversário', 6, Calendar)}
                    <div className="mt-6">
                        {renderCounter(birthdayTimeLeft, 'Aniversário da Manu', 25, Gift, true)}
                    </div>
                </motion.div>

                {/* --- Right Column: SpotifyCard (em vez de iframe) --- */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 90 }}
                    className="space-y-6"
                >
                    {/* Título da seção */}
                    <h3 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <Music className="mr-2 shrink-0 text-[hsl(var(--primary))]" /> Soundtrack do Nosso Amor
                    </h3>

                    {/* Aqui substituímos o bloco do iframe por este SpotifyCard: */}
                    <SpotifyCard playlistUrl={playlistUrl} />
                </motion.div>
            </div>

            <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-black bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Flower size={20} className="text-red-600" />
                    <span className="text-sm text-white font-medium">
                      Ao andar pelo jardim, se olhar com carinho até o final, talvez encontre algo esperando só por você, bem lá embaixo.
                    </span>
                </div>
            </div>

        </div>
    );
};

export default CulturesSection;
