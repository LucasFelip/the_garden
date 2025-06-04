import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import WelcomeScreen from '@/screens/WelcomeScreen';
import GardenHeader from '@/components/layout/GardenHeader';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SunflowerCursor, PetalRain, FloatingPetal } from '@/components/layout/Effects';

// Importação das seções reais
import HomeSection from '@/sections/HomeSection';
import HistorySection from '@/sections/HistorySection';
import ProfileSection from '@/sections/ProfileSection';
import GallerySection from '@/sections/GallerySection';
import CulturesSection from '@/sections/CulturesSection';
import SecretSection from '@/sections/SecretSection';

const gardenSectionsConfig = [
    { id: 'home', path: 'home', label: 'Entrada do Jardim', icon: null, component: HomeSection },
    { id: 'historia', path: 'historia', label: 'Alameda das Memórias', icon: null, component: HistorySection },
    { id: 'perfil', path: 'perfil', label: 'Recanto do Girassol', icon: null, component: ProfileSection },
    { id: 'galeria', path: 'galeria', label: 'Jardim das Imagens', icon: null, component: GallerySection },
    { id: 'culturas', path: 'culturas', label: 'Canteiro dos Sonhos', icon: null, component: CulturesSection }
];

const GardenLayout = () => {
    return (
        <div className="min-h-screen bg-beige-100 text-brown-800 font-merriweather relative overflow-x-hidden antialiased flex flex-col">
            <SunflowerCursor />
            <PetalRain showPetals={true} />
            {Array.from({ length: 15 }).map((_, i) => <FloatingPetal key={i} delay={Math.random() * 8} />)}

            <GardenHeader sections={gardenSectionsConfig} />

            <main className="container mx-auto px-4 py-20">
                <Routes>
                    {gardenSectionsConfig.map(section => (
                        <Route key={section.id} path={section.path} element={<section.component />} />
                    ))}
                    {/* Rota “secreta” */}
                    <Route path="secret" element={<SecretSection />} />
                </Routes>
            </main>

            <Footer />
            <Toaster />
        </div>
    );
};

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/jardim/*" element={<GardenLayout />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default App;
