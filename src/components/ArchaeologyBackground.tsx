type ArchaeologyBackgroundProps = {
  /** 0..1 */
  opacity?: number;
};

const ArchaeologyBackground = ({ opacity = 0.18 }: ArchaeologyBackgroundProps) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    >
      {/* Warm parchment gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 15%, rgba(180, 140, 90, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 85%, rgba(150, 110, 70, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(200, 170, 130, 0.15) 0%, transparent 70%)
          `
        }}
      />
      
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="archaeology-pattern"
            x="0"
            y="0"
            width="450"
            height="450"
            patternUnits="userSpaceOnUse"
          >
            {/* Parchment texture base */}
            <rect width="450" height="450" fill="transparent" />
            
            <g
              fill="hsl(35 40% 45%)"
              fillOpacity="0.35"
              stroke="hsl(30 35% 40%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.4"
            >
              {/* === SKULL (большой, детальный) === */}
              <ellipse cx="70" cy="65" rx="28" ry="32" />
              <ellipse cx="58" cy="55" rx="7" ry="9" fill="hsl(25 30% 30%)" fillOpacity="0.35" />
              <ellipse cx="82" cy="55" rx="7" ry="9" fill="hsl(25 30% 30%)" fillOpacity="0.35" />
              <path d="M65 78 L70 90 L75 78" fill="none" strokeWidth="2.5" />
              <path d="M55 98 L58 105 L64 100 L70 106 L76 100 L82 105 L85 98" fill="none" strokeWidth="2" />
              <path d="M50 70 Q45 55 55 45" fill="none" strokeWidth="1.5" />
              <path d="M90 70 Q95 55 85 45" fill="none" strokeWidth="1.5" />

              {/* === EXCAVATION GRID (раскоп) === */}
              <rect x="280" y="30" width="130" height="100" rx="6" fill="hsl(35 30% 60%)" fillOpacity="0.12" strokeWidth="2" />
              <line x1="323" y1="30" x2="323" y2="130" strokeWidth="1.2" />
              <line x1="366" y1="30" x2="366" y2="130" strokeWidth="1.2" />
              <line x1="280" y1="63" x2="410" y2="63" strokeWidth="1.2" />
              <line x1="280" y1="96" x2="410" y2="96" strokeWidth="1.2" />
              {/* Artifacts in grid */}
              <circle cx="300" cy="48" r="5" fill="hsl(25 35% 40%)" fillOpacity="0.4" />
              <ellipse cx="390" cy="115" rx="8" ry="5" fill="hsl(30 40% 45%)" fillOpacity="0.35" />
              <path d="M340 75 L350 85 L345 90" fill="none" strokeWidth="2" />

              {/* === AMPHORA (амфора) === */}
              <path d="M60 200 Q40 225 45 280 Q50 330 80 345 Q110 330 115 280 Q120 225 100 200" fill="hsl(30 45% 55%)" fillOpacity="0.2" strokeWidth="2" />
              <ellipse cx="80" cy="198" rx="22" ry="8" />
              <path d="M45 240 Q25 225 20 250" fill="none" strokeWidth="2.5" />
              <path d="M115 240 Q135 225 140 250" fill="none" strokeWidth="2.5" />
              <path d="M52 270 Q80 280 108 270" fill="none" strokeWidth="1.5" />
              <path d="M50 300 Q80 310 110 300" fill="none" strokeWidth="1.5" />
              {/* Ornament */}
              <path d="M55 255 L65 255 M75 255 L85 255 M95 255 L105 255" fill="none" strokeWidth="2" strokeDasharray="4 4" />

              {/* === BONES (кости) === */}
              <path d="M200 140 L290 130" strokeWidth="5" strokeLinecap="round" />
              <circle cx="196" cy="138" r="8" />
              <circle cx="202" cy="145" r="7" />
              <circle cx="292" cy="128" r="8" />
              <circle cx="294" cy="135" r="7" />
              
              {/* Smaller bone */}
              <path d="M180 280 L230 270" strokeWidth="4" strokeLinecap="round" />
              <circle cx="178" cy="279" r="6" />
              <circle cx="232" cy="269" r="6" />

              {/* === POTTERY SHARDS (черепки) === */}
              <path d="M320 200 Q350 185 365 210 Q360 245 330 250 Q300 240 320 200 Z" fill="hsl(25 50% 50%)" fillOpacity="0.25" />
              <path d="M330 215 L350 225" fill="none" strokeWidth="2" />
              <path d="M328 230 L355 235" fill="none" strokeWidth="2" />
              <path d="M335 208 L348 218" fill="none" strokeWidth="1.5" />

              <path d="M400 250 Q420 240 435 260 Q430 285 405 290 Q385 280 400 250 Z" fill="hsl(28 45% 52%)" fillOpacity="0.2" />
              <path d="M408 265 L425 272" fill="none" strokeWidth="1.5" />

              {/* === SPEARHEAD (наконечник копья) === */}
              <path d="M160 340 L195 280 L230 340 L195 325 Z" fill="hsl(200 10% 45%)" fillOpacity="0.25" strokeWidth="2" />
              <line x1="195" y1="340" x2="195" y2="400" strokeWidth="4" />
              <path d="M195 295 L195 320" fill="none" strokeWidth="1.5" />

              {/* === PETROGLYPH (олень) === */}
              <g transform="translate(360, 330)">
                <path d="M0 0 L15 -30 L30 -45 M15 -30 L0 -45 M15 -30 L15 20 L0 50 M15 20 L30 50 M15 0 L-20 15 M15 0 L50 15" fill="none" strokeWidth="3" />
                <circle cx="15" cy="-30" r="5" fill="hsl(35 30% 40%)" fillOpacity="0.3" />
              </g>

              {/* === TROWEL (мастерок) === */}
              <path d="M250 360 L300 420 L315 405 L265 345 Z" fill="hsl(200 15% 50%)" fillOpacity="0.25" strokeWidth="2" />
              <line x1="305" y1="415" x2="340" y2="438" strokeWidth="5" strokeLinecap="round" />

              {/* === BRUSH (кисть) === */}
              <rect x="140" y="180" width="8" height="45" rx="3" fill="hsl(30 50% 40%)" fillOpacity="0.3" />
              <path d="M136 225 L140 240 L144 225 L148 240 L152 225" fill="none" strokeWidth="2" />

              {/* === ANCIENT COIN (монета) === */}
              <circle cx="420" cy="180" r="30" fill="hsl(40 60% 55%)" fillOpacity="0.2" strokeWidth="2" />
              <circle cx="420" cy="180" r="22" fill="none" strokeWidth="1.5" />
              <path d="M408 175 L415 188 L432 165" fill="none" strokeWidth="2" />

              {/* === SECOND SKULL (smaller) === */}
              <ellipse cx="420" cy="420" rx="20" ry="24" />
              <ellipse cx="412" cy="413" rx="5" ry="6" fill="hsl(25 30% 30%)" fillOpacity="0.35" />
              <ellipse cx="428" cy="413" rx="5" ry="6" fill="hsl(25 30% 30%)" fillOpacity="0.35" />
              <path d="M416 428 L420 435 L424 428" fill="none" strokeWidth="2" />

              {/* === LEGO BRICKS (для FLL тематики) === */}
              <rect x="30" y="380" width="50" height="30" rx="6" fill="hsl(5 75% 55%)" fillOpacity="0.2" strokeWidth="2" />
              <circle cx="42" cy="375" r="6" fill="hsl(5 75% 55%)" fillOpacity="0.25" />
              <circle cx="68" cy="375" r="6" fill="hsl(5 75% 55%)" fillOpacity="0.25" />

              <rect x="50" y="420" width="65" height="30" rx="6" fill="hsl(45 80% 50%)" fillOpacity="0.2" strokeWidth="2" />
              <circle cx="65" cy="415" r="6" fill="hsl(45 80% 50%)" fillOpacity="0.25" />
              <circle cx="90" cy="415" r="6" fill="hsl(45 80% 50%)" fillOpacity="0.25" />

              {/* === STRATIGRAPHY LINES (слои почвы) === */}
              <path d="M0 440 Q80 430 160 442 Q240 435 320 445 Q400 438 450 442" fill="none" strokeWidth="2.5" strokeOpacity="0.25" />
              <path d="M0 448 Q100 443 200 450 Q300 445 400 452 Q425 448 450 450" fill="none" strokeWidth="2" strokeOpacity="0.2" />

              {/* === FISH BONES === */}
              <path d="M260 420 L310 420" strokeWidth="2.5" />
              <path d="M270 415 L270 425 M280 413 L280 427 M290 415 L290 425 M300 414 L300 426" fill="none" strokeWidth="1.5" />
              <path d="M260 417 L252 412 M260 423 L252 428" fill="none" strokeWidth="1.5" />

              {/* === STONE AXE (топор) === */}
              <ellipse cx="180" y="430" rx="25" ry="14" transform="rotate(-25 180 430)" fill="hsl(200 10% 50%)" fillOpacity="0.2" />
              <line x1="165" y1="442" x2="140" y2="475" strokeWidth="5" strokeLinecap="round" />

            </g>

            {/* === SAND/DUST PARTICLES === */}
            <g fill="hsl(35 40% 50%)" fillOpacity="0.15">
              <circle cx="20" cy="40" r="2.5" />
              <circle cx="130" cy="60" r="2" />
              <circle cx="220" cy="45" r="3" />
              <circle cx="180" cy="110" r="2" />
              <circle cx="50" cy="160" r="2.5" />
              <circle cx="250" cy="200" r="2" />
              <circle cx="150" cy="250" r="3" />
              <circle cx="380" cy="170" r="2" />
              <circle cx="290" cy="300" r="2.5" />
              <circle cx="120" cy="350" r="2" />
              <circle cx="340" cy="400" r="2.5" />
              <circle cx="200" cy="380" r="2" />
              <circle cx="440" cy="100" r="2" />
              <circle cx="10" cy="280" r="2.5" />
              <circle cx="440" cy="300" r="2" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#archaeology-pattern)" />
      </svg>
    </div>
  );
};

export { ArchaeologyBackground };
export type { ArchaeologyBackgroundProps };

