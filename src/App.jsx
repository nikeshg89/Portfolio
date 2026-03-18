import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

const Loader = () => (
    <motion.div
        initial={{ opacity: 1 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
    >
        <div className="relative">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-t-2 border-r-2 border-primary"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-b-2 border-l-2 border-secondary absolute top-2 left-2"
            />
        </div>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
        >
            NIKESH
        </motion.div>
    </motion.div>
);

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial load
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {loading && <Loader />}
            </AnimatePresence>

            <div className={`min-h-screen transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <ScrollProgress />
                <ParticlesBackground />

                {/* Noise Texture Overlay */}
                <div className="noise-bg"></div>
                <CustomCursor />

                <Navbar />

                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    {/* Experience includes Training, Certifications, Extracurricular, Education */}
                    <Experience />
                    <Contact />
                </main>

                <Footer />
                <CommandPalette />
            </div>
        </>
    );
}

export default App;
