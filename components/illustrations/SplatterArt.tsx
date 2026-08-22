import React from "react";

interface SplatterArtProps {
  className?: string;
  color?: string;
}

export default function SplatterArt({ className = "", color = "#E9DFC9" }: SplatterArtProps) {
  return (
    <svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      {/* --- MAIN DIAGONAL SPLATTER STREAK (from top-left center to bottom-right) --- */}
      <g fill={color}>
        {/* Large diagonal splash trail */}
        <path
          d="M620 220 
             C660 250 720 310 800 390 
             C890 480 980 570 1150 720 
             L1170 750 
             C1050 640 940 540 860 450 
             C790 370 730 300 680 250 
             Z"
          opacity="0.95"
        />

        {/* Major splash blob 1 */}
        <path
          d="M740 370 
             C720 330 760 310 790 330 
             C820 350 820 400 780 420 
             C750 435 730 400 740 370 Z"
          opacity="0.9"
        />

        {/* Major splash blob 2 with elongated tail */}
        <path
          d="M620 460 
             C600 420 640 400 670 420 
             C700 440 690 490 650 510 
             C630 520 590 560 560 620 
             C570 580 610 520 620 460 Z"
          opacity="0.95"
        />

        {/* Big circular impact drop */}
        <circle cx="830" cy="670" r="42" opacity="0.95" />
        <circle cx="810" cy="355" r="28" opacity="0.9" />
        <circle cx="635" cy="590" r="18" opacity="0.85" />
        <circle cx="840" cy="510" r="14" opacity="0.8" />
        <circle cx="865" cy="515" r="8" opacity="0.75" />
        <circle cx="900" cy="518" r="12" opacity="0.8" />
        <circle cx="930" cy="515" r="9" opacity="0.7" />

        {/* Small scattered drops and splatter particles */}
        <circle cx="90" cy="730" r="16" opacity="0.85" />
        <circle cx="280" cy="870" r="22" opacity="0.9" />
        <circle cx="385" cy="735" r="12" opacity="0.85" />
        <circle cx="450" cy="840" r="9" opacity="0.7" />
        <circle cx="755" cy="160" r="4" opacity="0.6" />
        <circle cx="530" cy="280" r="7" opacity="0.7" />
        <circle cx="960" cy="790" r="18" opacity="0.85" />
        <circle cx="1030" cy="830" r="12" opacity="0.8" />

        {/* Bottom-left massive paint puddle edge (matching Image 2) */}
        <path
          d="M0 720 
             C60 740 120 780 160 850 
             C200 920 220 980 200 1050 
             L0 1050 Z"
          opacity="0.9"
        />

        <path
          d="M0 800 
             C50 780 100 810 120 860 
             C140 910 130 960 100 1000 
             L0 1000 Z"
          opacity="0.95"
        />

        {/* Spray dots around */}
        <circle cx="610" cy="570" r="12" opacity="0.8" />
        <circle cx="600" cy="600" r="6" opacity="0.7" />
        <circle cx="670" cy="590" r="8" opacity="0.6" />
        <circle cx="780" cy="620" r="10" opacity="0.75" />
        <circle cx="890" cy="720" r="8" opacity="0.75" />
      </g>
    </svg>
  );
}
