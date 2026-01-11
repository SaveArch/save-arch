import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ReportsMap } from '@/components/ReportsMap';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Карта репортов
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Интерактивная карта с информацией о состоянии памятников культурного наследия
              </p>
              <Link to="/report">
                <Button className="btn-hero gap-2">
                  <MapPin className="w-5 h-5" />
                  Добавить репорт
                </Button>
              </Link>
            </motion.div>

            <ReportsMap height="calc(100vh - 300px)" />

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">Новое</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">В обработке</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Закрыто</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;
