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

const Loader = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => Math.min(p + Math.random() * 15 + 5, 100));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute w-[800px] h-[800px] bg-[#0ea5e9]/10 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full border-t-2 border-r-2 border-[#0ea5e9] opacity-80"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(14,165,233,0.8))' }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 rounded-full border-b-2 border-l-2 border-[#22c55e] absolute top-2 left-2 opacity-80"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(34,197,94,0.8))' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-[#0ea5e9] to-[#22c55e]">
                        {Math.floor(progress)}%
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-black font-orbitron tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(14,165,233,0.8)]"
                >
                    <span className="bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22c55e] bg-clip-text text-transparent">
                        NIKESH
                    </span>
                </motion.div>
                <div className="text-[#0ea5e9] text-xs font-semibold tracking-widest uppercase mt-4 opacity-70">
                    Initializing Environment
                </div>

                {/* Cyberpunk Progress Bar */}
                <div className="w-64 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden relative shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <motion.div 
                        initial={{ width: '0%' }} 
                        animate={{ width: `${progress}%` }} 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

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
