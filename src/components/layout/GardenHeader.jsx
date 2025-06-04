import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun } from 'lucide-react'; // Added Sun for title
import { Button } from '@/components/ui/button';

const GardenHeader = ({ sections }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const NavItem = ({ section, onClick }) => {
        const isActive = location.pathname.endsWith(section.path);
        return (
            <NavLink
                to={`/jardim/${section.path}`}
                onClick={onClick}
                // Adjusted styling for subtlety
                className={`relative group text-sm font-caveat tracking-wide px-3 py-2 rounded-md transition-all duration-300 
                           ${isActive ? 'text-[hsl(var(--primary))] font-semibold' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
            >
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md 
                              ${isActive ? '' : 'group-hover:bg-[hsl(var(--muted)/0.3)]'}`}>
                    {section.icon && (
                        <motion.div
                            className="w-4 h-4"
                            initial={false}
                            animate={{ rotate: isActive ? 15 : 0 }} // Subtle rotation on active
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <section.icon strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>
                    )}
                    <span>{section.label}</span>
                </div>
                {/* Underline animation for active item */}
                {isActive && (
                    <motion.div
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[hsl(var(--primary))] rounded-full"
                        layoutId="gardenNavUnderline" // Changed layoutId for clarity
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </NavLink>
        );
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }} // Start further up
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            // Adjusted background: Using theme background color with transparency, softer border
            className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background)/0.85)] backdrop-blur-lg border-b border-[hsl(var(--border)/0.5)] shadow-sm"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.h1
                        className="text-2xl font-caveat text-[hsl(var(--primary-foreground))] tracking-wider flex items-center gap-2"
                        whileHover={{ scale: 1.03, textShadow: '0 0 5px hsl(var(--primary)/0.5)' }}
                    >
                        <Sun className="w-5 h-5 text-[hsl(var(--primary))]" />
                        Caminhos do Jardim
                    </motion.h1>

                    {/* Menu Desktop */}
                    <nav className="hidden md:flex items-center gap-1">
                        {sections.map((section) => (
                            <NavItem key={section.id} section={section} />
                        ))}
                    </nav>

                    {/* Botão menu mobile */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            // Using theme colors for button
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.3)] focus:outline-none"
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile - Adjusted background */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} // Added exit animation
                    transition={{ duration: 0.3 }}
                    // Using theme background for mobile menu
                    className="md:hidden bg-[hsl(var(--background)/0.95)] backdrop-blur-md pt-2 pb-4 space-y-1 border-t border-[hsl(var(--border)/0.5)]"
                >
                    <div className="flex flex-col items-center gap-1 px-3">
                        {sections.map((section) => (
                            <NavItem
                                key={section.id}
                                section={section}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default GardenHeader;

