import { GithubIcon } from "@/components/Icons";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

interface ProjectItem {
    id: string;
    title: string;
    category: string;
    categoryLabel: string;
    year: string;
    description: string;
    tags: string[];
    videoPath?: string;
}


export default function ProjectCard({
    project,
    bgStyle,
    viewProjectText,
}: {
    project: ProjectItem;
    bgStyle: string;
    viewProjectText: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (project.videoPath) {
            // Temporizador para la línea de carga antes de reproducir el video
            timerRef.current = setTimeout(() => {
                setIsVideoReady(true);
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch((err) => {
                        console.log("Error al reproducir video:", err);
                    });
                }
            }, 700);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setIsVideoReady(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <article
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            tabIndex={0}
            className="group relative rounded-3xl glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
            {/* Project Card Image Banner / Video Preview */}
            <div
                className="relative w-full h-56 sm:h-72 overflow-hidden flex items-center justify-center p-6 select-none"
                style={{ background: bgStyle }}
            >
                {/* Loading Progress Bar (Línea de carga) */}
                {project.videoPath && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-black/40 z-30 overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r from-amber-400 via-accent-gold to-amber-200 transition-all shadow-[0_0_10px_rgba(226,184,87,0.9)] ${isHovered
                                ? "w-full duration-700 ease-out"
                                : "w-0 duration-300 ease-in"
                                }`}
                        />
                    </div>
                )}

                {/* Video Element */}
                {project.videoPath && (
                    <>
                        <video
                            ref={videoRef}
                            src={project.videoPath}
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none z-10 ${isVideoReady && isHovered
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-105"
                                }`}
                        />
                        {/* Ambient overlay over video for contrast */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-500 ${isVideoReady && isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </>
                )}

                {/* Background Dark Overlay */}
                {/*  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" /> */}

                {/* Floating badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-cinzel tracking-wider uppercase border border-white/15 shadow-sm">
                    <Sparkles
                        size={12}
                        className={isVideoReady && isHovered ? "text-amber-400 animate-pulse" : ""}
                    />
                    <span>{project.categoryLabel}</span>
                </div>

                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    {project.videoPath && isHovered && !isVideoReady && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/20 animate-pulse">
                            Cargando...
                        </span>
                    )}
                    {project.videoPath && isVideoReady && isHovered && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Preview
                        </span>
                    )}
                    <span className="text-white/80 text-xs font-cinzel px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        {project.year}
                    </span>
                </div>

                {/* Decorative Art Motif inside preview (Poster fallback) */}
                <div
                    className={`relative z-10 text-center text-white/90 p-4 transition-all duration-500 ${isVideoReady && isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
                        }`}
                >
                    <span className="font-editorial text-2xl sm:text-3xl font-light italic tracking-wider block transform group-hover:scale-105 transition-transform duration-500">
                        {project.title.split("—")[0]}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-current transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-80 font-light leading-relaxed font-sans-clean">
                        {project.description}
                    </p>
                </div>

                {/* Tags & Action Links */}
                <div className="pt-4 border-t border-current/10 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-current/5 border border-current/10 opacity-80"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 rounded-full border border-current/20 hover:border-current hover:bg-current/10 transition-all cursor-pointer"
                            title="GitHub Repository"
                            aria-label="GitHub Repository"
                        >
                            <GithubIcon size={16} />
                        </button>
                        <button
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider font-semibold hover:scale-105 transition-all cursor-pointer"
                            style={{
                                backgroundColor: "var(--text-primary)",
                                color: "var(--bg-primary)",
                            }}
                        >
                            <span>{viewProjectText}</span>
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}