import { ProjectItem } from "@/types/ProjectItem";
import { useEffect, useRef, useState } from "react";

export const useProjectCardAnimation = (project: ProjectItem) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isGithubMenuOpen, setIsGithubMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasMultipleGithub = Boolean(
    project.githubFrontend && project.githubBackend,
  );
  const singleGithubUrl =
    project.githubUrl || project.githubFrontend || project.githubBackend;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsGithubMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGithubMenuOpen(false);
      }
    };

    if (isGithubMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGithubMenuOpen]);

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

  const handleToggleGithubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGithubMenuOpen((prev) => !prev);
  };

  const handleCloseGithubMenu = () => {
    setIsGithubMenuOpen(false);
  };

  return {
    isHovered,
    isVideoReady,
    isGithubMenuOpen,
    videoRef,
    timerRef,
    menuRef,
    handleMouseEnter,
    handleMouseLeave,
    hasMultipleGithub,
    singleGithubUrl,
    handleToggleGithubMenu,
    handleCloseGithubMenu,
  };
};
