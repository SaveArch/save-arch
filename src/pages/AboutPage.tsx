import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Миссия',
    description: 'Сохранение культурного наследия через цифровые технологии и вовлечение общества',
  },
  {
    icon: Eye,
    title: 'Прозрачность',
    description: 'Все данные открыты и доступны для исследователей и общественности',
  },
  {
    icon: Heart,
    title: 'Сообщество',
    description: 'Объединяем волонтёров, учёных и энтузиастов по всей стране',
  },
  {
    icon: Shield,
    title: 'Защита',
    description: 'Оперативное реагирование на угрозы памятникам истории',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                О проекте SaveArch
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                SaveArch — это краудсорсинговая платформа для мониторинга и цифрового сохранения 
                объектов культурного наследия. Мы объединяем технологии 3D-сканирования, 
                геоинформационные системы и силу сообщества.
              </p>
            </motion.div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-heritage p-8 flex gap-6"
                  >
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
