import { motion } from 'framer-motion';
import { Box, Scan, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mausoleumAbstract from '@/assets/mausoleum-abstract.png';
import wireframeModel from '@/assets/wireframe-model.png';

interface DigitalTwin {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  status: 'completed' | 'processing' | 'planned';
  polygons: string;
  accuracy: string;
}

const digitalTwins: DigitalTwin[] = [
  {
    id: '1',
    title: 'Мавзолей Акмечеть',
    subtitle: 'Цифровой двойник · Полная модель',
    image: mausoleumAbstract,
    status: 'completed',
    polygons: '2.4M',
    accuracy: '99.2%',
  },
  {
    id: '2',
    title: 'Караван-сарай',
    subtitle: 'Цифровой двойник · Wireframe',
    image: wireframeModel,
    status: 'completed',
    polygons: '1.8M',
    accuracy: '98.7%',
  },
  {
    id: '3',
    title: 'Исторический некрополь',
    subtitle: 'В процессе сканирования',
    image: wireframeModel,
    status: 'processing',
    polygons: '—',
    accuracy: '—',
  },
];

const statusLabels = {
  completed: { label: 'Завершено', color: 'bg-green-100 text-green-700' },
  processing: { label: 'В процессе', color: 'bg-blue-100 text-blue-700' },
  planned: { label: 'Планируется', color: 'bg-gray-100 text-gray-700' },
};

export const DigitalTwinsGallery = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Box className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Галерея 3D-моделей
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Цифровые двойники памятников культурного наследия Атырауской области
          </p>
        </motion.div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Scan, title: 'Цифровой двойник', desc: 'Точная 3D-копия объекта' },
            { icon: Eye, title: 'Виртуальные экскурсии', desc: 'Доступ из любой точки мира' },
            { icon: Download, title: 'Сохранение наследия', desc: 'Защита от утраты данных' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {digitalTwins.map((twin, index) => (
            <motion.div
              key={twin.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card-heritage group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={twin.image}
                  alt={twin.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[twin.status].color}`}>
                    {statusLabels[twin.status].label}
                  </span>
                </div>

                {/* View Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Просмотр 3D
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  {twin.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{twin.subtitle}</p>

                {/* Stats */}
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Полигоны</p>
                    <p className="font-semibold text-foreground">{twin.polygons}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Точность</p>
                    <p className="font-semibold text-foreground">{twin.accuracy}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Все изображения являются абстрактными иллюстрациями и не представляют реальные фотографии
        </motion.p>
      </div>
    </section>
  );
};
