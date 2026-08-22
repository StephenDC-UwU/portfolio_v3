import React from "react";

interface SwordProps {
  className?: string;
  isDark?: boolean;
}

export default function Sword({ className = "", isDark = false }: SwordProps) {
  const steelLight = isDark ? "#EFE6D5" : "#D4CDC0";
  const steelMid = isDark ? "#D2C4AE" : "#B8ADA0";
  const steelDark = isDark ? "#8B7A66" : "#6E6255";
  const goldAccent = isDark ? "#F3D588" : "#C5A059";
  const goldDark = isDark ? "#B08A38" : "#8A6D33";
  const gemRed = isDark ? "#FF4A4A" : "#8B1B18";

  return (
    <svg
      viewBox="0 0 160 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Blade metallic gradient */}
        <linearGradient id="blade-left" x1="80" y1="210" x2="62" y2="760" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={steelLight} />
          <stop offset="50%" stopColor={steelMid} />
          <stop offset="100%" stopColor={steelLight} />
        </linearGradient>

        <linearGradient id="blade-right" x1="80" y1="210" x2="98" y2="760" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={steelDark} />
          <stop offset="50%" stopColor={steelMid} />
          <stop offset="100%" stopColor={steelDark} />
        </linearGradient>

        {/* Fuller groove gradient */}
        <linearGradient id="fuller-grad" x1="80" y1="215" x2="80" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={steelDark} stopOpacity="0.8" />
          <stop offset="70%" stopColor={steelDark} stopOpacity="0.4" />
          <stop offset="100%" stopColor={steelDark} stopOpacity="0" />
        </linearGradient>

        {/* Gold crossguard gradient */}
        <linearGradient id="guard-grad" x1="10" y1="180" x2="150" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={goldDark} />
          <stop offset="25%" stopColor={goldAccent} />
          <stop offset="50%" stopColor="#FFF2D1" />
          <stop offset="75%" stopColor={goldAccent} />
          <stop offset="100%" stopColor={goldDark} />
        </linearGradient>

        {/* Grip wrapping gradient */}
        <linearGradient id="grip-grad" x1="72" y1="70" x2="88" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A1B16" />
          <stop offset="50%" stopColor="#4A342B" />
          <stop offset="100%" stopColor="#1E130F" />
        </linearGradient>

        {/* Blade shine filter */}
        <filter id="sword-glow" x="-20%" y="-10%" width="140%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- POMMEL --- */}
      {/* Ornate Pommel Finial */}
      <path
        d="M80 18 L86 28 L94 32 L88 40 L90 52 L80 48 L70 52 L72 40 L66 32 L74 28 Z"
        fill="url(#guard-grad)"
        stroke={goldDark}
        strokeWidth="1.5"
      />
      {/* Pommel Center Gem */}
      <ellipse cx="80" cy="36" rx="4.5" ry="6" fill={gemRed} />
      <ellipse cx="78.5" cy="34" rx="1.5" ry="2" fill="#FFFFFF" fillOpacity="0.7" />

      {/* Pommel Base Collar */}
      <rect x="74" y="52" width="12" height="6" rx="2" fill="url(#guard-grad)" stroke={goldDark} strokeWidth="1" />

      {/* --- GRIP / HILT --- */}
      {/* Grip core */}
      <rect x="73" y="58" width="14" height="120" rx="3" fill="url(#grip-grad)" stroke="#1A100C" strokeWidth="1.2" />

      {/* Leather/wire wraps */}
      {[66, 78, 90, 102, 114, 126, 138, 150, 162].map((y, idx) => (
        <g key={idx}>
          <line
            x1="73"
            y1={y}
            x2="87"
            y2={y + 6}
            stroke={goldAccent}
            strokeWidth="1.6"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
          <line
            x1="73"
            y1={y + 1}
            x2="87"
            y2={y + 7}
            stroke="#000000"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </g>
      ))}

      {/* --- CROSSGUARD --- */}
      {/* Left Wing curved quillon */}
      <path
        d="M80 188 
           C60 188 35 180 18 165 
           C14 161 10 168 14 174 
           C28 195 55 204 74 204 
           Z"
        fill="url(#guard-grad)"
        stroke={goldDark}
        strokeWidth="1.5"
      />
      {/* Left quillon tip finial */}
      <circle cx="14" cy="168" r="4.5" fill="url(#guard-grad)" stroke={goldDark} strokeWidth="1" />

      {/* Right Wing curved quillon */}
      <path
        d="M80 188 
           C100 188 125 180 142 165 
           C146 161 150 168 146 174 
           C132 195 105 204 86 204 
           Z"
        fill="url(#guard-grad)"
        stroke={goldDark}
        strokeWidth="1.5"
      />
      {/* Right quillon tip finial */}
      <circle cx="146" cy="168" r="4.5" fill="url(#guard-grad)" stroke={goldDark} strokeWidth="1" />

      {/* Central Shield/Crest Block */}
      <path
        d="M68 184 L92 184 L94 206 L80 216 L66 206 Z"
        fill="url(#guard-grad)"
        stroke={goldDark}
        strokeWidth="1.5"
      />
      {/* Central Crest Ruby */}
      <path
        d="M80 192 L85 198 L80 206 L75 198 Z"
        fill={gemRed}
        stroke={goldDark}
        strokeWidth="1"
      />
      <polygon points="78,195 80,193 80,198 77,198" fill="#FFFFFF" fillOpacity="0.6" />

      {/* --- RAIN GUARD / CHAPE --- */}
      <path d="M72 208 L88 208 L85 220 L80 224 L75 220 Z" fill="url(#guard-grad)" />

      {/* --- THE BLADE --- */}
      {/* Left Edge & Face */}
      <path
        d="M74 220 
           L72 730 
           L80 780 
           L80 220 
           Z"
        fill="url(#blade-left)"
      />

      {/* Right Edge & Face */}
      <path
        d="M86 220 
           L88 730 
           L80 780 
           L80 220 
           Z"
        fill="url(#blade-right)"
      />

      {/* Central Ridge Line */}
      <line
        x1="80"
        y1="220"
        x2="80"
        y2="778"
        stroke={isDark ? "#FFFFFF" : "#F7F3EB"}
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />

      {/* Left Fuller (Groove) */}
      <path
        d="M78 226 L78 600 L80 610 L80 226 Z"
        fill="url(#fuller-grad)"
      />

      {/* Right Fuller (Groove) */}
      <path
        d="M82 226 L82 600 L80 610 L80 226 Z"
        fill="url(#fuller-grad)"
      />

      {/* Engraved runes / botanical filigree on blade */}
      <g stroke={goldAccent} strokeWidth="0.8" strokeOpacity="0.6" fill="none">
        <path d="M79 240 Q80 248 81 256 Q79 264 80 272" />
        <circle cx="80" cy="285" r="1.5" fill={goldAccent} fillOpacity="0.7" />
        <path d="M79 300 Q80 308 81 316 Q79 324 80 332" />
        <circle cx="80" cy="345" r="1.5" fill={goldAccent} fillOpacity="0.7" />
        <path d="M79 360 Q80 368 81 376 Q79 384 80 392" />
      </g>

      {/* Outer Blade Outline */}
      <path
        d="M74 220 L72 730 L80 780 L88 730 L86 220"
        stroke={steelDark}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
