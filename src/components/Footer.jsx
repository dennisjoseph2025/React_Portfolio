
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#050505] md:bg-neutral-900 border-t border-white/5 md:border-white/10 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="text-center md:text-left">
                    <span className="text-lg md:text-xl font-bold tracking-tighter text-white">DENNIS JOSEPH</span>
                    <p className="text-white/20 md:text-gray-500 text-xs md:text-sm mt-1 md:mt-2">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex gap-5">
                    <a href="https://github.com/dennisjoseph2025" target="_blank" rel="noopener" className="text-white/30 hover:text-white transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="https://linkedin.com/in/dennisjoseph2025" target="_blank" rel="noopener" className="text-white/30 hover:text-white transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href="https://www.instagram.com/its.denjo/" target="_blank" rel="noopener" className="text-white/30 hover:text-white transition-colors">
                        <Instagram size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
