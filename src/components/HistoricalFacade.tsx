import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Info } from 'lucide-react';
import facadeSchematic from '@/assets/facade-schematic.png';

export const HistoricalFacade = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Исторический фасад
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Схематическая визуализация архитектурного наследия региона
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Facade Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
              <img
                src={facadeSchematic}
                alt="Схематическая визуализация исторического фасада мавзолея"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Архитектурная схема · Не фотография
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card-heritage p-6">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Мавзолей Акмечеть
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Мавзолей Акмечеть (Ақмешіт кесенесі) — памятник архитектуры XIX века, 
                расположенный в Атырауской области Казахстана. Представляет собой 
                уникальный образец центральноазиатского зодчества с характерным 
                куполом и традиционными декоративными элементами.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Период</p>
                    <p className="text-sm text-muted-foreground">XIX век</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Локация</p>
                    <p className="text-sm text-muted-foreground">Атырауская область</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-heritage p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-2">Культурное наследие</p>
                  <p className="text-sm text-muted-foreground">
                    Объект представляет историческую и культурную ценность для региона. 
                    Мониторинг состояния ведётся с целью предотвращения разрушения 
                    и сохранения для будущих поколений.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
