import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, PawPrint, MessageSquare, CalendarDays, Milestone, Sparkles, Sun, Flower } from 'lucide-react'; // Added Sun

// New component for the organic timeline line (using SVG for flexibility)
const OrganicTimelineLine = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
            <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent) / 0.2)" />
                <stop offset="50%" stopColor="hsl(var(--accent) / 0.7)" />
                <stop offset="100%" stopColor="hsl(var(--accent) / 0.2)" />
            </linearGradient>
            {/* Filter for a slightly rough/organic texture */}
            <filter id="rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.02 0.5" numOctaves="1" result="turbulence"/>
                <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
        </defs>
        {/* Path for the main vine/branch */}
        <path
            d="M 50,0 Q 48,20 52,40 T 48,60 T 52,80 T 50,100"
            stroke="url(#vineGradient)"
            strokeWidth="3"
            fill="none"
            className="translate-x-[5px] md:translate-x-0"
            // filter="url(#rough)" // Optional: Apply filter for texture
        />
        {/* Smaller leaves/tendrils (example) */}
        <path
            d="M 50,15 q -3,2 -2,5 M 50,35 q 3,3 2,6 M 50, 55 q -4,2 -3,5 M 50, 75 q 4,3 3,6"
            stroke="hsl(var(--accent) / 0.6)"
            strokeWidth="1"
            fill="none"
            className="translate-x-[5px] md:translate-x-0"
        />
    </svg>
);

