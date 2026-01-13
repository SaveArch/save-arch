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

// Маркеры в центре Атырау
const heritageMarkers: HeritageMarker[] = [
  {
    id: '1',
    coordinates: [51.8845, 46.9485], // Площадь Исатай-Махамбет
    type: 'threat',
    title: 'Памятник Исатаю и Махамбету',
    description: 'Монумент в честь лидеров народного восстания 1836-1838 годов.',
    details: 'Бронзовый памятник установлен в 2001 году на центральной площади города. Высота композиции — 7 метров. Обнаружены трещины на постаменте из-за сезонных перепадов температур. Требуется укрепление фундамента.',
    historicalInfo: 'Исатай Тайманов и Махамбет Утемисов — национальные герои Казахстана, возглавившие восстание против Хивинского ханства и колониальной политики.',
    date: 'Осмотр: 10 января 2026',
    status: 'Требует внимания',
  },
  {
    id: '2',
    coordinates: [51.9234, 46.9567], // Возле Инфинити Молл
    type: 'threat',
    title: 'Старый купеческий дом',
    description: 'Здание конца XIX века, принадлежавшее купеческой семье.',
    details: 'Двухэтажное кирпичное здание с элементами эклектики. Фасад сильно повреждён, оконные проёмы частично разрушены. Угроза обрушения кровли. Необходима срочная консервация.',
    historicalInfo: 'В этом доме в начале XX века располагался один из первых торговых домов Гурьева (старое название Атырау).',
    date: 'Обнаружено: 5 января 2026',
    status: 'Критический',
  },
  {
    id: '3',
    coordinates: [51.8956, 46.9512], // Набережная
    type: 'monitoring',
    title: 'Мечеть Имангали',
    description: 'Историческая мечеть, построенная в 1870-х годах.',
    details: 'Одна из старейших мечетей Атырау. Кирпичная постройка с минаретом высотой 12 метров. Проводится регулярный мониторинг состояния стен. Небольшие трещины стабилизированы.',
    historicalInfo: 'Мечеть была закрыта в советское время и использовалась как склад. Восстановлена в 1990-х годах.',
    date: 'Мониторинг с: ноябрь 2025',
    status: 'Стабильный',
  },
  {
    id: '4',
    coordinates: [51.9012, 46.9623], // Ближе к центру
    type: 'monitoring',
    title: 'Здание старой гимназии',
    description: 'Учебное заведение начала XX века.',
    details: 'Здание построено в 1905 году. Классический стиль с колоннами. Ведётся наблюдение за состоянием фундамента из-за близости к реке Урал. Ежемесячные замеры уровня грунтовых вод.',
    historicalInfo: 'В этой гимназии учились многие известные деятели казахской культуры и науки.',
    date: 'Мониторинг с: сентябрь 2025',
    status: 'Под наблюдением',
  },
  {
    id: '5',
    coordinates: [51.8789, 46.9534], // Старый город
    type: 'digitized',
    title: 'Дом-музей Курмангазы',
    description: 'Мемориальный музей великого казахского композитора.',
    details: 'Музей открыт в 1985 году. Полная 3D-модель создана методом фотограмметрии с точностью до 2 мм. Оцифрованы все экспонаты и интерьеры. Доступен виртуальный тур.',
    historicalInfo: 'Курмангазы Сагырбайулы (1823-1896) — легендарный кюйши, чьи произведения включены в список нематериального наследия ЮНЕСКО.',
    date: 'Оцифровано: октябрь 2025',
    status: 'Завершено',
  },
  {
    id: '6',
    coordinates: [51.9123, 46.9445], // Другая часть города
    type: 'digitized',
    title: 'Успенский собор',
    description: 'Православный храм, построенный в 1890-х годах.',
    details: 'Храм в русско-византийском стиле. Лазерное сканирование выполнено в 2025 году. Создана точная 3D-модель с 50 млн полигонов. Модель используется для планирования реставрации куполов.',
    historicalInfo: 'Собор был закрыт в 1930-х годах, использовался как зернохранилище. Возвращён верующим в 1991 году.',
    date: 'Оцифровано: декабрь 2025',
    status: 'Завершено',
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
                  Регион: Атырауская область, г. Атырау
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};