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

const AboutBlock = ({ title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="group"
    >
        <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">{title}</h3>
        {children}
    </motion.div>
);

const AboutItem = ({ children, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ x: 8 }}
        className="flex items-center gap-2.5 py-2.5 border-b border-white/5 text-white/70 hover:text-white transition-colors cursor-default"
    >
        {Icon && <Icon size={14} className="text-white/30" />}
        <span>{children}</span>
    </motion.div>
);

const IdentityTag = ({ children, delay = 0 }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ scale: 1.05 }}
        className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/80 text-xs font-medium mr-1.5 mb-1.5"
    >
        {children}
    </motion.span>
);

const About = () => {
    return (
        <section className="py-12 md:py-24 px-4 md:px-6 bg-[#050505] md:bg-neutral-950 relative z-10 border-t border-white/[0.03]">
            <div id="about" className="max-w-6xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5 md:mb-14">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tighter mb-1 md:mb-3 uppercase">
                            <TextScramble>ABOUT</TextScramble>
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: easing.outExpo }}
                            className="h-0.5 md:h-1 bg-white/15 md:bg-white/20"
                        />
                    </div>
                </SectionReveal>

                {/* Mobile: compact */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-2">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easing.outExpo }}
                            className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Identity</h3>
                            <div className="flex flex-wrap gap-1">
                                <Tag>Full-Stack</Tag>
                                <Tag>Python/Django</Tag>
                                <Tag>AWS</Tag>
                                <Tag>React</Tag>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06, ease: easing.outExpo }}
                            className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">What I Do</h3>
                            <Row icon={Code} delay={0.1}>REST APIs with DRF</Row>
                            <Row icon={Layers} delay={0.12}>PostgreSQL schemas</Row>
                            <Row icon={Zap} delay={0.14}>Celery & Redis</Row>
                            <Row icon={Globe} delay={0.16}>AWS deploy & scale</Row>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12, ease: easing.outExpo }}
                            className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">How I Work</h3>
                            <Row delay={0.1}>Learn by building</Row>
                            <Row delay={0.12}>Fundamentals first</Row>
                            <Row delay={0.14}>Clean over noise</Row>
                            <Row delay={0.16}>Iterate to improve</Row>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18, ease: easing.outExpo }}
                            className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Focus</h3>
                            <Row icon={Target} delay={0.1}>Django + Celery</Row>
                            <Row icon={Target} delay={0.12}>AWS automation</Row>
                            <Row icon={Target} delay={0.14}>AI backends</Row>
                            <Row icon={Target} delay={0.16}>Docker & CI/CD</Row>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24, ease: easing.outExpo }}
                            className="col-span-2 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-2">Facts</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-white/40"><MapPin size={10} /><span className="text-xs">Kozhikode, Kerala</span></div>
                                <div className="flex items-center gap-1.5 text-white/40"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-xs">On-site</span></div>
                                <div className="flex items-center gap-1.5 text-white/40"><Globe size={10} /><span className="text-xs">English</span></div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Desktop: original spacious design */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                        <AboutBlock title="Identity" delay={0}>
                            <div className="flex flex-wrap">
                                <IdentityTag delay={0.05}>Full-Stack Developer</IdentityTag>
                                <IdentityTag delay={0.1}>Python / Django Backend</IdentityTag>
                                <IdentityTag delay={0.15}>AWS Cloud Architect</IdentityTag>
                                <IdentityTag delay={0.2}>API Design (DRF)</IdentityTag>
                                <IdentityTag delay={0.25}>React Frontend</IdentityTag>
                            </div>
                        </AboutBlock>
                        <AboutBlock title="What I Do" delay={0.1}>
                            <AboutItem icon={Code} delay={0.1}>Build REST APIs with Django REST Framework</AboutItem>
                            <AboutItem icon={Layers} delay={0.15}>Architect PostgreSQL databases & schemas</AboutItem>
                            <AboutItem icon={Zap} delay={0.2}>Orchestrate async tasks with Celery & Redis</AboutItem>
                            <AboutItem icon={Globe} delay={0.25}>Deploy & scale on AWS (EC2, RDS, S3, CloudFront)</AboutItem>
                            <AboutItem icon={RefreshCw} delay={0.3}>Automate CI/CD with GitHub Actions & Docker</AboutItem>
                        </AboutBlock>
                        <AboutBlock title="How I Work" delay={0.2}>
                            <AboutItem delay={0.1}>Learn by building</AboutItem>
                            <AboutItem delay={0.15}>Fundamentals before frameworks</AboutItem>
                            <AboutItem delay={0.2}>Clean structure over visual noise</AboutItem>
                            <AboutItem delay={0.25}>Improve through iteration</AboutItem>
                        </AboutBlock>
                        <AboutBlock title="Current Focus" delay={0.3}>
                            <AboutItem icon={Target} delay={0.1}>Scaling Django apps with Celery & Redis caching</AboutItem>
                            <AboutItem icon={Target} delay={0.15}>AWS infrastructure automation & monitoring</AboutItem>
                            <AboutItem icon={Target} delay={0.2}>Building AI-powered backend services</AboutItem>
                            <AboutItem icon={Target} delay={0.25}>Docker & CI/CD for production deployments</AboutItem>
                        </AboutBlock>
                        <AboutBlock title="Quick Facts" delay={0.4}>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2.5 text-white/60"><MapPin size={14} /><span className="text-sm">Kozhikode, Kerala</span></div>
                                <div className="flex items-center gap-2.5 text-white/60"><span className="w-3.5 h-3.5 rounded-full bg-green-500/50 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /></span><span className="text-sm">On-site developer</span></div>
                                <div className="flex items-center gap-2.5 text-white/60"><Globe size={14} /><span className="text-sm">English communication</span></div>
                                <div className="flex items-center gap-2.5 text-white/60"><Zap size={14} /><span className="text-sm">Active learner & builder</span></div>
                            </div>
                        </AboutBlock>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
