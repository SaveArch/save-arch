import { motion } from 'framer-motion';
import { Landmark, MapPin, Info } from 'lucide-react';

export const VirtualPreservation = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Landmark className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Виртуальное сохранение памятников
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Интерактивные 3D модели для изучения и сохранения культурного наследия
          </p>
        </motion.div>

        {/* 3D Model Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="card-heritage overflow-hidden">
            {/* Sketchfab Embed */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                title="Комплекс памятника Коркыт Ата"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/b78106a357004d489b882096cb942c90/embed?autostart=1&ui_theme=dark"
                className="absolute top-0 left-0 w-full h-full rounded-t-xl"
              />
            </div>

            {/* Info Block */}
            <div className="p-6 md:p-8 bg-card">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Мемориальный комплекс Коркыт Ата
                  </h3>
                  
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Казахстан, Кызылординская область</span>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                    <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      Мемориальный комплекс посвящён легендарному мыслителю и музыканту Коркыт Ата. 
                      Объект является важной частью тюркского культурного наследия. 
                      Цифровая 3D модель позволяет сохранять внешний вид памятника и изучать его дистанционно.
                    </p>
                  </div>
                </div>

                {/* Stats/Features */}
                <div className="lg:w-64 grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="p-4 bg-primary/5 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">360°</p>
                    <p className="text-sm text-muted-foreground">Полный обзор</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">HD</p>
                    <p className="text-sm text-muted-foreground">Высокое качество</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl text-center col-span-2 lg:col-span-1">
                    <p className="text-2xl font-bold text-primary">24/7</p>
                    <p className="text-sm text-muted-foreground">Доступ онлайн</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
