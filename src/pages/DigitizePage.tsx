import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DigitizationUpload } from '@/components/DigitizationUpload';
import { MonumentAnalyzer } from '@/components/MonumentAnalyzer';
import { VirtualPreservation } from '@/components/VirtualPreservation';
import { motion } from 'framer-motion';
import { Camera, Lightbulb, Shield } from 'lucide-react';

const DigitizePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="section-padding gradient-hero">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Оцифровка памятников
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Создайте цифровой двойник памятника для его вечного сохранения
              </p>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              {[
                { icon: Camera, title: 'Фотограмметрия', desc: '30–60 снимков с перекрытием' },
                { icon: Lightbulb, title: 'Инновации', desc: 'Современные 3D-технологии' },
                { icon: Shield, title: 'Сохранение', desc: 'Защита от утраты данных' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* AI Analyzer + Upload Side by Side */}
            <div className="grid lg:grid-cols-2 gap-8">
              <MonumentAnalyzer />
              <DigitizationUpload />
            </div>
          </div>
        </section>

        {/* Virtual Preservation Section with 3D Model */}
        <VirtualPreservation />
      </main>
      <Footer />
    </div>
  );
};

export default DigitizePage;
