import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Eye, Camera, Calendar, Info } from 'lucide-react';

interface HeritageMarker {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  type: 'threat' | 'monitoring' | 'digitized';
  title: string;
  description: string;
  details: string;
  date: string;
  status: string;
  historicalInfo?: string;
}

// Проверенные маркеры культурного наследия Атырауской области
// Источники: Wikipedia, Wikimedia Commons, официальные реестры
const heritageMarkers: HeritageMarker[] = [
  {
    id: '1',
    coordinates: [51.73333, 47.50000], // Сарайшык
    type: 'threat',
    title: 'Городище Сарайшык (Сарай-Жук)',
    description: 'Средневековый город на Шёлковом пути, столица Ногайской орды (XIII–XVI вв.).',
    details: 'Археологический памятник находится под угрозой из-за эрозии берега реки Урал. Ежегодно размывается до 2 метров береговой линии. Часть некрополя уже утрачена. Требуются срочные берегоукрепительные работы.',
    historicalInfo: 'Сарайшык был крупным торговым центром на пути из Китая в Европу. Здесь похоронены ханы Золотой Орды. Город разрушен в 1580 году казаками.',
    date: 'Последний осмотр: декабрь 2025',
    status: 'Критический',
  },
  {
    id: '2',
    coordinates: [-43.2104, -22.9509], // Статуя Христа-Искупителя
    type: 'monitoring',
    title: 'Статуя Христа-Искупителя',
    description: 'Монументальная статуя Христа, построенная в 1931 году. Символ веры,мира и защиты.',
    details: 'Высота статуи - 30 м, постамент - 8 м, размах рук - 28 м, материалы: железобетон и мыльный камень, стиль ар-деко.',
    historicalInfo: 'Идея строительства возникла в 1920-х как символ веры и независимости Бразилии. Открылась в 12 октябряе 1931 года. Части статуи изготавливались во Франции и доставлялись в Бразилию. Статуя стала символом Рио и входит в Новые семь чудес света.',
    date: 'Мониторинг с: октябрь 2025',
    status: 'Стабильный',
  },
  {
    id: '3',
    coordinates: [51.903478, 47.107561], // Памятник Исатаю и Махамбету
    type: 'digitized',
    title: 'Памятник Исатаю Тайманову и Махамбету Утемисову',
    description: 'Монумент героям национально-освободительного восстания 1836–1838 гг.',
    details: 'Памятник установлен на центральной площади города в 1999 году. Бронзовая скульптурная группа высотой 7 метров. Создана полная 3D-модель методом фотограмметрии для цифрового архива.',
    historicalInfo: 'Исатай Тайманов (1791–1838) и Махамбет Утемисов (1803–1846) — лидеры крупнейшего восстания казахов против Хивинского ханства. Махамбет также известен как поэт и композитор.',
    date: 'Оцифровано: ноябрь 2025',
    status: 'Завершено',
  },
  {
    id: '4',
    coordinates: [43.154064, 36.359124], // Висячие Сады Семирамиды
    type: 'digitized',
    title: 'Висячие Сады Семирамиды',
    description: 'Висячие сады Семирамиды — легендарное чудо Древнего мира, представлявшее собой многоуровневые сады с пышной растительностью в древнем Вавилоне.',
    details: 'Сады состояли из террас, на которых росли деревья, кустарники и цветы. Для полива использовалась сложная система подъёма воды из реки Евфрат. Конструкция, по описаниям, напоминала зелёную гору среди города.',
    historicalInfo: 'Предположительно сады были построены в VI веке до н. э. Их связывают с царём Навуходоносором II, который, по легенде, создал их для своей жены. Точное местоположение и даже факт существования садов до сих пор остаются предметом споров учёных.',
    date: 'Оцифровано: сентябрь 2025',
    status: 'Завершено',
  },
  {
    id: '5',
    coordinates: [-74.044362, 40.689369], // Статуя Свободы
    type: 'threat',
    title: 'Статуя Свободы',
    description: 'Статуя Свободы — огромная скульптура женщины с факелом, символизирующая свободу и демократию.',
    details: 'Высота самой статуи составляет 46 метров, а вместе с постаментом — 93 метра. Статуя изготовлена из меди и поддерживается стальной каркасной конструкцией.',
    historicalInfo: 'Статуя была подарком Франции США и символизирует свободу и дружбу народов. Открыта 28 октября 1886 года и с 1984 года входит в Всемирное наследие ЮНЕСКО.',
    date: 'Мониторинг с: август 2025',
    status: 'Под наблюдением',
  },
  {
    id: '6',
    coordinates: [2.294662, 48.858523], // Эйфелева Башня
    type: 'monitoring',
    title: 'Эйфелева Башня',
    description: 'Эйфелева башня — это металлическая смотровая башня, расположенная в центре Парижа. Она является символом Франции и одной из самых узнаваемых достопримечательностей мира.',
    details: 'Высота башни составляет около 330 метров с антенной. Конструкция выполнена из железа и состоит из трёх уровней для посетителей.',
    historicalInfo: 'Башня была построена по проекту инженера Густава Эйфеля к Всемирной выставке 1889 года, приуроченной к 100-летию Французской революции.',
    date: 'Мониторинг с: октябрь 2025',
    status: 'Требует внимания',
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
      center: [51.85, 47.00], // Центр Атырауской области
      zoom: 9,
      pitch: 15,
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
                  <Badge variant="outline" className="text-xs">
                    {selectedMarker.status}
                  </Badge>
                </div>
                <DialogTitle className="font-serif text-xl md:text-2xl pr-8">
                  {selectedMarker.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedMarker.description}
                </DialogDescription>
              </DialogHeader>

              {/* Date info */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {selectedMarker.date}
              </div>

              {/* Details */}
              <div className="mt-4 p-4 bg-secondary/50 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  Состояние объекта
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedMarker.details}
                </p>
              </div>

              {/* Historical info */}
              {selectedMarker.historicalInfo && (
                <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">
                    📜 Историческая справка
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMarker.historicalInfo}
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
                  Планета: Земля
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
