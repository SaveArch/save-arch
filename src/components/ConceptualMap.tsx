import { motion } from 'framer-motion';
import { useState } from 'react';

interface MapMarker {
  id: string;
  x: number;
  y: number;
  type: 'risk' | 'human' | 'digitized';
  title: string;
  description: string;
}

const markers: MapMarker[] = [
  {
    id: '1',
    x: 52,
    y: 35,
    type: 'digitized',
    title: 'Мавзолей Акмечеть',
    description: 'Оцифрован. 3D-модель создана.',
  },
  {
    id: '2',
    x: 38,
    y: 55,
    type: 'risk',
    title: 'Археологический памятник',
    description: 'Риск эрозии из-за близости к реке',
  },
  {
    id: '3',
    x: 65,
    y: 45,
    type: 'human',
    title: 'Исторический некрополь',
    description: 'Угроза от неконтролируемого туризма',
  },
  {
    id: '4',
    x: 25,
    y: 72,
    type: 'risk',
    title: 'Прибрежное поселение',
    description: 'Береговая эрозия Каспийского моря',
  },
  {
    id: '5',
    x: 58,
    y: 62,
    type: 'human',
    title: 'Старый город',
    description: 'Вандализм и застройка',
  },
  {
    id: '6',
    x: 45,
    y: 28,
    type: 'digitized',
    title: 'Караван-сарай',
    description: '3D-сканирование завершено',
  },
];

const markerColors = {
  risk: { fill: '#EF4444', stroke: '#DC2626', label: 'Риск разрушения' },
  human: { fill: '#F97316', stroke: '#EA580C', label: 'Человеческий фактор' },
  digitized: { fill: '#3B82F6', stroke: '#2563EB', label: 'Оцифровано' },
};

interface ConceptualMapProps {
  className?: string;
}

export const ConceptualMap = ({ className = '' }: ConceptualMapProps) => {
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(null);

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 rounded-2xl overflow-hidden border border-border shadow-card">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          {/* Caspian Sea */}
          <defs>
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
            </linearGradient>
            <pattern id="landPattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <circle cx="1" cy="1" r="0.3" fill="#D4B896" opacity="0.3" />
            </pattern>
          </defs>

          {/* Background - Land */}
          <rect x="0" y="0" width="100" height="100" fill="#FBF7F0" />
          <rect x="0" y="0" width="100" height="100" fill="url(#landPattern)" />

          {/* Caspian Sea (bottom left corner) */}
          <path
            d="M 0 60 Q 15 55, 20 70 Q 25 85, 15 100 L 0 100 Z"
            fill="url(#seaGradient)"
            stroke="#60A5FA"
            strokeWidth="0.5"
          />
          <text x="5" y="85" fontSize="3" fill="#3B82F6" fontWeight="500" opacity="0.8">
            Каспийское
          </text>
          <text x="5" y="89" fontSize="3" fill="#3B82F6" fontWeight="500" opacity="0.8">
            море
          </text>

          {/* Ural River - flowing from north to south */}
          <path
            d="M 45 0 
               Q 48 10, 44 20 
               Q 40 30, 46 40 
               Q 52 50, 48 60 
               Q 44 70, 50 80 
               Q 55 90, 48 100"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 45 0 
               Q 48 10, 44 20 
               Q 40 30, 46 40 
               Q 52 50, 48 60 
               Q 44 70, 50 80 
               Q 55 90, 48 100"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* River label */}
          <text x="36" y="50" fontSize="2.5" fill="#2563EB" fontWeight="500" opacity="0.9">
            река Урал
          </text>

          {/* City area - Atyrau */}
          <ellipse
            cx="50"
            cy="50"
            rx="18"
            ry="15"
            fill="#E8DFD3"
            opacity="0.5"
            stroke="#C4B5A4"
            strokeWidth="0.5"
            strokeDasharray="2,1"
          />
          <text x="50" y="52" fontSize="4" fill="#5C5346" fontWeight="600" textAnchor="middle">
            АТЫРАУ
          </text>
          <text x="50" y="56" fontSize="2" fill="#8B7E6F" textAnchor="middle">
            Атырау облысы
          </text>

          {/* Grid lines for schematic feel */}
          {[20, 40, 60, 80].map((pos) => (
            <g key={pos}>
              <line
                x1={pos}
                y1="0"
                x2={pos}
                y2="100"
                stroke="#D4C5B5"
                strokeWidth="0.2"
                strokeDasharray="1,2"
              />
              <line
                x1="0"
                y1={pos}
                x2="100"
                y2={pos}
                stroke="#D4C5B5"
                strokeWidth="0.2"
                strokeDasharray="1,2"
              />
            </g>
          ))}

          {/* Compass */}
          <g transform="translate(88, 12)">
            <circle cx="0" cy="0" r="5" fill="white" fillOpacity="0.9" stroke="#A0937D" strokeWidth="0.3" />
            <text x="0" y="-1.5" fontSize="2.5" fill="#5C5346" textAnchor="middle" fontWeight="bold">N</text>
            <polygon points="0,-3.5 0.8,-1 -0.8,-1" fill="#5C5346" />
            <line x1="0" y1="1" x2="0" y2="3" stroke="#A0937D" strokeWidth="0.4" />
          </g>

          {/* Scale bar */}
          <g transform="translate(75, 92)">
            <line x1="0" y1="0" x2="15" y2="0" stroke="#5C5346" strokeWidth="0.5" />
            <line x1="0" y1="-1" x2="0" y2="1" stroke="#5C5346" strokeWidth="0.5" />
            <line x1="15" y1="-1" x2="15" y2="1" stroke="#5C5346" strokeWidth="0.5" />
            <text x="7.5" y="3" fontSize="2" fill="#5C5346" textAnchor="middle">10 км</text>
          </g>

          {/* Markers */}
          {markers.map((marker, index) => (
            <motion.g
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveMarker(marker)}
              onMouseEnter={() => setActiveMarker(marker)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              {/* Pulse animation for active markers */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r="3"
                fill={markerColors[marker.type].fill}
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Main marker */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r="2"
                fill={markerColors[marker.type].fill}
                stroke={markerColors[marker.type].stroke}
                strokeWidth="0.5"
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r="0.8"
                fill="white"
              />
            </motion.g>
          ))}
        </svg>

        {/* Tooltip */}
        {activeMarker && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-elevated border border-border max-w-xs"
            style={{
              left: `${activeMarker.x}%`,
              top: `${activeMarker.y}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: markerColors[activeMarker.type].fill }}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {markerColors[activeMarker.type].label}
              </span>
            </div>
            <h4 className="font-serif font-semibold text-foreground">{activeMarker.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{activeMarker.description}</p>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {Object.entries(markerColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}
            />
            <span className="text-sm text-muted-foreground">{colors.label}</span>
          </div>
        ))}
      </div>

      {/* Map Attribution */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Концептуальная схема мониторинга · Не является навигационной картой
      </p>
    </div>
  );
};
