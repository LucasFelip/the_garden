import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sun, DoorOpen, Sparkles } from 'lucide-react'; // Added Sparkles

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleEnterGarden = () => {
    setClicked(true);
    document.getElementById('welcome-screen-container')?.classList.add('gate-opening');
    setTimeout(() => navigate('/jardim/home'), 2500); // Keep delay for animation
  };

  return (
      <motion.div
          id="welcome-screen-container"
          className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden gate-closed"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Background Image - Using the Unsplash Sunflower image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.04, 1], // Gentle scaling animation
              }}
              transition={{
                duration: 30, // Slowed down for a calmer feel
                repeat: Infinity,
                ease: "linear" // Linear for smooth continuous motion
              }}
          >
            <img
                className="object-cover w-full h-full filter brightness-90 saturate-110 contrast-105" // Adjusted filters for warmth
                alt="Campo de girassóis ao amanhecer, a entrada do nosso jardim"
                src="https://images.unsplash.com/photo-1506260408121-e353d10b87c7" // Reverted to Unsplash URL
            />
          </motion.div>

          {/* Enhanced Overlay Gradient - Golden Hour / Romantic Feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-rose-400/25 to-amber-700/40 mix-blend-multiply opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-amber-200/20 to-transparent opacity-60"></div>
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')] opacity-15 mix-blend-overlay"></div>
        </div>

        {/* Floating Sparkles/Petals Decoration */}
        <AnimatePresence>
          {!clicked && (
              <>
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute text-amber-100/50"
                        initial={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{
                          y: [0, Math.random() * 20 - 10],
                          x: [0, Math.random() * 20 - 10],
                          opacity: [0, 0.8, 0.8, 0],
                          scale: [0, Math.random() * 0.6 + 0.4, 0]
                        }}
                        transition={{
                          duration: Math.random() * 6 + 4, // Random duration
                          repeat: Infinity,
                          delay: Math.random() * 5, // Staggered start times
                          ease: "easeInOut"
                        }}
                        style={{ pointerEvents: 'none' }} // Ensure they don't block interaction
                    >
                      <Sparkles size={12 + Math.random() * 12} strokeWidth={1.5} />
                    </motion.div>
                ))}
              </>
          )}
        </AnimatePresence>

        {/* Gate Elements - Kept from previous version */}
        <motion.div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 shadow-2xl gate-left"
            initial={{ x: 0 }}
            animate={clicked ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        ></motion.div>
        <motion.div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black/50 via-black/20 to-transparent z-10 shadow-2xl gate-right"
            initial={{ x: 0 }}
            animate={clicked ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        ></motion.div>

        {/* Central Content - Adjusted for Sunflower Theme */}
        <AnimatePresence>
          {!clicked && (
              <motion.div
                  key="content"
                  className="relative z-20 flex flex-col items-center justify-center p-8 text-center bg-amber-50/80 backdrop-blur-md rounded-xl shadow-2xl max-w-2xl mx-4 border border-amber-200/60 book-page-edge"
                  // Reverted to lighter, warmer background, more blur
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
              >
                {/* Decorative Elements - Amber/Gold Tones */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>

                <motion.h1
                    className="text-5xl md:text-6xl font-merriweather font-bold mb-6 text-amber-900 relative text-shadow"
                    // Dark amber text, subtle shadow
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                >
                  Para o meu Girassol...
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                </motion.h1>

                <motion.div
                    className="mb-8 w-24 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                ></motion.div>

                <motion.p
                    className="text-lg md:text-xl font-merriweather mb-10 leading-relaxed px-2 text-amber-800/90 italic max-w-[38rem] text-shadow-sm"
                    // Slightly darker amber text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
                >
                  "Neste Dia dos Namorados, mesmo que nossos corpos não estejam juntos o dia todo,
                  minha alma se deita neste jardim que cultivei com carinho para ti. Você é luz,
                  é flor, é calor — e aqui deixo cada pétala do que sinto, para que colhas com o coração."
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.3, type: "spring", stiffness: 150 }}
                >
                  <Button
                      onClick={handleEnterGarden}
                      className="px-8 py-4 text-lg font-semibold text-amber-50 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-2 border-amber-300/50 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-amber-300/50 focus:outline-none group relative overflow-hidden"
                      // Back to amber button theme
                      aria-label="Entrar no Jardim do Girassol"
                      title="Clique para entrar no jardim que cultivei só pra ti"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-transparent to-amber-500/30 w-full h-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDuration: '3s' }} />
                    <DoorOpen className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                    Passe pelos portões do jardim
                  </Button>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Loading/Transition Overlay - Adjusted for theme */}
        {clicked && (
            <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              >
                <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto mb-4"
                >
                  <Sun size={48} className="text-amber-300" />
                </motion.div>
                <p className="text-amber-100 text-2xl font-caveat">
                  O jardim está se abrindo... espere um instante, meu amor.
                </p>
              </motion.div>
            </motion.div>
        )}
      </motion.div>
  );
};

export default WelcomeScreen;

