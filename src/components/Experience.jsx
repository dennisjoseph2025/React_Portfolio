import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';
import { useReducedMotion, easing, duration } from '../utils/motionConfig';

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

const Experience = () => {
    const reduced = useReducedMotion();

    return (
        <section className="py-12 px-4 bg-[#050505] relative z-10 border-t border-white/[0.03]">
            <div id="experience" className="max-w-4xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-1">
                            <TextScramble>EXPERIENCE</TextScramble>
                        </h2>
                    </div>
                </SectionReveal>

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
                                    <span className="flex items-center gap-1">
                                        <Briefcase size={10} />
                                        <span className="text-white/50">{exp.company}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={10} />
                                        {exp.period}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={10} />
                                        {exp.location}
                                    </span>
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
                                        <ChevronRight size={10} className="mt-0.5 shrink-0 text-white/15" />
                                        {resp}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-1">
                                {exp.tech.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.03 }}
                                        className="px-1.5 py-0.5 bg-white/5 border border-white/8 rounded text-[9px] text-white/30"
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
