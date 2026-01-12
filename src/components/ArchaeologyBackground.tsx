type ArchaeologyBackgroundProps = {
  /** 0..1 */
  opacity?: number;
};

const ArchaeologyBackground = ({ opacity = 0.1 }: ArchaeologyBackgroundProps) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      // Keep it visible over all surfaces while staying non-interactive
      style={{ zIndex: 5, opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ color: "hsl(var(--primary))" }}
      >
        <defs>
          <pattern
            id="archaeology-pattern"
            x="0"
            y="0"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            >
              {/* Excavation grid */}
              <rect x="18" y="18" width="108" height="108" rx="6" />
              <path d="M18 45h108 M18 72h108 M18 99h108" />
              <path d="M45 18v108 M72 18v108 M99 18v108" />

              {/* Pottery shard */}
              <path d="M165 42q22-28 52 0q22 28 44 10" />
              <path d="M175 55q18 10 38 5" />

              {/* Trowel */}
              <path d="M145 145l46 54 12-10-42-52z" />
              <path d="M188 190l22 28" strokeWidth="3" />

              {/* Magnifier */}
              <circle cx="256" cy="160" r="24" />
              <path d="M272 176l20 20" strokeWidth="4" />

              {/* Blueprint plate */}
              <rect x="182" y="206" width="120" height="84" rx="10" strokeDasharray="6,4" />
              <path d="M196 226h72 M196 246h60 M196 266h78" />
              <rect x="244" y="248" width="32" height="26" rx="4" />

              {/* Lego-like block */}
              <rect x="30" y="168" width="64" height="42" rx="10" />
              <circle cx="44" cy="160" r="8" />
              <circle cx="80" cy="160" r="8" />
              <rect x="60" y="214" width="78" height="44" rx="10" />
              <circle cx="78" cy="206" r="8" />
              <circle cx="108" cy="206" r="8" />

              {/* Small artifacts */}
              <path d="M120 286l16-34 16 34-8-4-8 20-8-20z" />
              <circle cx="28" cy="286" r="18" />
              <circle cx="28" cy="286" r="12" />
              <path d="M22 282l6-6 6 6-2 8h-8z" />
            </g>

            {/* Tiny dots for texture */}
            <g fill="currentColor" opacity="0.08">
              <circle cx="150" cy="95" r="1.4" />
              <circle cx="210" cy="120" r="1.2" />
              <circle cx="110" cy="130" r="1.1" />
              <circle cx="290" cy="40" r="1.3" />
              <circle cx="260" cy="290" r="1.1" />
              <circle cx="120" cy="250" r="1.2" />
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

