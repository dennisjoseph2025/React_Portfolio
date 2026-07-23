import { motion } from 'framer-motion';
import { Database, GitBranch, Layout, Layers, Server } from 'lucide-react';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';
import { useReducedMotion, easing, duration } from '../utils/motionConfig';

const skillCategories = [
    {
        title: "Backend",
        icon: Server,
        color: "#10B981",
        skills: ["Python", "Django", "DRF", "Celery", "Redis"]
    },
    {
        title: "Cloud",
        icon: GitBranch,
        color: "#EF4444",
        skills: ["AWS", "Docker", "Actions", "Linux", "Nginx"]
    },
    {
        title: "Database",
        icon: Database,
        color: "#F59E0B",
        skills: ["PostgreSQL", "SQL", "Redis"]
    },
    {
        title: "Frontend",
        icon: Layout,
        color: "#8B5CF6",
        skills: ["React", "TypeScript", "JavaScript", "Tailwind"]
    },
    {
        title: "State",
        icon: Layers,
        color: "#06B6D4",
        skills: ["Redux Toolkit", "Context API", "RTK Query"]
    }
];

const Skills = () => {
    const reduced = useReducedMotion();

    return (
        <section className="py-12 px-4 bg-[#050505] relative z-10 border-t border-white/[0.02]">
            <div id="skills" className="max-w-6xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-1">
                            <TextScramble>SKILLS</TextScramble>
                        </h2>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ duration: duration.slow, delay: index * 0.06, ease: easing.outExpo }}
                                className="bg-white/[0.02] border border-white/5 rounded-xl p-3"
                            >
                                <div className="flex items-center gap-2 mb-2.5">
                                    <div
                                        className="p-1 rounded-md"
                                        style={{ backgroundColor: `${category.color}12` }}
                                    >
                                        <Icon size={12} style={{ color: category.color }} />
                                    </div>
                                    <h3 className="text-xs font-semibold text-white/80">{category.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {category.skills.map((skill, i) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 + i * 0.03, duration: 0.25 }}
                                            className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-md text-white/50 text-[10px] cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
