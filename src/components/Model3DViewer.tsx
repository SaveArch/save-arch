import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw, ZoomIn, ZoomOut, Info, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Model3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
  model: {
    id: string;
    title: string;
    subtitle: string;
    description?: string;
    polygons: string;
    accuracy: string;
  };
}

export const Model3DViewer = ({ isOpen, onClose, model }: Model3DViewerProps) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const handleRotate = () => {
    setRotation((prev) => prev + 45);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const descriptions: Record<string, string> = {
    '1': 'Мавзолей Акмечеть (Ақмешіт кесенесі) — памятник архитектуры XIX века, расположенный в Атырауской области Казахстана. Мавзолей является значимым объектом культурного наследия региона и представляет традиционную казахскую архитектуру.',
    '2': 'Караван-сарай — историческое сооружение, служившее местом отдыха для караванов на Великом Шёлковом пути. Объект демонстрирует архитектурные традиции региона.',
    '3': 'Исторический некрополь — комплекс древних захоронений, представляющий археологическую и культурную ценность для изучения истории региона.',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="font-serif text-xl">{model.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col lg:flex-row h-full">
          {/* 3D View Area */}
          <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-[300px]">
            {/* Abstract 3D Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotateY: rotation,
                  scale: zoom,
                }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="relative"
              >
                {/* Wireframe Cube Representation */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 md:w-64 md:h-64"
                  style={{ transform: `perspective(500px) rotateX(20deg)` }}
                >
                  {/* Back face */}
                  <rect
                    x="40"
                    y="40"
                    width="120"
                    height="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/30"
                  />
                  {/* Front face */}
                  <rect
                    x="20"
                    y="60"
                    width="120"
                    height="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  {/* Connecting lines */}
                  <line x1="20" y1="60" x2="40" y2="40" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  <line x1="140" y1="60" x2="160" y2="40" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  <line x1="20" y1="160" x2="40" y2="140" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  <line x1="140" y1="160" x2="160" y2="140" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  {/* Detail lines */}
                  <line x1="60" y1="60" x2="60" y2="160" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                  <line x1="100" y1="60" x2="100" y2="160" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                  <line x1="20" y1="110" x2="140" y2="110" stroke="currentColor" strokeWidth="1" className="text-primary/40" />
                  {/* Dome */}
                  <ellipse cx="80" cy="60" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                </svg>

                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
                  Абстрактная 3D-модель (прототип)
                </p>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRotate}
                className="rounded-full"
                title="Повернуть"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="rounded-full"
                title="Приблизить"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="rounded-full"
                title="Отдалить"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo(!showInfo)}
                className={`rounded-full ${showInfo ? 'bg-primary/10' : ''}`}
                title="Описание"
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-border overflow-y-auto"
            >
              <h4 className="font-serif text-lg font-bold mb-2">{model.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{model.subtitle}</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Полигоны</p>
                    <p className="font-semibold">{model.polygons}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Точность</p>
                    <p className="font-semibold">{model.accuracy}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Описание</h5>
                  <p className="text-sm text-muted-foreground">
                    {descriptions[model.id] || 'Описание памятника будет добавлено позже.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Это демонстрационная 3D-модель. В полной версии здесь будет интерактивная модель с текстурами.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
