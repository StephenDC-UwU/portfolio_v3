import { GithubIcon } from "@/components/Icons";
import { useProjectCardAnimation } from "@/app/[lang]/(home)/hooks/useProjectCardAnimation";
import { ArrowUpRight, Sparkles, Globe, Server } from "lucide-react";
import { ProjectItem } from "@/types/ProjectItem";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectCard({
    project,
    bgStyle,
    viewProjectText,
}: {
    project: ProjectItem;
    bgStyle: string;
    viewProjectText?: string;
}) {
    const { t } = useLanguage();
    const { isHovered, isVideoReady, videoRef, handleMouseEnter, handleMouseLeave, hasMultipleGithub, singleGithubUrl, isGithubMenuOpen, menuRef, handleToggleGithubMenu } = useProjectCardAnimation(project);
    const resolvedViewText = viewProjectText || t.projects.viewProject;


    return (
        <article
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            tabIndex={0}
            className="group relative rounded-xl glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-accent/40"
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
                            {t.projects.previewLoading}
                        </span>
                    )}
                    {project.videoPath && isVideoReady && isHovered && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            {t.projects.previewActive}
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
                        {/* GitHub Actions: Multi-Repo Menu or Direct Link */}
                        {hasMultipleGithub ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={handleToggleGithubMenu}
                                    className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${isGithubMenuOpen
                                        ? "border-amber-400/60 bg-current/15 text-amber-400 shadow-[0_0_12px_rgba(226,184,87,0.3)] scale-105"
                                        : "border-current/20 hover:border-current hover:bg-current/10"
                                        }`}
                                    title={t.projects.githubTooltipMulti}
                                    aria-label={t.projects.githubAriaMulti}
                                    aria-expanded={isGithubMenuOpen}
                                >
                                    <GithubIcon size={16} />
                                </button>

                                {/* Mini Menu Popup */}
                                {isGithubMenuOpen && (
                                    <div
                                        className="absolute bottom-full right-0 mb-3 w-48 p-1.5 rounded-2xl bg-black border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl z-50 flex flex-col gap-1 text-xs animate-in fade-in zoom-in-95 duration-200"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase opacity-60 border-b border-white/10 flex items-center justify-between">
                                            <span className="text-white">{t.projects.repositoriesHeader}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        </div>

                                        {project.githubFrontend && (
                                            <a
                                                href={project.githubFrontend}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all group/item"
                                                onClick={handleToggleGithubMenu}
                                            >
                                                <span className="flex items-center gap-2 font-medium">
                                                    <Globe size={13} className="text-amber-400 opacity-80 group-hover/item:opacity-100" />
                                                    <span className="text-sm">{t.projects.frontendRepo}</span>
                                                </span>
                                                <ArrowUpRight size={12} className="opacity-50 group-hover/item:opacity-100 transition-opacity" />
                                            </a>
                                        )}

                                        {project.githubBackend && (
                                            <a
                                                href={project.githubBackend}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all group/item"
                                                onClick={handleToggleGithubMenu}
                                            >
                                                <span className="flex items-center gap-2 font-medium">
                                                    <Server size={13} className="text-amber-300 opacity-80 group-hover/item:opacity-100" />
                                                    <span className="text-sm">{t.projects.backendRepo}</span>
                                                </span>
                                                <ArrowUpRight size={12} className="opacity-50 group-hover/item:opacity-100 transition-opacity" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : singleGithubUrl ? (
                            <a
                                href={singleGithubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full border border-current/20 hover:border-current hover:bg-current/10 transition-all cursor-pointer flex items-center justify-center text-current hover:scale-105"
                                title={t.projects.githubTooltipSingle}
                                aria-label={t.projects.githubAriaSingle}
                            >
                                <GithubIcon size={16} />
                            </a>
                        ) : (
                            <button
                                className="p-2 rounded-full border border-current/20 hover:border-current hover:bg-current/10 transition-all cursor-pointer"
                                title={t.projects.githubTooltipSingle}
                                aria-label={t.projects.githubAriaSingle}
                            >
                                <GithubIcon size={16} />
                            </button>
                        )}

                        {/* View Project Demo Link */}
                        {project.demoUrl ? (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-cinzel uppercase tracking-wider font-semibold hover:scale-105 transition-all cursor-pointer shadow-sm"
                                style={{
                                    backgroundColor: "var(--text-primary)",
                                    color: "var(--bg-primary)",
                                }}
                            >
                                <span>{resolvedViewText}</span>
                                <ArrowUpRight size={14} />
                            </a>
                        ) : (
                            <button
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider font-semibold hover:scale-105 transition-all cursor-pointer shadow-sm"
                                style={{
                                    backgroundColor: "var(--text-primary)",
                                    color: "var(--bg-primary)",
                                }}
                            >
                                <span>{resolvedViewText}</span>
                                <ArrowUpRight size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}