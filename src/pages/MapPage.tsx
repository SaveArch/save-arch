import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AtyrauMapbox } from '@/components/AtyrauMapbox';
import { motion } from 'framer-motion';
import { MapPin, Layers, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MapPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Layers className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Система мониторинга
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                Концептуальная карта состояния памятников культурного наследия Атырауской области
              </p>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
                Река Урал · Каспийское море · Город Атырау
              </p>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10"
            >
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <p className="text-2xl font-bold text-destructive">2</p>
                <p className="text-xs text-muted-foreground">Под угрозой</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <p className="text-2xl font-bold text-orange-500">2</p>
                <p className="text-xs text-muted-foreground">Мониторинг</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-xs text-muted-foreground">Оцифровано</p>
              </div>
            </motion.div>

            {/* Conceptual Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AtyrauMapbox />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-10"
            >
              <Link to="/report">
                <Button className="btn-hero gap-2">
                  <MapPin className="w-5 h-5" />
                  Сообщить о проблеме
                </Button>
              </Link>
              <Link to="/digitize">
                <Button variant="outline" className="btn-hero-outline gap-2">
                  <Shield className="w-5 h-5" />
                  Оцифровать памятник
                </Button>
              </Link>
            </motion.div>

            {/* Info Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-6 bg-secondary/50 rounded-2xl border border-border max-w-2xl mx-auto"
            >
              <h3 className="font-semibold text-foreground mb-2 text-center">
                О системе мониторинга
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Данная карта является концептуальной визуализацией системы мониторинга 
                культурного наследия. Маркеры отображают типы угроз: климатические риски 
                (эрозия, изменение уровня воды), антропогенные факторы (вандализм, 
                неконтролируемый туризм) и статус оцифровки памятников.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;
