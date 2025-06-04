import React from 'react';
import { motion } from 'framer-motion';
import {Heart, Sparkles, Pin, PawPrint, Paperclip, Star, Flower2, Flower} from 'lucide-react';

// --- Helper Components ---

// Washi Tape Component
const WashiTape = ({ className, rotation, delay, pattern = 'dots' }) => {
    const patterns = {
        dots: 'radial-gradient(circle at 3px 3px, hsla(var(--primary)/0.3) 1px, transparent 0)',
        stripes: 'repeating-linear-gradient(45deg, hsla(var(--primary)/0.2), hsla(var(--primary)/0.2) 4px, transparent 4px, transparent 8px)',
        hearts: 'radial-gradient(circle at 5px 5px, hsla(0, 70%, 70%, 0.4) 2px, transparent 0), radial-gradient(circle at 15px 15px, hsla(0, 70%, 70%, 0.4) 2px, transparent 0)',
    };
    return (
        <motion.div
            className={`absolute h-6 w-12 md:h-7 md:w-14 opacity-70 backdrop-blur-[1px] border border-[hsl(var(--border)/0.2)] shadow-sm ${className}`}
            style={{
                backgroundImage: patterns[pattern] || patterns['dots'],
                backgroundSize: pattern === 'hearts' ? '20px 20px' : '6px 6px',
                maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg%27%3E%3Crect width=\'100%25\' height=\'100%25\' style=\'stroke:%23000; stroke-width:3; stroke-dasharray: 5 3; fill: none; stroke-linecap: square;%27/%3E%3C/svg%3E")', // Torn edge effect
                maskSize: 'cover',
                rotate: `${rotation}deg`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: rotation + (Math.random() * 15 - 7) }}
            animate={{ opacity: 0.7, scale: 1, rotate: rotation }}
            transition={{ delay: delay, duration: 0.4 }}
        />
    );
};

// Sticker Component
const Sticker = ({ icon: Icon, className, rotation, delay, size = 28, color = 'hsl(var(--primary)/0.8)' }) => (
    <motion.div
        className={`absolute p-1 bg-[hsl(var(--background))] rounded-full shadow-md border border-[hsl(var(--border)/0.1)] ${className}`}
        initial={{ opacity: 0, scale: 0.5, rotate: rotation + (Math.random() * 40 - 20) }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{ delay: delay, duration: 0.35, type: 'spring', stiffness: 150 }}
        style={{ rotate: `${rotation}deg`, color: color }}
    >
        <Icon size={size} strokeWidth={1.5} />
    </motion.div>
);

// Torn Paper Snippet Component
const TornPaperText = ({ text, className, rotation, delay }) => (
    <motion.div
        className={`absolute p-2 bg-[hsl(var(--muted)/0.6)] shadow-sm backdrop-blur-sm border border-[hsl(var(--border)/0.1)] ${className}`}
        style={{
            maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg%27%3E%3Crect width=\'100%25\' height=\'100%25\' style=\'stroke:%23000; stroke-width:5; stroke-dasharray: 10 5 3 5; fill: none; stroke-linecap: butt;%27/%3E%3C/svg%3E")', // Rougher torn edge
            maskSize: 'cover',
            rotate: `${rotation}deg`,
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: rotation + (Math.random() * 10 - 5) }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{ delay: delay, duration: 0.4 }}
    >
        <p className="font-caveat text-lg md:text-xl text-[hsl(var(--foreground)/0.9)]">
            {text}
        </p>
    </motion.div>
);

// Updated Scrapbook Image to remove old tape and allow washi tape
const ScrapbookImage = ({ src, alt, className, rotation, delay }) => (
    <motion.div
        className={`absolute shadow-lg bg-white p-1.5 border border-gray-300/60 ${className}`}
        initial={{ opacity: 0, scale: 0.5, rotate: rotation + (Math.random() * 20 - 10) }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{ delay: delay, duration: 0.5, type: 'spring', stiffness: 120 }}
        style={{ rotate: `${rotation}deg` }}
    >
        <img src={src} alt={alt} className="block w-full h-full object-cover" />
    </motion.div>
);

// Doodle component remains the same
const Doodle = ({ icon: Icon, className, rotation, delay, size = 24, color = 'hsl(var(--primary)/0.6)' }) => (
    <motion.div
        className={`absolute ${className}`}
        style={{ rotate: `${rotation}deg`, color: color }}
        initial={{ opacity: 0, scale: 0.5, rotate: rotation + (Math.random() * 30 - 15) }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{ delay: delay, duration: 0.3 }}
    >
        <Icon size={size} strokeWidth={1.5} />
    </motion.div>
);

