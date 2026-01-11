import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { getReports } from '@/lib/reportStore';
import { Report, statusLabels, getStatusClass } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Eye, Box } from 'lucide-react';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons based on status
const createIcon = (status: Report['status']) => {
  const colors = {
    new: '#EAB308',
    processing: '#3B82F6',
    closed: '#22C55E',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${colors[status]};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        ">!</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const FitBounds = ({ reports }: { reports: Report[] }) => {
  const map = useMap();

  useEffect(() => {
    if (reports.length > 0) {
      const bounds = L.latLngBounds(
        reports.map((r) => [r.location.lat, r.location.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [reports, map]);

  return null;
};

interface ReportsMapProps {
  className?: string;
  height?: string;
}

export const ReportsMap = ({ className = '', height = '600px' }: ReportsMapProps) => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    setReports(getReports());
  }, []);

  return (
    <div className={`rounded-2xl overflow-hidden shadow-card ${className}`} style={{ height }}>
      <MapContainer
        center={[55.7558, 37.6173]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds reports={reports} />
        
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={createIcon(report.status)}
          >
            <Popup>
              <div className="p-0 min-w-[280px]">
                <img
                  src={report.imageUrl}
                  alt={report.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusClass(report.status)}`}>
                      {statusLabels[report.status]}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/report/${report.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Eye className="w-4 h-4" />
                        Подробнее
                      </Button>
                    </Link>
                    {report.has3D && (
                      <Link to={`/digitize?model=${report.sketchfabId}`} className="flex-1">
                        <Button size="sm" className="w-full gap-1">
                          <Box className="w-4 h-4" />
                          3D модель
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
