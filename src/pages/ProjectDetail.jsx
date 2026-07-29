import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Github, ChevronRight, ChevronLeft, Layout, Cpu, Lightbulb } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import Background3D from "../components/Background3D";

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = getProjectBySlug(slug);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!project || project.screenshots.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % project.screenshots.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [project]);

    if (!project) {
        return (
            <>
                <Helmet>
                    <title>Project Not Found — Dennis Joseph Portfolio</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
                        <Link to="/" className="text-white/60 hover:text-white underline">Back to portfolio</Link>
                    </div>
                </div>
            </>
        );
    }

    const nextImage = () => setActiveIdx((prev) => (prev + 1) % project.screenshots.length);
    const prevImage = () => setActiveIdx((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);

    return (
        <>
            <Helmet>
                <title>{project.title} — Dennis Joseph (Denjo) Portfolio</title>
                <meta name="description" content={`${project.title} by Dennis Joseph (Denjo). ${project.tagline}. ${project.outcome}`} />
                <meta name="keywords" content={`${project.title}, Dennis Joseph, Denjo, dennisjoseph2025, ${project.tech.join(', ')}, portfolio project`} />
                <link rel="canonical" href={`https://dennis-r.vercel.app/project/${project.slug}`} />
                <meta property="og:title" content={`${project.title} — Dennis Joseph (Denjo) Portfolio`} />
                <meta property="og:description" content={`${project.tagline}. Built by Dennis Joseph (Denjo).`} />
                <meta property="og:url" content={`https://dennis-r.vercel.app/project/${project.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Dennis Joseph Portfolio" />
                <meta property="og:image" content={`https://dennis-r.vercel.app${project.image}`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${project.title} — Dennis Joseph (Denjo) Portfolio`} />
                <meta name="twitter:description" content={`${project.tagline}. Built by Dennis Joseph.`} />
                <meta name="twitter:image" content={`https://dennis-r.vercel.app${project.image}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "name": project.title,
                        "description": `${project.tagline}. ${project.outcome}`,
                        "author": {
                            "@type": "Person",
                            "name": "Dennis Joseph",
                            "alternateName": "Denjo",
                            "url": "https://dennis-r.vercel.app/"
                        },
                        "url": `https://dennis-r.vercel.app/project/${project.slug}`,
                        "image": `https://dennis-r.vercel.app${project.image}`,
                        "techStack": project.tech
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white pb-24">

            <Background3D />

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
                        className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest font-medium">Back to Projects</span>
                    </button>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/30 hidden sm:block">
                        {project.title} • Overview
                    </span>
                </div>
            </nav>

            <main className="pt-32 px-6 max-w-7xl mx-auto relative z-10">

                {/* Hero Grid: Info (Left) & Gallery (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Project Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase mb-6">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                                {project.tagline}
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                                {project.title}
                            </h1>
                            <p className="text-white/60 text-base leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-xs font-medium text-white/70">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-black font-bold text-xs tracking-widest uppercase transition-transform hover:scale-105 shadow-lg"
                                style={{ backgroundColor: project.color }}
                            >
                                Visit Live Site <ExternalLink size={16} />
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-xs font-bold tracking-widest uppercase"
                            >
                                Source Code <Github size={16} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Premium Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 w-full flex flex-col gap-4"
                    >
                        {/* Main Image Frame */}
                        <motion.div
                            whileHover={{ scale: 1.01, rotateX: -1, rotateY: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            style={{ perspective: 700, transformStyle: 'preserve-3d' }}
                            className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden group shadow-2xl"
                        >
                            {/* Browser-like dots for aesthetic */}
                            <div className="absolute top-0 left-0 w-full px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center gap-2 z-20">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            </div>

                            <div className="absolute inset-0 pt-10">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeIdx}
                                        src={project.screenshots[activeIdx]}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="w-full h-full object-cover object-top"
                                        alt={`${project.title} screenshot ${activeIdx + 1}`}
                                        loading="lazy"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Hover Navigation Controls */}
                            {project.screenshots.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20">
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {project.screenshots.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {project.screenshots.map((src, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden shrink-0 transition-all duration-300 ${activeIdx === idx ? 'ring-2 ring-offset-2 ring-offset-black opacity-100' : 'opacity-40 hover:opacity-100'}`}
                                        style={{ '--tw-ring-color': activeIdx === idx ? project.color : 'transparent' }}
                                    >
                                        <img src={src} alt="thumbnail" className="w-full h-full object-cover" loading="lazy" />
                                        {activeIdx !== idx && <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Details Section (Features & Architecture) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16"
                >
                    {/* Features List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ scale: 1.02, rotateX: 2 }}
                        style={{ perspective: 600, transformStyle: 'preserve-3d' }}
                        className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl bg-white/5">
                                <Layout size={20} style={{ color: project.color }} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Key Features</h3>
                        </div>
                        <div className="space-y-4">
                            {project.built.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 text-white/60 text-sm leading-relaxed">
                                    <ChevronRight size={16} className="mt-1 shrink-0" style={{ color: project.color }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Architecture List */}
                    {project.architecture && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.02, rotateX: 2 }}
                            style={{ perspective: 600, transformStyle: 'preserve-3d' }}
                            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <Cpu size={20} style={{ color: project.color }} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Architecture & Scale</h3>
                            </div>
                            <div className="space-y-4">
                                {project.architecture.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 text-white/60 text-sm leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: project.color }} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Takeaway / Conclusion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 pt-16 border-t border-white/5 text-center flex flex-col items-center"
                >
                    <div className="p-4 rounded-full bg-white/5 mb-6">
                        <Lightbulb size={24} style={{ color: project.color }} />
                    </div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-6">The Takeaway</h3>
                    <p className="text-lg md:text-2xl text-white/70 font-light italic max-w-4xl mx-auto leading-relaxed">
                        "{project.outcome}"
                    </p>
                </motion.div>

            </main>
        </div>
        </>
    );
};

export default ProjectDetail;
