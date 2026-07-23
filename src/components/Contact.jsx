import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Download, X, Eye, Instagram } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { VelocityMarquee } from './VelocityMarquee';
import { LetterStagger } from './LetterStagger';
import SectionReveal from './SectionReveal';
import { useReducedMotion, easing, duration } from '../utils/motionConfig';

const Contact = () => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const reduced = useReducedMotion();

    const socialLinks = [
        { icon: <Github size={22} />, href: "https://github.com/dennisjoseph2025" },
        { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/dennisjoseph2025" },
        { icon: <Instagram size={22} />, href: "https://www.instagram.com/its.denjo/" },
        {
            icon: <FileText size={22} />,
            onClick: (e) => {
                e.preventDefault();
                setIsResumeOpen(true);
            }
        },
    ];

    return (
        <section id="contact" className="bg-[#050505] md:bg-[#0D0D0D] px-4 md:px-6 pt-16 md:pt-24 pb-6 md:pb-8 flex flex-col relative z-10 border-t border-white/[0.02]">
            <div className="max-w-7xl mx-auto w-full">
                <SectionReveal>
                    <div className="mb-12 md:mb-20">
                        <h2 className="text-[14vw] md:text-[10vw] font-black text-white leading-[0.8] tracking-tighter mb-6 md:mb-8">
                            <LetterStagger>LET'S</LetterStagger>
                            <br />
                            <LetterStagger delay={0.3}>Connect</LetterStagger>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: duration.slow, delay: 0.4, ease: easing.outExpo }}
                            className="text-base md:text-2xl text-neutral-400 max-w-xl leading-relaxed"
                        >
                            I'm currently available for freelance work and full-time roles. If you have a project that needs some creative motion, let's talk.
                        </motion.p>
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                    <div className="border-t border-white/5 md:border-neutral-800 pt-8 md:pt-12 flex flex-col gap-8">
                        <motion.a
                            href="mailto:dennisjoseph2025@gmail.com"
                            whileHover={reduced ? {} : { x: 4 }}
                            className="group flex items-center gap-3 md:gap-4 hover:text-neutral-400 transition-colors"
                        >
                            <MagneticButton className="p-3 md:p-4 bg-white rounded-full text-black group-hover:scale-110 transition-transform duration-300">
                                <Mail size={24} />
                            </MagneticButton>
                            <span className="text-white font-bold break-all text-sm md:text-3xl">
                                dennisjoseph2025@gmail.com
                            </span>
                        </motion.a>

                        <div className="flex gap-3 md:gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: duration.fast, ease: easing.outExpo }}
                                >
                                    {social.href ? (
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener"
                                            className="text-white hover:text-neutral-400"
                                        >
                                            <MagneticButton className="p-3 md:p-4 border border-white/10 md:border-neutral-800 rounded-full hover:bg-white/5 md:hover:bg-neutral-900 transition-colors">
                                                {social.icon}
                                            </MagneticButton>
                                        </a>
                                    ) : (
                                        <button
                                            onClick={social.onClick}
                                            className="text-white hover:text-neutral-400"
                                        >
                                            <MagneticButton className="p-3 md:p-4 border border-white/10 md:border-neutral-800 rounded-full hover:bg-white/5 md:hover:bg-neutral-900 transition-colors">
                                                {social.icon}
                                            </MagneticButton>
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>
            </div>

            {/* Resume Selection Modal */}
            <AnimatePresence>
                {isResumeOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsResumeOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-3xl max-w-sm w-full shadow-2xl"
                        >
                            <button
                                onClick={() => setIsResumeOpen(false)}
                                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-lg md:text-xl font-bold text-white mb-5 md:mb-6">Resume Options</h3>

                            <div className="grid gap-3">
                                <a
                                    href="/Dennis Joseph.pdf"
                                    target="_blank"
                                    rel="noopener"
                                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group"
                                    onClick={() => setIsResumeOpen(false)}
                                >
                                    <div className="p-2.5 md:p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-black transition-colors">
                                        <Eye size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">View Online</div>
                                        <div className="text-xs text-neutral-400">Opens in new tab</div>
                                    </div>
                                </a>

                                <a
                                    href="/Dennis Joseph.pdf"
                                    download="Dennis_Joseph_Resume.pdf"
                                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group"
                                    onClick={() => setIsResumeOpen(false)}
                                >
                                    <div className="p-2.5 md:p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-black transition-colors">
                                        <Download size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">Download PDF</div>
                                        <div className="text-xs text-neutral-400">Save to your device</div>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Velocity Marquee Footer */}
            <div className="mt-8 md:mt-10 border-t border-white/5 md:border-neutral-800 pt-4 md:pt-5 overflow-hidden">
                <VelocityMarquee baseVelocity={2}>
                    <span className="text-4xl md:text-6xl lg:text-8xl font-black text-white/10 md:text-white/20 tracking-tighter uppercase">
                        DENNIS JOSEPH • SOFTWARE DEVELOPER • REACT • MOTION DESIGN •
                    </span>
                </VelocityMarquee>
            </div>

            <div className="flex justify-between items-end text-white/20 md:text-neutral-600 uppercase text-[10px] md:text-sm font-medium tracking-widest pt-5 md:pt-6">
                <span>© 2026 Dennis Joseph</span>
                <span className="hidden md:inline">Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
            </div>
        </section>
    );
};

export default Contact;
