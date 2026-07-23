import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';
import { useReducedMotion, easing } from '../utils/motionConfig';

const experiences = [
    {
        title: "Software Developer",
        company: "Bridgeon",
        location: "Kozhikode",
        period: "Aug 2025 – Present",
        responsibilities: [
            "Frontend development with React",
            "Component-based architecture",
            "State management with Redux Toolkit",
            "REST API integration",
            "UI refinement & cross-team collaboration"
        ],
        tech: ["React", "Redux", "Tailwind", "REST APIs", "JavaScript"]
    }
];

const experiencesFull = [
    {
        title: "Software Developer (Apprenticeship)",
        company: "Bridgeon",
        location: "Kozhikode, Kerala",
        period: "Aug 2025 – Present",
        responsibilities: [
            "Frontend development using HTML, CSS, JavaScript, React",
            "Component-based architecture implementation",
            "Global state management with Redux Toolkit & Context API",
            "REST API integration for dynamic data flow",
            "UI refinement and cross-team collaboration"
        ],
        tech: ["React", "Redux Toolkit", "Tailwind", "REST APIs", "JavaScript"]
    }
];

const Experience = () => {
    const reduced = useReducedMotion();

    return (
        <section className="py-12 md:py-24 px-4 md:px-6 bg-[#050505] md:bg-neutral-950 relative z-10 border-t border-white/[0.03]">
            <div id="experience" className="max-w-4xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5 md:mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tighter mb-1 md:mb-3">
                            <TextScramble>EXPERIENCE</TextScramble>
                        </h2>
                    </div>
                </SectionReveal>

                {/* Mobile: compact */}
                <div className="md:hidden">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: reduced ? 0 : -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, ease: easing.outExpo }}
                            className="relative pl-5 pb-6 last:pb-0 border-l border-white/10"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.15, type: 'spring', stiffness: 300 }}
                                className="absolute left-[-3.5px] top-1 w-[7px] h-[7px] rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                            />
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                                <div className="mb-3">
                                    <h3 className="text-sm font-bold text-white">{exp.title}</h3>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-white/35">
                                        <span className="flex items-center gap-1"><Briefcase size={10} /><span className="text-white/50">{exp.company}</span></span>
                                        <span className="flex items-center gap-1"><Calendar size={10} />{exp.period}</span>
                                        <span className="flex items-center gap-1"><MapPin size={10} />{exp.location}</span>
                                    </div>
                                </div>
                                <ul className="space-y-1 mb-3">
                                    {exp.responsibilities.map((resp, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.15 + i * 0.04, duration: 0.25 }}
                                            className="flex items-start gap-1.5 text-white/45 text-[11px] leading-relaxed"
                                        >
                                            <ChevronRight size={10} className="mt-0.5 shrink-0 text-white/15" />{resp}
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-1">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="px-1.5 py-0.5 bg-white/5 border border-white/8 rounded text-[9px] text-white/30">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: original spacious design */}
                <div className="hidden md:block">
                    <div className="mt-14">
                        {experiencesFull.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative pl-6 pb-10 last:pb-0 border-l border-neutral-800"
                            >
                                <div className="absolute left-[-4px] top-0 w-[8px] h-[8px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-2xl p-5 hover:bg-neutral-900/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.title}</h3>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                                                <span className="flex items-center gap-1.5 font-medium text-white/60"><Briefcase size={12} />{exp.company}</span>
                                                <span className="flex items-center gap-1.5"><Calendar size={12} />{exp.period}</span>
                                                <span className="flex items-center gap-1.5"><MapPin size={12} />{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 mb-5">
                                        {exp.responsibilities.map((resp, i) => (
                                            <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                                                className="flex items-start gap-2.5 text-white/60 text-xs md:text-sm leading-relaxed">
                                                <ChevronRight size={14} className="mt-0.5 shrink-0 text-white/30" />{resp}
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.tech.map((t) => (
                                            <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/40">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
