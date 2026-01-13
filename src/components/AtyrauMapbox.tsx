import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Eye, Camera, Navigation, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeritageMarker {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  type: 'threat' | 'monitoring' | 'digitized';
  title: string;
  description: string;
  images: string[];
  details?: string;
  date?: string;
  status?: string;
}

// Маркеры ближе к центру Атырау
const heritageMarkers: HeritageMarker[] = [
  {
    id: '1',
    coordinates: [51.9156, 46.9512],
    type: 'threat',
    title: 'Мавзолей у реки Урал — береговая эрозия',
    description: 'Активная эрозия берега реки Урал угрожает археологическому памятнику XIX века.',
    details: 'Требуется срочный мониторинг и укрепление. Уровень угрозы: критический. За последний год береговая линия отступила на 2 метра. Памятник находится в 50 метрах от берега.',
    date: 'Обнаружено: 15 января 2026',
    status: 'Критический',
    images: [
      'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '2',
    coordinates: [51.8723, 46.9398],
    type: 'threat',
    title: 'Старое кладбище — разрушение надгробий',
    description: 'Исторический некрополь с уникальными каменными надгробиями подвергается разрушению.',
    details: 'Обнаружены следы вандализма и естественного износа. 15 надгробий требуют реставрации. Датировка: XVIII-XIX века.',
    date: 'Обнаружено: 20 декабря 2025',
    status: 'Высокий',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '3',
    coordinates: [51.9287, 46.9645],
    type: 'monitoring',
    title: 'Исторический центр — застройка',
    description: 'Мониторинг воздействия городского развития на исторические здания.',
    details: 'Ведётся наблюдение за строительными работами в охранной зоне. Еженедельные проверки состояния 12 зданий исторической застройки.',
    date: 'Мониторинг с: 1 ноября 2025',
    status: 'Стабильный',
    images: [
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '4',
    coordinates: [51.8945, 46.9723],
    type: 'monitoring',
    title: 'Набережная Урала — археологический слой',
    description: 'Обнаружены артефакты при проведении работ на набережной.',
    details: 'Культурный слой датируется XVII-XVIII веками. Найдены фрагменты керамики и металлические изделия. Работы приостановлены до завершения исследований.',
    date: 'Мониторинг с: 5 января 2026',
    status: 'Под наблюдением',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '5',
    coordinates: [51.9034, 46.9456],
    type: 'digitized',
    title: 'Мечеть Имангали',
    description: 'Историческая мечеть XIX века полностью оцифрована методом фотограмметрии.',
    details: 'Высокоточная 3D-модель создана в 2025 году. Модель включает 45 млн полигонов и текстуры 8K разрешения. Доступна для виртуальных экскурсий.',
    date: 'Оцифровано: октябрь 2025',
    status: 'Завершено',
    images: [
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '6',
    coordinates: [51.9412, 46.9534],
    type: 'digitized',
    title: 'Купеческий дом Курмангазы',
    description: 'Памятник архитектуры начала XX века. Создан цифровой двойник.',
    details: 'Лазерное сканирование и фотограмметрия выполнены совместно с краеведческим музеем. Модель используется для планирования реставрационных работ.',
    date: 'Оцифровано: ноябрь 2025',
    status: 'Завершено',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop',
    ],
  },
];

const markerStyles = {
  threat: {
    color: '#EF4444',
    bgColor: 'bg-red-500',
    label: 'Под угрозой',
    icon: AlertTriangle,
  },
  monitoring: {
    color: '#F97316',
    bgColor: 'bg-orange-500',
    label: 'Мониторинг',
    icon: Eye,
  },
  digitized: {
    color: '#3B82F6',
    bgColor: 'bg-blue-500',
    label: 'Оцифровано',
    icon: Camera,
  },
};

interface AtyrauMapboxProps {
  className?: string;
}

export const AtyrauMapbox = ({ className = '' }: AtyrauMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<HeritageMarker | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoicDFkIiwiYSI6ImNtamVjYW9uZzBkbmIzZHF4cGtxbDNudzgifQ.w8sok3OtyD_dYJUM62pMwQ';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [51.9156, 46.9512], // Atyrau center
      zoom: 13,
      pitch: 20,
    });

    // Navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Scale
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    // Geolocation control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: true
    });
    
    map.current.addControl(geolocate, 'top-right');

    geolocate.on('geolocate', (e: any) => {
      setUserLocation([e.coords.longitude, e.coords.latitude]);
    });

    // Fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add markers
    heritageMarkers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'heritage-marker';
      
      const Icon = markerStyles[marker.type].icon;
      
      el.innerHTML = `
        <div class="marker-container" style="
          position: relative;
          width: 44px;
          height: 44px;
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background-color: ${markerStyles[marker.type].color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${marker.type === 'threat' 
                ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
                : marker.type === 'monitoring'
                ? '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
                : '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>'
              }
            </svg>
          </div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 44px;
            height: 44px;
            background-color: ${markerStyles[marker.type].color};
            border-radius: 50%;
            opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        const container = el.querySelector('.marker-container') as HTMLElement;
        if (container) container.style.transform = 'scale(1.15)';
      });

      el.addEventListener('mouseleave', () => {
        const container = el.querySelector('.marker-container') as HTMLElement;
        if (container) container.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedMarker(marker);
        setCurrentImageIndex(0);
        
        // Fly to marker
        map.current?.flyTo({
          center: marker.coordinates,
          zoom: 15,
          duration: 1000
        });
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map.current!);
    });

    // Add pulse animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
      style.remove();
    };
  }, []);

  const handleNextImage = () => {
    if (selectedMarker) {
      setCurrentImageIndex((prev) => 
        prev < selectedMarker.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedMarker) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedMarker.images.length - 1
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container with solid background to hide pattern */}
      <div className="relative bg-background rounded-2xl overflow-hidden shadow-card border border-border">
        <div 
          ref={mapContainer} 
          className="w-full h-[500px] md:h-[600px]"
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(markerStyles).map(([type, style]) => {
          const Icon = style.icon;
          const count = heritageMarkers.filter(m => m.type === type).length;
          return (
            <div key={type} className="flex items-center gap-2 bg-card px-4 py-2.5 rounded-xl border border-border shadow-sm">
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                style={{ backgroundColor: style.color }}
              >
                <Icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{style.label}</span>
              <Badge variant="secondary" className="text-xs">{count}</Badge>
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedMarker} onOpenChange={() => setSelectedMarker(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMarker && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge 
                    className={`${markerStyles[selectedMarker.type].bgColor} text-white`}
                  >
                    {markerStyles[selectedMarker.type].label}
                  </Badge>
                  {selectedMarker.status && (
                    <Badge variant="outline" className="text-xs">
                      {selectedMarker.status}
                    </Badge>
                  )}
                </div>
                <DialogTitle className="font-serif text-xl md:text-2xl pr-8">
                  {selectedMarker.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedMarker.description}
                </DialogDescription>
              </DialogHeader>

              {/* Image Gallery */}
              <div className="relative mt-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <img
                    src={selectedMarker.images[currentImageIndex]}
                    alt={selectedMarker.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {selectedMarker.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                      →
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {selectedMarker.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Date info */}
              {selectedMarker.date && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {selectedMarker.date}
                </div>
              )}

              {/* Details */}
              {selectedMarker.details && (
                <div className="mt-4 p-4 bg-secondary/50 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Подробная информация
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMarker.details}
                  </p>
                </div>
              )}

              {/* Location info */}
              <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Местоположение
                </h4>
                <p className="text-sm text-muted-foreground">
                  Координаты: {selectedMarker.coordinates[1].toFixed(5)}°N, {selectedMarker.coordinates[0].toFixed(5)}°E
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Регион: Атырауская область, г. Атырау
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps?q=${selectedMarker.coordinates[1]},${selectedMarker.coordinates[0]}`,
                      '_blank'
                    );
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Открыть в Google Maps
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