const HistorySection = () => {
    const [hearts, setHearts] = useState([]);
    const [showSecretMessage, setShowSecretMessage] = useState(false);
    const [secretMessageTimer, setSecretMessageTimer] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);
    const [loopTribute, setLoopTribute] = useState(false);
    const lastItemRef = useRef(null);

    const timelineItems = [
        { date: "02/06/2019", title: "A Lamparina Mágica", event: "Aniversário do Ivaldo — a mensagem na lamparina que acendeu nossa chama.", icon: MessageSquare, secret: null },
        { date: "12/06/2019", title: "O Primeiro Beijo", event: "Ali, sob as estrelas (ou quase), nosso universo particular começou a se formar.", icon: Heart, secret: { type: 'heart_burst' } },
        { date: "28/09/2019", title: "O Início Oficial", event: "Nosso capítulo mais bonito começou aqui. O 'sim' que mudou tudo.", icon: CalendarDays, secret: { type: 'gift', message: "Esse capítulo foi só o começo da nossa história de amor. Cada dia ao seu lado é uma nova página que escrevemos juntos." } },
        { date: "31/12/2019", title: "Primeiro Réveillon", event: "Nossa primeira virada de ano juntos, brindando ao futuro que mal podíamos esperar.", icon: Gift, secret: { type: 'gift', message: "Nossa primeira virada de ano foi um presságio de todos os momentos mágicos que ainda estaríamos por viver." } },
        { date: "2020", title: "Ano da Pandemia", event: "Um ano desafiador para o mundo, mas encontramos nossos refúgios e fortalecemos nosso laço.", icon: Heart, secret: null },
        { date: "26/03/2020", title: "Retiro Inesquecível", event: "Nosso primeiro retiro juntos, cheio de risadas, orações e... alguns tombos meus.", icon: Milestone, secret: null },
        { date: "08/07/2020", title: "Intimidade e Conexão", event: "Um passo importante, aprofundando nossa confiança e nosso amor.", icon: Heart, secret: null },
        { date: "28/08/2020", title: "Cabelo Raspado #1", event: "A primeira vez que raspei o cabelo — sua cara de brava foi impagável, mas seu amor permaneceu.", icon: Heart, secret: null },
        { date: "2021", title: "A Volta às Aulas", event: "A rotina voltando aos poucos, e a alegria de poder te encontrar mais vezes.", icon: CalendarDays, secret: null },
        { date: "23/03/2021", title: "Apoio Incondicional", event: "Mesmo em meio a mudanças e desafios, ter você ao meu lado fez tudo valer a pena.", icon: Heart, secret: null },
        { date: "2022", title: "Cabelo Raspado #2", event: "É... de novo! 😅 E você continuou me amando, mesmo com minhas loucuras capilares.", icon: Heart, secret: null },
        { date: "28/07/2022", title: "Amor à Beira-Mar", event: "Sua paixão pela praia começou a me contagiar (apesar do sol!). Mais um motivo para te amar.", icon: Sun, secret: null },
        { date: "28/09/2022", title: "Troca de Corações", event: "Em nosso aniversário, dei meu coração a você, e você me deu o seu — um presente eterno.", icon: Gift, secret: { type: 'gift', message: "Nesse dia eu dei meu coração pra você, mas na verdade ele já era seu desde o primeiro beijo." } },
        { date: "31/12/2022", title: "Despedida do Loop", event: "Nos despedimos do pequeno Loop — seu apoio foi meu porto seguro nesse momento difícil.", icon: PawPrint, secret: { type: 'paw_tribute' } },
        { date: "28/07/2023", title: "Viagem a Itapecuru", event: "Conhecendo suas raízes, sua família e a tranquilidade (e calor!) do interior.", icon: Milestone, secret: null },
        { date: "Agosto/2023", title: "Cuidando da Vó Tereza", event: "Acolhemos a vó Tereza em São Luís, um gesto de carinho que aqueceu nossos corações.", icon: Heart, secret: null },
        { date: "07/08/2023", title: "Aventura em Santo Amaro", event: "Nossa viagem a Santo Amaro, com a recuperação do nosso guerreiro Lion.", icon: PawPrint, secret: null },
        { date: "31/12/2023", title: "Nossa Virada a Sós", event: "Nossa primeira virada de ano só nós dois, celebrando o amor e a esperança.", icon: Gift, secret: { type: 'gift', message: "Que todas as viradas sejam assim, juntinhos, sonhando e realizando." } },
        { date: "08/03/2024", title: "Força na Defesa", event: "Dia Internacional da Mulher — e você, minha mulher incrível, me dando força para a defesa do mestrado.", icon: Heart, secret: null },
        { date: "29/03/2024", title: "Noite All Blue", event: "A noite do pijama all blue e os combinados de amor eterno. Nossas conversas que curam.", icon: MessageSquare, secret: null },
        { date: "04/08/2024", title: "Vó Tereza na Praia", event: "A alegria contagiante da Dona Tereza aproveitando a praia e o sol, um presente para todos nós.", icon: Sun, secret: null },
        { date: "01/01/2025", title: "Virada Íntima", event: "Nossa virada de ano especial, com promessas de amor e sonhos compartilhados, da forma mais nossa.", icon: Heart, secret: null },
        { date: "07/03/2025", title: "Sua Defesa Triunfal", event: "Sua defesa de TCC — que orgulho imenso senti ali, admirando sua inteligência e paixão.", icon: Milestone, secret: null },
        { date: "09/04/2025", title: "Sua Colação de Grau", event: "Sua colação de grau — um dos dias mais lindos, vendo você brilhar e conquistar seu sonho.", icon: Gift, secret: { type: 'gift', message: "Ver você realizada é a minha maior felicidade. Parabéns, meu amor!" } },
        { date: "12/06/2025", title: "Nosso Dia Especial", event: "Mais um Dia dos Namorados... celebrando o dia em que tudo começou e o amor que só cresce.", icon: Heart, secret: null },
        { date: "Continua...", title: "Próximos Capítulos", event: "Nossa história está só começando. Cada novo dia é uma aventura a ser escrita juntos.", icon: Sparkles, secret: { type: 'gift', message: "Existem muitos segredos a serem descobertos, mas aqui estão alguns deles." } },
    ];

    const createHearts = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newHearts = Array.from({ length: 15 }, (_, i) => ({
            id: Date.now() + i,
            x: rect.left + rect.width / 2 + (Math.random() * 40 - 20),
            y: rect.top + rect.height / 2 + (Math.random() * 40 - 20),
            size: Math.random() * 15 + 8,
            delay: i * 0.04
        }));
        setHearts(prev => [...prev, ...newHearts]);
        setTimeout(() => setHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id))), 2500);
    };

    const handleIconClick = (e, item) => {
        if (item.secret?.type === 'heart_burst') createHearts(e);
        if (item.secret?.type === 'gift') setSelectedGift({ date: item.date, secretMessage: item.secret.message });
        if (item.secret?.type === 'paw_tribute') setLoopTribute(true);
    };

    const handleLastItemHover = () => {
        const timer = setTimeout(() => setShowSecretMessage(true), 2000);
        setSecretMessageTimer(timer);
    };

    const handleLastItemLeave = () => {
        if (secretMessageTimer) clearTimeout(secretMessageTimer);
        setShowSecretMessage(false);
    };

    return (
        <div
            id="history"
            className="py-16 px-4 relative bg-[hsl(var(--background))] overflow-hidden min-h-screen"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23${'hsl(var(--muted))'.replace(/[^0-9a-f]/gi, '').slice(-6)}' fill-opacity='0.04'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM6 50c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm74 43c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM50 11c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Firefly/Gold Dust Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={`firefly-${i}`}
                    className="absolute rounded-full pointer-events-none z-10"
                    style={{
                        width: `${Math.random() * 4 + 2}px`, // Smaller size
                        height: `${Math.random() * 4 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        // Soft yellow glow
                        background: `radial-gradient(circle, hsla(50, 100%, 80%, ${Math.random() * 0.6 + 0.3}), transparent 70%)`,
                        boxShadow: `0 0 ${Math.random() * 6 + 3}px hsla(50, 100%, 75%, 0.4)`
                    }}
                    animate={{
                        y: [0, Math.random() * 20 - 10, 0], // Slower vertical drift
                        x: [0, Math.random() * 15 - 7.5, 0], // Slower horizontal drift
                        opacity: [0, 0.7, 0.7, 0], // Fade in/out
                        scale: [0.3, 1, 1, 0.3]
                    }}
                    transition={{
                        duration: Math.random() * 12 + 8, // Longer, slower duration
                        repeat: Infinity,
                        ease: "linear", // Smoother, less bouncy
                        delay: Math.random() * 10 // Random start delay
                    }}
                />
            ))}

            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary-foreground))] mb-16 text-center font-caveat drop-shadow-lg relative z-20"
            >
                Nossa História: Os Caminhos do Jardim
            </motion.h2>

            {/* Floating Hearts Container */}
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-red-400/80 pointer-events-none z-30"
                        initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 1 }}
                        animate={{ y: heart.y - 120, x: heart.x + (Math.random() * 80 - 40), scale: [0, 1.1, 1, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2.5, delay: heart.delay, ease: "easeOut" }}
                        exit={{ opacity: 0 }}
                    >
                        <Heart size={heart.size} fill="currentColor" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Modals - Kept the same styling from v2 */}
            <AnimatePresence>
                {selectedGift && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedGift(null)}
                    >
                        <motion.div
                            className="bg-[hsl(var(--card))] rounded-xl p-6 md:p-8 max-w-md w-full text-center relative shadow-xl border border-[hsl(var(--border)/0.5)] book-page-edge"
                            initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" onClick={() => setSelectedGift(null)} aria-label="Fechar presente">✕</button>
                            <div className="mb-5"><Gift size={48} className="mx-auto text-[hsl(var(--primary))]" /></div>
                            <h3 className="text-2xl font-bold text-[hsl(var(--primary-foreground))] mb-3 font-caveat">Um Presente da Memória</h3>
                            <p className="text-[hsl(var(--foreground)/0.9)] mb-4 leading-relaxed">{selectedGift.secretMessage}</p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] italic">{selectedGift.date}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {loopTribute && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLoopTribute(false)}
                    >
                        <motion.div
                            className="bg-[hsl(var(--card))] rounded-xl p-6 md:p-8 max-w-md w-full text-center relative shadow-xl border border-[hsl(var(--border)/0.5)] book-page-edge"
                            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ delay: 0.1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" onClick={() => setLoopTribute(false)} aria-label="Fechar homenagem">✕</button>
                            <PawPrint size={56} className="mx-auto text-[hsl(var(--secondary))] mb-5" />
                            <h3 className="text-3xl font-bold text-[hsl(var(--primary-foreground))] mb-4 font-caveat">Para Nosso Pequeno Loop</h3>
                            <motion.p className="text-[hsl(var(--foreground)/0.9)] text-lg mb-6 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Alguns amigos deixam marcas tão profundas que sua lembrança vira presente eterno. Obrigado por todo amor, companheirinho.</motion.p>
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}>
                                <button className="px-6 py-2 bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-full transition-colors border border-[hsl(var(--border))] shadow-sm" onClick={() => setLoopTribute(false)}>Guardar no Coração</button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timeline Structure */}
            <div className="relative max-w-4xl mx-auto space-y-10 md:space-y-14 z-20">
                {/* Organic Line Component - Positioned behind items */}
                <div className="absolute inset-y-0 left-5 md:left-1/2 w-1.5 -translate-x-1/2 z-0">
                    <OrganicTimelineLine />
                </div>

                {timelineItems.map((item, index) => {
                    const isLastItem = index === timelineItems.length - 1;

                    return (
                        <div
                            key={index}
                            className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group z-10"
                        >
                            {/* Icon Marker */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 150 }}
                                whileHover={{ scale: 1.15, rotate: item.secret ? 5 : 0 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleIconClick(e, item)}
                                className={`flex items-center justify-center w-12 h-12 rounded-full 
                                            bg-[hsl(var(--secondary)/0.9)] text-[hsl(var(--secondary-foreground))] 
                                            border-2 border-[hsl(var(--secondary-foreground)/0.5)] 
                                            shadow-lg cursor-pointer shrink-0 
                                            md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 
                                            transition-all duration-300 ease-in-out 
                                            hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] hover:border-[hsl(var(--primary-foreground)/0.7)] z-10`}
                                title={item.secret ? "Clique para uma surpresa!" : item.title}
                            >
                                <item.icon size={22} />
                            </motion.div>

                            {/* Event Card */}
                            <motion.div
                                ref={isLastItem ? lastItemRef : null}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.1, ease: "easeOut" }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0px 8px 20px hsla(var(--primary-foreground) / 0.15)",
                                    // Added subtle glow effect via shadow
                                }}
                                onHoverStart={isLastItem ? handleLastItemHover : undefined}
                                onHoverEnd={isLastItem ? handleLastItemLeave : undefined}
                                className={`relative w-[calc(100%-4.5rem)] md:w-[calc(50%-3.5rem)] 
                                            bg-[hsl(var(--card)/0.9)] backdrop-blur-sm 
                                            p-4 md:p-5 rounded-lg shadow-md 
                                            border border-[hsl(var(--border)/0.4)] 
                                            transition-shadow duration-300 
                                            book-page-edge-light z-10`}
                            >
                                <h3 className="text-sm md:text-md font-semibold text-[hsl(var(--primary-foreground))] mb-1 font-caveat">
                                    {item.title} ({item.date})
                                </h3>
                                <p className="text-xs md:text-sm text-[hsl(var(--foreground)/0.85)] leading-snug">
                                    {item.event}
                                </p>

                                {isLastItem && (
                                    <AnimatePresence>
                                        {showSecretMessage && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] text-xs rounded-md shadow-sm whitespace-nowrap"
                                            >
                                                Psst! Há uma carta secreta escondida no rodapé...
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-black bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Flower size={20} className="text-red-600" />
                    <span className="text-sm text-white font-medium">
                      Ao andar pelo jardim, perceba como até o chão guarda sementes, como segredos.
                    </span>
                </div>
            </div>

        </div>

    );
};

export default HistorySection;

