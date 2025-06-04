import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Heart, Leaf, Camera, Flower} from 'lucide-react'; // Using garden-related icons

const GallerySection = () => {
    // Base path for images (ensure this matches your project structure, e.g., public/gallery_images/)
    const imageBase = '/public/img/'; // Using the same base as ProfileSection for consistency

    // Updated gallery items using the provided image list
    const galleryItems = [
        {src: `${imageBase}manu_gym.jpg`, alt: "Manu na academia", category: "Fitness & Força"},
        {src: `${imageBase}manu_colacao.jpg`, alt: "Manu sorrindo na formatura", category: "Conquistas"},
        {src: `${imageBase}amizades_da_manu.jpg`, alt: "Manu com amigas na formatura", category: "Amizades"},
        {src: `${imageBase}manu_gym_group.jpg`, alt: "Manu com amigas de bicicleta", category: "Aventuras"},
        {src: `${imageBase}manu_and_family.jpg`, alt: "Manu com a família", category: "Família"}, // Assuming family/friends
        {src: `${imageBase}baby_manu.jpg`, alt: "Manu bebê", category: "Primeiros Passos"},
        {src: `${imageBase}manu_infancia.jpg`, alt: "Manu na infância", category: "Memórias"},
        {src: `${imageBase}manu_and_lusca.jpg`, alt: "Lucas e Manu na praia", category: "Nós Dois"},
        {src: `${imageBase}ocean.jpg`, alt: "Paisagem da praia", category: "Paisagens"},
        {src: `${imageBase}nos.png`, alt: "Lucas, Manu e o cachorro", category: "Nossa Família"},
        {src: `${imageBase}thor.png`, alt: "Cachorro Thor deitado", category: "Nossos Amores"},
        {src: `${imageBase}lion_and_loop2.png`, alt: "Dois cachorros sentados", category: "Nossos Amores"},
        {src: `${imageBase}thor_and_lion.png`, alt: "Dois cachorros se olhando", category: "Nossos Amores"},
        {src: `${imageBase}nosso_momento.jpg`, alt: "Manu e Lucas quando ela disse sim", category: "Nós Dois"},
        {src: `${imageBase}lion_thor_.jpg`, alt: "Lion e Thor juntinhos", category: "Nossos Amores"},
        {src: `${imageBase}colacao_lucas_manu.jpg`, alt: "Manu e Lucas juntos na colação", category: "Nós Dois"},
        {src: `${imageBase}kiss2_manu_lucas.jpg`, alt: "Beijos e beijos", category: "Nós Dois"},
        {src: `${imageBase}dark_manu_lucas.jpg`, alt: "Manu e Lucas trevosos", category: "Nós Dois"},
        {src: `${imageBase}risos_manu_lion.jpg`, alt: "Manu e Lion felizes", category: "Memórias"},
        {src: `${imageBase}risos_nos.jpg`, alt: "Manu e Lucas rindo", category: "Nós Dois"},
        { src: `${imageBase}manu_tereza_lucas.jpg`, alt: "Manu, Dona Tereza e Lucas", category: "Memórias" },
        { src: `${imageBase}manu_lucas_lion_soninho.jpg`, alt: "Manu, Lucas e Lion com soninho", category: "Memórias" },
        { src: `${imageBase}lucas_ufma.jpg`, alt: "Lucas na UFMA", category: "Nós Dois" },
        { src: `${imageBase}lucas_thor.jpg`, alt: "Lucas e Thor juntinhos", category: "Memórias" },
        { src: `${imageBase}lucas_fome.jpg`, alt: "Lucas com fome", category: "Memórias" },
        { src: `${imageBase}lucas_dorgado.jpg`, alt: "Lucas medicado", category: "Nós Dois" },
        { src: `${imageBase}lucas_a_mimir.jpg`, alt: "Manu e Lucas que está 'a mimir'", category: "Memórias" },
        { src: `${imageBase}kiss_manu_lucas.jpg`, alt: "Beijos e beijos", category: "Nós Dois" },
        { src: `${imageBase}first_manu_lucas.jpg`, alt: "Manu e Lucas no 'SIM'", category: "Primeiros Passos" },
        // Add more images if needed, ensure they exist in the imageBase directory
    ];

    // State to manage the modal view
    const [selectedImg, setSelectedImg] = useState(null);

    const handleDoubleClick = (e, item) => {
        // Show a heart animation on double click
        const heartEl = document.createElement('div');
        heartEl.innerHTML = '❤️';
        heartEl.style.position = 'absolute';
        heartEl.style.top = '50%';
        heartEl.style.left = '50%';
        heartEl.style.transform = 'translate(-50%, -50%) scale(0)';
        heartEl.style.fontSize = '4rem';
        heartEl.style.color = 'hsl(var(--primary))'; // Use theme primary color
        heartEl.style.textShadow = '0 2px 4px hsla(0, 0%, 0%, 0.3)';
        heartEl.style.transition = 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.5s ease-out';
        heartEl.style.zIndex = '50'; // Ensure heart is above image
        if (e.currentTarget) {
            e.currentTarget.appendChild(heartEl);
            setTimeout(() => {
                heartEl.style.transform = 'translate(-50%, -50%) scale(1.5)';
                heartEl.style.opacity = '1';
            }, 50);
            setTimeout(() => {
                heartEl.style.transform = 'translate(-50%, -50%) scale(1)';
                heartEl.style.opacity = '0';
                setTimeout(() => heartEl.remove(), 500);
            }, 800); // Slightly longer visibility
        }
        // Optional: Display a message or trigger another action
        // alert('❤️ Coração Escondido Encontrado! ❤️\nVocê é o meu momento favorito!');
    };

    return (
        <div
            id="gallery"
            className="py-16 px-4 relative"
            style={{
                // Subtle garden background texture or color
                backgroundColor: 'hsl(var(--background))', // Use theme background
                // Optional: Add a subtle pattern like leaves or vines
                // backgroundImage: 'url("/path/to/subtle-vine-pattern.svg")',
            }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary-foreground))] mb-10 md:mb-16 text-center font-caveat drop-shadow-md"
            >
                Recantos do Nosso Jardim: Galeria de Memórias
            </motion.h2>

            {/* Grid layout for the gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.src + index} // Use a more unique key
                        className="relative group overflow-hidden rounded-lg shadow-md aspect-[4/5] cursor-pointer border-4 border-transparent hover:border-[hsl(var(--primary)/0.5)] transition-colors duration-300"
                        style={{
                            // Wooden frame effect
                            backgroundColor: 'hsl(30, 30%, 85%)', // Light wood color
                            padding: '6px', // Space for the frame
                            boxShadow: '3px 3px 8px hsla(var(--foreground)/0.2)',
                        }}
                        whileHover={{ y: -5, zIndex: 10, boxShadow: "5px 5px 15px hsla(var(--foreground)/0.3)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 100 }}
                        onDoubleClick={(e) => handleDoubleClick(e, item)}
                        onClick={() => setSelectedImg(item)} // Open modal on single click
                        title={item.alt} // Use alt text for title
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-sm" // Slight zoom on hover
                            loading="lazy" // Lazy load images
                        />
                        {/* Category label styled like a small tag */}
                        <div className="absolute bottom-2 left-2 bg-[hsl(var(--primary)/0.8)] text-[hsl(var(--primary-foreground))] px-2 py-0.5 rounded-sm text-[10px] md:text-[11px] font-semibold font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                            <Leaf size={10} className="inline mr-1"/> {item.category}
                        </div>
                        {/* Camera icon indicating clickable */}
                        <div className="absolute top-2 right-2 bg-[hsl(var(--card)/0.7)] text-[hsl(var(--card-foreground))] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Camera size={14} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for viewing selected image */}
            {selectedImg && (
                <motion.div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedImg(null)} // Close modal on background click
                >
                    <motion.div
                        className="relative max-w-3xl max-h-[80vh] bg-white p-2 rounded-lg shadow-xl border-4 border-[hsl(var(--primary)/0.7)]"
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
                    >
                        <img
                            src={selectedImg.src}
                            alt={selectedImg.alt}
                            className="block max-w-full max-h-[calc(80vh-40px)] object-contain rounded-sm"
                        />
                        <p className="text-center text-sm text-gray-700 mt-2 font-semibold bg-white/80 p-1 rounded-b-md">{selectedImg.alt}</p>
                        <button
                            onClick={() => setSelectedImg(null)}
                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                            aria-label="Fechar imagem"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}

            <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-black bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Flower size={20} className="text-red-600" />
                    <span className="text-sm text-white font-medium">
                      Ao andar pelo jardim, note que até sob as molduras mais belas, algumas lembranças escorrem até os pés.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GallerySection;

