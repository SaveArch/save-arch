import { motion } from 'framer-motion';

interface SketchfabViewerProps {
  modelId: string;
  title?: string;
  className?: string;
}

export const SketchfabViewer = ({ 
  modelId, 
  title = '3D Модель',
  className = '' 
}: SketchfabViewerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`card-heritage overflow-hidden ${className}`}
    >
      <div className="aspect-video w-full">
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0`}
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-serif font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Интерактивная 3D модель — вращайте мышью или пальцем
        </p>
      </div>
    </motion.div>
  );
};
