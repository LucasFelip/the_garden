import React from 'react';
    import { motion } from 'framer-motion';

    const NavItem = ({ sectionId, icon: Icon, label, activeSection, setActiveSection }) => (
      <motion.button
        whileHover={{ scale: 1.1, color: '#FFBF00' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveSection(sectionId)}
        className={`flex flex-col items-center p-2 mx-1 sm:mx-2 rounded-lg transition-all duration-300 ${activeSection === sectionId ? 'text-yellow-400 scale-110 font-semibold' : 'text-yellow-100 hover:bg-yellow-500/25'}`}
        aria-label={`Navegar para ${label}`}
      >
        <Icon size={window.innerWidth < 640 ? 22 : 28} className="mb-1 drop-shadow-sm" />
        <span className="text-xs sm:text-sm font-medium">{label}</span>
      </motion.button>
    );

    const Header = ({ sections, activeSection, setActiveSection }) => {
      return (
        <header className="sticky top-0 z-[1000] bg-yellow-400/80 backdrop-blur-lg shadow-xl border-b-4 border-brown-600">
          {/* <!-- Navegue pelos capítulos da nossa história, meu girassol. --> */}
          <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-around items-center">
            {sections.map(section => (
              <NavItem 
                key={section.id} 
                sectionId={section.id} 
                icon={section.icon} 
                label={section.label}
                activeSection={activeSection}
                setActiveSection={setActiveSection} 
              />
            ))}
          </div>
        </header>
      );
    };

    export default Header;