const ArchaeologyBackground = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <svg 
        className="w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%"
      >
        <defs>
          <pattern 
            id="archaeology-pattern" 
            x="0" 
            y="0" 
            width="400" 
            height="400" 
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="hsl(215 70% 40%)" strokeWidth="1.5">
              {/* Archaeological grid lines */}
              <path d="M50 100 h100 M50 120 h80 M60 140 h70"/>
              <path d="M200 80 v100 M220 90 v80 M240 100 v60"/>
              <rect x="300" y="50" width="80" height="80" rx="4"/>
              <rect x="310" y="60" width="60" height="60" rx="2"/>
              
              {/* Lego-like blocks */}
              <rect x="450" y="40" width="40" height="30" rx="3"/>
              <circle cx="460" cy="35" r="5"/>
              <circle cx="480" cy="35" r="5"/>
              <rect x="500" y="50" width="40" height="30" rx="3"/>
              <circle cx="510" cy="45" r="5"/>
              <circle cx="530" cy="45" r="5"/>
              <rect x="470" y="75" width="50" height="35" rx="3"/>
              <circle cx="482" cy="70" r="5"/>
              <circle cx="507" cy="70" r="5"/>
              
              {/* Column/pillar fragments */}
              <rect x="620" y="60" width="25" height="80" rx="2"/>
              <ellipse cx="632" cy="55" rx="18" ry="6"/>
              <path d="M615 140 h35 M618 145 h29"/>
              <rect x="670" y="80" width="20" height="60" rx="2"/>
              <ellipse cx="680" cy="76" rx="14" ry="5"/>
              
              {/* Pottery shards */}
              <path d="M50 250 q20 -30 50 0 q20 30 40 10" strokeLinecap="round"/>
              <path d="M60 260 q15 10 35 5"/>
              <path d="M160 230 q-10 40 20 50 q30 5 25 -20" strokeLinecap="round"/>
              
              {/* Measuring tools */}
              <rect x="260" y="220" width="120" height="8" rx="1"/>
              <path d="M270 228 v10 M290 228 v6 M310 228 v10 M330 228 v6 M350 228 v10 M370 228 v6"/>
              
              {/* Compass/circle tool */}
              <circle cx="450" cy="250" r="35" strokeDasharray="5,3"/>
              <circle cx="450" cy="250" r="3"/>
              <path d="M450 250 l25 -20"/>
              
              {/* More lego blocks scattered */}
              <rect x="550" y="220" width="35" height="25" rx="3"/>
              <circle cx="560" cy="215" r="4"/>
              <circle cx="575" cy="215" r="4"/>
              <rect x="590" y="230" width="35" height="25" rx="3"/>
              <circle cx="600" cy="225" r="4"/>
              <circle cx="615" cy="225" r="4"/>
              <rect x="560" y="250" width="45" height="30" rx="3"/>
              <circle cx="572" cy="245" r="4"/>
              <circle cx="592" cy="245" r="4"/>
              
              {/* Architectural blueprint elements */}
              <rect x="680" y="200" width="70" height="90" rx="4" strokeDasharray="4,2"/>
              <path d="M690 210 h50 M690 230 h40 M690 250 h50 M690 270 h30"/>
              <rect x="695" y="255" width="20" height="25" rx="1"/>
              
              {/* Excavation site grid */}
              <rect x="50" y="350" width="100" height="100"/>
              <path d="M50 375 h100 M50 400 h100 M50 425 h100"/>
              <path d="M75 350 v100 M100 350 v100 M125 350 v100"/>
              <circle cx="87" cy="387" r="8"/>
              <rect x="105" y="405" width="15" height="20" rx="2"/>
              
              {/* Bone/artifact fragment */}
              <path d="M200 380 q10 -10 30 0 q15 15 10 40 q-5 20 -25 15 q-20 -5 -15 -30 q2 -15 0 -25" strokeLinecap="round"/>
              
              {/* Small lego pieces */}
              <rect x="280" y="370" width="25" height="18" rx="2"/>
              <circle cx="287" cy="366" r="3"/>
              <circle cx="298" cy="366" r="3"/>
              <rect x="310" y="380" width="25" height="18" rx="2"/>
              <circle cx="317" cy="376" r="3"/>
              <circle cx="328" cy="376" r="3"/>
              
              {/* Arrowhead */}
              <path d="M380 350 l20 40 l-10 -5 l-10 30 l-10 -30 l-10 5 z"/>
              
              {/* Magnifying glass */}
              <circle cx="480" cy="400" r="30"/>
              <path d="M502 422 l25 25" strokeWidth="4" strokeLinecap="round"/>
              
              {/* Trowel */}
              <path d="M580 360 l40 50 l10 -8 l-35 -47 z"/>
              
              {/* Layer stratigraphy */}
              <rect x="680" y="340" width="80" height="120" rx="4"/>
              <path d="M680 365 q20 5 40 0 q20 -5 40 3"/>
              <path d="M680 395 q15 -4 35 2 q25 4 45 -2"/>
              <path d="M680 425 q10 6 30 2 q30 -3 50 5"/>
              
              {/* More building blocks stacked */}
              <rect x="50" y="520" width="50" height="35" rx="4"/>
              <circle cx="62" cy="514" r="5"/>
              <circle cx="87" cy="514" r="5"/>
              <rect x="35" y="555" width="50" height="35" rx="4"/>
              <circle cx="47" cy="549" r="5"/>
              <circle cx="72" cy="549" r="5"/>
              <rect x="55" y="590" width="50" height="35" rx="4"/>
              <circle cx="67" cy="584" r="5"/>
              <circle cx="92" cy="584" r="5"/>
              
              {/* Ancient inscription tablet */}
              <rect x="160" y="510" width="80" height="100" rx="6"/>
              <path d="M175 535 h50 M175 555 h40 M175 575 h50 M175 595 h30"/>
              <circle cx="215" cy="595" r="6"/>
              
              {/* Brush tool */}
              <rect x="300" y="530" width="8" height="60" rx="1"/>
              <path d="M296 590 q4 20 8 0" strokeWidth="2"/>
              <path d="M298 590 v18 M302 590 v20 M306 590 v17"/>
              
              {/* Map/plan sketch */}
              <rect x="370" y="500" width="110" height="80" rx="4"/>
              <circle cx="400" cy="535" r="15" strokeDasharray="3,2"/>
              <rect x="430" y="520" width="30" height="20" rx="2"/>
              <path d="M385 560 l35 10 l30 -5" strokeDasharray="4,2"/>
              
              {/* Amphora shape */}
              <ellipse cx="550" cy="520" rx="20" ry="10"/>
              <path d="M530 520 q-5 40 5 70 q10 20 30 0 q10 -30 5 -70"/>
              <path d="M532 530 q-15 10 -15 25" strokeLinecap="round"/>
              <path d="M568 530 q15 10 15 25" strokeLinecap="round"/>
              
              {/* Tech/scanner device */}
              <rect x="640" y="510" width="60" height="40" rx="6"/>
              <rect x="650" y="520" width="40" height="20" rx="2"/>
              <circle cx="710" cy="530" r="8"/>
              <rect x="655" y="555" width="30" height="50" rx="2"/>
              
              {/* Foundation outline */}
              <rect x="50" y="680" width="150" height="80" rx="4" strokeDasharray="8,4"/>
              <rect x="70" y="700" width="40" height="40" rx="2"/>
              <rect x="130" y="695" width="50" height="50" rx="2"/>
              
              {/* Coin/medallion */}
              <circle cx="280" cy="720" r="35"/>
              <circle cx="280" cy="720" r="28"/>
              <path d="M265 710 l15 -10 l15 10 l-5 18 h-20 z"/>
              
              {/* Lego construction */}
              <rect x="380" y="680" width="60" height="40" rx="4"/>
              <circle cx="395" cy="674" r="6"/>
              <circle cx="425" cy="674" r="6"/>
              <rect x="370" y="720" width="80" height="40" rx="4"/>
              <circle cx="387" cy="714" r="6"/>
              <circle cx="413" cy="714" r="6"/>
              <circle cx="433" cy="714" r="6"/>
              
              {/* Preservation symbol */}
              <circle cx="550" cy="720" r="40"/>
              <path d="M530 700 v40 M550 695 v50 M570 700 v40"/>
              <path d="M520 720 h60"/>
              
              {/* Labeled specimen */}
              <rect x="650" y="670" width="70" height="50" rx="4"/>
              <path d="M660 685 h50 M660 700 h40"/>
              <rect x="655" y="730" width="20" height="30" rx="1"/>
              <path d="M665 730 v-10"/>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archaeology-pattern)" />
      </svg>
    </div>
  );
};

export { ArchaeologyBackground };
