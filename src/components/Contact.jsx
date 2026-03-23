import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, Send, CheckCircle, Loader2,
    Linkedin, Github, User, MessageSquare
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CyberCard from './CyberCard';

const CONTACT_ITEMS = [
    { label: 'Email', value: 'nikeshgupta950@gmail.com', href: 'mailto:nikeshgupta950@gmail.com', icon: Mail, color: 'text-sky-500', glow: 'rgba(14,165,233,0.6)' },
    { label: 'Phone', value: '+91 7004704385', href: 'tel:+917004704385', icon: Phone, color: 'text-sky-400', glow: 'rgba(56,189,248,0.6)' },
    { label: 'LinkedIn', value: 'in/menikesh08', href: 'https://www.linkedin.com/in/menikesh08/', icon: Linkedin, color: 'text-green-500', external: true, glow: 'rgba(34,197,94,0.6)' },
    { label: 'GitHub', value: 'github.com/nikeshg89', href: 'https://github.com/nikeshg89', icon: Github, color: 'text-slate-500', external: true, glow: 'rgba(148,163,184,0.6)' },
];

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (window.location.search.includes('success=true')) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
            window.history.replaceState(null, '', window.location.pathname + '#contact');
        }
    }, []);

    const handleSubmit = () => setIsSubmitting(true);
    const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

    return (
        <section id="contact" className="relative py-24 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Soft Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                {/* Heading */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-800 dark:text-white mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Ready to level up your team? Want to discuss a project? My inbox is always open.
                    </p>
                </motion.div>

                {/* Contact Items - Horizontal Row */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 w-full">
                    {CONTACT_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="w-[140px] md:w-[160px] h-[140px]"
                        >
                            <CyberCard glowColor={item.glow} className="h-full group">
                                <a
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noreferrer' : undefined}
                                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border-none h-full w-full relative z-10 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 shadow-md dark:shadow-none" style={{ background: theme === 'dark' ? item.glow.replace('0.6', '0.1') : 'rgba(255,255,255,0.8)' }}>
                                        <item.icon className="w-6 h-6 transition-all duration-500" style={{ color: theme === 'dark' ? 'white' : item.glow.replace('rgba', 'rgb').replace(', 0.6)', ')'), filter: `drop-shadow(0 0 8px ${item.glow})` }} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-gray-300 transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-teal-400">{item.label}</span>
                                </a>
                            </CyberCard>
                        </motion.div>
                    ))}
                </div>

                {/* Center Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-2xl relative"
                >
                    <CyberCard glowColor="rgba(14,165,233,0.5)" colorFrom="#0ea5e9" className="w-full group">
                        <div className="bg-white/60 dark:bg-[#020617]/60 backdrop-blur-3xl border-none rounded-[1.5rem] p-8 md:p-12 shadow-xl relative z-10 overflow-hidden">
                            {/* Animated Neon Top Line */}
                            <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Send a Message</h3>
                            <p className="text-slate-500 dark:text-gray-400">Fill out the form below and I'll get back to you.</p>
                        </div>

                        <form action="https://formsubmit.co/nikeshgupta950@gmail.com" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="_subject" value="New message from portfolio" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + window.location.pathname + "?success=true#contact" : ""} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-sky-400 dark:bg-sky-500 rounded-xl blur transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-20' : 'opacity-0'}`} />
                                    <div className="relative flex items-center bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors focus-within:border-sky-400 dark:focus-within:border-sky-500">
                                        <div className="pl-4 text-slate-400">
                                            <User className={`w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-sky-500' : ''}`} />
                                        </div>
                                        <input
                                            type="text" id="name" name="name" required
                                            value={formState.name} onChange={handleChange}
                                            onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent px-4 py-3.5 text-slate-700 dark:text-white font-medium outline-none placeholder:text-slate-400"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-sky-400 dark:bg-sky-500 rounded-xl blur transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-20' : 'opacity-0'}`} />
                                    <div className="relative flex items-center bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors focus-within:border-sky-400 dark:focus-within:border-sky-500">
                                        <div className="pl-4 text-slate-400">
                                            <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-sky-500' : ''}`} />
                                        </div>
                                        <input
                                            type="email" id="email" name="email" required
                                            value={formState.email} onChange={handleChange}
                                            onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent px-4 py-3.5 text-slate-700 dark:text-white font-medium outline-none placeholder:text-slate-400"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <div className={`absolute inset-0 bg-sky-400 dark:bg-sky-500 rounded-xl blur transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-20' : 'opacity-0'}`} />
                                <div className="relative flex bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors focus-within:border-sky-400 dark:focus-within:border-sky-500 pt-3.5">
                                    <div className="pl-4 text-slate-400 shrink-0 mt-0.5">
                                        <MessageSquare className={`w-5 h-5 transition-colors ${focusedField === 'message' ? 'text-sky-500' : ''}`} />
                                    </div>
                                    <textarea
                                        id="message" name="message" required rows={5}
                                        value={formState.message} onChange={handleChange}
                                        onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                                        className="w-full bg-transparent px-4 py-0 text-slate-700 dark:text-white font-medium outline-none placeholder:text-slate-400 resize-none pb-4"
                                        placeholder="Write your message here..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit" disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group/btn w-full overflow-hidden text-white font-black uppercase tracking-widest text-sm py-5 rounded-xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 border border-white/20"
                                style={{ background: 'linear-gradient(135deg, #0ea5e9, #6d28d9)', boxShadow: '0 10px 30px rgba(14,165,233,0.4)' }}
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover/btn:opacity-100 opacity-0 transition-opacity duration-300" />
                                
                                {/* Sweeping Light Effect */}
                                <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none skew-x-[-25deg] translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
                                
                                <span className="relative z-10 flex items-center gap-3 text-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                                    {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : <Send className="w-6 h-6" />}
                                    {isSubmitting ? 'Transmitting...' : 'Send Message Now'}
                                </span>
                            </motion.button>
                        </form>

                        {/* Success State Overlay */}
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(16px)' }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/90 dark:bg-[#020617]/95 flex flex-col items-center justify-center z-20 text-center p-8 rounded-[1.5rem]">
                                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.5 }} className="w-24 h-24 rounded-full flex items-center justify-center mb-6 text-white bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-[0_0_40px_rgba(34,197,94,0.6)]">
                                        <CheckCircle size={48} />
                                    </motion.div>
                                    <h3 className="text-4xl font-black font-orbitron text-slate-900 dark:text-white mb-4">Transmission Successful</h3>
                                    <p className="text-slate-600 dark:text-gray-300 text-lg">Your signal has reached my inbox. Expect a response soon.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    </CyberCard>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
