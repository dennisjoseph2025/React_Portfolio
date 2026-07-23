import { motion } from 'framer-motion';
import { Database, GitBranch, Layout, Layers, Server } from 'lucide-react';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';
import { useReducedMotion, easing, duration } from '../utils/motionConfig';

const skillCategories = [
    { title: "Backend", icon: Server, color: "#10B981", skills: ["Python", "Django", "DRF", "Celery", "Redis"] },
    { title: "Cloud", icon: GitBranch, color: "#EF4444", skills: ["AWS", "Docker", "Actions", "Linux", "Nginx"] },
    { title: "Database", icon: Database, color: "#F59E0B", skills: ["PostgreSQL", "SQL", "Redis"] },
    { title: "Frontend", icon: Layout, color: "#8B5CF6", skills: ["React", "TypeScript", "JavaScript", "Tailwind"] },
    { title: "State", icon: Layers, color: "#06B6D4", skills: ["Redux Toolkit", "Context API", "RTK Query"] }
];

const skillCategoriesFull = [
    { title: "Backend", icon: Server, color: "#10B981", skills: ["Python", "Django", "Django REST Framework", "REST APIs", "Celery", "Redis", "JWT", "OAuth"] },
    { title: "Cloud & DevOps", icon: GitBranch, color: "#EF4444", skills: ["AWS (EC2, RDS, S3, CloudFront)", "Docker", "GitHub Actions", "Linux", "Nginx", "PgBouncer"] },
    { title: "Database", icon: Database, color: "#F59E0B", skills: ["PostgreSQL", "SQL", "Redis", "Database Design"] },
    { title: "Frontend", icon: Layout, color: "#8B5CF6", skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
    { title: "State Management", icon: Layers, color: "#06B6D4", skills: ["Redux Toolkit", "Context API", "RTK Query"] }
];

const SkillCategoryFull = ({ category, index }) => {
    const Icon = category.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
        >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                        <Icon size={18} style={{ color: category.color }} />
                    </div>
                    <h3 className="text-base font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 flex-1">
                    {category.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs cursor-default transition-colors"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const reduced = useReducedMotion();

    return (
        <section className="py-12 md:py-24 px-4 md:px-6 bg-[#050505] md:bg-[#0D0D0D] relative z-10 border-t border-white/[0.02]">
            <div id="skills" className="max-w-6xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-5 md:mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tighter mb-1 md:mb-3">
                            <TextScramble>SKILLS</TextScramble>
                        </h2>
                    </div>
                </SectionReveal>

                {/* Mobile: compact */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-2">
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
                                        <div className="p-1 rounded-md" style={{ backgroundColor: `${category.color}12` }}>
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

                {/* Desktop: original spacious design */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                        {skillCategoriesFull.map((category, index) => (
                            <SkillCategoryFull key={category.title} category={category} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
