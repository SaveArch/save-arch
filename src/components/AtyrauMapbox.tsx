import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Eye, Camera } from 'lucide-react';

interface HeritageMarker {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  type: 'threat' | 'monitoring' | 'digitized';
  title: string;
  description: string;
  images: string[];
  details?: string;
}

const heritageMarkers: HeritageMarker[] = [
  {
    id: '1',
    coordinates: [51.88, 46.98],
    type: 'threat',
    title: 'Мавзолей Акмечеть — береговая эрозия',
    description: 'Активная эрозия берега реки Урал угрожает археологическому памятнику.',
    details: 'Требуется срочный мониторинг и укрепление. Уровень угрозы: критический. За последний год береговая линия отступила на 2 метра.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '2',
    coordinates: [51.78, 46.92],
    type: 'threat',
    title: 'Прибрежное поселение — климатический риск',
    description: 'Береговая эрозия Каспийского моря угрожает остаткам древнего поселения.',
    details: 'Колебания уровня Каспийского моря создают постоянную угрозу. Рекомендуется срочная 3D-оцифровка до потери объекта.',
    images: [
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '3',
    coordinates: [51.95, 46.96],
    type: 'monitoring',
    title: 'Исторический некрополь',
    description: 'Объект находится под наблюдением из-за угрозы неконтролируемого туризма.',
    details: 'Регулярный мониторинг состояния. Установлены датчики движения и камеры наблюдения. Последняя проверка: январь 2026.',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '4',
    coordinates: [51.82, 47.02],
    type: 'monitoring',
    title: 'Старый город — зона застройки',
    description: 'Мониторинг воздействия городского развития на исторические объекты.',
    details: 'Ведётся наблюдение за строительными работами в охранной зоне. Координация с городскими властями.',
    images: [
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '5',
    coordinates: [51.92, 46.88],
    type: 'digitized',
    title: 'Караван-сарай на Шёлковом пути',
    description: '3D-сканирование полностью завершено. Цифровой двойник доступен.',
    details: 'Высокоточная фотограмметрия выполнена в 2025 году. Модель включает 50 млн полигонов. Доступна в VR-формате.',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop',
    ],
  },
  {
    id: '6',
    coordinates: [51.86, 46.94],
    type: 'digitized',
    title: 'Древний мазар',
    description: 'Полная 3D-модель создана методом лазерного сканирования.',
    details: 'Оцифровка выполнена совместно с Национальным музеем. Модель используется для реставрационных работ.',
    images: [
      'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&h=600&fit=crop',
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

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoicDFkIiwiYSI6ImNtamVjYW9uZzBkbmIzZHF4cGtxbDNudzgifQ.w8sok3OtyD_dYJUM62pMwQ';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [51.88, 46.95], // Atyrau center
      zoom: 10,
      pitch: 30,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    // Add markers
    heritageMarkers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'heritage-marker';
      el.innerHTML = `
        <div style="
          width: 36px;
          height: 36px;
          background-color: ${markerStyles[marker.type].color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedMarker(marker);
        setCurrentImageIndex(0);
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
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
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-card border border-border"
      />

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(markerStyles).map(([type, style]) => {
          const Icon = style.icon;
          return (
            <div key={type} className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border border-border">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: style.color }}
              />
              <Icon className="w-4 h-4" style={{ color: style.color }} />
              <span className="text-sm text-muted-foreground">{style.label}</span>
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
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={`${markerStyles[selectedMarker.type].bgColor} text-white`}
                  >
                    {markerStyles[selectedMarker.type].label}
                  </Badge>
                </div>
                <DialogTitle className="font-serif text-xl md:text-2xl">
                  {selectedMarker.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedMarker.description}
                </DialogDescription>
              </DialogHeader>

              {/* Image Gallery */}
              <div className="relative mt-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      →
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedMarker.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              {selectedMarker.details && (
                <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Подробности
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedMarker.details}
                  </p>
                </div>
              )}

              {/* Coordinates */}
              <div className="mt-4 text-xs text-muted-foreground">
                Координаты: {selectedMarker.coordinates[1].toFixed(4)}°N, {selectedMarker.coordinates[0].toFixed(4)}°E
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
