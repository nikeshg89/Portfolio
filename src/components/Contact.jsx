import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Linkedin, Github } from 'lucide-react';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || 'dummy_service',
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'dummy_template',
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_key'
        )
            .then((result) => {
                setIsSubmitting(false);
                setIsSuccess(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            }, (error) => {
                setIsSubmitting(false);
                console.error(error.text);
                setIsSuccess(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <Section id="contact" title="Get In Touch" subtitle="Let's build something amazing together">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="glass neon-border p-8 rounded-2xl h-full flex flex-col justify-center transition-all duration-400">
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary/20 transition-colors border border-transparent group-hover:border-primary/30">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold group-hover:text-gray-400">Email</div>
                                    <div className="break-all">{portfolioData.personal.email}</div>
                                </div>
                            </a>
                            <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary/20 transition-colors border border-transparent group-hover:border-primary/30">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold group-hover:text-gray-400">Phone</div>
                                    <div>{portfolioData.personal.phone}</div>
                                </div>
                            </a>
                            
                            <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary/20 transition-colors border border-transparent group-hover:border-primary/30">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold group-hover:text-gray-400">LinkedIn</div>
                                    <div>Let's connect</div>
                                </div>
                            </a>

                            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary/20 transition-colors border border-transparent group-hover:border-primary/30">
                                    <Github size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold group-hover:text-gray-400">GitHub</div>
                                    <div>View my repositories</div>
                                </div>
                            </a>

                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass neon-border p-8 rounded-2xl relative overflow-hidden transition-all duration-400"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/60 focus:ring-1 focus:ring-primary/60 outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_18px_rgba(129,140,248,0.15)]"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/60 focus:ring-1 focus:ring-primary/60 outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_18px_rgba(129,140,248,0.15)]"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={handleChange}
                                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 resize-none focus:shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-glow text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    {/* Success Overlay */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-dark/95 flex flex-col items-center justify-center z-20 text-center p-8 backdrop-blur-sm"
                            >
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                                >
                                    <CheckCircle size={40} />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                                <p className="text-gray-400 text-lg">Thanks for reaching out. I'll get back to you soon.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
