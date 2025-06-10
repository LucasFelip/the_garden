import React from 'react';
import { motion } from 'framer-motion';
import { Github, Heart, PawPrint, Key } from 'lucide-react'; // Using Heart, PawPrint, Key
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }} // Slightly longer transition
          // Using theme colors, subtle background texture
          className="bg-[hsl(var(--card)/0.5)] text-[hsl(var(--card-foreground))] py-8 px-4 text-center backdrop-blur-sm border-t border-[hsl(var(--border)/0.3)] relative overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--border)/0.05) 0.5px, transparent 0)`,
            backgroundSize: '10px 10px',
          }}
      >
        {/* Optional: Subtle decorative element like a vine */}
        {/* <div className="absolute bottom-0 left-0 w-full h-4 bg-repeat-x bg-[url('/path/to/vine-border.svg')] opacity-30"></div> */}

        <div className="container mx-auto relative z-10">
          {/* Citação especial */}
          <p className="font-caveat text-xl md:text-2xl mb-6 text-[hsl(var(--primary-foreground))] leading-relaxed italic">
            "Nem ácida nem alcalina, perfeitamente desalinhada com meu caos. <br className="hidden sm:inline" />
            Te adoro, te amo e te <span className="font-semibold not-italic text-[hsl(var(--primary))]">acelumdisperilosiuoso</span>."
            <Heart className="inline-block ml-2 text-red-400/80 transform rotate-[-8deg]" size={20} fill="currentColor" />
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 text-sm">
            {/* Link GitHub */}
            <a
                href="https://github.com/LucasFelip/the_garden"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
                aria-label="Repositório do projeto no GitHub"
            >
              <Github className="w-5 h-5 mr-1.5 group-hover:scale-110 transition-transform" />
              <span className="border-b border-transparent group-hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300 pb-px">Código-fonte do Jardim</span>
            </a>

            {/* Créditos Pets */}
            <span className="flex items-center text-[hsl(var(--muted-foreground))]">
            <PawPrint className="w-5 h-5 mr-1.5 text-[hsl(var(--accent-foreground)/0.7)]" />
            Com participação especial de Lion & Thor
          </span>
          </div>

          {/* Construído com... */}
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
            Construído com <span className="text-[hsl(var(--primary))]">React</span> no coração e <span className="text-yellow-500">girassóis</span> no código.
          </p>

          {/* Link Secreto e Copyright */}
          <Link
              to="/jardim/secret" // Ensure this route matches your secret page route
              className="group text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary-foreground))] transition-colors duration-300 inline-flex items-center relative"
              title="Um segredo espera por você..."
              style={{ textDecoration: 'none' }}
          >
          <span className="opacity-0 group-hover:opacity-100 absolute -left-4 top-1/2 -translate-y-1/2 transition-opacity duration-300">
            <Key size={12} className="text-[hsl(var(--primary))]"/>
          </span>
            © {new Date().getFullYear()} ESTE LUGAR foi feito com <Heart size={10} className="inline mx-0.5 text-red-500/90 fill-current"/> para Manu, por Lucas.
            <span className="opacity-0 group-hover:opacity-100 absolute -right-4 top-1/2 -translate-y-1/2 transition-opacity duration-300">
             <Key size={12} className="text-[hsl(var(--primary))]"/>
          </span>
          </Link>
        </div>
      </motion.footer>
  );
};

export default Footer;

