import { motion } from 'framer-motion';
import { MapPin, Globe, Zap, Code, Layers, RefreshCw, Target } from 'lucide-react';
import { easing, duration, useReducedMotion } from '../utils/motionConfig';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';

const Tag = ({ children, delay = 0 }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay, ease: easing.outExpo }}
        className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/65 text-[10px] font-medium"
    >
        {children}
    </motion.span>
);

const Row = ({ children, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0"
    >
        {Icon && <Icon size={11} className="text-white/20 shrink-0" />}
        <span className="text-white/50 text-xs">{children}</span>
    </motion.div>
);

const About = () => {
    return (
        <section className="py-12 px-4 bg-[#050505] relative z-10 border-t border-white/[0.03]">
            <div id="about" className="max-w-6xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">
                            <TextScramble>ABOUT</TextScramble>
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 32 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: easing.outExpo }}
                            className="h-0.5 bg-white/15"
                        />
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Identity</h3>
                        <div className="flex flex-wrap gap-1">
                            <Tag>Full-Stack</Tag>
                            <Tag>Python/Django</Tag>
                            <Tag>AWS</Tag>
                            <Tag>React</Tag>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.06, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">What I Do</h3>
                        <Row icon={Code} delay={0.1}>REST APIs with DRF</Row>
                        <Row icon={Layers} delay={0.12}>PostgreSQL schemas</Row>
                        <Row icon={Zap} delay={0.14}>Celery & Redis</Row>
                        <Row icon={Globe} delay={0.16}>AWS deploy & scale</Row>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.12, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">How I Work</h3>
                        <Row delay={0.1}>Learn by building</Row>
                        <Row delay={0.12}>Fundamentals first</Row>
                        <Row delay={0.14}>Clean over noise</Row>
                        <Row delay={0.16}>Iterate to improve</Row>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.18, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Focus</h3>
                        <Row icon={Target} delay={0.1}>Django + Celery</Row>
                        <Row icon={Target} delay={0.12}>AWS automation</Row>
                        <Row icon={Target} delay={0.14}>AI backends</Row>
                        <Row icon={Target} delay={0.16}>Docker & CI/CD</Row>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.24, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Facts</h3>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-white/40">
                                <MapPin size={10} />
                                <span className="text-xs">Kozhikode, Kerala</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs">On-site</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/40">
                                <Globe size={10} />
                                <span className="text-xs">English</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
