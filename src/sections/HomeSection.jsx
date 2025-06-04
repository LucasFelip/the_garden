import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf } from 'lucide-react'; // Using Leaf for a subtle nature touch

const HomeSection = () => {

    // Simplified decorative frame component - Optional
    const CozyFrameEffect = () => (
        <div className="absolute -inset-4 md:-inset-6 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none">
                <defs>
                    <radialGradient id="glowGradientHome" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="hsl(var(--primary) / 0.3)" />
                        <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
                    </radialGradient>
                </defs>
                <rect width="200" height="200" fill="url(#glowGradientHome)" />
            </svg>
        </div>
    );

    // Estimate Navbar and Footer heights (adjust if necessary)
    const navbarHeight = '0rem'; // Example: 64px
    const footerHeight = '0rem'; // Example: 48px

    return (
        <section
            id="home"
            // Use calc() to set min-height: 100vh - navbarHeight - footerHeight
            // This makes the section fill the space BETWEEN navbar and footer
            className={`relative w-full px-4 flex flex-col items-center justify-center overflow-hidden`}
            style={{
                minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})`,
                paddingTop: '0rem', // Added padding to push content down from potential navbar overlap
                paddingBottom: '0rem' // Added padding to prevent content hitting footer overlap
            }}
        >
            {/* Background Image Container - Occupies the entire section */}
            <div className="absolute inset-0 z-0 w-screen h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                >
                </motion.div>
            </div>

            {/* Floating Warm Light Particles - Kept the same */}
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full pointer-events-none z-10"
                    style={{
                        width: `${Math.random() * 6 + 3}px`,
                        height: `${Math.random() * 6 + 3}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `radial-gradient(circle, hsla(45, 100%, 80%, ${Math.random() * 0.5 + 0.4}), transparent 70%)`,
                        boxShadow: `0 0 ${Math.random() * 8 + 4}px hsla(45, 100%, 70%, 0.5)`
                    }}
                    animate={{
                        y: [0, Math.random() * 30 - 15, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0, 0.9, 0],
                        scale: [0.4, 1.1, 0.4]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                    }}
                />
            ))}

            {/* Main Content Area - Centered */}
            <div className="relative z-20 flex flex-col items-center w-full max-w-4xl px-4">

                {/* Container da Imagem Principal - Adjusted position & size */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.0, type: "spring", stiffness: 80 }}
                    className="w-full max-w-sm md:max-w-md mb-8"
                >
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-xl bg-amber-50/70 backdrop-blur-lg border-4 border-amber-100/40"
                        whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                        transition={{ type: "spring", stiffness: 250 }}
                    >
                        <div className="p-1.5 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100">
                            <img
                                src="/public/img/foto-formatura.jpg" // Ensure path is correct
                                alt="Lucas e Manu na formatura - um momento especial no jardim"
                                className="w-full h-auto object-cover rounded-xl shadow-inner block"
                            />
                        </div>
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-center p-3 pt-5 font-caveat text-lg md:text-xl text-white/90 text-shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                        >
                            "Esse jardim floresceu porque cultivamos cada sonho juntos."
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Wooden Plaque Container for Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9 }}
                    className="w-full max-w-3xl bg-[hsl(var(--secondary)/0.8)] backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 border border-[hsl(var(--border)/0.5)]"
                    style={{
                        // Optional: Subtle wood grain texture
                        // backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')`,
                        // backgroundBlendMode: 'overlay',
                        // backgroundColor: 'hsla(var(--secondary), 0.8)',
                    }}
                >
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-[hsl(var(--secondary-foreground))] mb-4 font-caveat text-shadow-md"
                        >
                            Manu, Meu Girassol Perfeito
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex justify-center my-4 md:my-5"
                        >
                            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.8)] to-transparent rounded-full" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-lg md:text-xl text-[hsl(var(--secondary-foreground)/0.9)] font-medium mb-4 leading-relaxed"
                        >
                            Este é um jardim que cultivei com carinho... com memórias, sonhos e alguns segredos espalhados pelos caminhos.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-sm md:text-base text-[hsl(var(--secondary-foreground)/0.8)] italic leading-relaxed"
                        >
                            Sinta-se livre para passear por cada cantinho — alguns foram criados com risos, outros com saudades. Talvez nem todos os segredos estejam prontos… mas estão aqui, esperando por você.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeSection;
