import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import SectionReveal from './SectionReveal';
import TextScramble from './TextScramble';
import { useReducedMotion, easing, duration } from '../utils/motionConfig';

const Certifications = () => {
    const reduced = useReducedMotion();

    return (
        <section className="py-20 px-4 bg-[#050505] relative z-10 border-t border-white/[0.02]">
            <div id="certifications" className="max-w-6xl mx-auto scroll-mt-[15vh]">
                <SectionReveal>
                    <div className="mb-8">
                        <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
                            <TextScramble>CREDENTIALS</TextScramble>
                        </h2>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: duration.slow, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-2xl p-5"
                    >
                        <div className="flex items-center gap-2.5 mb-4">
                            <GraduationCap className="text-white/25" size={16} />
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Education</h3>
                        </div>

                        <h4 className="text-base font-bold text-white mb-1.5">B.Com – Computer Applications</h4>
                        <p className="text-white/45 text-sm mb-1">Mahatma Gandhi University, Kottayam</p>
                        <span className="text-xs text-white/25 font-mono">2022 – 2025</span>
                    </motion.div>

                    {/* Certification */}
                    <motion.div
                        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: duration.slow, delay: 0.1, ease: easing.outExpo }}
                        className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative group"
                    >
                        <div className="flex items-center gap-2.5 mb-4">
                            <Award className="text-white/25" size={16} />
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Certification</h3>
                        </div>

                        <h4 className="text-base font-bold text-white mb-1.5">EF SET English Certificate</h4>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] rounded-md border border-green-500/20 font-medium">C2 Proficient</span>
                            <span className="text-white/30 text-[10px]">Nov 2025</span>
                        </div>
                        <p className="text-white/35 text-xs">Advanced communication skills</p>

                        <div className="absolute top-5 right-5 text-white/20 group-hover:text-white/50 transition-colors">
                            <ExternalLink size={14} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