const ProfileSection = () => {
    // Define image paths relative to the public directory or source structure
    // Assuming images are moved to public/profile_images/
    const imageBase = '/public/img/'; // Adjust if your build process differs
    const images = {
        gymSelfie: `${imageBase}manu_gym.jpg`,
        gradCloseUp: `${imageBase}manu_colacao.jpg`,
        gradFriends: `${imageBase}amizades_da_manu.jpg`,
        bikes: `${imageBase}manu_gym_group.jpg`,
        friendsGroup: `${imageBase}manu_and_family.jpg`,
        baby: `${imageBase}baby_manu.jpg`,
        childhood: `${imageBase}manu_infancia.jpg`,
        beachCouple: `${imageBase}manu_and_lusca.jpg`,
        beachLandscape: `${imageBase}ocean.jpg`,
        coupleDog: `${imageBase}nos.png`,
        dogLying: `${imageBase}thor.png`,
        twoDogsSitting: `${imageBase}lion_and_loop2.png`,
        twoDogsLooking: `${imageBase}thor_and_lion.png`,
    };

    return (
        <div
            id="profile"
            className="py-16 px-4 relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
            // More distinct paper texture background (subtle dots)
            style={{
                backgroundColor: 'hsl(var(--card))',
                backgroundImage: `radial-gradient(hsl(var(--border)/0.1) 1px, transparent 0)`,
                backgroundSize: '15px 15px',
            }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                // Using a more script-like font if available, fallback to Caveat
                className="text-4xl md:text-5xl font-semibold text-[hsl(var(--primary-foreground))] mb-12 md:mb-20 text-center font-caveat drop-shadow-lg relative z-10"
            >
                Folhas da arvore que definem quem é Manu 🌿
            </motion.h2>

            {/* Increased height for more space */}
            <div className="relative w-full max-w-4xl h-[700px] md:h-[800px]">
                {/* Base layer - Less intense background image */}
                <motion.div
                    className="absolute inset-0 opacity-15 mix-blend-luminosity blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    <img src={images.beachLandscape} alt="Fundo de praia suave" className="w-full h-full object-cover rounded-lg"/>
                </motion.div>

                {/* --- Images with Washi Tape --- */}
                <ScrapbookImage src={images.gradCloseUp} alt="Manu formatura" className="w-32 h-44 md:w-36 md:h-48 top-[4%] left-[6%] z-10" rotation={-7} delay={0.3} />
                <WashiTape className="top-[3%] left-[4%] z-11" rotation={-50} delay={0.35} pattern="stripes" />

                <ScrapbookImage src={images.gymSelfie} alt="Manu academia" className="w-24 h-32 md:w-28 md:h-36 top-[6%] right-[9%] z-20" rotation={6} delay={0.4} />
                <WashiTape className="top-[16%] right-[7%] z-21" rotation={30} delay={0.45} pattern="dots" />

                <ScrapbookImage src={images.beachCouple} alt="Casal praia" className="w-36 h-24 md:w-40 md:h-28 top-[32%] left-[14%] z-30" rotation={4} delay={0.5} />
                <WashiTape className="top-[30%] left-[12%] z-31" rotation={-40} delay={0.55} pattern="hearts" />

                <ScrapbookImage src={images.bikes} alt="Amigas bicicleta" className="w-32 h-20 md:w-40 md:h-24 bottom-[28%] left-[7%] z-20" rotation={-6} delay={0.6} />
                <WashiTape className="bottom-[26%] left-[5%] z-21" rotation={50} delay={0.65} pattern="stripes" />

                <ScrapbookImage src={images.gradFriends} alt="Amigas formatura" className="w-40 h-28 md:w-48 md:h-32 bottom-[12%] right-[10%] z-10" rotation={8} delay={0.7} />
                <WashiTape className="bottom-[22%] right-[8%] z-11" rotation={-35} delay={0.75} pattern="dots" />

                <ScrapbookImage src={images.baby} alt="Manu bebê" className="w-16 h-24 md:w-20 md:h-28 top-[68%] right-[7%] z-30" rotation={-11} delay={0.8} />
                <WashiTape className="top-[66%] right-[5%] z-31" rotation={45} delay={0.85} pattern="hearts" />

                <ScrapbookImage src={images.childhood} alt="Manu infância" className="w-20 h-32 md:w-24 md:h-36 bottom-[48%] right-[28%] z-20 border-amber-800/30 opacity-95" rotation={13} delay={0.9} />
                <WashiTape className="bottom-[46%] right-[26%] z-21" rotation={-55} delay={0.95} pattern="stripes" />

                {/* --- Pet Images with Washi Tape --- */}
                <ScrapbookImage src={images.coupleDog} alt="Casal e cachorro" className="w-32 h-40 md:w-36 md:h-44 top-[48%] left-[42%] z-40" rotation={-5} delay={1.0} />
                <WashiTape className="top-[46%] left-[40%] z-41" rotation={40} delay={1.05} pattern="dots" />

                <ScrapbookImage src={images.dogLying} alt="Cachorro deitado" className="w-24 h-20 md:w-28 md:h-24 bottom-[7%] left-[38%] z-30" rotation={9} delay={1.1} />
                <WashiTape className="bottom-[5%] left-[36%] z-31" rotation={-48} delay={1.15} pattern="hearts" />

                <ScrapbookImage src={images.twoDogsSitting} alt="Dois cachorros sentados" className="w-28 h-24 md:w-32 md:h-28 top-[72%] left-[12%] z-20" rotation={-7} delay={1.2} />
                <WashiTape className="top-[70%] left-[10%] z-21" rotation={52} delay={1.25} pattern="stripes" />

                <ScrapbookImage src={images.twoDogsLooking} alt="Dois cachorros se olhando" className="w-24 h-20 md:w-28 md:h-24 top-[22%] right-[28%] z-10" rotation={11} delay={1.3} />
                <WashiTape className="top-[20%] right-[26%] z-11" rotation={-30} delay={1.35} pattern="dots" />

                {/* --- Torn Paper Text Snippets --- */}
                <TornPaperText text="Meu Girassol Radiante 🌻" className="top-[2%] right-[35%] z-15" rotation={-4} delay={1.4} />
                <TornPaperText text="Sempre forte! 💪" className="top-[28%] left-[5%] z-25" rotation={7} delay={1.5} />
                <TornPaperText text="Momentos Mágicos ✨" className="bottom-[3%] left-[55%] z-45" rotation={-3} delay={1.6} />
                <TornPaperText text="Desde pequena iluminada" className="bottom-[33%] right-[8%] z-15" rotation={9} delay={1.7} />
                <TornPaperText text="Nossa Família ❤️🐾" className="top-[63%] left-[58%] z-55" rotation={-6} delay={1.8} />
                <TornPaperText text="Amores de 4 patas!" className="bottom-[18%] left-[15%] z-35" rotation={5} delay={1.9} />

                {/* --- Stickers and Doodles --- */}
                <Sticker icon={Heart} className="top-[18%] left-[48%] z-5" rotation={25} delay={2.0} size={22} color="hsl(0, 80%, 70%)"/>
                <Sticker icon={Star} className="top-[45%] right-[8%] z-15" rotation={-30} delay={2.1} size={26} color="hsl(50, 90%, 70%)"/>
                <Sticker icon={Flower2} className="bottom-[43%] left-[8%] z-35" rotation={35} delay={2.2} size={24} color="hsl(300, 70%, 80%)"/>
                <Sticker icon={PawPrint} className="bottom-[10%] right-[40%] z-25" rotation={-15} delay={2.3} size={28} color="hsl(30, 60%, 70%)"/>

                <Doodle icon={Sparkles} className="top-[85%] left-[55%] z-10" rotation={15} delay={2.4} size={20} />
                <Doodle icon={Pin} className="top-[5%] right-[5%] z-30" rotation={-25} delay={2.5} size={18} color="hsl(var(--foreground)/0.5)"/>
                <Doodle icon={Paperclip} className="bottom-[55%] left-[30%] z-5" rotation={90} delay={2.6} size={22} color="hsl(var(--foreground)/0.4)"/>
                <Doodle icon={Heart} className="top-[80%] right-[30%] z-5 text-red-300/50" rotation={-10} delay={2.7} size={16} />

            </div>

            <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-black bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Flower size={20} className="text-red-600" />
                    <span className="text-sm text-white font-medium">
                      Ao andar pelo jardim, repare que algumas flores crescem voltadas para o sol com uma raiz profunda.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
