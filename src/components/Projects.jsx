import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ExternalLink, ChevronRight, LayoutGrid, List } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard3D from "./ProjectCard3D";
import { useIsMobile } from "../utils/useIsMobile";

const GalleryCard = ({ project, index, isActive, onClick }) => {
    return (
        <ProjectCard3D color={project.color}>
        <motion.button
            layout
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative text-left rounded-xl overflow-hidden border transition-all duration-300 ${
                isActive
                    ? 'border-white/20 bg-white/5 ring-1 ring-white/10'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'
            }`}
        >
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] font-mono text-white/30 block mb-1">0{index + 1}</span>
                <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
                <p className="text-[11px] text-white/40 line-clamp-1">{project.tagline}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="px-1.5 py-0.5 text-[9px] font-mono bg-white/5 text-white/30 rounded border border-white/5">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="text-[9px] text-white/20 font-mono">+{project.tech.length - 3}</span>
                    )}
                </div>
            </div>
            {isActive && (
                <motion.div
                    layoutId="galleryActive"
                    className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                    style={{ borderColor: project.color + '40' }}
                />
            )}
        </motion.button>
        </ProjectCard3D>
    );
};

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewMode, setViewMode] = useState('sidebar');
    const activeProject = projects[activeIndex];
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'g' || e.key === 'G') {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                e.preventDefault();
                setViewMode(v => v === 'sidebar' ? 'gallery' : 'sidebar');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    if (isMobile) {
        return (
            <section ref={sectionRef} className="py-20 px-4 bg-[#050505] relative z-10 overflow-hidden border-t border-white/[0.03]">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"
                />

                <div className="max-w-7xl mx-auto relative">
                    <div id="projects" className="scroll-mt-[15vh]">
                        <div className="mb-6">
                            <h2 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase leading-none">
                                PROJECTS
                            </h2>
                            <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <LayoutGrid size={12} />
                                <span>Select a project below</span>
                            </div>
                        </div>

                        {/* Horizontal scrollable tab bar */}
                        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1 scrollbar-hide">
                            {projects.map((project, index) => (
                                <button
                                    key={project.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 border ${
                                        activeIndex === index
                                            ? 'text-white border-white/20 bg-white/10'
                                            : 'text-white/30 border-white/5 bg-white/[0.02] hover:bg-white/5'
                                    }`}
                                    style={activeIndex === index ? { borderColor: project.color + '40', boxShadow: `0 0 20px ${project.color}15` } : {}}
                                >
                                    {project.title}
                                </button>
                            ))}
                        </div>

                        {/* Active project compact card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                            >
                                {/* Image */}
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <span className="text-[10px] font-mono text-white/30 block mb-1">0{activeIndex + 1}</span>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{activeProject.title}</h3>
                                        <p className="text-white/40 text-xs mt-1">{activeProject.tagline}</p>
                                    </div>
                                </div>

                                {/* Compact content */}
                                <div className="p-5 space-y-4">
                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeProject.tech.map(t => (
                                            <span key={t} className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/40 rounded-sm border border-white/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => navigate(`/project/${activeProject.slug}`)}
                                            className="w-full px-4 py-3 text-[11px] font-mono uppercase tracking-widest font-bold rounded-xl transition-all text-center"
                                            style={{ backgroundColor: activeProject.color, color: '#000' }}
                                        >
                                            View Details →
                                        </button>
                                        <div className="flex gap-2">
                                            <a
                                                href={activeProject.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white/40 hover:text-white transition-all text-[11px] font-mono uppercase tracking-widest"
                                            >
                                                <ExternalLink size={12} />
                                                <span>Code</span>
                                            </a>
                                            <a
                                                href={activeProject.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-white transition-all text-[11px] font-mono uppercase tracking-widest"
                                            >
                                                <ArrowUpRight size={12} />
                                                <span>Live</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-neutral-950 relative z-10 overflow-hidden border-t border-white/[0.03]">
            <motion.div
                style={{ y: backgroundY }}
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative">
                <div id="projects" className="scroll-mt-[15vh]">
                    {/* Section header + view toggle */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-5xl font-black text-white tracking-tighter mb-2 uppercase leading-none">
                                PROJECTS
                            </h2>
                            <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <LayoutGrid size={12} />
                                <span>{viewMode === 'gallery' ? 'Gallery View' : 'Select Project'}</span>
                                <span className="text-white/10 ml-2">Press G to toggle</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setViewMode(v => v === 'sidebar' ? 'gallery' : 'sidebar')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-[11px] font-mono uppercase tracking-wider"
                        >
                            {viewMode === 'sidebar' ? <LayoutGrid size={14} /> : <List size={14} />}
                            <span>{viewMode === 'sidebar' ? 'Gallery' : 'List'}</span>
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {viewMode === 'gallery' ? (
                            /* Gallery View */
                            <motion.div
                                key="gallery"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {projects.map((project, index) => (
                                    <GalleryCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        isActive={activeIndex === index}
                                        onClick={() => setActiveIndex(index)}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            /* Sidebar View */
                            <motion.div
                                key="sidebar"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="relative bg-neutral-900/30 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm"
                            >
                                <div className="flex flex-col lg:flex-row min-h-[700px]">
                                    {/* Left Side: Navigation Sidebar */}
                                    <div className="lg:w-1/4 border-r border-neutral-800/50 p-8 pt-12 flex flex-col justify-start gap-4 bg-neutral-950/20">
                                        {projects.map((project, index) => (
                                            <button
                                                key={project.id}
                                                onClick={() => setActiveIndex(index)}
                                                className={`group relative text-left p-4 rounded-md transition-all duration-500 ${
                                                    activeIndex === index
                                                        ? 'bg-white/5 border-white/10 translate-x-2'
                                                        : 'hover:bg-white/[0.02] border-transparent'
                                                } border`}
                                            >
                                                <div className="relative z-10">
                                                    <span className={`text-[10px] font-mono mb-1 block ${
                                                        activeIndex === index ? 'text-white/40' : 'text-white/20'
                                                    }`}>
                                                        0{index + 1}
                                                    </span>
                                                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                                                        activeIndex === index ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                                                    }`}>
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        layoutId="activeGlow"
                                                        className="absolute inset-x-0 -left-0 w-1 h-8 bg-current rounded-full m-auto"
                                                        style={{ backgroundColor: project.color, left: '-2px', top: '0', bottom: '0' }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Right Side: Content Area */}
                                    <div className="lg:w-3/4 p-8 lg:p-14 relative overflow-hidden flex flex-col">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeProject.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex flex-col h-full"
                                            >
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="h-px w-8 bg-white/20" />
                                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                                                            Project details
                                                        </span>
                                                    </div>

                                                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                                                        {activeProject.title}
                                                    </h3>
                                                    <p className="text-white/30 text-sm mb-4">{activeProject.tagline}</p>
                                                    <p className="text-white/50 text-base leading-relaxed max-w-2xl">
                                                        {activeProject.problem}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start mt-auto">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-bold">Tech Stack</h4>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {activeProject.tech.map(t => (
                                                                    <span key={t} className="px-2.5 py-1 text-[10px] font-mono bg-white/5 text-white/40 rounded-sm border border-white/10">
                                                                        {t}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-bold">Key features</h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                                {activeProject.built.slice(0, 4).map((item, i) => (
                                                                    <div key={i} className="flex items-start gap-2 text-white/50 text-xs">
                                                                        <ChevronRight size={10} className="mt-0.5 shrink-0" style={{ color: activeProject.color }} />
                                                                        <span>{item}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {activeProject.built.length > 4 && (
                                                                <p className="text-[10px] text-white/20 mt-2 font-mono">
                                                                    +{activeProject.built.length - 4} more features on detail page
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            <button
                                                                onClick={() => navigate(`/project/${activeProject.slug}`)}
                                                                className="px-4 py-2 text-[11px] font-mono uppercase tracking-widest font-bold rounded-lg transition-all"
                                                                style={{ backgroundColor: activeProject.color, color: '#000' }}
                                                            >
                                                                View Full Details
                                                            </button>
                                                            <a
                                                                href={activeProject.github}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800/50 hover:bg-white/5 rounded-lg border border-neutral-700 text-white/40 hover:text-white transition-all text-[11px] font-mono uppercase tracking-widest"
                                                            >
                                                                <ExternalLink size={12} />
                                                                <span>Code</span>
                                                            </a>
                                                            <a
                                                                href={activeProject.demo}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all text-[11px] font-mono uppercase tracking-widest"
                                                            >
                                                                <ArrowUpRight size={12} />
                                                                <span>Live</span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-4">
                                                        <ProjectCard3D color={activeProject.color}>
                                                        <button
                                                            onClick={() => navigate(`/project/${activeProject.slug}`)}
                                                            className="block relative aspect-video rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700/50 shadow-2xl group w-full text-left cursor-pointer"
                                                        >
                                                            <img
                                                                src={activeProject.image}
                                                                alt={activeProject.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-mono uppercase tracking-wider">
                                                                    View Full Details →
                                                                </span>
                                                            </div>
                                                        </button>
                                                        </ProjectCard3D>

                                                        <div className="pt-4 border-t border-neutral-800/50">
                                                            <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold">The Takeaway</h4>
                                                            <p className="text-white/40 text-xs leading-relaxed italic line-clamp-2">{activeProject.outcome}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Projects;
