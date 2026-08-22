import React from "react";

interface RoseBotanicalProps {
  className?: string;
  isDark?: boolean;
}

export default function RoseBotanical({ className = "", isDark = false }: RoseBotanicalProps) {
  const roseDeep = isDark ? "#821B17" : "#6E1715";
  const roseMain = isDark ? "#A82622" : "#8F201D";
  const roseLight = isDark ? "#C73833" : "#B32E2A";
  const roseHighlight = isDark ? "#E65A54" : "#D44C47";
  const stemColor = isDark ? "#42281D" : "#4A2F24";
  const leafColor = isDark ? "#38472E" : "#3F5234";
  const leafLight = isDark ? "#536A44" : "#5B754B";

  return (
    <svg
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <radialGradient id="rose-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={roseHighlight} stopOpacity="0.9" />
          <stop offset="60%" stopColor={roseMain} stopOpacity="0.8" />
          <stop offset="100%" stopColor={roseDeep} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- VINES & STEMS (Background Network) --- */}
      <g stroke={stemColor} strokeWidth="3" strokeLinecap="round" fill="none">
        {/* Left main branch curving out */}
        <path d="M500 500 C450 480 380 430 350 350 C320 270 280 230 260 180" />
        <path d="M420 450 C360 410 320 340 330 270" strokeWidth="2" />
        <path d="M360 360 C300 370 240 340 210 290" strokeWidth="2" />
        <path d="M480 480 C400 470 340 460 280 430 C220 400 180 340 160 280" strokeWidth="2.5" />

        {/* Right main branch curving out */}
        <path d="M500 500 C550 480 620 430 650 350 C680 270 720 230 740 180" />
        <path d="M580 450 C640 410 680 340 670 270" strokeWidth="2" />
        <path d="M640 360 C700 370 760 340 790 290" strokeWidth="2" />
        <path d="M520 480 C600 470 660 460 720 430 C780 400 820 340 840 280" strokeWidth="2.5" />

        {/* Thorns */}
        <path d="M370 410 L360 400 L372 414" strokeWidth="2" />
        <path d="M320 320 L308 314 L322 325" strokeWidth="2" />
        <path d="M270 230 L258 226 L273 234" strokeWidth="2" />
        <path d="M630 410 L640 400 L628 414" strokeWidth="2" />
        <path d="M680 320 L692 314 L678 325" strokeWidth="2" />
        <path d="M730 230 L742 226 L727 234" strokeWidth="2" />
      </g>

      {/* --- LEAVES --- */}
      <g fill={leafColor} stroke={leafLight} strokeWidth="1">
        {/* Left side leaves */}
        <path d="M290 320 C270 300 250 310 240 330 C250 340 280 340 290 320 Z" />
        <path d="M230 260 C210 240 190 250 185 270 C195 280 220 280 230 260 Z" />
        <path d="M340 250 C330 225 310 225 295 235 C305 255 330 260 340 250 Z" />
        <path d="M410 380 C390 365 370 375 365 395 C380 400 405 395 410 380 Z" />

        {/* Right side leaves */}
        <path d="M710 320 C730 300 750 310 760 330 C750 340 720 340 710 320 Z" />
        <path d="M770 260 C790 240 810 250 815 270 C805 280 780 280 770 260 Z" />
        <path d="M660 250 C670 225 690 225 705 235 C695 255 670 260 660 250 Z" />
        <path d="M590 380 C610 365 630 375 635 395 C620 400 595 395 590 380 Z" />
      </g>

      {/* --- LAYERED GOTHIC ROSES --- */}

      {/* 1. Large Left Rose (Main Cluster) */}
      <g transform="translate(340, 310)">
        <circle cx="0" cy="0" r="46" fill={roseDeep} />
        {/* Outer petals */}
        <path d="M-38 -15 C-42 -35 -20 -45 0 -42 C20 -45 42 -35 38 -15 C45 10 30 38 0 42 C-30 38 -45 10 -38 -15 Z" fill={roseMain} stroke={roseLight} strokeWidth="1.5" />
        {/* Mid petals */}
        <path d="M-28 -8 C-32 -25 -15 -32 0 -30 C15 -32 32 -25 28 -8 C34 10 22 28 0 30 C-22 28 -34 10 -28 -8 Z" fill={roseLight} />
        {/* Inner petals spiraling */}
        <path d="M-18 -4 C-20 -16 -8 -22 0 -20 C8 -22 20 -16 18 -4 C22 8 14 18 0 20 C-14 18 -22 8 -18 -4 Z" fill={roseHighlight} />
        <path d="M-10 -2 C-10 -10 -4 -12 0 -11 C4 -12 10 -10 10 -2 C12 5 8 10 0 11 C-8 10 -12 5 -10 -2 Z" fill="#FFF" fillOpacity="0.25" />
        {/* Center core */}
        <circle cx="0" cy="0" r="5" fill={roseDeep} />
      </g>

      {/* 2. Large Right Rose (Main Cluster) */}
      <g transform="translate(660, 310)">
        <circle cx="0" cy="0" r="46" fill={roseDeep} />
        {/* Outer petals */}
        <path d="M-38 -15 C-42 -35 -20 -45 0 -42 C20 -45 42 -35 38 -15 C45 10 30 38 0 42 C-30 38 -45 10 -38 -15 Z" fill={roseMain} stroke={roseLight} strokeWidth="1.5" />
        {/* Mid petals */}
        <path d="M-28 -8 C-32 -25 -15 -32 0 -30 C15 -32 32 -25 28 -8 C34 10 22 28 0 30 C-22 28 -34 10 -28 -8 Z" fill={roseLight} />
        {/* Inner petals spiraling */}
        <path d="M-18 -4 C-20 -16 -8 -22 0 -20 C8 -22 20 -16 18 -4 C22 8 14 18 0 20 C-14 18 -22 8 -18 -4 Z" fill={roseHighlight} />
        <path d="M-10 -2 C-10 -10 -4 -12 0 -11 C4 -12 10 -10 10 -2 C12 5 8 10 0 11 C-8 10 -12 5 -10 -2 Z" fill="#FFF" fillOpacity="0.25" />
        {/* Center core */}
        <circle cx="0" cy="0" r="5" fill={roseDeep} />
      </g>

      {/* 3. Upper Left Medium Rose */}
      <g transform="translate(415, 230) scale(0.75)">
        <circle cx="0" cy="0" r="42" fill={roseDeep} />
        <path d="M-35 -12 C-38 -30 -18 -40 0 -38 C18 -40 38 -30 35 -12 C40 10 25 35 0 38 C-25 35 -40 10 -35 -12 Z" fill={roseMain} stroke={roseLight} strokeWidth="1.5" />
        <path d="M-24 -6 C-28 -20 -12 -28 0 -26 C12 -28 28 -20 24 -6 C28 8 18 24 0 26 C-18 24 -28 8 -24 -6 Z" fill={roseLight} />
        <path d="M-14 -3 C-16 -12 -6 -18 0 -16 C6 -18 16 -12 14 -3 C18 6 10 14 0 16 C-10 14 -18 6 -14 -3 Z" fill={roseHighlight} />
        <circle cx="0" cy="0" r="4" fill={roseDeep} />
      </g>

      {/* 4. Upper Right Medium Rose */}
      <g transform="translate(585, 230) scale(0.75)">
        <circle cx="0" cy="0" r="42" fill={roseDeep} />
        <path d="M-35 -12 C-38 -30 -18 -40 0 -38 C18 -40 38 -30 35 -12 C40 10 25 35 0 38 C-25 35 -40 10 -35 -12 Z" fill={roseMain} stroke={roseLight} strokeWidth="1.5" />
        <path d="M-24 -6 C-28 -20 -12 -28 0 -26 C12 -28 28 -20 24 -6 C28 8 18 24 0 26 C-18 24 -28 8 -24 -6 Z" fill={roseLight} />
        <path d="M-14 -3 C-16 -12 -6 -18 0 -16 C6 -18 16 -12 14 -3 C18 6 10 14 0 16 C-10 14 -18 6 -14 -3 Z" fill={roseHighlight} />
        <circle cx="0" cy="0" r="4" fill={roseDeep} />
      </g>

      {/* 5. Center Bottom Guard Rose (Wraps around sword) */}
      <g transform="translate(500, 385) scale(0.85)">
        <circle cx="0" cy="0" r="42" fill={roseDeep} />
        <path d="M-35 -12 C-38 -30 -18 -40 0 -38 C18 -40 38 -30 35 -12 C40 10 25 35 0 38 C-25 35 -40 10 -35 -12 Z" fill={roseMain} stroke={roseLight} strokeWidth="1.5" />
        <path d="M-24 -6 C-28 -20 -12 -28 0 -26 C12 -28 28 -20 24 -6 C28 8 18 24 0 26 C-18 24 -28 8 -24 -6 Z" fill={roseLight} />
        <path d="M-14 -3 C-16 -12 -6 -18 0 -16 C6 -18 16 -12 14 -3 C18 6 10 14 0 16 C-10 14 -18 6 -14 -3 Z" fill={roseHighlight} />
        <circle cx="0" cy="0" r="4" fill={roseDeep} />
      </g>

      {/* 6. Far Left Rose Bud */}
      <g transform="translate(250, 200) scale(0.55)">
        <circle cx="0" cy="0" r="35" fill={roseDeep} />
        <path d="M-25 -10 C-30 -25 -15 -35 0 -32 C15 -35 30 -25 25 -10 C30 10 20 25 0 30 C-20 25 -30 10 -25 -10 Z" fill={roseMain} />
        <path d="M-15 -5 C-18 -15 -8 -20 0 -18 C8 -20 18 -15 15 -5 C18 6 10 15 0 18 C-10 15 -18 6 -15 -5 Z" fill={roseHighlight} />
      </g>

      {/* 7. Far Right Rose Bud */}
      <g transform="translate(750, 200) scale(0.55)">
        <circle cx="0" cy="0" r="35" fill={roseDeep} />
        <path d="M-25 -10 C-30 -25 -15 -35 0 -32 C15 -35 30 -25 25 -10 C30 10 20 25 0 30 C-20 25 -30 10 -25 -10 Z" fill={roseMain} />
        <path d="M-15 -5 C-18 -15 -8 -20 0 -18 C8 -20 18 -15 15 -5 C18 6 10 15 0 18 C-10 15 -18 6 -15 -5 Z" fill={roseHighlight} />
      </g>

      {/* --- DRIFTING INDIVIDUAL PETALS --- */}
      <g fill={roseLight} stroke={roseDeep} strokeWidth="0.75" className="rose-petals-svg">
        <path d="M310 170 C318 160 326 166 322 176 C318 184 306 182 310 170 Z" transform="rotate(-15 315 173)" />
        <path d="M360 140 C370 130 380 138 375 150 C368 158 355 155 360 140 Z" transform="rotate(25 365 145)" />
        <path d="M460 160 C468 150 478 156 474 168 C468 175 456 170 460 160 Z" transform="rotate(-30 465 165)" />
        <path d="M540 150 C548 140 558 145 554 158 C548 166 536 162 540 150 Z" transform="rotate(20 545 155)" />
        <path d="M635 145 C645 135 655 142 650 155 C644 162 630 160 635 145 Z" transform="rotate(-20 640 150)" />
        <path d="M690 180 C698 170 708 175 704 188 C698 196 686 192 690 180 Z" transform="rotate(40 695 185)" />
        <path d="M220 220 C228 210 238 215 234 228 C228 235 216 230 220 220 Z" transform="rotate(-45 225 225)" />
        <path d="M780 230 C788 220 798 225 794 238 C788 245 776 240 780 230 Z" transform="rotate(35 785 235)" />
      </g>
    </svg>
  );
}
