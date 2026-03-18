import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Command } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const actions = [
        { id: 'home', name: 'Go to Home', section: '#home' },
        { id: 'about', name: 'Go to About', section: '#about' },
        { id: 'skills', name: 'View Skills', section: '#skills' },
        { id: 'projects', name: 'View Projects', section: '#projects' },
        { id: 'experience', name: 'View Experience', section: '#experience' },
        { id: 'contact', name: 'Contact Me', section: '#contact' },
    ];

    const filteredActions = actions.filter(action =>
        action.name.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = (section) => {
        const element = document.querySelector(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg bg-[#0f1629] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                            <Search size={20} className="text-gray-500" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-600 h-6"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                                <span className="text-[10px]">ESC</span>
                            </div>
                        </div>

                        <div className="py-2 max-h-[300px] overflow-y-auto">
                            {filteredActions.length > 0 ? (
                                filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        onClick={() => handleSelect(action.section)}
                                        className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 hover:border-l-2 hover:border-primary transition-all group ${index === 0 ? 'bg-white/[0.02]' : ''}`}
                                    >
                                        <span className="text-gray-300 group-hover:text-white flex items-center gap-2">
                                            {index === 0 && query && <ArrowRight size={14} className="text-primary" />}
                                            {action.name}
                                        </span>
                                        <span className="text-xs text-gray-600 group-hover:text-primary">Jump to</span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                    No results found.
                                </div>
                            )}
                        </div>

                        <div className="bg-white/5 px-4 py-2 text-[10px] text-gray-500 flex justify-between">
                            <span>Navigation</span>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1"><Command size={10} /> + K to close</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
